"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "../page.module.css";
import { signUp } from "../../firebase/auth";

export default function MakeAccount() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleForm = async (event: any) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    if (error) {
      return console.log(error);
    }
    // else successful
    console.log(result);
  };

  return (
    <div className={style.pageWrapper}>
      <div className={style.loginBox}>
        <img
          width="300px"
          src={
            "https://i.gifer.com/origin/9d/9dda8ac634238f7be1cc842b5a1aaf98.gif"
          }
        />
        <br /><br/>
        <h2>Signup Page</h2>
        <Form onSubmit={handleForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
}
