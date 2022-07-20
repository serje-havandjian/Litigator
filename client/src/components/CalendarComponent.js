import React, {Fragment, useMemo, useState, useEffect } from "react"
import {Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import events from "./Events"


function CalendarComponent(){
    const localizer = momentLocalizer(moment)
    const [ lawsuits, setLawSuits ] = useState([])

    useEffect(()=>{
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuits(result))
    },[])

    console.log(lawsuits, "all lawsuits")

    let eventsArray = []

    lawsuits.map((lawsuit)=>{
        eventsArray.push({
            title: `${lawsuit.name}`,
            start: `${lawsuit.date_case_filed}`,
            end: `${lawsuit.date_case_filed}`,
            up_down_ind: "Y"
        })

        lawsuit.deadlines.map((deadline)=>{
            eventsArray.push({
                title: `${deadline.title}-${lawsuit.name}`,
                start: `${deadline.deadline}`,
                end: `${deadline.deadline}`,
                up_down_ind: "Y"
            })

            deadline.milestones_for_answers.map((milestone)=>{
                
                let deadlineDate = moment(deadline.deadline)
                let milestone1Date = deadlineDate.subtract(25, "days")

                eventsArray.push({
                    title: `${milestone.m1}-${lawsuit.name}`,
                    start: milestone1Date,
                    end: milestone1Date,
                    up_down_ind: "Y"
                })
            })
        
        })

        

    })


    console.log(eventsArray, "eventsArray")


    // const test = lawsuit.map((suit)=>{
    //     return{
    //         title: `"${suit.name}"`,
    //         start: `"${suit.date_case_filed}"`,
    //         end: `"${suit.date_case_filed}"`,
    //         up_down_ind: "Y"
    //     }
    // })

    // const test2 = lawsuit.map((suit)=>{
    //     return{
    //         title: `"${suit.deadlines.map((deadline)=>{
    //             return deadline.title
    //         })}"`,
    //         start: `"${suit.date_case_filed}"`,
    //         end: `"${suit.date_case_filed}"`,
    //         up_down_ind: "Y"
    //     }
    // })


    // const test3 = lawsuits.map((lawsuit)=>{
    //     return {
    //         title: lawsuit.deadlines.map((deadline)=>{
    //             return deadline.title
    //         }),
    //         start: lawsuit.date_case_filed,
    //         end: lawsuit.date_case_filed,
    //         up_down_ind: "Y"
    //     }
    // })
      
    // console.log(test3, "test 3")


            // title: `"${suit.deadlines.map((deadline)=>{
            //     return deadline.title
            // })}"`,
            // start: `"${suit.date_case_filed}"`,
            // end: `"${suit.date_case_filed}"`,
            // up_down_ind: "Y"
 




    return(
        <Fragment>
            <h1>Calendar</h1>
            <div className="Calendar">
                <Calendar
                localizer={localizer}
                events={eventsArray}
                startAccessor="start"
                endAccessor="end"
                />
            </div>
        </Fragment>
    )
}

export default CalendarComponent;