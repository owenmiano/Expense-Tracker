import React,{useContext} from 'react'
import {Alert,Button,Form,Row,Col,Stack} from "react-bootstrap"
import { AuthContext } from '../context/AuthContext'
import { useForm } from "react-hook-form";

function Register() {
  const { register, handleSubmit} = useForm({
      defaultValues: {
        userName: '',
        email: '',
        password:''
      }
    });
 const {isLoading,registerUser,registerError}= useContext(AuthContext)
 const onSubmit = data => registerUser(data);

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
           <h2>Create Account</h2>
           {
            registerError && <Alert variant='danger'><p>{registerError}</p></Alert>
           }
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>User Name</Form.Label>
           <Form.Control 
            type="text"
            placeholder="User Name"
            {...register("userName")}
            />
           </Form.Group>
           
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="Email"
            {...register("email")}
            />
            </Form.Group>
           
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}

            />
          </Form.Group>
          
           <Button variant="primary" type="submit">
            {isLoading ? "Creating your account" : "Register"}
           </Button>
           
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Register