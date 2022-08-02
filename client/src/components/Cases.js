import React, {useState, useEffect} from "react"
import { Button, Card, Form, Message, List, Label, Segment, Menu, Icon, Reveal, Grid } from 'semantic-ui-react'
import moment from "moment"
import Email from "./Email"


function Case({user}){
    const [lawsuit, setLawSuit ] = useState([])
    const [nameState, setNameState] = useState("")
    const [counselState, setCounselState] = useState("")
    const [dateCaseFiledState, setDateCaseFiledState] = useState()
    const [dateComplaintServedState, setDateComplaintServedState] = useState()
    const [displayEditForm, setDisplayEditForm ] = useState(false)
    const [individualCase, setIndividualCase] = useState([])
    const [complaintState, setComplaintState] = useState()
    const [newTrigger, setNewTrigger] = useState()
    const [newDeadline, setNewDeadline] = useState()
    const [yearServedState, setYearDocumentServed] = useState()
    const [monthServedState, setMonthServedState] = useState()
    const [dateServedState, setDateServedState] = useState()
    
    const [complaintServedOption, setComplaintServedOption] = useState(false)
    const [discoveryServedOption, setDiscoveryServedOption] = useState(false)

    const [editName, setEditName] = useState()
    const [editCounsel, setEditCounsel] = useState()
    const [editCaseFiled, setEditCaseFiled] = useState()
    const [editCaseServed, setEditCaseServed] =useState()
    const [editCaseId, setEditCaseId] = useState()

    const [openState, setOpenState] = useState(true)
    
    console.log(user)
     
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
        setCounselState(e.target.value)
        console.log(counselState)
    }

    function handleDateCaseFiledState(e){
        setDateCaseFiledState(e.target.value)
        console.log(dateCaseFiledState)
    }

    function handleDateComplaintServedDate(e){
        setDateComplaintServedState(e.target.value)
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

    function handleYearDocumentServed(e){
        setYearDocumentServed(e.target.value)
        console.log(yearServedState)
    }

    function handleMonthDocumentServed(e){
        setMonthServedState(e.target.value)
        console.log(monthServedState)
    }

    function handleDateDocumentServed(e){
        setDateServedState(e.target.value)
        console.log(dateServedState)
    }


    function handleRenderComplaintServed(e){
        e.preventDefault()

        let dateServedMoment = moment({
            year: `${yearServedState}`, month: `${monthServedState}`, date: `${dateServedState}`
        })
        console.log(dateServedState)
        console.log(dateServedMoment)

        const newTriggerObject ={
            title: "Complaint Served",
            date_served: dateServedMoment,
            method_of_service: "Personal Service / Hand"
        }
        
        fetch(`/triggers/`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newTriggerObject)
        })
        .then(result => result.json())
        .then(result => {
            const newDeadlineObject = {
                title: "File & Serve Demurrer",
                deadline: dateServedMoment,
                case_id: individualCase.id,
                trigger_id: result.id
            }

            fetch(`/deadlines/`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(newDeadlineObject)
            })
            .then(result => result.json())
            .then(result => {
                const milestonesForDemurrer = {
                    m1: "Analyze Complaint", 
                    m2: "Begin Drafting Demurrer", 
                    m3: "Provide Draft Demurrer to Partner", 
                    m4: "Provide Draft Demurrer to Client", 
                    m5: "Meet and Confer With Opposing Counsel", 
                    m6: "Draft Client Declaration, Counsel Declaration, Potential Request for Judicial Notice, and Proposed Order", 
                    m7: "Finalize Demurrer & Related Documents for File and Service", 
                    m8: "File and Serve Demurrer Tomorrow", 
                    deadline_id: result.id
                }

                fetch(`/milestones_for_demurrers`,{
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(milestonesForDemurrer)
                })
                .then(result => result.json())

                const milestonesIfDemurrerDelay = {
                    m1: "NOTE: You are getting this warning because Milestones For Demurrer have not been met. Change in strategy!", 
                    m2: "Ask Opposing Counsel for a 30-day extension to Responsive Pleading Deadline.  Confirm extension in writing via e-mail and store for your records.", 
                    m3: "If Opposing Counsel does not grant extension, file an Answer on the Responsive Pleading Deadline, making avialable the option to file a Motion for Judgment on the Pleadings. Inform client that same arguments and theories for demurrer are avaialble in the form of a Motion for Judgment on the Pleadings, which can be drafted, filed, and served immediately.", 
                    m4: "Pray for forgiveness",
                    deadline_id: result.id
                }

                fetch(`/milestones_if_demurrer_delays`,{
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(milestonesIfDemurrerDelay)
                })
                .then(result => result.json())
            })
        })

        e.target.reset()
    } 

    function handleRenderDiscoveryServed(e){
        e.preventDefault()
        console.log(e)
       
        let dateServedObject = {
            year: yearServedState,
            month: monthServedState,
            date: dateServedState
        }

        let dateServedMoment = moment({
            year: `${dateServedObject.year}`, month: `${dateServedObject.month}`, date: `${dateServedObject.date}`
        })

        const newTriggerObject ={
            title: "Discovery Served",
            date_served: dateServedMoment,
            method_of_service: "Personal Service / Hand"
        }

        fetch(`/triggers/`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newTriggerObject)
        })
        .then(result => result.json())
        .then(result => setNewTrigger(result))

        const newDeadlineObject = {
            title: "Respond To Discovery",
            deadline: dateServedMoment,
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

    }

    function handleChosenTrigger(e){
       
        if(e.target.value === "Complaint Served"){
            setComplaintServedOption(true)
            setDiscoveryServedOption(false)
        } else {
            setComplaintServedOption(false)
            setDiscoveryServedOption(true)
        }
    }

    function handleEditCaseName(e){
        setEditName(e.target.value) 
    }

    function handleEditCaseCounsel(e){
        setEditCounsel(e.target.value)
    }

    function handleEditCaseFiled(e){
        setEditCaseFiled(e.target.value)
    }

    function handleEditCaseServed(e){
        setEditCaseServed(e.target.value)
    }
 
    function handleEditCase(e){
        e.preventDefault()
        

       let editCaseObject ={
            name: editName,
            counsel: editCounsel,
            date_case_filed: editCaseFiled,
            date_complaint_served: editCaseServed
        }

        fetch(`/cases/${editCaseId}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(editCaseObject)
        })
        .then(result => result.json())
        .then(() => fetch(`/cases/`))
        .then(result => result.json()
        .then(result => setLawSuit(result)))


        fetch(`/cases/${editCaseId}`)
        .then(result => result.json())
        .then(result => console.log(result))
    }
 
    function handleDelete(){
        fetch(`/cases/${editCaseId}`,{
            method: "DELETE"
        })
        .then(() => fetch(`/cases/`))
        .then(result => result.json())
        .then(result => setLawSuit(result))
    }
    
    // const nextDeadline = lawsuit.map((lawsuit)=>{
    //     return lawsuit.deadlines.map((deadline)=>{
    //         return (`${deadline.title}: ${deadline.deadline} `)
    //     })
    // })
    
    
    
    const renderLawSuit = lawsuit.map((lawsuit)=>{
        const dateFiled = moment(lawsuit.date_case_filed)
        return (
            <div className="renderLawsuit"> 
                <Grid text container >
                    <Grid.Row >
                        <Grid.Column>
                            <Card >
                                <Button color="blue" value={lawsuit.id} onClick={(e)=>{
                                                    displayEditForm ? setDisplayEditForm(false) : setDisplayEditForm(true);
                                                    fetch(`/cases/${e.target.id}`)
                                                    .then(result => result.json())
                                                    .then(result => setIndividualCase(result))

                                                    setEditName(lawsuit.name)
                                                    setEditCounsel(lawsuit.counsel)
                                                    setEditCaseFiled(lawsuit.date_case_filed)
                                                    setEditCaseServed(lawsuit.date_complaint_served)
                                                    setEditCaseId(e.target.value)
                                                }} id={lawsuit.id}>{lawsuit.name} 
                                </Button>
                                <Reveal animated="move up">
                                    <Reveal.Content visible>
                                            
                                        <div className="caseList">
                                            <div className="casebutton">
                                                <Icon name="balance scale" color="teal"></Icon>
                                            </div>
                                            <p>Opposing Counsel: {lawsuit.counsel}</p>
                                            <p>Date Case Filed: {dateFiled.format("dddd, MMM do YYYY")}</p>
                                            <p>Date Complaint Served: {moment(lawsuit.date_complaint_served).format("dddd, MMM do YYYY")}</p>
                                        </div>
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                        
                                    <p> Upcoming Deadlines: {lawsuit.deadlines.map((deadline)=>{
                                        const deadlineDate = moment(deadline.deadline)
                                        return (
                                            <div>
                                            {deadline.title} by {deadlineDate.format("dddd, MMMM Do YYYY")}
                                            </div>
                                            )
                                    })}</p>
                                    </Reveal.Content>
                                </Reveal>
                            </Card>
                        </Grid.Column> 
                    </Grid.Row>
                </Grid>
            </div>
        )
    })

 


    return(
        <>
            <h1>Cases</h1>
            <Grid columns={3} >
                {renderLawSuit}
            </Grid>
            <div id="renderlawsuits">
                <Card.Group> 
                    {displayEditForm ? 
                        <>
                        <Card fluid color="red" header="Select Trigger">
                            <h1>Select A Trigger To Display Deadlines And Milestones</h1> 
                            <select onChange={handleChosenTrigger} class="ui dropdown" >
                                    <option>Triggers</option>
                                    <option>Complaint Served</option>
                                    <option>Form Interrogatory Served</option>
                            </select>
                            <div>
                                {complaintServedOption ? 
                                        <Form onSubmit={handleRenderComplaintServed}>
                                            < Form.Input 
                                            onChange={handleYearDocumentServed}
                                            label="Year Complaint Served" 
                                            placeholder="Enter Year Of Service" />
                                            <Form.Input
                                            onChange={handleMonthDocumentServed}
                                            label="Month Complaint Served" 
                                            placeholder="Enter Month Of Service" />
                                            <Form.Input 
                                            onChange={handleDateDocumentServed}
                                            label="Date Complaint Served" 
                                            placeholder="Enter Date Of Service" />
                                            <Button color="blue" >Submit</Button>
                                        </Form>
                                : null}
                            </div>
                            <div>
                                {discoveryServedOption ? 
                                        // add onSubmit={handleRenderDiscoveryServed} to Form below
                                        <Form onSubmit={handleRenderDiscoveryServed} >
                                            < Form.Input 
                                            onChange={handleYearDocumentServed}
                                            label="Year Discovery Served" 
                                            placeholder="Enter Year Of Service" />
                                            <Form.Input
                                            onChange={handleMonthDocumentServed}
                                            label="Month Discovery Served" 
                                            placeholder="Enter Month Of Service" />
                                            <Form.Input 
                                            onChange={handleDateDocumentServed}
                                            label="Date Discovery Served" 
                                            placeholder="Enter Date Of Service" />
                                            <Button color="blue">Submit</Button>
                                        </Form>
                                    : null}
                            </div>
                        </Card>
                        <Card fluid color="blue" header="Edit Your Case">
                            <h1> Edit Your Case </h1>
                            <Form onSubmit={handleEditCase}>
                                <Form.Field required>
                                <Form.Input 
                                onChange={handleEditCaseName}
                                value={editName}
                                label="Name" 
                                placeholder="Enter Case Name Here" 
                                />
                                </Form.Field>
                                <Form.Input 
                                onChange={handleEditCaseCounsel}
                                value={editCounsel}
                                label="Counsel" 
                                placeholder="Enter Opposing Counsel Here" 
                                />
                                <Form.Input 
                                onChange={handleEditCaseFiled}
                                value={editCaseFiled}
                                label="Date Case Filed" 
                                placeholder="Enter Date Case Filed Here" 
                                />
                                <Form.Input 
                                onChange={handleEditCaseServed}
                                value={editCaseServed}
                                label="Date Complaint Served" 
                                placeholder="Enter Date Complaint Served Here" 
                                />
                                <Button color="blue" >Edit Your Case </Button>
                            </Form>
                        </Card>
                        <Card fluid color="orange" header="Delete Your Case">
                        <div>
                            <h1>Delete Your Case</h1>
                            <Button color="youtube" onClick={handleDelete}> Delete Your Case </Button>
                        </div>
                        </Card>
                        </>
                    : null}
                </Card.Group>
            </div>
            <div id="createNewCase">
                <br></br>
                <Card fluid color="orange">
                    <h1> Create A New Case</h1>
                        <Form succes onSubmit={createNewCase}>
                            <Form.Input label="Name" placeholder="Enter Case Name Here" onChange={handleNameState} />
                            <Form.Input label="Opposing Counsel" placeholder="Enter Opposing Counsel Here" onChange={handleCounselState}/>
                            <Form.Input label="Date Case Filed" placeholder="Enter Date Case Filed Here" onChange={handleDateCaseFiledState} />
                            <Form.Input label="Date Complaint Served" placeholder="Enter Date Complaint Served Here" onChange={handleDateComplaintServedDate} />
                            <Message
                            success
                            header="Case Completed"
                            content="New Case Entered, Happy Hunting!"
                            />
                            <Button color="blue">Submit</Button>
                        </Form>
                </Card>
            </div>    
            <div className="emailButton">
                <Email lawsuit={lawsuit} />
            </div>
            
        </>
    )
}


export default Case;

// Old Code, use as example of what not to do!
// let dateServedMoment = moment({
//     year: `${yearServedState}`, month: `${monthServedState}`, date: `${dateServedState}`
// })


// const newTriggerObject ={
//     title: "Complaint Served",
//     date_served: dateServedMoment,
//     method_of_service: "Personal Service / Hand"
// }

// fetch(`/triggers/`,{
//     method: "POST",
//     headers: {
//         "Content-Type" : "application/json",
//     },
//     body: JSON.stringify(newTriggerObject)
// })
// .then(result => result.json())
// .then(result => setNewTrigger(result))

// const newDeadlineObject = {
//     title: "File & Serve Demurrer",
//     deadline: dateServedMoment,
//     case_id: individualCase.id,
//     trigger_id: newTrigger.id
// }
// // newDeadlineObject IS GIVING IS USING dateServedMoment, and that is taking from the form, but the month passed into the form corresponds to one month later in moment, so everything is 1 month after than the month expected

// fetch(`/deadlines/`,{
//     method: "POST",
//     headers: {
//         "Content-Type" : "application/json",
//     },
//     body: JSON.stringify(newDeadlineObject)
// })
// .then(result => result.json())
// .then(result => setNewDeadline(result))


// const milestonesForDemurrer = {
//     m1: "Analyze Complaint", 
//     m2: "Begin Drafting Demurrer", 
//     m3: "Provide Draft Demurrer to Partner", 
//     m4: "Provide Draft Demurrer to Client", 
//     m5: "Meet and Confer With Opposing Counsel", 
//     m6: "Draft Client Declaration, Counsel Declaration, Potential Request for Judicial Notice, and Proposed Order", 
//     m7: "Finalize Demurrer & Related Documents for File and Service", 
//     m8: "File and Serve Demurrer", 
//     deadline_id: newDeadline.id
// }

// fetch(`/milestones_for_demurrers`,{
//     method: "POST",
//     headers: {
//         "Content-Type" : "application/json",
//     },
//     body: JSON.stringify(milestonesForDemurrer)
// })
// .then(result => result.json())
// .then(result => console.log(result))

// const milestonesIfDemurrerDelay = {
//     m1: "NOTE: You are getting this warning because Milestones For Demurrer have not been met. Change in strategy!", 
//     m2: "Ask Opposing Counsel for a 30-day extension to Responsive Pleading Deadline.  Confirm extension in writing via e-mail and store for your records.", 
//     m3: "If Opposing Counsel does not grant extension, file an Answer on the Responsive Pleading Deadline, making avialable the option to file a Motion for Judgment on the Pleadings. Inform client that same arguments and theories for demurrer are avaialble in the form of a Motion for Judgment on the Pleadings, which can be drafted, filed, and served immediately.", 
//     m4: "Pray for forgiveness",
//     deadline_id: newDeadline.id
// }

// fetch(`/milestones_if_demurrer_delays`,{
//     method: "POST",
//     headers: {
//         "Content-Type" : "application/json",
//     },
//     body: JSON.stringify(milestonesIfDemurrerDelay)
// })
// .then(result => result.json())
// .then(result => console.log(result))