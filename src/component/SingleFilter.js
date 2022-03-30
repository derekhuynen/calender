import React, {useEffect, useState} from "react";
import "../Css/DateSelector.css"
import {Icon} from '@iconify/react';
import leftArrowCircle from '@iconify/icons-bxs/left-arrow-circle';
import rightArrowCircle from '@iconify/icons-bxs/right-arrow-circle';


export default function SingleFilter(props){
    const [count,setCount] = useState(0);

    const {name, info ,handleSetFilter} = props;


    const handleClick = (count) =>{
        setCount(count)
        handleSetFilter(name, count , info.displayName);
    }

    return (
        <div className={"singleFilter-container"}>
            <div className={"singleFilter-split"}>
                <h4>{info.displayName}</h4>
            </div>
            <div className={"singleFilter-split"}>
                <Icon icon={leftArrowCircle} className={"filter-arrows small"} onClick={ ()=> handleClick(count > 0 ? count -1: 0) }/>
                <h3>{count}</h3>
                <Icon icon={rightArrowCircle} className={"filter-arrows small"} onClick={() => handleClick(count + 1) }/>
            </div>
        </div>
    )
}