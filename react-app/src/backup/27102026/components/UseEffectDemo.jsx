import { useState, useEffect } from "react";

function UseEffectDemo() {
  const [myName, setMyName] = useState("");
  const [address, setAddress] = useState("Sambhal");

  useEffect(() => {
    console.log("Use Effect Triggered....");
    setTimeout(() => {
      setMyName("Shakeel");
    }, 0);
  }, [address]); // empty array means trigger side effect once

  return (
    <>
      <h1>Hello</h1>
      <h2>{myName}</h2>
      <h3>{address}</h3>
      <button onClick={() => setAddress("Bilalpat " + Math.random())}>
        Update Name
      </button>
    </>
  );
}

export default UseEffectDemo;
