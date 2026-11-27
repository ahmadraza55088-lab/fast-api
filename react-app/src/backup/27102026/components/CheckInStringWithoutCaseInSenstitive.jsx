import { useState } from "react";

function CheckInStringWithoutCaseSenstitive () {

    let str = "Hello, Abdul Mannan! How are you!"

    const [inputValue, setInputValue] = useState("")
    const [finalResult, setFinalResult] = useState("")

    function resultTemplate(str) {
        return `${inputValue} is ${str} exist in above string`
    }

    function checkHandler() {
        let orStrInLower = str.toLowerCase()
        let checkStr = inputValue.toLowerCase()

        let result = orStrInLower.includes(checkStr) ? resultTemplate("") : resultTemplate("not")
        setFinalResult(result)
    }

    
    return (
        <div>
            <h1>{str}</h1>
            <div>
                <div className="mb-10">
                    <label>Please enter word to check in above string - case insenstitice</label>
                </div>
                <div>
                    <input 
                        type="text"
                        placeholder="Enter any word"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="ml-10" onClick={checkHandler}>Check</button>
                </div>
                <div className="mt-10">
                    {finalResult}
                </div>
            </div>
        </div>
    )
}

export default CheckInStringWithoutCaseSenstitive