import React,{useContext} from 'react'
import {Alert,Button,Form,Row,Col,Stack} from "react-bootstrap"
import { AuthContext } from '../context/AuthContext'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";



function Login() {
  const { register, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password:''
    }
  });
const {loginUser,isLoading,loginError}=useContext(AuthContext)
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
           <h2>Login</h2>
          {loginError &&  <Alert variant='danger'><p>{loginError}</p></Alert>}
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
          <Link to="/forgotPassword" className="text-body">Forgot password?</Link>
          </Form.Group>
           <Button variant="primary" type="submit">
            {isLoading ? "Signing in..." : "Login"}
           </Button>
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Login