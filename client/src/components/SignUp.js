import React, { useState } from "react";
import {Message, Form, Button, Segment, Grid} from "semantic-ui-react"

function SignUp({setUser}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("https://litigator.herokuapp.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
          }
        });
      }


      return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Segment stacked>
        <label htmlFor="username">Enter Email Address</label>
        <Form.Input
            fluid icon='user' 
            iconPosition="left"
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
        />
        <Button type="submit">Sign Up</Button>
        </Segment>
        </Form>
        <Message>
          Already have an account? <a href="/login">Login here.</a>
        </Message>
      </Grid.Column>
    </Grid >
  );

}

export default SignUp;