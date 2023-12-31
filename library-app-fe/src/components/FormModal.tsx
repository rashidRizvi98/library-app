import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FormField, InputType } from '../models/form';

function FormModal(props: any) {

    const [payload, setPayload] = useState({} as any);

    const handleClose = () => props.handleClose();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.handleSubmit(payload)
    }

    
    const formFields: FormField[] = props.formFields;

    const setValues = (obj: any) => {
        setPayload({...payload, ...obj});
    }

    const handleDropDownSelect = (key: string, value: string, name: string) => {
      setValues({
        [key]: value/* ,
        [`${key}-name`]: name */
      });
    }

    useEffect(()=> {
      let obj: any = {};
      if (props?.operation == 'UPDATE') {
        formFields.forEach((field) => {
          obj[field.key] = field.defaultValue;
        })
        obj['_id'] = props._id;
        setPayload(obj)
      }
    },[formFields])

    useEffect(()=> {
      if (!props.show) {
        setPayload({});        
      }
     },[props.show])

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ props.formHeading }</Modal.Title>
        </Modal.Header>
        <Form validated onSubmit={ handleSubmit }>
            <Modal.Body>
                {
                    formFields.map(
                        (input, index) => {
                            switch (input.type) {
                              case InputType.TEXT:
                                return (
                                  <Form.Group  key={ index } className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>{ input.label }</Form.Label>
                                    <Form.Control 
                                          required = { true } 
                                          type="text" 
                                          defaultValue={ payload[input.key] }
                                          onChange={(e) => setValues({[input.key]: e.target.value})}
                                          />                
                                  </Form.Group>
                                  )    

                              case InputType.DROPDOWN:
                                return (
                                  <Form.Group key = { index } className="mb-3">
                                  <Form.Label>{ input.label }</Form.Label>
                                    <DropdownButton
                                      title={ input.options?.find((option) => option._id == payload[input.key])?.value || 'Please select' }
                                      id="dropdown-menu-align-right"
                                      onSelect={(e) => input.options!.map((option) => option._id == e && handleDropDownSelect(input.key, option._id, option.value))}
                                    >
                                      <Dropdown.Menu >
                                        {input.options?.map((option) => {
                                          return (
                                            <Dropdown.Item key={option._id} eventKey={option._id}>
                                              {option.value}
                                            </Dropdown.Item>
                                          );
                                        })}
                                      </Dropdown.Menu>
                                    </DropdownButton>
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