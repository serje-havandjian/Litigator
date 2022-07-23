import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from './components/Home';
import SignUp from "./components/SignUp";
import Calendar from "./components/CalendarComponent";
import Cases from "./components/Cases";


function App() {
  const [ user, setUser ] = useState(null);
  const [caseNames, setCaseName ] = useState([])

    useEffect(() => {
      fetch("/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);


    useEffect(()=>{
      fetch("/cases")
      .then(result => result.json())
      .then(result => setCaseName(result))
  },[])

  useEffect(()=>{
    fetch("/cases")
    .then(result => result.json())
    .then(result => setCaseName(result))
},[])

 


    return (
        <> 
            <NavBar user={user} setUser={setUser} />
            <main>
                {user ? (
                    <Switch>
                        <Route exact path="/">
                            <Home setUser={setUser} user={user}/>
                        </Route>
                        <Route exact path ="/calendar">
                            <Calendar user={user}/>
                        </Route>
                        <Route exact path ="/cases">
                          <Cases user={user} />
                        </Route>
                    </Switch>
                ) : (
                <Switch>
                    <Route exact path="/signup">
                        <SignUp setUser={setUser} />
                    </Route>
                    <Route exact path="/login">
                        <Login setUser={setUser} />
                    </Route>
                    <Route exact path="/">
                        <Home setUser={setUser} />
                    </Route>
                </Switch>
                )}
            </main>
        </>
  );
}

export default App;
