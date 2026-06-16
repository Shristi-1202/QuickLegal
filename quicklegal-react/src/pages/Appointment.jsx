import React, { useState } from "react";
import "./Appointment.css";
import { useLocation } from "react-router-dom";
import {
FaBalanceScale,
FaUser,
FaCalendarAlt,
FaRupeeSign
} from "react-icons/fa";

const lawyers = [

{
name:"Adv. Arjun Mehta",
category:"Criminal Law",
experience:18,
fee:6000,
slots:["09:00 AM","11:00 AM","02:00 PM"]
},

{
name:"Adv. Riya Kapoor",
category:"Criminal Law",
experience:12,
fee:5000,
slots:["10:00 AM","12:00 PM","03:00 PM"]
},

{
name:"Adv. Vikram Singh",
category:"Criminal Law",
experience:15,
fee:5500,
slots:["09:30 AM","01:00 PM","04:00 PM"]
},

{
name:"Adv. Neha Agarwal",
category:"Corporate Law",
experience:11,
fee:7500,
slots:["10:00 AM","01:00 PM","04:30 PM"]
},

{
name:"Adv. Rohit Malhotra",
category:"Corporate Law",
experience:16,
fee:8200,
slots:["09:00 AM","12:00 PM","03:00 PM"]
},

{
name:"Adv. Kunal Shah",
category:"Corporate Law",
experience:13,
fee:7800,
slots:["10:30 AM","02:00 PM","05:00 PM"]
},

{
name:"Adv. Priya Sharma",
category:"Family Law",
experience:9,
fee:3500,
slots:["09:30 AM","01:30 PM","04:30 PM"]
},

{
name:"Adv. Anjali Desai",
category:"Family Law",
experience:10,
fee:3800,
slots:["10:00 AM","12:30 PM","03:30 PM"]
},

{
name:"Adv. Rahul Verma",
category:"Family Law",
experience:14,
fee:4200,
slots:["09:00 AM","11:30 AM","02:30 PM"]
}

];

export default function Appointment(){

const location = useLocation();
const passedLawyer = location.state;

/* FIX: match lawyer with slots list */

const foundLawyer = lawyers.find(
law => law.name === passedLawyer?.name
);

const [selectedLawyer,setSelectedLawyer] =
useState(foundLawyer || null);

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [selectedDate,setSelectedDate] = useState("");
const [selectedSlot,setSelectedSlot] = useState("");

const [paymentMethod,setPaymentMethod] = useState("");
const [upiId,setUpiId] = useState("");
const [success,setSuccess] = useState(false);

const bookedSlots =
JSON.parse(localStorage.getItem("bookedSlots")) || [];

const handleLawyerChange = (e)=>{

const lawyer = lawyers.find(
law => law.name === e.target.value
);

setSelectedLawyer(lawyer);

};

const handleBooking = async ()=>{

if(!selectedLawyer || !selectedSlot){
alert("Please select lawyer and time slot");
return;
}

const bookingData = {
name,
email,
phone,
lawyer:selectedLawyer.name,
date:selectedDate,
time:selectedSlot
};

// 🔥 SAVE APPOINTMENT (NO BACKEND)
const user = JSON.parse(localStorage.getItem("user"));

const booking = {
  id: Date.now(),
  userName: user?.name || name,
  lawyer: selectedLawyer.name,
  date: selectedDate,
  time: selectedSlot,
  status: "Pending"
};

// 🔥 SAME KEY AS ADMIN
const old = JSON.parse(localStorage.getItem("appointments")) || [];
old.push(booking);

localStorage.setItem("appointments", JSON.stringify(old));

// 🔥 SLOT BLOCK
const updatedSlots = [...bookedSlots, {
  lawyer: selectedLawyer.name,
  slot: selectedSlot
}];

localStorage.setItem("bookedSlots", JSON.stringify(updatedSlots));

setSuccess(true);

};

return(

<div className="appointment-page">

<div className="appointment-hero">

<div className="hero-overlay"></div>

<div className="hero-content">

<h4><FaBalanceScale/> QuickLegal</h4>

<h1>Book Your Legal Consultation</h1>

<p>Connect with verified lawyers. Get expert advice.</p>

</div>

</div>

<div className="appointment-container">

{/* LAWYER DETAILS */}

<div className="appointment-card">

<div className="card-header">

<FaBalanceScale className="card-icon"/>

<div>
<h3>Lawyer Details</h3>
<p>Select your lawyer</p>
</div>

</div>

<label>Lawyer Name</label>

<select
onChange={handleLawyerChange}
value={selectedLawyer?.name || ""}
>

<option>Select Lawyer</option>

{lawyers.map((lawyer,index)=>(
<option key={index} value={lawyer.name}>
{lawyer.name}
</option>
))}

</select>

<div className="row">

<div>
<label>Category</label>
<input value={selectedLawyer?.category || ""} readOnly/>
</div>

<div>
<label>Experience</label>
<input
value={
selectedLawyer
? selectedLawyer.experience + " Years"
: ""
}
readOnly
/>
</div>

</div>

<label>Consultation Fee</label>

<input
value={
selectedLawyer
? "₹ " + selectedLawyer.fee
: ""
}
readOnly
/>

</div>


{/* USER INFO */}

<div className="appointment-card">

<div className="card-header">

<FaUser className="card-icon"/>

<div>
<h3>Your Information</h3>
</div>

</div>

<label>Full Name</label>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Your full name"
/>

<div className="row">

<div>

<label>Email</label>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="you@example.com"
/>

</div>

<div>

<label>Phone</label>

<input
value={phone}
onChange={(e)=>setPhone(e.target.value)}
placeholder="9876543210"
/>

</div>

</div>

</div>


{/* SCHEDULE */}

<div className="appointment-card">

<div className="card-header">

<FaCalendarAlt className="card-icon"/>

<div>
<h3>Schedule</h3>
</div>

</div>

<div className="row">

<div>

<label>Date</label>

<input
type="date"
value={selectedDate}
onChange={(e)=>setSelectedDate(e.target.value)}
/>

</div>

<div>

<label>Time</label>

<select
onChange={(e)=>setSelectedSlot(e.target.value)}
>

<option>Select Time Slot</option>

{selectedLawyer?.slots?.map((slot,index)=>{

const isBooked = bookedSlots.some(
b => b.lawyer === selectedLawyer.name && b.slot === slot
);

return(

<option
key={index}
value={slot}
disabled={isBooked}
>

{slot} {isBooked ? "(Booked)" : ""}

</option>

);

})}

</select>

</div>

</div>

</div>


{/* PAYMENT */}

<div className="appointment-card">

<div className="card-header">

<FaRupeeSign className="card-icon"/>

<div>
<h3>Payment Method</h3>
</div>

</div>

<div className="payment-options">

<label>

<input
type="radio"
value="cash"
name="payment"
onChange={(e)=>setPaymentMethod(e.target.value)}
/>

Cash

</label>



</div>

{paymentMethod==="upi" && (

<div>

<label>Enter UPI ID</label>

<input
placeholder="example@upi"
value={upiId}
onChange={(e)=>setUpiId(e.target.value)}
/>

</div>

)}

</div>

<button
className="confirm-btn"
onClick={handleBooking}
>

Confirm Appointment

</button>

</div>


{/* SUCCESS POPUP */}

{success && (

<div className="success-popup">

<div className="popup-card">

<h2>Appointment Confirmed 🎉</h2>

<p>
Your consultation with {selectedLawyer?.name}
has been booked successfully.
</p>

<button onClick={()=>setSuccess(false)}>
Close
</button>

</div>

</div>

)}

</div>

);

}