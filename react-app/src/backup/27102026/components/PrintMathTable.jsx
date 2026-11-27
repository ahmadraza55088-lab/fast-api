import { useState } from "react"
function PrintMathTable() {
    const [ inputValue, setInputValue ] = useState("")


    // let loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let loopArray = [...Array.from({length: 10})]

    function HandleInputChange(e) {
        let inValue = e.target.value;

       
        let value = Number(inValue)

        if(!Number.isInteger(value) || value == 0 || value >= 21) {
            setInputValue("")
            return;
        }
        

        setInputValue(inValue)
       
    }

    return (
        <>
            <h1>Print Math Table</h1>
            <div>
                <input type="text" value={inputValue} onChange={HandleInputChange} />
            </div>

           
            { inputValue == 0 ? "" : loopArray.map((item, index) => (
                <h3 key={index}>{inputValue} x {index + 1} = {(index + 1) * inputValue} </h3>
            )) }
        </>
    )
}

export default PrintMathTable