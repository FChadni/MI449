
// type Player = "X" | "O" | null;

function Square( {value, onClick, winner}) {
    if (!value){
        return <button className="square" onClick={onClick} disabled={Boolean(winner)}/>
    }
    return(
        <button className={`square square_${value}`} disabled> {value}</button>
    )
}

export default Square;