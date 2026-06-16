import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Lawyers.css";

export default function Lawyers() {

const navigate = useNavigate();

const [category,setCategory] = useState("All");
const [search,setSearch] = useState("");
const [problem,setProblem] = useState("");
const [recommended,setRecommended] = useState([]);


// 🔥 LOGIN CHECK FUNCTION
const checkLogin = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    alert("Please login first ❌");
    return false;
  }

  return true;
};


const lawyers = [

{
name:"Adv. Arjun Mehta",
category:"Criminal",
city:"Delhi",
experience:18,
fee:6000,
rating:4.9,
available:true,
photo:"https://randomuser.me/api/portraits/men/32.jpg"
},

{
name:"Adv. Riya Kapoor",
category:"Criminal",
city:"Mumbai",
experience:12,
fee:5000,
rating:4.7,
available:true,
photo:"https://randomuser.me/api/portraits/women/44.jpg"
},

{
name:"Adv. Vikram Singh",
category:"Criminal",
city:"Delhi",
experience:15,
fee:5500,
rating:4.8,
available:false,
photo:"https://randomuser.me/api/portraits/men/65.jpg"
},

{
name:"Adv. Neha Agarwal",
category:"Corporate",
city:"Bangalore",
experience:11,
fee:7500,
rating:4.8,
available:true,
photo:"https://randomuser.me/api/portraits/women/68.jpg"
},

{
name:"Adv. Rohit Malhotra",
category:"Corporate",
city:"Mumbai",
experience:16,
fee:8200,
rating:4.9,
available:false,
photo:"https://randomuser.me/api/portraits/men/75.jpg"
},

{
name:"Adv. Kunal Shah",
category:"Corporate",
city:"Ahmedabad",
experience:13,
fee:7800,
rating:4.7,
available:true,
photo:"https://randomuser.me/api/portraits/men/51.jpg"
},

{
name:"Adv. Priya Sharma",
category:"Family",
city:"Delhi",
experience:9,
fee:3500,
rating:4.7,
available:true,
photo:"https://randomuser.me/api/portraits/women/55.jpg"
},

{
name:"Adv. Anjali Desai",
category:"Family",
city:"Pune",
experience:10,
fee:3800,
rating:4.6,
available:true,
photo:"https://randomuser.me/api/portraits/women/12.jpg"
},

{
name:"Adv. Rahul Verma",
category:"Family",
city:"Lucknow",
experience:14,
fee:4200,
rating:4.8,
available:false,
photo:"https://randomuser.me/api/portraits/men/21.jpg"
}

];

const categories = ["All","Criminal","Corporate","Family"];


// FILTER
const filteredLawyers = lawyers.filter((lawyer)=>{
const matchCategory =
category==="All" || lawyer.category===category;

const matchSearch =
lawyer.name.toLowerCase().includes(search.toLowerCase());

return matchCategory && matchSearch;
});


// AI RECOMMENDATION
const recommendLawyer = () => {

const text = problem.toLowerCase();
let cat="";

if(text.includes("crime") || text.includes("fraud") || text.includes("cyber")){
cat="Criminal";
}
else if(text.includes("company") || text.includes("startup") || text.includes("contract")){
cat="Corporate";
}
else if(text.includes("divorce") || text.includes("family") || text.includes("custody")){
cat="Family";
}

const result = lawyers.filter(
law => law.category===cat
);

setRecommended(result);

};


return(

<div className="lawyers-container">

<div className="lawyers-header">
<h1>Find the Right Lawyer for You</h1>
<p>Connect with experienced legal professionals across India</p>
</div>


{/* AI SEARCH */}
<div className="ai-search">
<h2>Find Lawyer by Your Problem</h2>

<div className="ai-search-box">
<input
placeholder="Describe your problem (divorce, fraud, startup...)"
value={problem}
onChange={(e)=>setProblem(e.target.value)}
/>

<button onClick={recommendLawyer}>
Find Lawyer
</button>
</div>
</div>


{/* NAME SEARCH */}
<div className="search-bar">
<input
type="text"
placeholder="Search lawyer by name..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</div>


{/* CATEGORY */}
<div className="category-buttons">
{categories.map((cat)=>(

<button
key={cat}
onClick={()=>setCategory(cat)}
className={category===cat ? "active":""}
>
{cat==="All" ? "All Lawyers" : cat+" Law"}
</button>

))}
</div>


{/* RECOMMENDED */}
{recommended.length>0 && (
<div>
<h2 className="recommended-title">Recommended Lawyers</h2>

<div className="lawyers-grid">
{recommended.map((lawyer,index)=>(

<div key={index} className="lawyer-card">

<img src={lawyer.photo} className="lawyer-img"/>

<div className="lawyer-name">{lawyer.name}</div>
<div className="lawyer-category">{lawyer.category} Law</div>

<button
className="book-btn"
onClick={(e)=>{
e.stopPropagation();

if(!checkLogin()) return;

navigate("/appointment",{state:lawyer});
}}
>
Book Appointment
</button>

</div>

))}
</div>
</div>
)}


{/* ALL LAWYERS */}
<div className="lawyers-grid">

{filteredLawyers.map((lawyer,index)=>(

<div key={index} className="lawyer-card">

<span className={`status ${lawyer.available?"available":"busy"}`}>
{lawyer.available ? "Available" : "Busy"}
</span>

<img src={lawyer.photo} className="lawyer-img"/>

<div className="lawyer-name">{lawyer.name}</div>
<div className="lawyer-category">{lawyer.category} Law</div>

<div className="lawyer-info">📍 {lawyer.city}</div>
<div className="lawyer-info">⭐ {lawyer.rating}</div>
<div className="lawyer-info">💰 ₹{lawyer.fee}</div>

<button
className="book-btn"
onClick={(e)=>{
e.stopPropagation();

if(!checkLogin()) return;

navigate("/appointment",{state:lawyer});
}}
>
Book Appointment
</button>

</div>

))}

</div>

</div>

);

}