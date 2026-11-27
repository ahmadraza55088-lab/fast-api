import { useState } from "react"
function ReverseName () {
    let [inputValue, setInputValue] = useState("")
    let [reverseValue, setReverseValue] = useState("")

    function reverseString() {
        let reverseValue = inputValue.split("").reverse().join("")
        setReverseValue(reverseValue)
    }

    function onChangeValue (e) {
        setInputValue(e.target.value)
    }
    
    return (
        <div>
            <div><h1>Hello Reverse Name</h1></div>
            <div>
                <input type="text" onChange={onChangeValue}  />
                <button className="ml-10" onClick={reverseString}>Reverse</button>
                <div>{reverseValue}</div>
            </div>
        </div>
    )
}

export default ReverseName