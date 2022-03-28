import React, {useEffect, useState} from 'react'


const dateObj = new Date(1900, 0, 1);


export default function Day(props){
    const [date, setDate] = useState(dateObj);
    const [styles, setStyles] = useState();



    useEffect(() => {
        setStyles(props.styles);
        setDate(props.date);
    }, [props.styles, props.date])




    return(
        <div className={styles} onClick={() => {

        }}>
            <span>{date.getDate()}</span>
        </div>
    )
}