import React, {useState} from 'react'
import {Months,Days} from "../Data/Data";
import Day from "../component/Day";

import {Icon} from '@iconify/react';
import leftArrowCircle from '@iconify/icons-bxs/left-arrow-circle';
import rightArrowCircle from '@iconify/icons-bxs/right-arrow-circle';
import '../Css/Calender.css';
const dateObj = new Date(1900, 0, 1);

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


const compare = (selected, date, original) => {

        if(selected.getTime() === date.getTime()){
            console.log("same")
            return original.toString() + " selected"
        }else {
            console.log("diff")
            return original
        }
    }

const createHeaders = () =>{
    return Object.entries(Days).map((day,index) => {
        return(
            <div className={"header box"}>
                <h5>{day[1]}</h5>
            </div>)
    })
}

const createDays = (year, month, selected, setSelected) =>{
    const result = []

    const dayOfWeek = getDay(year, month, 1)
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPreviousMonth = ((month === 0 ? getDaysInMonth(year, 11) :  getDaysInMonth(year, month)))

    for (let i = daysInPreviousMonth; i > daysInPreviousMonth - dayOfWeek; i--) {
        result.push(
            <Day date = {new Date(year, decreaseMonth(month),i)} styles = {compare(selected, new Date(year, decreaseMonth(month),i),"box grey")} selected = {selected} setSelected={setSelected}/>
        )
    }

    for (let i = 1; i < daysInMonth + 1; i++) {
        result.push(
            <Day date = {new Date(year, month,i)} styles = {compare(selected,new Date(year, month,i),"box" )} selected = {selected} setSelected={setSelected}/>
        )
    }

    for (let i = 1; i < (42 - daysInMonth - dayOfWeek + 1); i++) {
        result.push(
            <Day date = {new Date(year, increaseMonth(month),i)} styles = {compare(selected, new Date(year, increaseMonth(month),i),"box grey")} selected = {selected} setSelected={setSelected}/>
        )
    }

    return result
}




export default function Calender() {

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2022);
    const [selected, setSelected] = useState(dateObj);



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
                        {createDays(year,month, selected, setSelected)}
                    </div>

                </div>
            </div>
    )
}