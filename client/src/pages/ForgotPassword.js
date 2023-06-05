import React,{useContext} from 'react'
import { useForm } from "react-hook-form";
import {Button,Form,Row,Col,Stack} from "react-bootstrap"
import { AuthContext } from '../context/AuthContext';

function ForgotPassword() {
    const { register, handleSubmit} = useForm({
        defaultValues: {
          email: '',
        }
      });
    const {loginUser,isLoading}=useContext(AuthContext)
    const onSubmit = data => loginUser(data);
  return (
    <>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row style={{
        height:"100vh",
        justifyContent:"center",
        paddingTop:"10%"
      }}>
        <Col xs={6}>
        <Stack gap={3}>
           <h2>Reset Password</h2>
           <strong>Please enter the email address that you used to register this account</strong>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="Email"
            {...register("email")}
            />
            </Form.Group>
           
          
           <Button variant="primary" type="submit">
            {isLoading ? "Veryfing Email Address" : "Verify Email"}
           </Button>
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default ForgotPassword