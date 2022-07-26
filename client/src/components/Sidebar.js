import React from "react";
import { useHistory } from "react-router-dom";
import {stack as Menu} from "react-burger-menu"

function Sidebar({user, setUser}){

    const history = useHistory()

    function handleLogoutClick() {
      fetch("https://litigator.herokuapp.com/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
          history.push("/login")
        }
      });
    }


    return (
        <Menu>
            <a className="menu-item" href="/case">
                Cases
            </a>
            <a className="menu-item" href="/calendar">
                Calendar
            </a>
            <a className="menu-item" onClick={handleLogoutClick} href="/login">
                Logout
            </a>
            <a className="menu-item" href="/login" >
                Login
            </a>
            <a className="menu-item" href="/chatroom">
                Chatroom
            </a>
        </Menu>
    )
}

export default Sidebar