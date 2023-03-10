import React,{useContext} from 'react'
import {Alert,Button,Form,Row,Col,Stack} from "react-bootstrap"
import { AuthContext } from '../context/AuthContext'

function Register() {
 const {registerInfo,updateRegisterInfo,isLoading,registerUser,registerError}= useContext(AuthContext)
  return (
    <>
    <Form onSubmit={registerUser}>
      <Row style={{
        height:"100vh",
        justifyContent:"center",
        paddingTop:"10%"
      }}>
        <Col xs={6}>
        <Stack gap={3}>
           <h2>Register</h2>
           {
            registerError && <Alert variant='danger'><p>{registerError}</p></Alert>
           }
           <Form.Control 
            type="text"
            placeholder="UserName"
            onChange={(e)=>updateRegisterInfo({...registerInfo,userName: e.target.value})}
            />
           <Form.Control
            type="email" placeholder="Email"
            onChange={(e)=>updateRegisterInfo({...registerInfo,email: e.target.value})}
            />
          
           <Form.Control
            type="passowrd"
            placeholder="Password"
            onChange={(e)=>updateRegisterInfo({...registerInfo,password: e.target.value})}

            />
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