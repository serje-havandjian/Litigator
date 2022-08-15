import React from "react";
import { Popup, Form } from "semantic-ui-react"

function Pop({handleDateCaseFiledState, desperateCaseId}){

    return(
        <Popup trigger={
            <Form>
                <Form.Input label="Date Case Filed (YYY-MM-DD)" placeholder="Enter Date Case Filed Here" onChange={handleDateCaseFiledState}>
                </Form.Input >
            </Form>
        } position="right center">
        <div>MAKE SURE DATE FORMAT IS: YYYY/MM/DD - 2022-10-01</div>
       
      </Popup>
    )
}


export default Pop