import React from "react";
import { useHistory } from "react-router-dom";
import {stack as Menu} from "react-burger-menu"

function Sidebar({user, setUser}){

    const history = useHistory()

    function handleLogoutClick() {
      fetch("http://localhost:3000/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
          console.log('test')
          history.push("http://localhost:3000/login")
        }
      });
    }

    function handleTest(){
        console.log('test')
    }

    return (
        <Menu>
            <a className="menu-item" href="http://localhost:3000/cases" onClick={handleTest}>
                Cases
            </a>
            <a className="menu-item" href="http://localhost:3000/calendar">
                Calendar
            </a>
            <a className="menu-item" href="http://localhost:3000/login" onClick={handleLogoutClick}>
                Logout
            </a>
            <a className="menu-item" href="http://localhost:3000/Login" >
                Login
            </a>
            <a className="menu-item" href="http://localhost:3000/Chatroom">
                Chatroom
            </a>
        </Menu>
    )
}

export default Sidebar