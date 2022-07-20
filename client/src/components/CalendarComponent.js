import React, {Fragment, useMemo, useState, useEffect } from "react"
import {Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import events from "./Events"


function CalendarComponent(){

    const [ lawsuit, setLawSuit ] = useState([])

    useEffect(()=>{
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuit(result))
    },[])

    console.log(lawsuit)

    const test = lawsuit.map((suit)=>{
        return{
            title: `"${suit.name}"`,
            start: `"${suit.date_case_filed}"`,
            end: `"${suit.date_case_filed}"`,
            up_down_ind: "Y"
        }
    })

    

    console.log(events)
    console.log(test)

    const localizer = momentLocalizer(moment)

    return(
        <Fragment>
            <h1>Calendar</h1>
            <div className="Calendar">
                <Calendar
                localizer={localizer}
                events={test}
                startAccessor="start"
                endAccessor="end"
                />
                    
            </div>
        </Fragment>
    )
}

export default CalendarComponent;