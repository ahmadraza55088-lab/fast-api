import { useState } from "react"
export default function ListDownUsersData() {

    // eslint-disable-next-line no-unused-vars
    let [users, setUsers] = useState(["Shakeel", "Abdul", "Faizan", "Ahmad"])
    
    return (
        <>
            <h1>Listing Name</h1>

            { users.map((item, index) => ( 
                <h2 key={index}>{index + 1} {item}</h2> 
            )) }

        </>

    )
}

