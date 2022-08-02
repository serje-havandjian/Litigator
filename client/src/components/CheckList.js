import React, { useState, useEffect } from "react"
import {Checkbox} from "semantic-ui-react"
import moment from "moment"

 

function CheckList({lawsuits, myMoment, setMyMoment}){
  
    const [checkBox, setCheckBox ] = useState(true)

    function handleClick(e){
        checkBox ? setCheckBox(false) : setCheckBox(true)
    }

    const displayAnswerChecklist = lawsuits.map((lawsuit)=>{
        return lawsuit.deadlines.map((deadline)=>{
            return deadline.milestones_for_answers.map((m)=>{
                if(m !==[]){
                    return <>
                    <h1>{lawsuit.name}</h1>
                    <Checkbox label={m.m1}></Checkbox>
                    <Checkbox label={m.m2}></Checkbox>
                    <Checkbox label={m.m3}></Checkbox>
                    <Checkbox label={m.m4}></Checkbox>
                    </>
                }
            })
        })
    })

    const displayDemurrerChecklist = lawsuits.map((lawsuit)=>{
        return lawsuit.deadlines.map((deadline)=>{
            const deadlineDate = moment(deadline.deadline)
            console.log(deadlineDate)
            if (checkBox===true && myMoment < deadlineDate.subtract(15, "days")) {
                return deadline.milestones_for_demurrers.map((m)=>{
                    const deadlineDate = moment(deadline.deadline)
                    if(m !==[]){
                        return <>
                        <h1>{lawsuit.name}</h1>
                        <Checkbox label={`${m.m1} By ${deadlineDate.subtract(28, "days").format("dddd, MMM Do YYYY")}`}> </Checkbox>
                        <Checkbox label={`${m.m2} By ${deadlineDate.add(3, "days").format("dddd, MMM Do YYYY")}`}></Checkbox>
                        <Checkbox label={`${m.m3} By ${deadlineDate.add(11, "days").format("dddd, MMM Do YYYY")}`}></Checkbox>
                        <Checkbox onClick={handleClick} label={`${m.m4} By ${deadlineDate.add(7, "days").format("dddd, MMM Do YYYY")} Otherwise Very Bad Things Will Happen And We Will Have To Change Strategy`}></Checkbox>
                        <Checkbox label={`${m.m5} By ${deadlineDate.add(2, "days").format("dddd, MMM Do YYYY")}`}></Checkbox>
                        <Checkbox label={`${m.m6} By ${deadlineDate.format("dddd, MMM Do YYYY")} `}></Checkbox>
                        <Checkbox label={`${m.m7} By ${deadlineDate.add(3, "days").format("dddd, MMM Do YYYY")}`}></Checkbox>
                        <Checkbox label={`${m.m8} On ${deadlineDate.add(1, "days").format("dddd, MMM Do YYYY")} `}></Checkbox>
                        </>
                    }
                })
            } else{
                return lawsuit.deadlines.map((deadline)=>{
                    return deadline.milestones_if_demurrer_delays.map((m)=>{
                        if(m !==[]){
                            return <>
                            <h1>{lawsuit.name}</h1>
                            <Checkbox label={m.m1}></Checkbox>
                            <Checkbox label={m.m2}></Checkbox>
                            <Checkbox label={m.m3}></Checkbox>
                            <Checkbox label={m.m4}></Checkbox>
                            </>
                        }
                    })
                })
            }
        })
    })



    
   return( 
        <div className="checklist">
            <div> {displayAnswerChecklist} </div>
            <div>{displayDemurrerChecklist}</div>
        </div>
    )

}

export default CheckList



