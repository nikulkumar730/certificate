
// import { useRef, useState } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const CertificateGenerateComponent = ({ name, email, issueDate }) => {
//   const certificateRef = useRef();
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   // Function to generate the PDF (without download)
//   const generatePDF = async () => {
//     if (certificateRef.current) {
//       try {
//         // Capture the component as canvas
//         const canvas = await html2canvas(certificateRef.current);
//         const imgData = canvas.toDataURL('image/png');
        
//         // Create PDF with the captured image
//         const pdf = new jsPDF({
//           orientation: 'landscape', // or 'portrait'
//           unit: 'mm',
//           format: [297, 210] // A4 size in mm (width, height)
//         });

//         // Calculate image dimensions
//         const imgWidth = 210; // A4 width in mm
//         const imgHeight = canvas.height * imgWidth / canvas.width;

//         // Calculate position to center the image
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const x = (pdfWidth - imgWidth) / 2;
//         const y = (pdfHeight - imgHeight) / 2;

//         // Add image to PDF
//         pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

//         // Convert PDF to Blob and set the state
//         const pdfOutput = pdf.output('blob'); 
//         setPdfBlob(pdfOutput);
//       } catch (error) {
//         console.error('Error generating PDF:', error);
//       }
//     }
//   };

//   // Function to submit data and include the PDF if available
//   const handleSubmit = async () => {
//     setIsSubmitting(true); // Set submitting state to true
//     setErrorMessage(null); // Clear previous error message

//     try {
//       // Generate PDF before submitting if not already generated
//       if (!pdfBlob) {
//         await generatePDF();
//       }

//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('email', email);
//       formData.append('issueDate', issueDate);

//       if (pdfBlob) {
//         formData.append('certificate', pdfBlob, `${name}_certificate.pdf`);
//       }

//       const response = await fetch('http://localhost:8300/api/certificates/upload', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           // Fetch automatically sets the Content-Type to multipart/form-data when FormData is used
//         }
//       });

//       if (response.ok) {
//         console.log('Data and PDF submitted successfully.'); 

//         const result = await response.json();
//         console.log(result) 

//       } else {
//         console.error('Failed to submit data. Response:', response);
//         setErrorMessage('Failed to submit data. Please check the server.');
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       setErrorMessage('An error occurred while submitting the data. Please try again.');
//     } finally {
//       setIsSubmitting(false); // Reset submitting state
//     }
//   };

//   return (
//     <div>
//       <div className='certificateMain' ref={certificateRef}>
//         <h1>Certificate of Achievement</h1>
//         <p>This is to certify that</p>
//         <h2>{name}</h2>
//         <p>has successfully completed the course.</p>
//         <p>Email: {email}</p>
//         <p>Issued on: {new Date(issueDate).toLocaleDateString()}</p>
//       </div>
//       <button onClick={handleSubmit} disabled={isSubmitting}>
//         Submit
//       </button>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default CertificateGenerateComponent;






// import { useRef, useState } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const CertificateGenerateComponent = ({ name, email, issueDate }) => {
//   const certificateRef = useRef();
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [buttonText, setButtonText] = useState('Submit');
//   const [finalMsg, setFinalMsg] = useState(null);
//   const [messageColor, setMessageColor] = useState(null);

//   // Function to generate the PDF
//   const generatePDF = async () => {
//     if (certificateRef.current) {
//       try {
//         const canvas = await html2canvas(certificateRef.current);
//         const imgData = canvas.toDataURL('image/png');
        
//         const pdf = new jsPDF({
//           orientation: 'landscape',
//           unit: 'mm',
//           format: [297, 210]
//         });

//         const imgWidth = 210;
//         const imgHeight = canvas.height * imgWidth / canvas.width;

//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const x = (pdfWidth - imgWidth) / 2;
//         const y = (pdfHeight - imgHeight) / 2;

//         pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

//         const pdfOutput = pdf.output('blob');
//         setPdfBlob(pdfOutput);
//         return pdfOutput; // Return the blob for download
//       } catch (error) {
//         console.error('Error generating PDF:', error);
//         setErrorMessage('Error generating PDF. Please try again.');
//         throw error; // Propagate error to handleSubmit
//       }
//     }
//   };

//   // Function to submit data and include the PDF if available
//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setErrorMessage(null);
//     setButtonText('Pending');
//     setFinalMsg(null);

//     try {
//       if (!pdfBlob) {
//         await generatePDF();
//       }

//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('email', email);
//       formData.append('issueDate', issueDate);

//       if (pdfBlob) {
//         formData.append('certificate', pdfBlob, `${name}_certificate.pdf`);
//       }

