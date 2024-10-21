import Form from 'react-bootstrap/Form';

function Input({label, controlId, type, placeholder, onChange}) {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label className='m-0'>{label}</Form.Label>
        <Form.Control type={type} placeholder={placeholder} 
          className='border border-5 rounded-5 border-white bg-light shadow-sm'
          onChange={onChange}
        />
    </Form.Group>
  );
}

export default Input;