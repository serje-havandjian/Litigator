import React from "react";
import { Popup } from "semantic-ui-react"

function Pop(){

    return(
        <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
    )
}


export default Pop