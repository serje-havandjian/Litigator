import React, { useState } from "react";

function Login({setUser}){
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
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
      <>
        <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Enter Email Address</label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
        <div>
            New to us? <a href="/signup">Sign up here.</a>
        </div>

    </>
  );
      
}

export default Login;