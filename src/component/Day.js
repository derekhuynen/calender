import React, {useEffect, useState} from 'react'





export default function Day(props){
    const [date, setDate] = useState();
    const [styles, setStyles] = useState();



    useEffect(() => {
        setStyles(props.styles);
        setDate(new Date(props.year, props.month, props.day));
    }, [props.year, props.month, props.day, props.styles])


    const onclick = () => {
        console.log(date)
    }


    return(
        <div className={styles} onClick={onclick}>
            <span>{props.day}</span>
        </div>
    )
}