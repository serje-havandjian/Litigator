import React, {useState, useEffect} from "react"
import { render } from "react-dom"

function Case(){
    const [ lawsuit, setLawSuit ] = useState([])

    useEffect(()=>{
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuit(result))
    },[])

    console.log(lawsuit)

    const renderLawSuit = lawsuit.map((lawsuit)=>{
        return <div>
            <h1>Case Name: {lawsuit.name}</h1> 
            <h2>Opposing Counsel: {lawsuit.counsel}</h2>
            <h3>Date Case Filed:{lawsuit.date_case_filed}</h3>
            <h3>Date Complaint Served: {lawsuit.date_complaint_served}</h3>
            <h4>Test</h4>
            </div>
    })

    return(
        <>
            <h1>Cases</h1>
            <div>{renderLawSuit}</div>
        </>
    )
}


export default Case;