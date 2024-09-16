import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container  from 'react-bootstrap/Container';
const FormComponent = ({ setCertificateData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issueDate, setIssueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCertificateData({ name, email, issueDate });
  };

  return (
   <>
   <Container>
   <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text"          value={name} 
        onChange={(e) => setName(e.target.value)} 
        required  placeholder="Enter your candidate name" />

      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email"  value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required    placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Issue date:</Form.Label>
        <Form.Control type="date"    value={issueDate} 
        onChange={(e) => setIssueDate(e.target.value)} 
        required  />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
   </Container>

   </>
  );
};

export default FormComponent;
