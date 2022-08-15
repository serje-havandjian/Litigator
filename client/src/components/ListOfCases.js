import { areArraysEqual } from "@mui/base"
import React, { useState } from "react"
import { components } from "react-big-calendar"
import {List, Button, Dropdown} from "semantic-ui-react" 



function ListOfCases({lawsuits, setLawSuits}){
    const [displayIndividualCase, setDisplayIndividualCase] = useState({})
    const [value, setValue] = useState()


    function resetCaseList(){
        fetch("http://localhost:3000/cases")
        .then(result => result.json())
        .then(result => setLawSuits(result))
    }

        const dropdownOptions = lawsuits.map((lawsuit)=>{
            return {
                    key: lawsuit.id,
                    text: lawsuit.name,
                    value: lawsuit.id
                    }
        })

 
     function handleDisplayIndividualCase(e, data){
        setValue(data.value)
    }


        
        function handleClick(){

            //THIS WORKS
            // Promise.all(
            //     value.map((v)=>{
            //         return fetch(`/cases/${v}`)
            //         .then(result => result.json())
            //     })
            // ).then(result => setLawSuits(result.flat()))

            //THIS ALSO WORKS
                const filteredCases = lawsuits.filter((lawsuit)=>{
                    return value.includes(lawsuit.id)
                })

                setLawSuits(filteredCases)
    
    //THIS IS A REMINDER TO STEP AWAY ONCE IN A WHILE 

            // value.forEach( async (v)=>{
            //     const response = await fetch(`/cases/${v}`)
            //     const data = await response.json()
               
            //     arrayOfCases.push(data)
            //     console.log(arrayOfCases)
            // })
            // setLawSuits(arrayOfCases)
            
            // value.forEach((v)=>{
            //     fetch(`/cases/${v}`)
            //     .then(result => result.json())
            //     .then(result => {
            //         arrayOfCases.push(result)
            //         console.log(arrayOfCases, "array of cases")
            //     })
            //     console.log(lawsuits)
            // })

        
            // value.forEach((v)=>{
            //     fetch(`/cases/${v}`)
            //     .then(result => result.json())
            //     .then(result => arrayOfCases.push(result))
            // })
            
        
            // console.log(listOfcaseNames, "This is array of just case names")

            // const anotherArray = []

            // const renderIndividualCase = listOfcaseNames.map((caseName)=>{
            //     return lawsuits.map((lawsuit)=>{
            //         anotherArray.includes(lawsuit.name) === caseName ? console.log("test"): anotherArray.push(lawsuit)  
            //         // if(anotherArray.includes(lawsuit.name) === serje === false ){
            //         //     anotherArray.push(lawsuit)
            //         // }
            //     })
            // })

            // console.log(renderIndividualCase, "list of cases after being filtered")
            // console.log(anotherArray, "another array")

            // setLawSuits(anotherArray)
            
            // console.log(lawsuits, "all lawsuits")
        }

  

   
    

    

    return(
        <div className="caseSearch">
        <Dropdown 
            name = "Category Search"
            onChange={handleDisplayIndividualCase}
            placeholder="Search For Cases"
            fluid
            multiple
            search
            selection
            options={dropdownOptions}>
        </Dropdown>
        <br></br>
        <Button color="blue" onClick={handleClick}>Search For Case</Button>
        <Button color="youtube" onClick={resetCaseList}> Display All Cases </Button>
        </div>
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
    //                         <Button onClick={handleSetState}>Click Me Second So {lawsuit.name} Renders</Button>
    //                     </List.Content>
    //                 </List.Item>
    //             </List>
    // })