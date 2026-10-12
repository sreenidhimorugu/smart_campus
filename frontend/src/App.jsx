import {Link,Navigate,Route,Routes,useLocation,useNavigate,useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import api, {apiErrorMessage} from "./services/api";

const BRANCH_OPTIONS=["CSE","AI & ML","Data Science","ECE","EEE","Mechanical","Civil","Other"];
const YEAR_OPTIONS=[1,2,3,4];
function yearLabel(year){return `${year}${year===1?"st":year===2?"nd":year===3?"rd":"th"} Year`}

function Nav(){
 const nav=useNavigate(),location=useLocation(),token=localStorage.getItem("token"),role=localStorage.getItem("role");
 const logout=()=>{localStorage.removeItem("token");localStorage.removeItem("role");localStorage.removeItem("name");localStorage.removeItem("email");nav("/")};
 return <nav className="site-nav"><Link className="brand" to={token?(role==="ADMIN"?"/admin/dashboard":"/dashboard"):"/"}><span className="brand-mark">✦</span><span className="brand-name">Smart<span className="brand-accent">Campus</span></span></Link>
  <div className="nav-links">
   {!token&&<><Link to="/">Explore</Link><Link to="/login">Sign in</Link><Link className="button button-small" to="/register">Get started <span>↗</span></Link></>}
   {token&&role==="STUDENT"&&<><Link to="/dashboard">Opportunities</Link><Link to="/dashboard#saved">Saved</Link><Link to="/dashboard#applications">Applications</Link><Link to="/profile">My Profile</Link><button className="button button-outline" onClick={logout}>Sign out</button></>}
   {token&&role==="ADMIN"&&<><Link to="/admin/dashboard">Dashboard</Link><Link to="/admin/post-opportunity">Post opportunity</Link><Link to="/admin/manage-opportunities">Manage posts</Link><Link to="/admin/students">Students</Link><Link to="/admin/profile">Profile</Link><button className="button button-outline" onClick={logout}>Sign out</button></>}
  </div>
 </nav>
}

function Home(){
 const token=localStorage.getItem("token"),role=localStorage.getItem("role");
 const[serviceStatus,setServiceStatus]=useState("checking");
 useEffect(()=>{api.get("/health").then(({data})=>setServiceStatus(data.database==="connected"?"connected":"disconnected")).catch(()=>setServiceStatus("disconnected"))},[]);
 if(token)return <Navigate to={role==="ADMIN"?"/admin/dashboard":"/dashboard"} replace/>;
 return <main className="landing">
  <section className="landing-hero">
   <div className="hero-main">
    <div className="landing-copy"><span className="eyebrow"><span className="eyebrow-dot"/> YOUR NEXT OPPORTUNITY STARTS HERE</span><h1>One campus.<br/><span>Endless possibilities.</span></h1><p>Discover internships, hackathons, scholarships, workshops and career-building experiences — all in one place, curated for your journey.</p><div className="hero-actions"><Link className="button" to="/register">Create student account <span>↗</span></Link><Link className="text-link" to="/login">Already a member? Sign in <span>→</span></Link></div><div className="trust-line"><span className="trust-icon">✓</span> Opportunities matched to your branch and year</div></div>
    <div className="portal-card"><div className="portal-top"><div><span className="eyebrow">WELCOME TO</span><h2>Your campus portal</h2></div><span className="portal-spark">✦</span></div><p className="portal-subtitle">Choose how you want to continue.</p>
     <Link className="portal-choice student-choice" to="/login"><span className="portal-icon student-icon">♙</span><span className="portal-choice-copy"><b>I'm a student</b><small>Find opportunities made for you</small></span><span className="portal-arrow">↗</span></Link>
     <Link className="portal-choice admin-choice" to="/admin/login"><span className="portal-icon admin-icon">▦</span><span className="portal-choice-copy"><b>I'm an administrator</b><small>Publish and manage campus posts</small></span><span className="portal-arrow">↗</span></Link>
     <div className="portal-foot"><span className={`online-dot ${serviceStatus==="disconnected"?"offline-dot":""}`}/><span>{serviceStatus==="checking"?"Checking app and database…":serviceStatus==="connected"?"App and database connected":"Backend or database is offline"}</span></div>
    </div>
   </div>
   <section className="feature-strip"><div className="feature-intro"><span className="eyebrow">BUILT FOR STUDENT GROWTH</span><h2>Everything you need to move forward.</h2></div><article className="feature-item"><span className="feature-icon lavender">⌕</span><h3>Discover</h3><p>Explore internships, events, courses and challenges.</p></article><article className="feature-item"><span className="feature-icon mint">♡</span><h3>Save & track</h3><p>Keep interesting opportunities in one personal space.</p></article><article className="feature-item"><span className="feature-icon peach">✧</span><h3>Stay eligible</h3><p>See opportunities relevant to your branch and year.</p></article></section>
   <footer className="landing-footer"><span>✦ Smart Campus Opportunities</span><span>Discover · Save · Apply · Grow</span></footer>
  </section>
 </main>
}

function SignIn({admin=false}){
 const nav=useNavigate(),[mode,setMode]=useState(admin?"ADMIN":"STUDENT"),[f,setF]=useState({email:"",password:""}),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
 const isAdmin=mode==="ADMIN",expectedRole=mode;
 useEffect(()=>{const role=localStorage.getItem("role");if(localStorage.getItem("token")&&role===expectedRole)nav(role==="ADMIN"?"/admin/dashboard":"/dashboard",{replace:true})},[expectedRole,nav]);
 function changeMode(next){setMode(next);setErr("");nav(next==="ADMIN"?"/admin/login":"/login",{replace:true})}
 async function submit(e){
  e.preventDefault();setErr("");setBusy(true);
  try{const{data}=await api.post("/auth/login",f);
   if(data.role!==expectedRole){setErr(isAdmin?"This account does not have administrator access. Choose Student sign in if you are a student.":"This is an administrator account. Switch to Admin sign in.");return}
   localStorage.setItem("token",data.token);localStorage.setItem("role",data.role);localStorage.setItem("name",data.name||f.email.split("@")[0]);localStorage.setItem("email",data.email||f.email);
   nav(isAdmin?"/admin/dashboard":"/dashboard",{replace:true});
  }catch(error){setErr(apiErrorMessage(error,"We couldn't sign you in. Check your details and try again."))}
  finally{setBusy(false)}
 }
 return <main className="auth-shell"><section className="auth-story"><Link className="brand auth-brand" to="/"><span className="brand-mark">✦</span><span className="brand-name">Smart<span className="brand-accent">Campus</span></span></Link><div className="auth-story-copy"><span className="eyebrow">YOUR FUTURE, ORGANIZED</span><h1>Make your next<br/><span>move count.</span></h1><p>A smarter way to find campus opportunities, manage applications and turn your interests into real-world experience.</p><div className="story-points"><span>✓ Curated opportunities</span><span>✓ Personal saved list</span><span>✓ One campus community</span></div></div><div className="story-bottom">Smart Campus Opportunities <span>·</span> Discover your next step</div></section>
  <section className="auth-side"><form className={`auth-card ${isAdmin?"admin-auth-card":""}`} onSubmit={submit}><Link className="back-link" to="/">← Back to home</Link><span className="eyebrow">WELCOME BACK</span><h2>Sign in to continue</h2><p className="auth-intro">Choose your account type to open your workspace.</p>
   <div className="role-switch" role="group" aria-label="Choose account type"><button type="button" className={!isAdmin?"role-option selected":"role-option"} onClick={()=>changeMode("STUDENT")}><span>♙</span> Student</button><button type="button" className={isAdmin?"role-option selected admin-selected":"role-option"} onClick={()=>changeMode("ADMIN")}><span>▦</span> Admin</button></div>
   {err&&<p className="error" role="alert">{err}</p>}
   <label>{isAdmin?"Administrator email":"Student email"}<input autoComplete="username" placeholder="you@college.edu" type="email" required value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></label>
   <label>Password<input autoComplete="current-password" placeholder="Enter your password" type="password" required value={f.password} onChange={e=>setF({...f,password:e.target.value})}/></label>
   <button className="button auth-submit" disabled={busy}>{busy?"Signing in…":isAdmin?"Sign in as admin":"Sign in as student"}<span>→</span></button>
   {!isAdmin&&<p className="auth-footer">New to Smart Campus? <Link to="/register">Create a student account</Link></p>}
   {isAdmin&&<p className="auth-footer">Administrator access is restricted to authorized accounts.</p>}
  </form><div className="auth-help">Need an account? <Link to="/register">Join as a student</Link></div></section></main>
}

function Register(){
 const nav=useNavigate(),[f,setF]=useState({name:"",email:"",password:"",college:"",branch:"",year:"",skills:"",interests:""}),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
 async function submit(e){e.preventDefault();setErr("");setBusy(true);try{const{data}=await api.post("/auth/register",{...f,year:Number(f.year)});if(data.role!=="STUDENT"){setErr("Student registration could not be completed.");return}localStorage.setItem("token",data.token);localStorage.setItem("role",data.role);localStorage.setItem("name",data.name);localStorage.setItem("email",data.email);nav("/dashboard",{replace:true})}catch(error){setErr(apiErrorMessage(error,"Registration failed"))}finally{setBusy(false)}}
 return <main className="auth-page"><form className="auth-card register-card" onSubmit={submit}><Link className="back-link" to="/">← Back to home</Link><span className="eyebrow">STUDENT ACCESS</span><h1>Create Student Account</h1><p className="auth-intro">Create your profile to see opportunities matched to your branch and year.</p>{err&&<p className="error" role="alert">{err}</p>}
  <label>Name<input autoComplete="name" required maxLength="120" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></label><label>Email<input autoComplete="email" type="email" required value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></label><label>Password<input autoComplete="new-password" type="password" minLength="8" required value={f.password} onChange={e=>setF({...f,password:e.target.value})}/><small className="field-hint">Use at least 8 characters.</small></label><label>College<input autoComplete="organization" required value={f.college} onChange={e=>setF({...f,college:e.target.value})}/></label>
  <label>Branch<select required value={f.branch} onChange={e=>setF({...f,branch:e.target.value})}><option value="">Select branch</option>{BRANCH_OPTIONS.map(branch=><option key={branch}>{branch}</option>)}</select></label><label>Year<select required value={f.year} onChange={e=>setF({...f,year:e.target.value})}><option value="">Select year</option>{YEAR_OPTIONS.map(year=><option key={year} value={year}>{yearLabel(year)}</option>)}</select></label><label>Skills<input placeholder="e.g. Python, Java" value={f.skills} onChange={e=>setF({...f,skills:e.target.value})}/></label><label>Interests<input placeholder="e.g. AI, Hackathons" value={f.interests} onChange={e=>setF({...f,interests:e.target.value})}/></label><button className="button auth-submit" disabled={busy}>{busy?"Creating your account…":"Create account"}<span>→</span></button><p className="auth-footer">Already registered? <Link to="/login">Student Login</Link></p>
 </form></main>
}

function Profile(){
 const nav=useNavigate(),[f,setF]=useState(null),[err,setErr]=useState("");
 useEffect(()=>{api.get("/profile").then(({data})=>setF({...data,year:String(data.year||"")})).catch(error=>setErr(error.response?.data?.message||"Could not load profile."))},[]);
 async function save(e){e.preventDefault();setErr("");try{const{data}=await api.put("/profile",{...f,year:Number(f.year)});localStorage.setItem("name",data.name);nav("/dashboard")}catch(error){setErr(apiErrorMessage(error,"Could not save profile."))}}
 if(!f)return <main className="page">{err?<p className="error" role="alert">{err}</p>:"Loading profile…"}</main>;
 return <main className="auth-page"><form className="auth-card register-card" onSubmit={save}><span className="eyebrow">YOUR ACCOUNT</span><h1>Student Profile</h1>{err&&<p className="error" role="alert">{err}</p>}
  <label>Name<input required value={f.name||""} onChange={e=>setF({...f,name:e.target.value})}/></label><label>Email<input type="email" value={f.email||""} readOnly/></label><label>College<input required value={f.college||""} onChange={e=>setF({...f,college:e.target.value})}/></label>
  <label>Branch<select required value={f.branch||""} onChange={e=>setF({...f,branch:e.target.value})}><option value="">Select branch</option>{!BRANCH_OPTIONS.includes(f.branch)&&f.branch&&<option>{f.branch}</option>}{BRANCH_OPTIONS.map(branch=><option key={branch}>{branch}</option>)}</select></label><label>Year<select required value={f.year||""} onChange={e=>setF({...f,year:e.target.value})}><option value="">Select year</option>{YEAR_OPTIONS.map(year=><option key={year} value={year}>{yearLabel(year)}</option>)}</select></label><label>Skills<input value={f.skills||""} onChange={e=>setF({...f,skills:e.target.value})}/></label><label>Interests<input value={f.interests||""} onChange={e=>setF({...f,interests:e.target.value})}/></label><button className="button auth-submit">Save Profile</button>
 </form></main>
}

function MatchedOpportunities(){
 const location=useLocation(),[items,setItems]=useState([]),[activity,setActivity]=useState({saved:[],applications:[]}),[loading,setLoading]=useState(true),[err,setErr]=useState(""),[savingId,setSavingId]=useState(null),[applyingId,setApplyingId]=useState(null);
 useEffect(()=>{Promise.all([api.get("/student/opportunities"),api.get("/student/saved"),api.get("/student/applications")]).then(([matched,saved,applications])=>{setItems(matched.data);setActivity({saved:saved.data,applications:applications.data})}).catch(error=>setErr(error.response?.data?.message||"Could not load your opportunities. Please try again.")).finally(()=>setLoading(false))},[]);
 useEffect(()=>{if(loading)return;if(location.hash){const id=location.hash.slice(1);document.getElementById(id)?.scrollIntoView({behavior:"instant",block:"start"})}else if(location.pathname==="/dashboard"){window.scrollTo({top:0,behavior:"instant"})}},[loading,location.hash,location.pathname]);
 async function toggleSave(opportunity){
  const isSaved=activity.saved.some(item=>item.opportunity?.id===opportunity.id);
  setSavingId(opportunity.id);setErr("");
  try{
   if(isSaved){
    await api.delete(`/student/saved/${opportunity.id}`);
    setActivity(current=>({...current,saved:current.saved.filter(item=>item.opportunity?.id!==opportunity.id)}));
   }else{
    await api.post(`/student/saved/${opportunity.id}`);
    setActivity(current=>({...current,saved:[...current.saved,{id:`saved-${opportunity.id}`,opportunity}]}));
   }
  }catch(error){setErr(apiErrorMessage(error,"Could not update saved opportunities."))}
  finally{setSavingId(null)}
 }
 async function trackApplication(opportunity){
  setApplyingId(opportunity.id);setErr("");
  try{
   await api.post(`/student/applications/${opportunity.id}`);
   setActivity(current=>({...current,applications:current.applications.some(item=>item.opportunity?.id===opportunity.id)?current.applications.map(item=>item.opportunity?.id===opportunity.id?{...item,status:"APPLIED"}:item):[...current.applications,{id:`application-${opportunity.id}`,opportunity,status:"APPLIED"}]}));
  }catch(error){setErr(apiErrorMessage(error,"Could not update your applications."))}
  finally{setApplyingId(null)}
 }
 if(loading)return <main className="page"><h2>Opportunities For You</h2><p>Checking your eligibility…</p></main>;
 const hour=new Date().getHours(),greeting=hour<12?"Good morning":hour<18?"Good afternoon":"Good evening",name=localStorage.getItem("name")||"Student";
 return <main className="page student-dashboard"><section className="welcome-banner"><div><span className="eyebrow">YOUR CAMPUS OPPORTUNITY FEED</span><h1>{greeting}, {name} 👋</h1><p>Opportunities picked for your year and branch. No searching needed.</p></div><Link className="button button-light" to="/profile">Update Profile</Link></section>
  {err&&<p className="error" role="alert">{err}</p>}<div className="section-heading"><div><span className="eyebrow">PERSONALIZED FOR YOU</span><h2>Opportunities For You</h2></div><span className="match-count">{items.length} matched</span></div>
  {!err&&items.length===0&&<section className="card empty-matches"><h3>No new opportunities for you right now.</h3><p>We’ll show opportunities here when your year and branch meet the Admin’s eligibility criteria.</p><Link className="button" to="/profile">Review Your Profile</Link></section>}
  <div className="grid">{items.map(o=>{const isSaved=activity.saved.some(item=>item.opportunity?.id===o.id),isApplied=activity.applications.some(item=>item.opportunity?.id===o.id&&item.status==="APPLIED");return <article className="card opportunity-card matched-opportunity" key={o.id}><span className="type-pill">✦ {o.category}</span><h3>{o.title}</h3><p>🎓 <b>Eligible years:</b> {o.eligibleYears.map(yearLabel).join(", ")}</p><p>💻 <b>Eligible branches:</b> {o.eligibleBranches.join(", ")}</p><a className="button apply-button" href={o.officialLink} target="_blank" rel="noopener noreferrer">Apply Now <span aria-hidden="true">↗</span></a><button className="button button-light save-button" type="button" disabled={savingId===o.id} onClick={()=>toggleSave(o)}>{savingId===o.id?"Saving…":isSaved?"Saved ✓":"Save"}</button><button className="button button-outline" type="button" disabled={applyingId===o.id||isApplied} onClick={()=>trackApplication(o)}>{applyingId===o.id?"Updating…":isApplied?"Applied ✓":"Mark as applied"}</button></article>})}</div>
  <section id="saved" className="activity-section"><div className="section-heading"><div><span className="eyebrow">YOUR TRACKER</span><h2>Saved</h2></div><span className="match-count">{activity.saved.length}</span></div>{activity.saved.length===0?<p className="muted">You haven’t saved any opportunities yet.</p>:<div className="grid">{activity.saved.map(item=><div className="card row" key={item.id}><b>{item.opportunity?.title||item.title}</b><a className="button button-outline" href={item.opportunity?.officialLink||item.officialLink} target="_blank" rel="noopener noreferrer">View ↗</a></div>)}</div>}</section>
  <section id="applications" className="activity-section"><div className="section-heading"><div><span className="eyebrow">YOUR TRACKER</span><h2>My Applications</h2></div><span className="match-count">{activity.applications.length}</span></div>{activity.applications.length===0?<p className="muted">You haven’t marked any opportunities as applied yet.</p>:activity.applications.map(item=><div className="card row" key={item.id}><b>{item.opportunity.title}</b><span className="status-badge">{item.status}</span></div>)}</section>
 </main>
}

function Details(){const{id}=useParams(),[o,setO]=useState(null),[err,setErr]=useState("");useEffect(()=>{api.get(`/opportunities/${id}`).then(r=>setO(r.data)).catch(error=>setErr(error.response?.status===404?"This opportunity is not eligible for your profile.":error.response?.data?.message||"Could not load opportunity."))},[id]);if(err)return <main className="page"><p className="error" role="alert">{err}</p><Link to="/dashboard">Back to opportunities</Link></main>;if(!o)return <main className="page">Loading…</main>;return <main className="page narrow"><article className="card"><h2>{o.title}</h2><p className="type-pill">✦ {o.category}</p><p>🎓 <b>Eligible years:</b> {o.eligibleYears.map(yearLabel).join(", ")}</p><p>💻 <b>Eligible branches:</b> {o.eligibleBranches.join(", ")}</p><a className="button" href={o.officialLink} target="_blank" rel="noopener noreferrer">Apply Now ↗</a></article></main>}

function Admin(){
 const location=useLocation();
 const emptyForm=()=>({title:"",category:"Internship",officialLink:"",eligibleYears:[],eligibleBranches:[],published:true});
 const[st,setSt]=useState({}),[items,setItems]=useState([]),[students,setStudents]=useState([]),[f,setF]=useState(emptyForm),[editingId,setEditingId]=useState(null),[err,setErr]=useState(""),[loaded,setLoaded]=useState(false);
 async function load(){try{const[x,y,z]=await Promise.all([api.get("/admin/dashboard"),api.get("/admin/opportunities"),api.get("/admin/students")]);const studentUsers=z.data.filter(user=>user.role==="STUDENT");setSt({...x.data,students:studentUsers.length});setItems(y.data);setStudents(studentUsers);setErr("")}catch(error){setErr(apiErrorMessage(error,"Could not load admin data."))}finally{setLoaded(true)}}
 useEffect(()=>{load()},[]);
 useEffect(()=>{if(!loaded)return;const section=location.pathname.split("/").pop();const targets={"dashboard":"dashboard-top","post-opportunity":"post-opportunity","manage-opportunities":"manage-opportunities","students":"students"};const id=targets[section];if(id)document.getElementById(id)?.scrollIntoView({behavior:"instant",block:"start"})},[location.pathname,loaded]);
 function resetForm(){setEditingId(null);setF(emptyForm());setErr("")}
 function edit(o){setEditingId(o.id);setF({title:o.title||"",category:o.category||"Other",officialLink:o.officialLink||"",eligibleYears:o.eligibleYears||[],eligibleBranches:o.eligibleBranches||[],published:o.published});setErr("");document.getElementById("post-opportunity")?.scrollIntoView({behavior:"smooth"})}
 async function save(e){e.preventDefault();setErr("");if(f.eligibleYears.length===0||f.eligibleBranches.length===0){setErr("Select at least one eligible year and one eligible branch.");return}const payload={title:f.title.trim(),category:f.category,officialLink:f.officialLink.trim(),eligibleYears:f.eligibleYears,eligibleBranches:f.eligibleBranches,published:true};try{if(editingId===null)await api.post("/admin/opportunities",payload);else await api.put(`/admin/opportunities/${editingId}`,payload);resetForm();await load()}catch(error){setErr(apiErrorMessage(error,"Could not save opportunity."))}}
 async function remove(id){if(!window.confirm("Delete this opportunity? This cannot be undone."))return;try{await api.delete(`/admin/opportunities/${id}`);if(editingId===id)resetForm();await load()}catch(error){setErr(apiErrorMessage(error,"Could not delete opportunity."))}}
 const activeCount=items.filter(item=>item.published).length;
 return <main className="page admin-dashboard">
  <section id="dashboard-top" className="admin-heading"><div><span className="eyebrow">CAMPUS OPPORTUNITY MANAGEMENT</span><h1>Admin Dashboard</h1><p>Publish relevant opportunities and manage your campus feed.</p></div><Link className="button" to="/admin/post-opportunity">＋ Post Opportunity</Link></section>
  {err&&<p className="error" role="alert">{err}</p>}
  <section className="stats admin-stats"><article className="card stat-card"><span className="stat-icon">✦</span><span>Total Opportunities</span><b>{st.opportunities||0}</b></article><article className="card stat-card"><span className="stat-icon">●</span><span>Active Opportunities</span><b>{activeCount}</b></article><article className="card stat-card"><span className="stat-icon">♙</span><span>Total Students</span><b>{st.students||0}</b></article></section>
  <section id="post-opportunity" className="admin-section"><div className="section-heading"><div><span className="eyebrow">CREATE A CAMPUS POST</span><h2>{editingId===null?"Post New Opportunity":"Edit Opportunity"}</h2></div></div>
   <form className="card form admin-form" onSubmit={save}>
    <label>Opportunity Name<input type="text" value={f.title} onChange={e=>setF({...f,title:e.target.value})} required maxLength="255"/></label>
    <label>Opportunity Type<select value={f.category} onChange={e=>setF({...f,category:e.target.value})} required><option>Internship</option><option>Hackathon</option><option>Coding Competition</option><option>Workshop</option><option>Course</option><option>Certification</option><option>Project Challenge</option><option>Other</option></select></label>
    <fieldset className="eligibility-options"><legend>Eligible Years</legend>{YEAR_OPTIONS.map(year=><label key={year}><input type="checkbox" checked={f.eligibleYears.includes(year)} onChange={e=>setF({...f,eligibleYears:e.target.checked?[...f.eligibleYears,year]:f.eligibleYears.filter(value=>value!==year)})}/>{yearLabel(year)}</label>)}</fieldset>
    <fieldset className="eligibility-options"><legend>Eligible Branches</legend>{BRANCH_OPTIONS.map(branch=><label key={branch}><input type="checkbox" checked={f.eligibleBranches.includes(branch)} onChange={e=>setF({...f,eligibleBranches:e.target.checked?[...f.eligibleBranches,branch]:f.eligibleBranches.filter(value=>value!==branch)})}/>{branch}</label>)}</fieldset>
    <label>Official Application Link<input type="url" value={f.officialLink} onChange={e=>setF({...f,officialLink:e.target.value})} required placeholder="https://example.com/opportunity"/></label>
    <div className="actions"><button className="button">{editingId===null?"Publish Opportunity":"Save Changes"}</button>{editingId!==null&&<button className="button button-outline" type="button" onClick={resetForm}>Cancel</button>}</div>
   </form>
  </section>
  <section id="manage-opportunities" className="admin-section"><div className="section-heading"><div><span className="eyebrow">OPPORTUNITY LIBRARY</span><h2>Manage Opportunities</h2></div><span className="match-count">{items.length} total</span></div>
   {items.length===0?<div className="card empty-matches"><p>No opportunities yet. Post your first opportunity above.</p></div>:<div className="admin-opportunity-list">{items.map(o=><article className="card managed-opportunity" key={o.id}><div className="managed-title"><span className="type-pill">✦ {o.category}</span><span className={`status-badge ${o.published?"status-active":"status-inactive"}`}>{o.published?"Active":"Inactive"}</span><h3>{o.title}</h3></div><div className="managed-detail"><b>Eligible Years</b><span>{(o.eligibleYears||[]).map(yearLabel).join(", ")||"Not set"}</span></div><div className="managed-detail"><b>Eligible Branches</b><span>{(o.eligibleBranches||[]).join(", ")||"Not set"}</span></div><div className="managed-detail"><b>Official Link</b><a href={o.officialLink} target="_blank" rel="noopener noreferrer">{o.officialLink}</a></div><div className="actions"><a className="button button-outline" href={o.officialLink} target="_blank" rel="noopener noreferrer">View</a><button className="button button-light" type="button" onClick={()=>edit(o)}>Edit</button><button className="button button-danger" type="button" onClick={()=>remove(o.id)}>Delete</button></div></article>)}</div>}
  </section>
  <section id="students" className="admin-section"><div className="section-heading"><div><span className="eyebrow">CAMPUS DIRECTORY</span><h2>Students</h2></div><span className="match-count">{students.length}</span></div><div className="card student-list">{students.length===0?<p>No student accounts found.</p>:students.map(student=><div className="student-row" key={student.id}><span className="student-avatar">{(student.name||"S").charAt(0).toUpperCase()}</span><div><b>{student.name}</b><span>{student.email}</span></div><span className="status-badge">Student</span></div>)}</div></section>
 </main>
}

function AdminProfile(){
 const name=localStorage.getItem("name")||"Campus Administrator",email=localStorage.getItem("email")||"Not available";
 return <main className="page profile-page"><section className="profile-hero"><div className="profile-avatar">{name.charAt(0).toUpperCase()}</div><div><span className="eyebrow">ADMINISTRATOR ACCOUNT</span><h1>{name}</h1><p>Manage campus opportunities and keep the student community informed.</p></div></section><section className="card profile-summary"><span className="eyebrow">ACCOUNT DETAILS</span><div className="profile-detail"><span>Full name</span><b>{name}</b></div><div className="profile-detail"><span>Email address</span><b>{email}</b></div><div className="profile-detail"><span>Access level</span><b><span className="status-badge">Administrator</span></b></div><Link className="button button-outline" to="/admin/dashboard">Back to admin dashboard</Link></section></main>
}

function Protected({children,role}){
 const token=localStorage.getItem("token"),userRole=localStorage.getItem("role");
 if(!token)return <Navigate to={role==="ADMIN"?"/admin/login":"/login"} replace/>;
 if(userRole!==role)return <Navigate to={userRole==="ADMIN"?"/admin/dashboard":userRole==="STUDENT"?"/dashboard":role==="ADMIN"?"/admin/login":"/login"} replace/>;
 return children;
}

function AdminRoute(){const location=useLocation();return <Protected role="ADMIN"><Admin key={location.pathname}/></Protected>}
function StudentRoute({children}){return <Protected role="STUDENT">{children}</Protected>}

export default function App(){return <><Nav/><Routes>
 <Route path="/" element={<Home/>}/><Route path="/login" element={<SignIn/>}/><Route path="/admin/login" element={<SignIn admin/>}/><Route path="/register" element={<Register/>}/>
 <Route path="/dashboard" element={<StudentRoute><MatchedOpportunities/></StudentRoute>}/><Route path="/profile" element={<StudentRoute><Profile/></StudentRoute>}/><Route path="/opportunities" element={<StudentRoute><MatchedOpportunities/></StudentRoute>}/><Route path="/opportunities/:id" element={<StudentRoute><Details/></StudentRoute>}/>
 <Route path="/admin/profile" element={<Protected role="ADMIN"><AdminProfile/></Protected>}/><Route path="/admin/*" element={<AdminRoute/>}/><Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></>}
