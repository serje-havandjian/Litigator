
import React, {useState, useEffect} from "react"
import { render } from "react-dom"
import { Button, Card, Form, Message } from 'semantic-ui-react'

function Case(){
    const [ lawsuit, setLawSuit ] = useState([])
    const [nameState, setNameState] = useState("")
    const [counselState, setCounselState] = useState("")
    const [dateCaseFiledState, setDateCaseFiledState] = useState()
    const [dateComplaintServedState, setDateComplaintFiledState] = useState()

    useEffect(()=>{
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuit(result))
    },[])

    function handleNameState(e){
        setNameState(e.target.value)
        console.log(nameState)
    }

    function handleCounselState(e){
        e.preventDefault()
        setCounselState(e.target.value)
        console.log(counselState)
    }

    function handleDateCaseFiledState(e){
        e.preventDefault()
        setDateCaseFiledState(e.target.value)
        console.log(dateCaseFiledState)
    }

    function handleDateComplaintServedDate(e){
        e.preventDefault()
        setDateComplaintFiledState(e.target.value)
        console.log(dateComplaintServedState)
    }



    function handleSubmit(e){
        e.preventDefault()

        let newCaseObject = {
            name: nameState,
            counsel: counselState,
            date_case_filed: dateCaseFiledState,
            date_complaint_served: dateComplaintServedState
        }
        
        fetch(`/cases/`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newCaseObject)
        })
        .then(result => result.json())
        .then(result => setLawSuit(result))
    }

    function handleEdit(){
        
    }

    const renderLawSuit = lawsuit.map((lawsuit)=>{
        return <Card>
            <h1>Case Name: {lawsuit.name}</h1> 
            <h2>Opposing Counsel: {lawsuit.counsel}</h2>
            <h3>Date Case Filed:{lawsuit.date_case_filed}</h3>
            <h3>Date Complaint Served: {lawsuit.date_complaint_served}</h3>
            <Form succes onSubmit={handleEdit}>
                <Form.Input label="Name" placeholder="Enter Case Name Here" onChange={handleNameState}/>
                <Form.Input label="Counsel" placeholder="Enter Opposing Counsel Here" onChange={handleCounselState}/>
                <Form.Input label="Date Case Filed" placeholder="Enter Date Case Filed Here" onChange={handleDateCaseFiledState} />
                <Form.Input label="Date Complaint Served" placeholder="Enter Date Complaint Served Here" onChange={handleDateComplaintServedDate} />
                <Message
                success
                header="Case Completed"
                content="New Case Entered, Happy Hunting!"
                />
                <Button>Submit</Button>
            </Form>
            </Card>
    })

    return(
        <>
            <h1>Cases</h1>
            <div>{renderLawSuit}</div>
            <div id="createNewCase">
                <Form succes onSubmit={handleSubmit}>
                    <Form.Input label="Name" placeholder="Enter Case Name Here" onChange={handleNameState}/>
                    <Form.Input label="Counsel" placeholder="Enter Opposing Counsel Here" onChange={handleCounselState}/>
                    <Form.Input label="Date Case Filed" placeholder="Enter Date Case Filed Here" onChange={handleDateCaseFiledState} />
                    <Form.Input label="Date Complaint Served" placeholder="Enter Date Complaint Served Here" onChange={handleDateComplaintServedDate} />
                    <Message
                    success
                    header="Case Completed"
                    content="New Case Entered, Happy Hunting!"
                    />
                    <Button>Submit</Button>
                </Form>
            </div>
        </>
    )
}


export default Case;