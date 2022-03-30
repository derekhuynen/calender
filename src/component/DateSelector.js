import React, {useState} from "react";
import '../Css/DateSelector.css'
import Calender from "../pages/Calender";
import SingleFilter from "./SingleFilter";


export default function DateSelector() {
    const [showStart, setShowStart] = useState(true);
    const [showEnd, setShowEnd] = useState(true);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [filters, setFilters] = useState({
        adults: {amount: 0, displayName: "Adults"},
        children: {amount: 0, displayName: "Children"},
        infants: {amount: 0, displayName: "Infants"},
        dogs: {amount: 0, displayName: "Dogs"},
    });


    // useEffect(() => {
    //     setShowStart(false);
    //     setShowEnd(false);
    // }, [startDate,endDate]);


    const handleButton = () => {
        Object.values(filters).map((value) => {
            console.log(`${value.displayName}: ${value.amount}`);
        })
    }

    const handleSetFilter = (name, count, title) => {
        let updatedValue = {};
        updatedValue = {[name]: {amount: count, displayName: title}};
        setFilters(filters => ({
            ...filters,
            ...updatedValue
        }));
        handleButton();
    }

    const formatDate = (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    return (
        <div className={"dateSelector-container"}>
            <button className={"button"} onClick={() => handleButton()}>
                Click Me
            </button>

            <div className={"filter-container"}>
                {Object.entries(filters).map(([key, value], index) => {
                    return <SingleFilter key={index} name={key} info={value} handleSetFilter={handleSetFilter}/>
                })}
            </div>


            <div className={"date-container"}>
                <div className={"date"} onClick={() => {
                    // setShowStart(!showStart);
                    // setShowEnd(false);
                }}>
                    <h3>{startDate === undefined ? 'Check In' : formatDate(startDate)}</h3>
                </div>
                <div className={"date"} onClick={() => {
                    // setShowEnd(!showEnd)
                    // setShowStart(false);
                }}>
                    <h3>{endDate === undefined ? 'Check Out' : formatDate(endDate)}</h3>
                </div>
            </div>
            {showStart ? <Calender position={'left'} onClick={setStartDate} selectedDate={startDate}/> : null}
            {showEnd ? <Calender position={'right'} onClick={setEndDate} selectedDate={endDate}/> : null}
        </div>
    )
}