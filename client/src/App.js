import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from './components/Home';
import SignUp from "./components/SignUp";
import Calendar from "./components/CalendarComponent";
import Cases from "./components/Case";
import Sidebar from "./components/Sidebar";
import CaseWindow from "./components/CaseWindow";
import Chatroom from "./components/Chatroom";
import Case from "./components/Case";


function App() {
  const [ user, setUser ] = useState(null);


  
    useEffect(() => {
      fetch("https://litigator.herokuapp.com/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);




    return (
        <> 
          <div>
            <div className="App" id="outer-container" >
                <Sidebar user={user} setUser={setUser} pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
                  <div id="page-wrap">
                    {/* I TOOK NAVBAR OUT TO MAKE SIDEBAR WORK */}
                    {/* <NavBar user={user} setUser={setUser} /> */}
                      <main>
                          {user ? (
                              <Switch>
                                  <Route exact path="/">
                                      <Home setUser={setUser} user={user}/>
                                  </Route>
                                  <Route exact path ="/calendar">
                                      <Calendar user={user}/>
                                  </Route>
                                  <Route exact path ="/case">
                                    <Case user={user} />
                                  </Route>
                                  <Route exact path ="/chatroom">
                                    <Chatroom />
                                  </Route>
                                  <Route exact path="/login">
                                    <Login />
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
                    </div>
              </div>
          </div>
        </>
  );
}

export default App;
