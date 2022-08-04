import {Form, Button} from "semantic-ui-react"


function Email({lawsuit}){



    function sendMail() {
        const link = "mailto:litigator.sph@gmail.com"
                + "?cc=myCCaddress@example.com"
                 + "&subject=" + encodeURIComponent("This is Your Case Tasks")
                 + "&body=" + encodeURIComponent(document.getElementById('myText').value);
        
        window.location.href = link;
    }


    //    ADD OTHER TASKS AND MILESTONES TO THIS FOR EMAIL FUNCTIONALITY

    

    const emailText = lawsuit.map((lawsuit)=>{
    
        return( 
            `
            CaseName: ${lawsuit.name}
            CaseTask: ${lawsuit.deadlines.map((deadline)=>{
                return `${deadline.title}:
                Case Milestones:${deadline.milestones_for_answers.map((m)=>{
                    return `${m.m1} 
                        ${m.m2}
                        ${m.m3}
                        ${m.m4}`
                    })}
                Case Milestones:${deadline.milestones_for_demurrers.map((m)=>{
                    return `${m.m1}
                            ${m.m2}
                            ${m.m3}
                            ${m.m4}
                            ${m.m5}
                            ${m.m6}
                            ${m.m7}
                            ${m.m8}`
                        })}`
            })}`
        ) 
    })



    return(

        <>
        <Form.Input id="myText" value={emailText} 
        type="hidden"/>
            <Button color="blue" onClick={sendMail}>Email Your Cases and Tasks To Yourself</Button>
        <Form />
        </>
    )
}

export default Email;