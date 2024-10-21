import Form from 'react-bootstrap/Form';

function Textarea({label, name, controlId, type, rows, onChange}) {
  return (
    <Form.Group className="mb-3 " controlId={controlId}>
        <Form.Label className='m-0'>{label}</Form.Label>
        <Form.Control as={type} rows={rows} name={name}
          className='border border-5 rounded-5 border-white bg-light shadow-sm'
          onChange={onChange}
          />
    </Form.Group>
  );
}

export default Textarea;