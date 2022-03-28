import React, {useState} from 'react'
import {Months,Days} from "../Data/Data";
import Day from "../component/Day";

import {Icon} from '@iconify/react';
import leftArrowCircle from '@iconify/icons-bxs/left-arrow-circle';
import rightArrowCircle from '@iconify/icons-bxs/right-arrow-circle';
import '../Css/Calender.css';


function getDay(year, month, day){
    return new Date(year, month, day).getDay()
}

function getDaysInMonth(year, month) {
    const temp = new Date(year, (month === 11 ? 0 : month + 1), 0);

    return temp.getDate()
}

const createHeaders = () =>{
    return Object.entries(Days).map((day,index) => {
        return(
            <div className={"days-header"}>
                <span>{day[1]}</span>
            </div>)
    })
}

const createDays = (year, month) =>{
    const result = []

    const dayOfWeek = getDay(year, month, 1)
    const daysInMonth = getDaysInMonth(year, month);
    const previousMonth = ((month === 0 ? getDaysInMonth(year, 11) :  getDaysInMonth(year, month)))

    for (let i = previousMonth; i > previousMonth - dayOfWeek; i--) {
        result.push(
            <Day year = {year} month = {(month === 0 ? 11 : month - 1)} day = {i} styles = {"extra"} />
        )
    }

    for (let i = 1; i < daysInMonth + 1; i++) {
        result.push(
            <Day year = {year} month = {month} day = {i} styles = {"days"} />
        )
    }

    for (let i = 1; i < (42 - daysInMonth - dayOfWeek + 1); i++) {
        result.push(
            <Day year = {year} month = {(month === 11 ? 0 : month + 1)} day = {i} styles = {"extra"} />
        )
    }

    return result
}



export default function Calender() {

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2022);


    const increaseMonth = () => {
        setMonth((month === 11 ? 0 : month + 1))
    }

    const decreaseMonth = () => {
        setMonth((month === 0 ? 11 : month - 1))
    }

    return (
            <div className={"calender-container"}>
                <div className={"calender-header"}>
                    <h1>
                        <Icon icon={leftArrowCircle} className={"arrow"} onClick={decreaseMonth}/>
                        <div className={"headerName"}>{Months[month]}</div>
                        <Icon icon={rightArrowCircle} className={"arrow"} onClick={increaseMonth}/>
                    </h1>

                    <h3>
                        <Icon icon={leftArrowCircle} className={"arrow"} onClick={() => setYear(year - 1)}/>
                        <div className={"headerName"}>{year}</div>
                        <Icon icon={rightArrowCircle} className={"arrow"} onClick={() => setYear(year + 1)}/>
                    </h3>
                </div>
                <div className={"calender-bottom"}>
                    {createHeaders()}
                    {createDays(year,month)}
                </div>
            </div>
    )
}