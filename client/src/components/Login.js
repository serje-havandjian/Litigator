import React, { useState } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

function Login({setUser}){
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("https://litigator.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
          }
        });
    }

    console.log(username)

    return (   
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
        <Grid.Column style={{maxWidth: 450}}>
        <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="username">Enter Email Address</label>
              <Segment stacked>
              <Form.Input
                fluid 
                icon='user' 
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
                icon='lock'
                iconPosition='left'
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="/signup">Sign up here.</a>
            </Message>
        </Grid.Column>
    </Grid>
  );
      
}

export default Login;