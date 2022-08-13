

function Chatroom(){
    return(
        <div id="message-container">
            <form id="send-container">
            <input type="text" id="message-input" />
            <button type="submit" id="send-button">Send</button>
            </form>
        </div>
    )
}

export default Chatroom