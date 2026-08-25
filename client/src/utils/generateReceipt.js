import jsPDF from "jspdf";


export default function generateReceipt(student){


const doc = new jsPDF();



doc.setFontSize(22);

doc.text(
"SAMS Skating Academy",
20,
25
);



doc.setFontSize(14);

doc.text(
"Admission Receipt",
20,
40
);



doc.line(
20,
45,
190,
45
);





doc.setFontSize(12);



doc.text(
`Student Name : ${student.name}`,
20,
65
);



doc.text(
`Email : ${student.email}`,
20,
75
);



doc.text(
`Phone : ${student.phone}`,
20,
85
);



doc.text(
`Branch : ${student.branch}`,
20,
95
);



doc.text(
`Program : ${student.program}`,
20,
105
);



doc.text(
`Admission Date : ${student.date}`,
20,
115
);



doc.text(
"Admission Status : APPROVED",
20,
125
);





doc.line(
20,
140,
190,
140
);



doc.text(
"Thank you for joining SAMS Skating Academy.",
20,
160
);



doc.text(
"Authorized Signature",
130,
200
);




doc.save(
`${student.name}_Admission_Receipt.pdf`
);


}