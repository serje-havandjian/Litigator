import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {Form, Button, Card} from "semantic-ui-react"
import moment from "moment";

//This creates pop up window
const RenderInWindow = (props) => {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(window);

    useEffect(() => {
        const div = document.createElement("div");
        setContainer(div);
    }, []);

        useEffect(() => {
            if (container) {
            newWindow.current = window.open(
                "",
                "",
                "width=600,height=800,left=200,top=200"
            );
            newWindow.current.document.body.appendChild(container);
            const curWindow = newWindow.current;

            

            return () => curWindow.close();
            }

        }, [container]);

  copyStyles(window.document, newWindow.current.document);
  return container && createPortal(props.children, container);
  
};

function copyStyles(src, dest) {
    Array.from(src.styleSheets).forEach((styleSheet) => {
        const styleElement = styleSheet.ownerNode.cloneNode(true);
        styleElement.href = styleSheet.href;
        dest.head.appendChild(styleElement);
    });
    Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
    }




//This handles what is in pop up window
function WindowApp({displayEditForm, setDisplayEditForm, setIndividualCase, lawsuit, lawsuitName, individualCase, setLawSuit, value}) {
    
    const [complaintServedOption, setComplaintServedOption] = useState(false)
    const [discoveryServedOption, setDiscoveryServedOption] = useState(false)
    const [open, setOpen] = useState();

    const [yearServedState, setYearDocumentServed] = useState()
    const [monthServedState, setMonthServedState] = useState()
    const [dateServedState, setDateServedState] = useState()

    const [editName, setEditName] = useState()
    const [editCounsel, setEditCounsel] = useState()
    const [editCaseFiled, setEditCaseFiled] = useState()
    const [editCaseServed, setEditCaseServed] =useState()
    const [editCaseId, setEditCaseId] = useState()





    function handleRenderComplaintServed(e){
        console.log(individualCase)
        e.preventDefault()
    
        let dateServedMoment = moment({
            year: `${yearServedState}`, month: `${monthServedState}`, date: `${dateServedState}`
        })
    
        const newTriggerObject ={
            title: "Complaint Served",
            date_served: dateServedMoment,
            method_of_service: "Personal Service / Hand"
        }
        
        fetch(`https://litigator.herokuapp.com/triggers/`,{
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
    
            fetch(`https://litigator.herokuapp.com/deadlines/`,{
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
    
                fetch(`https://litigator.herokuapp.com/milestones_for_demurrers`,{
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
    
                fetch(`https://litigator.herokuapp.com/milestones_if_demurrer_delays`,{
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

    function handleChosenTrigger(e){
        displayEditForm ? setDisplayEditForm(false) : setDisplayEditForm(true);
     
        if(e.target.value === "Complaint Served"){
            setComplaintServedOption(true)
            setDiscoveryServedOption(false)
        } else {
            setComplaintServedOption(false)
            setDiscoveryServedOption(true)
        }
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

        console.log(editCaseId)
        e.preventDefault()

       let editCaseObject ={
            name: editName,
            counsel: editCounsel,
            date_case_filed: editCaseFiled,
            date_complaint_served: editCaseServed
        }

        fetch(`https://litigator.herokuapp.com/cases/${editCaseId}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(editCaseObject)
        })
        .then(result => result.json())
        .then(() => fetch(`https://litigator.herokuapp.com/cases/`))
        .then(result => result.json()
        .then(result => setLawSuit(result)))


        fetch(`https://litigator.herokuapp.com/cases/${editCaseId}`)
        .then(result => result.json())
        .then(result => console.log(result))
    }
    
    function handleDelete(){
        fetch(`https://litigator.herokuapp.com/cases/${editCaseId}`,{
            method: "DELETE"
        })
        .then(() => fetch(`https://litigator.herokuapp.com/cases/`))
        .then(result => result.json())
        .then(result => setLawSuit(result))
    }

  return (
    <>
      <Button value={value} onClick={(e) => {
        setOpen(true)
        
        // displayEditForm ? setDisplayEditForm(false) : setDisplayEditForm(true);
        fetch(`https://litigator.herokuapp.com/cases/${e.target.id}`)
        .then(result => result.json())
        .then(result => setIndividualCase(result))

        setEditName(lawsuit.name)
        setEditCounsel(lawsuit.counsel)
        setEditCaseFiled(lawsuit.date_case_filed)
        setEditCaseServed(lawsuit.date_complaint_served)
        setEditCaseId(e.target.value)
        
        console.log(e.target.value)
        console.log(editCaseId)

      }} id={lawsuit.id}> {lawsuit.name}
      </Button>
      <div >
            {open && 
            <RenderInWindow>
                <div id="popUp">
                    <Card fluid color="red" header="Select Trigger">
                            <div  >
                                <h1>{lawsuit.name}</h1>
                                <h1>Select A Trigger To Display Deadlines And Milestones</h1> 
                                <div class="triggerOptions">
                                    <select onChange={handleChosenTrigger} class="ui dropdown" >
                                            <option>Triggers</option>
                                            <option>Complaint Served</option>
                                            <option>Form Interrogatory Served</option>
                                            <option>Notice Of Deposition</option>
                                            <option>Trial Date</option>
                                    </select>
                                </div>
                            </div>
                            <div >
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
                            <div >
                                {discoveryServedOption ? 
                                        // add onSubmit={handleRenderDiscoveryServed} to Form below
                                        <Form onSubmit >
                                            < Form.Input 
                                            onChange
                                            label="Year Discovery Served" 
                                            placeholder="Enter Year Of Service" />
                                            <Form.Input
                                            onChange
                                            label="Month Discovery Served" 
                                            placeholder="Enter Month Of Service" />
                                            <Form.Input 
                                            onChange
                                            label="Date Discovery Served" 
                                            placeholder="Enter Date Of Service" />
                                            <Button color="blue">Submit</Button>
                                        </Form>
                                    : null}
                            </div>
                    </Card>
                    <div >
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
                    </div>
                </div>
                </RenderInWindow>}
        </div>
    </>
  );
}
export default WindowApp