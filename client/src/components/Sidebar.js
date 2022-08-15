import React from "react";
import { useHistory } from "react-router-dom";
import {stack as Menu} from "react-burger-menu"

function Sidebar({user, setUser}){

    const history = useHistory()

    function handleLogoutClick() {
      fetch("https://litigator.herokuapp.com/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
          console.log('test')
          history.push("/login")
        }
      });
    }

    function handleTest(){
        console.log('test')
    }

    return (
        <Menu>
            <a className="menu-item" href="https://litigator.herokuapp.com/cases" onClick={handleTest}>
                Cases
            </a>
            <a className="menu-item" href="https://litigator.herokuapp.com/calendar">
                Calendar
            </a>
            <a className="menu-item" href="https://litigator.herokuapp.com/login" onClick={handleLogoutClick}>
                Logout
            </a>
            <a className="menu-item" href="https://litigator.herokuapp.com/Login" >
                Login
            </a>
            <a className="menu-item" href="https://litigator.herokuapp.com/Chatroom">
                Chatroom
            </a>
        </Menu>
    )
}

export default Sidebar