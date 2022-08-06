import React from "react";
import { useHistory } from "react-router-dom";
import {elastic as Menu} from "react-burger-menu"

function Sidebar({user, setUser}){

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
        <Menu>
            <a className="menu-item" href="/cases">
                Cases
            </a>
            <a className="menu-item" href="/calendar">
                Calendar
            </a>
            <a className="menu-item" href="/logout" onClick={handleLogoutClick}>
                Logout
            </a>
            <a className="menu-item" href="/Login" >
                Login
            </a>
            
        </Menu>
    )
}

export default Sidebar