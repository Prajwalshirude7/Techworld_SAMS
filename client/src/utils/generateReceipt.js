import jsPDF from "jspdf";


export default function generateReceipt(student){


const doc = new jsPDF("p","mm","a4");


let y = 15;


// ================= HEADER =================


doc.setFont("helvetica","bold");
doc.setFontSize(20);

doc.text(
"RTSA Academy",
20,
y
);


y += 8;


doc.setFontSize(12);
doc.setFont("helvetica","normal");


doc.text(
"Admission & Payment Receipt",
20,
y
);


y += 6;


doc.line(
20,
y,
190,
y
);


y += 10;





// spacing helper

const addText=(text,size=10,bold=false)=>{


doc.setFont(
"helvetica",
bold ? "bold":"normal"
);


doc.setFontSize(size);


doc.text(
text,
20,
y
);


y += 5;

};





// ================= RECEIPT =================


addText(
`Receipt No : RTSA-${Date.now()}`,
10
);


addText(
`Admission Date : ${student.submittedAt || new Date().toLocaleDateString()}`,
10
);


addText(
"Admission Status : APPROVED",
10
);





y += 3;


// ================= STUDENT INFO =================


addText(
"Student Information",
14,
true
);



[
`Student Name : ${student.name || "N/A"}`,

`Email : ${student.email || "N/A"}`,

`Mobile Number : ${student.phone || "N/A"}`,

`Date Of Birth : ${student.dob || "N/A"}`,

`Gender : ${student.gender || "N/A"}`,

`Branch : ${student.branch || "N/A"}`,

`Program : ${student.program || "N/A"}`,

`Experience : ${student.experience || "N/A"}`,

`Address : ${student.address || ""}, ${student.city || ""}, ${student.state || ""}`


].forEach(item=>addText(item));









// ================= PAYMENT =================


y += 2;


addText(
"Payment Details",
14,
true
);



[
`Program Fees : Rs. ${student.programFees || "12000"}`,

`Payment Method : ${student.paymentMethod || "Online Payment"}`,

`Payment Status : ${student.paymentStatus || "Paid"}`,

`Transaction ID : ${student.transactionId || "N/A"}`


].forEach(item=>addText(item));










// ================= CONTRACT =================


y += 2;


addText(
"RTSA Coaching Contract Includes",
14,
true
);



[
"• Professional skating coaching",

"• Competition preparation training",

"• Track/Road practice sessions",

"• Equipment and technology guidance",

"• Monthly health checkup",

"• Helmet and proper skating attire compulsory",

"• Follow coach instructions and maintain discipline"


].forEach(item=>addText(item,9));









// ================= TERMS =================


y += 2;


addText(
"Terms & Conditions",
14,
true
);



[
"Student and parent agree to follow academy rules.",

"Training safety guidelines must be followed.",

"Fees once paid are non-refundable.",

"Student must maintain discipline during sessions."

].forEach(item=>addText(item,9));










// ================= SIGNATURE =================


y += 3;


addText(
"Student Signature : __________________",
10
);


addText(
"Parent Signature  : __________________",
10
);


addText(
"Head Coach : Mr. Rushikesh Tarde",
10
);







// FOOTER


doc.setFontSize(8);


doc.text(

"Rushikesh Tarde Skates Arena | Contact: 8830806221",

20,

287

);



doc.save(
`RTSA_Admission_Receipt_${student.name}.pdf`
);


}