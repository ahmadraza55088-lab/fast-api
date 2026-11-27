import { useState } from "react";
function Counter() {
    var [counter, setCounter] = useState(0);

    function increaseCounter () {
        setCounter(++counter)
    }

    function decreaseCounter() {
        if (counter > 0) {
            setCounter(--counter)
        }
    }

    return (
        <>
            <h1>Thi is counter component</h1>
            <h1>Counter: {counter}</h1>
            <button onClick={increaseCounter}>Increase</button>
            <button onClick={decreaseCounter}>Decrease</button>
        </>
    )
}

export default Counter