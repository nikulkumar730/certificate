import React, { useState } from 'react';
import FormComponent from './components/FormComponent';
import CertificateGenerateComponent from './components/CertificateGenerateComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [certificateData, setCertificateData] = useState(null);

  return (
    <div style={{  }}>
      <FormComponent setCertificateData={setCertificateData} />
      
      {certificateData && (
        <CertificateGenerateComponent 
          name={certificateData.name} 
          email={certificateData.email} 
          issueDate={certificateData.issueDate} 
        />
      )}
    </div>
  );
}

export default App;
