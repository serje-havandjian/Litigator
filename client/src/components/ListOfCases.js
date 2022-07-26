import React, {useState } from "react"
import {List} from "semantic-ui-react" 



function ListOfCases({lawsuits}){
    const [displayIndividualCase, setDisplayIndividualCase] = useState([])


    const renderLawSuitsInList = lawsuits.map((lawsuit)=>{
        return <List className="List" animated verticalAlign="middle" >
            <List.Item >
                <List.Icon name="folder" />
                <List.Content value={lawsuit.id}>
                    <List.Header onClick={(e)=>{
    
                        // if(displayFilteredCase === true){
                        //     setDisplayFilteredCase(false)
                        // }else{
                        //     setDisplayFilteredCase(true)
                        // }
    
    
                        fetch(`/cases/${e.target.id}`)
                        .then(result => result.json())
                        .then(result => setDisplayIndividualCase(result))}} 
                    id={lawsuit.id} >{lawsuit.name}</List.Header>
                </List.Content>
            </List.Item>
        </List>
    })
    
    
    // const individualCase = lawsuits.filter((lawsuit)=>{
    //         return lawsuit.name.includes(displayIndividualCase.name)
    //     })
    



    return(

        <>
        {renderLawSuitsInList}
        </>
    )
}

export default ListOfCases