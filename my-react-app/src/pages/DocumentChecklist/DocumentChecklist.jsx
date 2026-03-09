import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./DocumentChecklist.css";

const DocumentChecklist = () => {

const documents = [
"Passport Copy",
"Academic Transcripts",
"English Test (IELTS / TOEFL)",
"Statement of Purpose",
"Letters of Recommendation",
"Updated CV / Resume",
"Passport Size Photographs",
"Proof of Funds / Bank Statement"
];

// state to track checked documents
const [checkedDocs, setCheckedDocs] = useState(Array(documents.length).fill(false));

const handleCheck = (index) => {
  const updated = [...checkedDocs];
  updated[index] = !updated[index];
  setCheckedDocs(updated);
};

const handleDone = () => {
  const allChecked = checkedDocs.every(item => item === true);

  if(allChecked){
    alert(" All documents collected!");
  } else {
    alert(" Please complete all documents.");
  }
};

return (
<>
<Navbar />

<section className="doc-header">
<h1>Document Checklist</h1>
<p>Prepare these documents before applying to universities</p>
</section>

<section className="doc-container">

{documents.map((doc,index)=>(
<div key={index} className="doc-card">

<input type="checkbox"
checked={checkedDocs[index]}
onChange={()=>handleCheck(index)} />

<span>{doc}</span>

</div>
))}

</section>
<div className="done-btn-container">
<button className="done-btn" onClick={handleDone}>
Done
</button>
</div>

<Footer />
</>
);
};

export default DocumentChecklist;