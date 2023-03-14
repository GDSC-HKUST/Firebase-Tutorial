"use client";
import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./page.module.css"
import {signIn} from "../firebase/auth"
import { auth } from '@/firebase/config';

export default function Home() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  //user
  const [user, setUser] = React.useState<string | null>('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUser(user.email)
      }
    })
  }, [])

  const handleForm = async (event: any) => {
    event.preventDefault()
    const { result, error } = await signIn(email, password);
    if (error) {
        return console.log(error)
    }
    // else successful
    console.log(result)
  }

  const logout = () => {
     auth.signOut().then(() => {
      alert("Success")
      setUser(null)
    })
  }

  return (
    <div className={style.pageWrapper}>
      <div className={style.loginBox}>
        <h2>
          {
            user ? user : "Login Page"
          }
        </h2>
        <br/>
        {
          user ? 
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
          :
          <Form onSubmit={handleForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
          </Form>
        }
        
      </div>
    </div>
  );
}
