import React, {useEffect, useRef, useState} from 'react'
import {Days, Months} from "../Data/Data";
import Day from "../component/Day";

import {Icon} from '@iconify/react';
import leftArrowCircle from '@iconify/icons-bxs/left-arrow-circle';
import rightArrowCircle from '@iconify/icons-bxs/right-arrow-circle';
import '../Css/Calender.css';

const today = new Date();

//Get the Dat of the week. Sun = 0, Mon = 1...
function getDayOfWeek(year, month, day) {
    return new Date(year, month, day).getDay();
}

//Get Days in Month. Date() where day = 0 return totals days of previous month.
function getDaysInMonth(year, month) {
    const temp = increaseMonth(year,month);
    return new Date(temp.year, temp.month, 0).getDate();
}

//Increase Month by 1. If current month is Dec also increase year.
const increaseMonth = (year, month) => {
    return {
        year: (month === 11 ? year + 1 : year),
        month: (month === 11 ? 0 : month + 1)
    }
}

//Decrease Month by 1. If current month is Jan also decrease year.
const decreaseMonth = (year, month) => {
    return {
        year: (month === 0 ? year - 1 : year),
        month: (month === 0 ? 11 : month - 1)
    }
}

//Weird way of comparing Dates.
const isEqual = (date, date2) => {
    return date.getDate() === date2.getDate() && date.getMonth() === date2.getMonth() && date.getFullYear() === date2.getFullYear();
}

//Create Headers for Calender
const createHeaders = () => {
    return Object.entries(Days).map((day) => {
        return (
            <div key={day} className={"header box"}>
                <h5>{day[1]}</h5>
            </div>)
    })
}

//Create a List of all the of Days for the Calender. 5 rows of 7
const createDays = (year, month) => {
    const results = []

    //Get the Day of the Week for first day of month.
    const dayOfWeek = getDayOfWeek(year, month, 1);

    //Get the Number of Days in Current Month
    const daysInMonth = getDaysInMonth(year, month);

    //Get Number of Days in Previous Month.
    const previousYearMonth = decreaseMonth(year,month);
    const daysInPreviousMonth = getDaysInMonth(previousYearMonth.year, previousYearMonth.month);
    const nextYearMonth = increaseMonth(year,month);

    //Create the Spacer Boxes From Previous Month.
    for (let i = daysInPreviousMonth - dayOfWeek + 1; i <= daysInPreviousMonth ; i++) {
        const temp = new Date(previousYearMonth.year, previousYearMonth.month, i)
        results.push({date: temp, styles: "box grey", highLighted: false})
    }

    //Create Boxes for Each Day of Current Month.
    for (let i = 1; i <= daysInMonth; i++) {
        const temp = new Date(year, month, i);
        results.push({date: temp, styles: (isEqual(temp, today) ? "box today" : "box"), highLighted: false})
    }

    //Create the Boxes to Fill the Remaining Spots of the Calender with info for next Month.
    for (let i = 1; i <= (42 - daysInMonth - dayOfWeek); i++) {
        const temp = new Date(nextYearMonth.year, nextYearMonth.month, i)
        results.push({date: temp, styles: "box grey", highLighted: false});
    }

    return results
}


export default function Calender(props) {

    const [month, setMonth] = useState(props.selectedDate === undefined ? today.getMonth() : props.selectedDate.getMonth());
    const [year, setYear] = useState(props.selectedDate === undefined ? today.getFullYear() : props.selectedDate.getFullYear());
    const [list, setList] = useState(createDays(year, month));


    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            setList(createDays(year, month))
        } else (
            didMount.current = true
        )
    }, [year, month])

    const onClick = (date,isGrey) => {

        if(isGrey){
            setMonth(date.getMonth())
        }
        if (props.selectedDate !== undefined && isEqual(props.selectedDate, date)) {
            props.onClick(undefined)
        } else {
            props.onClick(date)
        }
    }



return (
    <div className={"calender-container " + props.position}>
        <div className={"calender-header"}>
            <div className={"headerName month"}>
                <Icon icon={leftArrowCircle} className={"arrow big"} onClick={() => {
                    const temp = decreaseMonth(year, month);
                    setYear(temp.year);
                    setMonth(temp.month);
                }}/>
                <h2> {Months[month]}</h2>
                <Icon icon={rightArrowCircle} className={"arrow big"} onClick={() => {
                    const temp = increaseMonth(year, month);
                    setYear(temp.year);
                    setMonth(temp.month);
                }}/>
            </div>

            <div className={"headerName"}>
                <Icon icon={leftArrowCircle} className={"arrow small"} onClick={() => setYear(year - 1)}/>
                <h3>{year}</h3>
                <Icon icon={rightArrowCircle} className={"arrow small"} onClick={() => setYear(year + 1)}/>
            </div>
        </div>
        <div className={"calender-bottom"}>
            <div className={"headers"}>
                {createHeaders()}
            </div>
            <div className={"days"}>
                {list.map((item, index) => {
                    item.highLighted = (props.selectedDate !== undefined && isEqual(item.date, props.selectedDate));
                    return (<Day {...item} onClick={onClick} key={index}/>)
                })}
            </div>
        </div>
    </div>
)
}