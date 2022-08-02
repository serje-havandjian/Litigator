import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react';

function NavBar({user, setUser}){
    

    const history = useHistory()

    function handleLogoutClick() {
      fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
          history.push("/login")
        }
      });
    }

    return (
        <header>
          <div>
            {user ? (
              <> 
                <NavLink to="/">
                  <Button color="blue">Home</Button>
                </NavLink>
                <NavLink to ="/cases">
                  <Button color="youtube" >Cases</Button>
                </NavLink>
                  <NavLink to ="/calendar">
                    <Button color="blue" >Calendar </Button>
                  </NavLink>
                  <Button color="youtube" onClick={handleLogoutClick}>Logout!</Button>
              </>
            ) : (
              null
              // <>
              //   <NavLink to="/signup"> <Button color="twitter">Signup</Button></NavLink>
              //   <NavLink to="/login"><Button color="twitter">Login</Button></NavLink>
              // </>
            )}
          </div>
        </header>
      );
}

export default NavBar;