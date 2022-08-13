import React, {useEffect, useState, useRef} from 'react'
import ChatInput from "./ChatInput"

function Chat({user, recipient, cable}){
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (user.id) {
          fetch(`/api/users/${user.id}/message_history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sender_id: user.id,
              recipient_id: recipient.id, 
            })
          })
          .then((r) => {
            if (r.ok) {
              r.json().then((data) => {
                setMessages(data)
              })
            }
          })
        }    
      }, [user.id, recipient.id, setMessages])
    
      useEffect(() => {    
        if (user.id) {
          cable.subscriptions.create
          (
            {
              channel: 'ChatsChannel',
              user_id: user.id,
              recipient_id: recipient.id
            },
            {
              received: (message) => {
                setMessages([...messages, message])
              }
            }
          )
        }
      }, [user.id, cable.subscriptions, recipient.id, setMessages, messages])

      return(
        <h1>Test</h1>   
      )

}

export default Chat