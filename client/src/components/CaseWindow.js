import React, {useState, useEffect} from "react"

// THIS COMPONENT IS NOT USED ANYMORE.  WAS USED FOR TESTING POP UP WINDOW.  USE "WINDOW" INSTEAD FOR POP UP WINDOW


function CaseWindow({caseId, caseName, user, desperateCaseId, lawsuits, singleCase, singleCaseId}){

    console.log(caseId)
    console.log(user)
    console.log(desperateCaseId)
    console.log(lawsuits)
    console.log(singleCase)

    console.log(singleCaseId)
    
    // const [allCases, setAllCases] = useState([])

    // useEffect(()=>{ 
    //     fetch(`/cases/${caseId}`)
    //     .then(result => result.json())
    //     .then(result => setAllCases(result))
    // },[])

    // console.log(allCases, "what the fuck?")



    return(
        <>        
        <br></br>
        <h1>test</h1>
        </>
    )
}

export default CaseWindow