//       const response = await fetch('http://localhost:8300/api/certificates/upload', {
//         method: 'POST',
//         body: formData
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setFinalMsg(result.message || 'Data and PDF submitted successfully.');
//         setMessageColor('green');
//         setButtonText('Done');

//         setTimeout(() => {
//           setButtonText('Submit');
//         }, 1000);
//       } else {
//         setFinalMsg(result.message || 'Failed to submit data. Please check the server.');
//         setMessageColor('red');
//         setButtonText('Submit');
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       setErrorMessage('An error occurred while submitting the data. Please try again.');
//       setFinalMsg('An unexpected error occurred.');
//       setMessageColor('red');
//       setButtonText('Submit');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Function to download the PDF
//   const handleDownload = async () => {
//     try {
//       const pdfBlob = await generatePDF();
//       const url = URL.createObjectURL(pdfBlob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `${name}_certificate.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error('Error downloading PDF:', error);
//       setErrorMessage('Error downloading PDF. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <div className='certificateMain' ref={certificateRef}>
//         <h1>Certificate of Achievement</h1>
//         <p>This is to certify that</p>
//         <h2>{name}</h2>
//         <p>has successfully completed the course.</p>
//         <p>Email: {email}</p>
//         <p>Issued on: {new Date(issueDate).toLocaleDateString()}</p>
//       </div>
//       <button onClick={handleSubmit} disabled={isSubmitting}>
//         {buttonText}
//       </button>
//       <button onClick={handleDownload} disabled={isSubmitting || !pdfBlob}>
//         Download PDF
//       </button>
//       {finalMsg && (
//         <p style={{ color: messageColor }}>{finalMsg}</p>
//       )}
//       {errorMessage && (
//         <p style={{ color: 'red' }}>{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default CertificateGenerateComponent;






import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CertificateGenerateComponent = ({ name, email, issueDate }) => {
  const certificateRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [finalMsg, setFinalMsg] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  // Function to generate the PDF for download
  const generatePDFForDownload = async () => {
    if (certificateRef.current) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure styles are applied
        const canvas = await html2canvas(certificateRef.current, {
          useCORS: true,
          scale: 2,
          backgroundColor: null
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [297, 210]
        });

        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${name}_certificate.pdf`); // Trigger download
      } catch (error) {
        console.error('Error generating PDF:', error);
        setErrorMessage('Error generating PDF. Please try again.');
        setMessageColor('red');
      }
    }
  };

  // Function to submit data to the backend
  const submitDataToBackend = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setFinalMsg(null);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate</title>
        <style>
          /* Add inline styles here */
          .certificateMain {
            margin: 50px;
            border: 30px solid #fff;
            background-color: orangered;
            color: white;
            padding: 100px 20px;
            text-align: center;
            box-shadow: 0px 0px 10px 0px black;
          }
          h1, h2, p {
            margin: 0;
            padding: 10px;
          }
        </style>
      </head>
      <body>
        <div class="certificateMain">
                <img src='https://cdn-cphko.nitrocdn.com/QdKZidmgdqtbkqTCoroLNsFUagHcSswM/assets/images/optimized/rev-c2203d4/www.felix-its.com/wp-content/uploads/2023/06/logo.png' />
          <h1>Certificate of Achievement</h1>
          <p>This is to certify that</p>
          <h2>${name}</h2>
          <p>has successfully completed the course.</p>
          <p>Issued on: ${new Date(issueDate).toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;

    try {
      const response = await fetch('http://localhost:8300/api/certificates/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent, name, email, issueDate }),
      });

      if (response.ok) {
        const result = await response.json();
        setFinalMsg('Data submitted successfully.');
        setMessageColor('green');
      } else {
        setFinalMsg('Failed to submit data. Please try again.');
        setMessageColor('red');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrorMessage('An error occurred while submitting the data.');
      setMessageColor('red');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Certificate Section */}
      <div className="certificateMain" ref={certificateRef}>
        <div className='pm-certificate-container'>
        <img src='https://cdn-cphko.nitrocdn.com/QdKZidmgdqtbkqTCoroLNsFUagHcSswM/assets/images/optimized/rev-c2203d4/www.felix-its.com/wp-content/uploads/2023/06/logo.png' />
          <h1>Certificate of Achievement</h1>
          <p>This is to certify that</p>
          <h2>{name}</h2>
          <p>has successfully completed the course.</p>
          <p>Issued on: {new Date(issueDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Buttons outside the certificate */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={submitDataToBackend} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit to Backend'}
        </button>

        <button onClick={generatePDFForDownload} disabled={isSubmitting} style={{ marginLeft: '10px' }}>
          Download PDF
        </button>
      </div>

      {/* Messages */}
      {finalMsg && <p style={{ color: messageColor }}>{finalMsg}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default CertificateGenerateComponent;
