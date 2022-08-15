import React, {useState, useEffect} from "react"
import { Button, Card, Form, Message, List, Label, Segment, Menu, Icon, Reveal, Grid } from 'semantic-ui-react'
import moment from "moment"
import Email from "./Email"
import Sidebar from "./Sidebar"
import WindowApp from "./Window"
import { createPortal } from "react-dom";
import Pop from "./Popup"
import CaseWindow from "./CaseWindow"





function Case({user, getCaseId, desperateCaseId}){
   
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

    const [caseId, setCaseId] = useState([])
    
    
    
 
    
    useEffect(()=>{
        fetch("http://localhost:3000/cases")
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
            date_complaint_served: dateComplaintServedState,
            user_id: user.id
        }

        console.log(newCaseObject)
        console.log(user.id)
        
        fetch(`http://localhost:3000/cases/`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newCaseObject)
        })
        .then(result => result.json())
        .then(() => fetch(`http://localhost:3000/cases/`))
        .then(result => result.json()
        .then(result => setLawSuit(result)))

        e.target.reset();

    }

    function handleOpenWindow(e){
            // fetch(`/cases/${e.target.value}`)
            // .then(result => result.json())
            // .then(result => setCaseId(result))
            setCaseId(e.target.value)
            console.log(caseId)
        window.open("/CaseWindow", "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
        // window.open(`/CaseWindows`, "href=http://localhost:4000/CaseWindow", "Popup","resizable=0 width=100, height=100, top=10")
    }

    const renderLawSuit = lawsuit.map((lawsuit)=>{
        const dateFiled = moment(lawsuit.date_case_filed)
        const dateComplaintServed = moment(lawsuit.date_complaint_served)
        return (
            <div className="renderLawsuit"> 
                <Grid text container >
                    <Grid.Row >
                        <Grid.Column>
                            <Card >
                                {/* used to be WindowApp */}
                                <WindowApp displayEditForm={displayEditForm} setDisplayEditForm={setDisplayEditForm} setIndividualCase={setIndividualCase} lawsuit={lawsuit} individualCase={individualCase} setLawSuit={setLawSuit}  onClick={(e)=>{
                                    // e.preventDefault()
                                    // getCaseId(e.target.value, e)
                                    window.open("/CaseWindow", "caseId={e.target.value}","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
                                }}
                                    // onClick={handleOpenWindow}
                                    value={lawsuit.id}>
                                    {lawsuit.name}
                                </WindowApp> 
                                <Reveal animated="move up">
                                    <Reveal.Content visible>
                                    <div className="caseList">
                                            <div className="casebutton">
                                                <Icon name="balance scale" color="black"></Icon>
                                            </div>
                                            Upcoming Deadlines: {lawsuit.deadlines.map((deadline)=>{
                                                const deadlineDate = moment(deadline.deadline)
                                                    return (
                                                        <div>
                                                        {deadline.title} by {deadlineDate.format("dddd, MMMM Do YYYY")}
                                                        </div>
                                                    )
                                        })}
                                    </div>
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                        {/* ADD TO DATE TO THE BELOW MOMENTS! */}
                                    <div className="behindCaseList" >
                                        <p>Opposing Counsel: {lawsuit.counsel}</p>
                                        <p>Date Case Filed: {dateFiled.format("dddd, MMM Do YYYY")}</p>
                                        <p>Date Complaint Served: {dateComplaintServed.format("dddd, MMM Do YYYY")}</p>
                                    </div>
                                    </Reveal.Content>
                                </Reveal>
                            </Card>
                        </Grid.Column> 
                    </Grid.Row>
                </Grid>
            </div>
        )
    })

    
    

    console.log(caseId)

    return(
        <>
            <div className="App" id="outer-container" >
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
                <div id="page-wrap">
                        <Grid >
                            {renderLawSuit}
                        </Grid>
                        <div className="createNewCase">
                            <Grid textAlign="center" verticalAlign="middle" >
                                <Grid.Column style={{maxWidth: 550}}>
                                    <Card fluid color="orange">
                                        <h1> Create A New Case</h1>
                                            <Form succes onSubmit={createNewCase}>
                                                <Form.Input label="Name" placeholder="Enter Case Name Here" onChange={handleNameState} />
                                                <Form.Input label="Opposing Counsel" placeholder="Enter Opposing Counsel Here" onChange={handleCounselState}/>
                                                <Pop handleDateCaseFiledState={handleDateCaseFiledState} desperateCaseId={desperateCaseId} />
                                                {/* <Form.Input label="Date Case Filed (YYYY-MM-DD)" placeholder="Enter Date Case Filed Here" onChange={handleDateCaseFiledState} /> */}
                                                <Form.Input label="Date Complaint Served (YYYY-MM-DD)" placeholder="Enter Date Complaint Served Here" onChange={handleDateComplaintServedDate} />
                                                <Message
                                                success
                                                header="Case Completed"
                                                content="New Case Entered, Happy Hunting!"
                                                />
                                                <Button color="blue">Submit</Button>
                                            </Form>
                                    </Card>
                                </Grid.Column>
                            </Grid>
                        </div>    
                        <div className="emailButton">
                            <Email lawsuit={lawsuit} />
                        </div>
                </div> 
            </div>
        </>
    )
}


export default Case;

// Pre pop-up window milestone render and case edit
// const test = 
// <div className="caseOptions">
//     <Grid textAlign="center" verticalAlign="middle" >
//         <Grid.Column style={{maxWidth: 550}}>
//                 {
//                     <>
//                         <Card fluid color="red" >
//                             <h1>Select A Trigger To Display Deadlines And Milestones</h1> 
//                             <select onChange={handleChosenTrigger} className="ui dropdown" >
//                                     <option>Triggers</option>
//                                     <option>Complaint Served</option>
//                                     <option>Form Interrogatory Served</option>
//                                     <option>Notice Of Deposition</option>
//                                     <option>Trial Date</option>
//                             </select>
//                             <div>
//                                 {complaintServedOption ? 
//                                         <Form onSubmit={handleRenderComplaintServed}>
//                                             < Form.Input 
//                                             onChange={handleYearDocumentServed}
//                                             label="Year Complaint Served" 
//                                             placeholder="Enter Year Of Service" />
//                                             <Form.Input
//                                             onChange={handleMonthDocumentServed}
//                                             label="Month Complaint Served" 
//                                             placeholder="Enter Month Of Service" />
//                                             <Form.Input 
//                                             onChange={handleDateDocumentServed}
//                                             label="Date Complaint Served" 
//                                             placeholder="Enter Date Of Service" />
//                                             <Button color="blue" >Submit</Button>
//                                         </Form>
//                                 : null}
//                             </div>
//                             <div>
//                                 {discoveryServedOption ? 
//                                         // add onSubmit={handleRenderDiscoveryServed} to Form below
//                                         <Form onSubmit={handleRenderDiscoveryServed} >
//                                             < Form.Input 
//                                             onChange={handleYearDocumentServed}
//                                             label="Year Discovery Served" 
//                                             placeholder="Enter Year Of Service" />
//                                             <Form.Input
//                                             onChange={handleMonthDocumentServed}
//                                             label="Month Discovery Served" 
//                                             placeholder="Enter Month Of Service" />
//                                             <Form.Input 
//                                             onChange={handleDateDocumentServed}
//                                             label="Date Discovery Served" 
//                                             placeholder="Enter Date Of Service" />
//                                             <Button color="blue">Submit</Button>
//                                         </Form>
//                                     : null}
//                             </div>
//                         </Card>
//                         <Card fluid color="blue" >
//                             <h1> Edit Your Case </h1>
//                             <Form onSubmit={handleEditCase}>
//                                 <Form.Field required>
//                                 <Form.Input 
//                                 onChange={handleEditCaseName}
//                                 value={editName}
//                                 label="Name" 
//                                 placeholder="Enter Case Name Here" 
//                                 />
//                                 </Form.Field>
//                                 <Form.Input 
//                                 onChange={handleEditCaseCounsel}
//                                 value={editCounsel}
//                                 label="Counsel" 
//                                 placeholder="Enter Opposing Counsel Here" 
//                                 />
//                                 <Form.Input 
//                                 onChange={handleEditCaseFiled}
//                                 value={editCaseFiled}
//                                 label="Date Case Filed" 
//                                 placeholder="Enter Date Case Filed Here" 
//                                 />
//                                 <Form.Input 
//                                 onChange={handleEditCaseServed}
//                                 value={editCaseServed}
//                                 label="Date Complaint Served" 
//                                 placeholder="Enter Date Complaint Served Here" 
//                                 />
//                                 <Button color="blue" >Edit Your Case </Button>
//                             </Form>
//                         </Card>
//                         <Card fluid color="orange" >
//                         <div>
//                             <h1>Delete Your Case</h1>
//                             <Button color="youtube" onClick={handleDelete}> Delete Your Case </Button>
//                         </div>
//                         </Card>
//                     </>
//                 }
//         </Grid.Column>
//     </Grid>
// </div>
