import React, {useEffect, useState} from 'react'
import {Months,Days} from "../Data/Data";
import Day from "../component/Day";

import {Icon} from '@iconify/react';
import leftArrowCircle from '@iconify/icons-bxs/left-arrow-circle';
import rightArrowCircle from '@iconify/icons-bxs/right-arrow-circle';
import '../Css/Calender.css';
const dateObj = new Date(1900, 0, 1);
const today = new Date();

function getDay(year, month, day){
    return new Date(year, month, day).getDay()
}

function getDaysInMonth(year, month) {
    const temp = new Date(year, (month === 11 ? 0 : month + 1), 0);

    return temp.getDate()
}


const increaseMonth = (month) => {
    return ((month === 11 ? 0 : month + 1))
}

const decreaseMonth = (month) => {
    return ((month === 0 ? 11 : month - 1))
}

const isToday = (date) =>{
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}


const contains = (targets,date) => {
    for (let i = 0; i < targets.length(); i++) {
        if(targets[i].getTime() === date.getTime()){
            return i + 1;
        }
    }
    return 0;
}

const createHeaders = () =>{
    return Object.entries(Days).map((day,index) => {
        return(
            <div className={"header box"}>
                <h5>{day[1]}</h5>
            </div>)
    })
}

const temp = (year, month, day, styles) => {
    const title = new Date(year, month, day);
    const selected = false;
    const dayOfMonth = <Day date = {title} styles = {isToday(title) ? "box today" : styles}/>


    return {title, dayOfMonth, selected};
}

const createDays = (year, month, targets, setTargets) =>{
    const results = []

    const dayOfWeek = getDay(year, month, 1)
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPreviousMonth = ((month === 0 ? getDaysInMonth(year, 11) :  getDaysInMonth(year, month)))

    for (let i = daysInPreviousMonth; i > daysInPreviousMonth - dayOfWeek; i--) {
        results.push(temp(year, decreaseMonth(month), i , "box grey"));
    }

    for (let i = 1; i < daysInMonth + 1; i++) {
        results.push(temp(year, month, i , "box"));
    }

    for (let i = 1; i < (42 - daysInMonth - dayOfWeek + 1); i++) {
        results.push(temp(year, increaseMonth(month), i , "box grey"));
    }

    return results
}



export default function Calender() {

    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [list, setList] = useState(createDays(year, month, setTargets));
    const [targets, setTargets] = useState([dateObj]);



    const checkTargets = (date) => {
        const temp = contains(targets, date);
        if(temp === 0){
            setTargets([...targets, date])
        }else
            setTargets([...targets.splice(temp - 1 ,1)])
    }
    
    
    useEffect(() => {
        setList(createDays(year,month))
    }, [year, month])



    return (
            <div className={"calender-container"}>
                <div className={"calender-header"}>
                    <div className={"headerName month"}>
                        <Icon icon={leftArrowCircle} className={"arrow big"} onClick={() => {
                            setMonth(decreaseMonth(month))
                        }}/>
                        <h2> {Months[month]}</h2>
                        <Icon icon={rightArrowCircle} className={"arrow big"} onClick={() => {
                            setMonth(increaseMonth(month))
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
                        {list.map((item)=> (
                            item.dayOfMonth
                        ))}
                    </div>

                </div>
            </div>
    )
}