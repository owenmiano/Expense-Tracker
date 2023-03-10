import React,{useContext} from 'react'
import {Alert,Button,Form,Row,Col,Stack} from "react-bootstrap"
import { AuthContext } from '../context/AuthContext'

function Login() {
  const {loginUser,updateLoginInfo,isLoading,loginError,loginInfo}=useContext(AuthContext)
  return (
    <>
    <Form onSubmit={loginUser}>
      <Row style={{
        height:"100vh",
        justifyContent:"center",
        paddingTop:"10%"
      }}>
        <Col xs={6}>
        <Stack gap={3}>
           <h2>Login</h2>
          {loginError &&  <Alert variant='danger'><p>{loginError}</p></Alert>}
            <Form.Control
            type="email"
             placeholder="Email"
             onChange={(e)=>updateLoginInfo({...loginInfo,email: e.target.value})}

             />
           <Form.Control
            type="password"
             placeholder="Password"
             onChange={(e)=>updateLoginInfo({...loginInfo,password: e.target.value})}

             />
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