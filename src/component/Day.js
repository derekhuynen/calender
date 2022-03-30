export default function Day({date, ...props} ){

    return(
        <div className={props.highLighted ? props.styles + " selected" : props.styles} onClick={() => {
            ((props.styles.includes("grey")) ? props.onClick(date,true) : props.onClick(date,false))
        }}>
            <span>{date.getDate()}</span>
        </div>
    )
}