import React, { useState, useEffect, useMemo } from "react"
import {Calendar, momentLocalizer, Views } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment"
import {Button, Image, List} from "semantic-ui-react"
import events from "./Events"
import CheckList from "./CheckList"
import ListOfCases from "./ListOfCases.js"

//Ability to assign milestones to individual attorney
// Attorney assigned this case gets an email (a pop up for now) that outlines what needs to happen, maybe even as a check list. 





function CalendarComponent(){

    const components = useMemo(()=>{
        views:Object.keys(Views).map((k)=> Views[k])
    })
    

    const localizer = momentLocalizer(moment)
    const [lawsuits, setLawSuits ] = useState([])
    const [myMoment, setMyMoment] = useState(moment())

// What's this do?




    useEffect(()=>{
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuits(result))
        
    },[])

    function handleMoment(){
        setMyMoment(moment().set("month", 12))
    }

    function resetMoment(){
        setMyMoment(moment())
    }
 

    
//Rendering Milestones

    let eventsArray = [] 
    console.log(eventsArray)
    lawsuits.map((lawsuit)=>{
        eventsArray.push({
            title: `${lawsuit.name}`,
            start: new Date(`${lawsuit.date_case_filed}`).toISOString(),
            end: new Date(`${lawsuit.date_case_filed}`).toISOString(),
            up_down_ind: "X"
        })

            lawsuit.deadlines.map((deadline)=>{
                const deadlineDate = moment(deadline.deadline)
                eventsArray.push({
                    title: `${lawsuit.name} - ${deadline.trigger.title}`,
                    start: new Date(deadlineDate).toISOString(),
                    end: new Date(deadlineDate.subtract(30, "days")).toISOString(),
                    up_down_ind: "X"
                })
            })

            lawsuit.deadlines.map((deadline)=>{
                eventsArray.push({
                    title: `${deadline.title}-${lawsuit.name}`,
                    start: new Date(`${deadline.trigger.date_served}`).toISOString(),
                    end: new Date(`${deadline.trigger.date_served}`).toISOString(),
                    up_down_ind: "X"
                })

                //I Don't think this does anything
            lawsuit.deadlines.map((deadline)=>{
                eventsArray.push({
                    title: `${lawsuit.name}${deadline.title}`,
                    start: new Date(`${deadline.trigger.date_served}`).toISOString(),
                    end: new Date(`${deadline.trigger.date_served}`).toISOString(),
                up_down_ind: "Y"
                })
            })


            //start of rendering of Answer Milestones
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)
                
                eventsArray.push({
                    title: `${milestone.m1}-${lawsuit.name}`,
                    start: new Date(deadlineDate).toISOString(),
                    end: new Date(deadlineDate.subtract(25, "days")).toISOString(),
                    up_down_ind: "Y"
                })                
            })
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)

                eventsArray.push({
                    title: `${milestone.m2}-${lawsuit.name}`,
                    start: new Date(deadlineDate).toISOString(),
                    end: new Date(deadlineDate.subtract(20, "days")).toISOString(),
                    up_down_ind: "X"
                })

            })
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)

                eventsArray.push({
                    title: `${milestone.m3}-${lawsuit.name}`,
                    start: new Date(deadlineDate).toISOString(),
                    end: new Date(deadlineDate.subtract(10, "days")).toISOString(),
                    up_down_ind: "Y"
                })

            })
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)

                eventsArray.push({
                    title: `${milestone.m4}-${lawsuit.name}`,
                    start: new Date(deadlineDate).toISOString(),
                    end: new Date(deadlineDate.subtract(1, "days")).toISOString(),
                    up_down_ind: "Y"
                })

            })
            //end of rendering of Answer Milestones



            
            // CONDITIONALLY RENDERING DEMURRER V. LATE DEMURRER MILSTONES
            const deadlineDate = moment(deadline.deadline)

            //START OF CONDITIONAL RENDER

            if(myMoment < deadlineDate.subtract(15, "days")){
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `FUCK FUCK FUCK${milestone.m1}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(28, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                })

                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m2}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(25, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m3}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(14, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m4}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(7, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m5}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(5, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m6}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(5,"days")).toISOString(),
                    up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m7}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(2, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m8}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(1, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                })
            }
            
            //ELSE OF CONDITIONAL RENDER
            else {
                deadline.milestones_if_demurrer_delays.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m1}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(15, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                })
    
                deadline.milestones_if_demurrer_delays.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m2}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(15, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                })
    
                deadline.milestones_if_demurrer_delays.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m3}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(15, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                })
    
                deadline.milestones_if_demurrer_delays.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m4}-${lawsuit.name}`,
                        start: new Date(deadlineDate).toISOString(),
                        end: new Date(deadlineDate.subtract(15, "days")).toISOString(),
                        up_down_ind: "Y"
                    })                
                })
            }

            //CONDITIONALLY RENDER OTHER DEADLINES/MILESTONES

        })//end of Map on all lawsuits.deadlines

    })//end of map on all Lawsuits state


  



    return(
        <>
            <h1 >Calendar</h1>
            <div className="Calendar">
                <Calendar
                // defaultDate={new Date()}
                localizer={localizer}
                events={eventsArray} 
                startAccessor="start"
                endAccessor="end"
                Views={Views}
                components={components}
                />
            </div>

            <div className="tasklistWrap">
                <Button primary id="momentButton" onClick={handleMoment}>Moment Button</Button>
                <Button secondary onClick={resetMoment}>Reset Moment Button</Button>
                <br></br>
                <br></br>
               <ListOfCases lawsuits={lawsuits} setLawSuits={setLawSuits} />
                <CheckList myMoment={myMoment} setMyMoment={setMyMoment} lawsuits={lawsuits} />
            </div>
            
     
        </>
    )
    }


export default CalendarComponent;