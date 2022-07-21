import React, {Fragment, useMemo, useState, useEffect } from "react"
import {Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import events from "./Events"


function CalendarComponent(){
    const localizer = momentLocalizer(moment)
    const [ lawsuits, setLawSuits ] = useState([])
    const [myMoment, setMyMoment] = useState(moment())

    useEffect(()=>{
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuits(result))
    },[])

    console.log(myMoment)
    console.log(moment())

    function handleMoment(){
        setMyMoment(moment().set("month", 9))

        // myMoment == moment() ? setMyMoment(moment().set("month", 9)) : setMyMoment(moment())

        // if(myMoment === moment()){
        //     setMyMoment(moment().set("month", 9))
        // }else{
        //     setMyMoment(moment())
        // }

    }

  

    


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
            //start of rendering of Answer Milestones
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)
                
                eventsArray.push({
                    title: `${milestone.m1}-${lawsuit.name}`,
                    start: deadlineDate,
                    end: deadlineDate.subtract(25, "days"),
                    up_down_ind: "Y"
                })                
            })
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)

                eventsArray.push({
                    title: `${milestone.m2}-${lawsuit.name}`,
                    start: deadlineDate,
                    end: deadlineDate.subtract(20, "days"),
                    up_down_ind: "Y"
                })

            })
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)

                eventsArray.push({
                    title: `${milestone.m3}-${lawsuit.name}`,
                    start: deadlineDate,
                    end: deadlineDate.subtract(10, "days"),
                    up_down_ind: "Y"
                })

            })
            deadline.milestones_for_answers.map((milestone)=>{
                const deadlineDate = moment(deadline.deadline)

                eventsArray.push({
                    title: `${milestone.m4}-${lawsuit.name}`,
                    start: deadlineDate,
                    end: deadlineDate.subtract(1, "days"),
                    up_down_ind: "Y"
                })

            })
            //end of rendering of Answer Milestones



            
            // CONDITIONALLY RENDERING DEMURRER V. LATE DEMURRER MILSTONES
            const deadlineDate = moment(deadline.deadline)
//START OF CONDITIONAL RENDER
            console.log(myMoment)
            if(myMoment < deadlineDate.subtract(15, "days")){
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m1}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(28, "days"),
                        up_down_ind: "Y"
                    })                
                })

                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m2}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(25, "days"),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m3}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(14, "days"),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m4}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(7, "days"),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m5}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(5, "days"),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m6}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(5,"days"),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m7}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(2, "days"),
                        up_down_ind: "Y"
                    })                
                });
    
                deadline.milestones_for_demurrers.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m8}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(1, "days"),
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
                        start: deadlineDate,
                        end: deadlineDate.subtract(15, "days"),
                        up_down_ind: "Y"
                    })                
                })
    
                deadline.milestones_if_demurrer_delays.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m2}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(15, "days"),
                        up_down_ind: "Y"
                    })                
                })
    
                deadline.milestones_if_demurrer_delays.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m3}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(15, "days"),
                        up_down_ind: "Y"
                    })                
                })
    
                deadline.milestones_if_demurrer_delays.map((milestone)=>{
                    const deadlineDate = moment(deadline.deadline)
                    
                    eventsArray.push({
                        title: `${milestone.m4}-${lawsuit.name}`,
                        start: deadlineDate,
                        end: deadlineDate.subtract(15, "days"),
                        up_down_ind: "Y"
                    })                
                })
            }

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m1}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(28, "days"),
            //         up_down_ind: "Y"
            //     })                
            // })

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m2}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(25, "days"),
            //         up_down_ind: "Y"
            //     })                
            // });

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m3}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(14, "days"),
            //         up_down_ind: "Y"
            //     })                
            // });

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m4}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(7, "days"),
            //         up_down_ind: "Y"
            //     })                
            // });

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m5}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(5, "days"),
            //         up_down_ind: "Y"
            //     })                
            // });

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m6}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(5,"days"),
            //         up_down_ind: "Y"
            //     })                
            // });

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m7}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(2, "days"),
            //         up_down_ind: "Y"
            //     })                
            // });

            // deadline.milestones_for_demurrers.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m8}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(1, "days"),
            //         up_down_ind: "Y"
            //     })                
            // })
            // end of map on demurrer milestones

            //start of map on if demurrer delayed milestones

            

            // deadline.milestones_if_demurrer_delays.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m1}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(15, "days"),
            //         up_down_ind: "Y"
            //     })                
            // })

            // deadline.milestones_if_demurrer_delays.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m2}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(15, "days"),
            //         up_down_ind: "Y"
            //     })                
            // })

            // deadline.milestones_if_demurrer_delays.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m3}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(15, "days"),
            //         up_down_ind: "Y"
            //     })                
            // })

            // deadline.milestones_if_demurrer_delays.map((milestone)=>{
            //     const deadlineDate = moment(deadline.deadline)
                
            //     eventsArray.push({
            //         title: `${milestone.m4}-${lawsuit.name}`,
            //         start: deadlineDate,
            //         end: deadlineDate.subtract(15, "days"),
            //         up_down_ind: "Y"
            //     })                
            // })

        })//end of Map on all lawsuits.deadlines

    })//end of map on all Lawsuits state


    //on click of "Miller" case button
    // // //if const MillerCases = Lawsuits.map((lawsuit)=>{
    // //     lawsuit.title.includes("Miller")}) 
    //     then setLawsuits(MillerCases)

 

    return(
        <>
            <h1>Calendar</h1>
            <div className="Calendar">
                <Calendar
                localizer={localizer}
                events={eventsArray}
                startAccessor="start"
                endAccessor="end"
                />
            </div>

            <div><button id="momentButton" onClick={handleMoment}>Moment Button</button></div>

        </>
    )
}

export default CalendarComponent;