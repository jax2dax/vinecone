function Response({ responseDisplay }){ // changed
    return (
        <div className="responsebox">
            {responseDisplay}
            <div className="result"></div>
            <div className="scalebox"></div>
        </div>
    )
}
export default Response;
            