
import React, {useState, useEffect} from "react"
import { render } from "react-dom"
import { Button, Card, Form, Message, List, Header } from 'semantic-ui-react'
import moment from "moment"

function Case(){
    const [lawsuit, setLawSuit ] = useState([])
    const [nameState, setNameState] = useState("")
    const [counselState, setCounselState] = useState("")
    const [dateCaseFiledState, setDateCaseFiledState] = useState()
    const [dateComplaintServedState, setDateComplaintFiledState] = useState()
    const [displayEditForm, setDisplayEditForm ] = useState(false)
    const [individualCase, setIndividualCase] = useState([])
    const [complaintState, setComplaintState] = useState()
    const [newTrigger, setNewTrigger] = useState()
    const [newDeadline, setNewDeadline] = useState()
     




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



    function createNewCase(e){
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
        .then(() => fetch(`/cases/`))
        .then(result => result.json()
        .then(result => setLawSuit(result)))

        e.target.reset();

    }

    

    function handleCaseEdit(e){
        e.preventDefault()
        console.log(e)

        const newTriggerObject ={
            title: "Complaint Served",
            date_served: moment(),
            method_of_service: "Personal Service / Hand"
        }

        console.log(newTriggerObject)
        
        fetch(`/triggers/`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newTriggerObject)
        })
        .then(result => result.json())
        .then(result => setNewTrigger(result))

        console.log(newTrigger)


        const newDeadlineObject = {
            title: "File & Serve Demurrer",
            deadline: moment().add(30, "days"),
            case_id: individualCase.id,
            trigger_id: newTrigger.id
        }

        fetch(`/deadlines/`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newDeadlineObject)
        })
        .then(result => result.json())
        .then(result => setNewDeadline(result))


        const milestonesForDemurrer = {
            m1: "Analyze Complaint", 
            m2: "Begin Drafting Demurrer", 
            m3: "Provide Draft Demurrer to Partner", 
            m4: "Provide Draft Demurrer to Client", 
            m5: "Meet and Confer With Opposing Counsel", 
            m6: "Draft Client Declaration, Counsel Declaration, Potential Request for Judicial Notice, and Proposed Order", 
            m7: "Finalize Demurrer & Related Documents for File and Service", 
            m8: "File and Serve Demurrer", 
            deadline_id: newDeadline.id
        }

        fetch(`/milestones_for_demurrers`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(milestonesForDemurrer)
        })
        .then(result => result.json())
        .then(result => console.log(result))

        const milestonesIfDemurrerDelay = {
            m1: "NOTE: You are getting this warning because Milestones For Demurrer have not been met. Change in strategy!", 
            m2: "Ask Opposing Counsel for a 30-day extension to Responsive Pleading Deadline.  Confirm extension in writing via e-mail and store for your records.", 
            m3: "If Opposing Counsel does not grant extension, file an Answer on the Responsive Pleading Deadline, making avialable the option to file a Motion for Judgment on the Pleadings. Inform client that same arguments and theories for demurrer are avaialble in the form of a Motion for Judgment on the Pleadings, which can be drafted, filed, and served immediately.", 
            m4: "Pray for forgiveness",
            deadline_id: newDeadline.id
        }

        fetch(`/milestones_if_demurrer_delays`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(milestonesIfDemurrerDelay)
        })
        .then(result => result.json())
        .then(result => console.log(result))


    }








    function handleComplaintState(e){

    }



    const renderLawSuit = lawsuit.map((lawsuit)=>{

        return <div> 
            <Card>
                <List.Item>
                    <Button onClick={(e)=>{
                        displayEditForm ? setDisplayEditForm(false) : setDisplayEditForm(true);
                        fetch(`/cases/${e.target.id}`)
                        .then(result => result.json())
                        .then(result => setIndividualCase(result))
                    }} id={lawsuit.id}> Case Name: {lawsuit.name} </Button>
                </List.Item> 
                <p>Opposing Counsel: {lawsuit.counsel}</p>
                <p>Date Case Filed:{lawsuit.date_case_filed}</p>
                <p>Date Complaint Served: {lawsuit.date_complaint_served}</p>
                    {displayEditForm ? <Form succes onSubmit={handleCaseEdit}>
                        {/* <Form.Input label="Name" placeholder="Enter Case Name Here" onChange={handleCaseName} value={lawsuit.name}/>
                        <Form.Input label="Counsel" placeholder="Enter Opposing Counsel Here" onChange={handleCounselState} value={lawsuit.counsel}/>
                        <Form.Input label="Date Case Filed" placeholder="Enter Date Case Filed Here" onChange={handleDateCaseFiledState} value={lawsuit.date_case_filed} />
                        <Form.Input label="Date Complaint Served" placeholder="Enter Date Complaint Served Here" onChange={handleDateComplaintServedDate} value={lawsuit.date_complaint_served} /> */}
                        <select class="ui dropdown" onChange={handleComplaintState}>
                            <option value="">Triggers</option>
                            <option value={lawsuit.id}>Complaint Served</option>
                            <option value={lawsuit.id}>Form Interrogatory Served</option>
                        </select>
                        <Form.Input label="Date Complaint Served" placeholder="Enter Date Of Service YYYY-MM-DD"/>
                        <Button >Submit</Button>
                    </Form> : null}
            </Card> 
            </div>
            
    })

    return(
        <>
            <h1>Cases</h1>
            <div>{renderLawSuit}</div>
            <div id="createNewCase">
                <Form succes onSubmit={createNewCase}>
                    <Form.Input label="Name" placeholder="Enter Case Name Here" onChange={handleNameState} />
                    <Form.Input label="Counsel" placeholder="Enter Opposing Counsel Here" onChange={handleCounselState}/>
                    <Form.Input label="Date Case Filed" placeholder="Enter Date Case Filed Here" onChange={handleDateCaseFiledState} />
                    <Form.Input label="Date Complaint Served" placeholder="Enter Date Complaint Served Here" onChange={handleDateComplaintServedDate} onChange={handleDateComplaintServedDate} />
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