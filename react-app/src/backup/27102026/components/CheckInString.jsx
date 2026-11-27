import { useState } from "react";
function CheckInString () {
    let str = "Hello, Abdul Mannan! How are you!"
    const [inputValue, setInputValue] = useState("")
    const [finalResult, setFinalResult] = useState("")

    function resultTemplate(str) {
        return `${inputValue} is ${str} exist in above string`
    }

    function checkHandler() {
        let result = str.includes(inputValue) ? resultTemplate("") : resultTemplate("not")
        setFinalResult(result)
    }

    // BY replace string final output generated
    // function checkHandler() {
    //     let temp = `${inputValue} is finalResultPushHere  in above string`

    //     let result = str.includes(inputValue) ?
    //         temp.replace('finalResultPushHere', 'exist') :
    //         temp.replace('finalResultPushHere', 'not exist')

    //     setFinalResult(result)
  
    // }
    return (
        <div>
            <h1>{str}</h1>
            <div>
                <div className="mb-10">
                    <label>Please enter word to check in above string - with senstitive</label>
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

export default CheckInString