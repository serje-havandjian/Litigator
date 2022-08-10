import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from './components/Home';
import SignUp from "./components/SignUp";
import Calendar from "./components/CalendarComponent";
import Cases from "./components/Cases";
import Sidebar from "./components/Sidebar";
import CaseWindow from "./components/CaseWindow";


function App() {
  const [ user, setUser ] = useState(null);
  const [lawsuits, setLawsuits ] = useState([])
  const [singleCase, setSingleCase ] = useState([])

  const [desperateCaseId, setDesperateCaseId] = useState()

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
      .then(result => setLawsuits(result))
  },[])

  let singleCaseId

  function getCaseId(value, e){
    
    setDesperateCaseId(value)


      // fetch(`/cases/${desperateCaseId}`)
      // .then(result => result.json())
      // .then(result => setSingleCase(result))

      // console.log(singleCase)
  }

  singleCaseId = desperateCaseId
  console.log(singleCaseId)



  useEffect(()=>{
    fetch(`/cases/${desperateCaseId}`)
    .then(result => result.json())
    .then(result => setSingleCase(result))
},[])

  console.log((`/cases/${desperateCaseId}`))
  console.log(desperateCaseId, "desperate Id")
  console.log(singleCase)


 


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
                                  <Route exact path ="/cases">
                                    <Cases desperateCaseId={desperateCaseId} getCaseId={getCaseId} user={user} />
                                  </Route>
                                  <Route exact path="/CaseWindow">
                                    <CaseWindow singleCaseId={singleCaseId} singleCase={singleCase} lawsuits={lawsuits} desperateCaseId={desperateCaseId} user={user}/>
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
