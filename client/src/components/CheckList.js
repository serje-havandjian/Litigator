import React, { useState, useEffect } from "react"
import {Checkbox} from "semantic-ui-react"
import moment from "moment"

 

function CheckList({lawsuits, myMoment}){
  

    const displayAnswerChecklist = lawsuits.map((lawsuit)=>{
        return lawsuit.deadlines.map((deadline)=>{
            const deadlineDate = moment(deadline.deadline)


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

            if (myMoment < deadlineDate.subtract(15, "days")){
                return deadline.milestones_for_demurrers.map((m)=>{
                    if(m !==[]){
                        return <>
                        <h1>{lawsuit.name}</h1>
                        <Checkbox label={m.m1}></Checkbox>
                        <Checkbox label={m.m2}></Checkbox>
                        <Checkbox label={m.m3}></Checkbox>
                        <Checkbox label={m.m4}></Checkbox>
                        <Checkbox label={m.m5}></Checkbox>
                        <Checkbox label={m.m6}></Checkbox>
                        <Checkbox label={m.m7}></Checkbox>
                        <Checkbox label={m.m8}></Checkbox>
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
        <>
       <div> {displayAnswerChecklist} </div>
       <div>{displayDemurrerChecklist}</div>
        </>
    )

}

export default CheckList
