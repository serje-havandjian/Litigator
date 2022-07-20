import React from "react";
import { NavLink, useHistory } from "react-router-dom";

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
                  <button>Home</button>
                </NavLink>
                <NavLink to ="/cases">
                  <button >Cases</button>
                </NavLink>
                  <NavLink to ="/calendar">
                      <button>Calendar </button>
                  </NavLink>
                  <button onClick={handleLogoutClick}>Logout {user.username}!</button>
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