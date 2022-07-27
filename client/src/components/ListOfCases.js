import React, { useState } from "react"
import { components } from "react-big-calendar"
import {List, Button, Dropdown} from "semantic-ui-react" 



function ListOfCases({lawsuits, setLawSuits}){
    const [displayIndividualCase, setDisplayIndividualCase] = useState([])
    const [value, setValue] = useState()


    function resetCaseList(){
        fetch("/cases")
        .then(result => result.json())
        .then(result => setLawSuits(result))
    }

    const renderLawsuitsInDropdown = lawsuits.map((lawsuit)=>{
        return {
                key: lawsuit.id,
                text: lawsuit.name,
                value: lawsuit.id
                }
    })

    function handleDisplayIndividualCase(e, data){
       setValue(data.value)
       console.log({value}, "value state is equal to this")
       
       const individualCase = value.map((v)=>{
           return v.value.map((value)=>{
               return value.value
           })
       })

       console.log(individualCase, "individual case is this")
       setValue(individualCase)
    }

    let arrayOfCases = []

    function handleClick(){
        
       value.map((v)=>{
            fetch(`/cases/${value}`)
            .then(result => result.json())
            .then(result => arrayOfCases.push(result))
        })

        console.log(arrayOfCases, "this is array of cases after fetch")
        setDisplayIndividualCase(arrayOfCases)

        console.log(displayIndividualCase)
        console.log(renderIndividualCase)
    }

      console.log(arrayOfCases, "this is array of cases after fetch")

    console.log(displayIndividualCase)

    const serjeWorkMagic = displayIndividualCase.map((individual)=>{
        return individual.name
    })

    console.log(serjeWorkMagic)
    
    const renderIndividualCase = lawsuits.filter((lawsuit)=>{
        return lawsuit.name.includes(serjeWorkMagic)
    })

    

    return(
        <>
        <Dropdown 
            name = "Category Search"
            onChange={handleDisplayIndividualCase}
            placeholder="Search For Cases"
            fluid
            multiple
            search
            selection
            options={renderLawsuitsInDropdown}>
        </Dropdown>
        <Button onClick={handleClick}>Search For Case</Button>
        <Button onClick={resetCaseList}>
            Display All Cases
        </Button>
        </>
    )
}

export default ListOfCases

// 


// function handleSetState(){
    //     setLawSuits(individualCase)
    // }

  // const renderLawSuitsInList = lawsuits.map((lawsuit)=>{
    //     return<List className="List" animated verticalAlign="middle" >
    //                 <List.Item >
    //                     <List.Icon name="folder" />
    //                     <List.Content value={lawsuit.id}>
    //                         <List.Header onClick={(e)=>{


    //                             fetch(`/cases/${e.target.id}`)
    //                             .then(result => result.json())
    //                             .then(result => setDisplayIndividualCase(result))}}


    //                         id={lawsuit.id} >{lawsuit.name}</List.Header>
    //                         <Button onClick={handleSetState}>Click Me Second So {lawsuit.name} Renders You Stupid Shit</Button>
    //                     </List.Content>
    //                 </List.Item>
    //             </List>
    // })