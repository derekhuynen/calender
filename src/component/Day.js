import React, {useState} from 'react'




export default function Day(props){
    const [month, setMonth] = useState();
    const [year, setYear] = useState();



    return(
        <div className={props.styles}>
            <span>{props.day}</span>
        </div>
    )
}