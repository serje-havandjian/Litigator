import React, { useState } from "react"
import {List, Button} from "semantic-ui-react" 



function ListOfCases({lawsuits, setLawSuits}){
    const [displayIndividualCase, setDisplayIndividualCase] = useState([])

// Turn this into a dropdown, on change of dropdown set state, then on submit handles the filter. Maybe it will look like create an empty array and push state from case dropdown to the array which gets rendered and filtered?
const individualCase = lawsuits.filter((lawsuit)=>{
        return lawsuit.name.includes(displayIndividualCase.name)
    })

    function handleSetState(){
        setLawSuits(individualCase)
    }
    
    console.log(individualCase)
    
    function resetCaseList(){
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuits(result))
    }


    const renderLawSuitsInList = lawsuits.map((lawsuit)=>{
        return<List className="List" animated verticalAlign="middle" >
                    <List.Item >
                        <List.Icon name="folder" />
                        <List.Content value={lawsuit.id}>
                            <List.Header onClick={(e)=>{


                                fetch(`/cases/${e.target.id}`)
                                .then(result => result.json())
                                .then(result => setDisplayIndividualCase(result))}}


                            id={lawsuit.id} >{lawsuit.name}</List.Header>
                            <Button onClick={handleSetState}>Click Me Second So {lawsuit.name} Renders You Stupid Shit</Button>
                        </List.Content>
                    </List.Item>
                </List>
    })

    

    return(
        <>
        {renderLawSuitsInList}
        <Button onClick={resetCaseList}>
            Display All Cases
        </Button>
        </>
    )
}

export default ListOfCases