import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FormField, InputType } from '../models/form';

function FormModal(props: any) {

    const [payload, setPayload] = useState({} as any);
    const handleClose = () => {
        setPayload({});
        props.handleClose()}
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.handleSubmit(payload)
    }

    
    const formFields: FormField[] = props.formFields;

    const setValues = (key: string, value: string) => {
        setPayload({...payload, [key]: value});
    }

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form validated onSubmit={ handleSubmit }>
            <Modal.Body>
                {
                    formFields.map(
                        (input, index) => {
                            if (input.type == InputType.TEXT) {
                                return (
                                    <Form.Group  key={ index } className="mb-3" controlId="formBasicEmail">
                                      <Form.Label>{ input.label }</Form.Label>
                                      <Form.Control 
                                            required = { true } 
                                            type="text" 
                                            defaultValue={ payload[input.key] || "" }
                                            onChange={(e) => setValues(input.key, e.target.value)}
                                            />                
                                    </Form.Group>
                                    )                                
                            }
                        }
                    )
                }

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type='submit'>
                Submit
              </Button>
            </Modal.Footer>
        </Form>
     </Modal>
    </>
  );
}

export default FormModal;