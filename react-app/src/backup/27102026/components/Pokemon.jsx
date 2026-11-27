import { useState, useEffect, useRef } from "react";
import ListPokemon from "./pokemon/ListPokemon";

// https://jsonplaceholder.typicode.com/users
// https://dummyjson.com/users?skip=30&limit=30

function Pokemon() {
  // Reactive state or reactive variables
  const [data, setData] = useState({});
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const [loading, setLoading] = useState(false);

  // non reactive or uncontrolled var
  const isAlreadyRun = useRef(false);

  // Function to call API
  const getDataApi = async (url) => {
    setLoading(true);
    const result = await fetch(url);
    const finalResult = await result.json();

    setNext(finalResult.next);
    setPrev(finalResult.previous);
    setData(finalResult);

    setLoading(false);
  };

  // Function to get data on reload
  const onReload = async (url) => {
    if (isAlreadyRun.current) return;
    isAlreadyRun.current = true;
    getDataApi(url);
  };

  // Function to get data on click next or prev button
  function handlePagination(identifier) {
    if (identifier == "next") {
      getDataApi(next);
    } else {
      getDataApi(prev);
    }
  }

  // Side effect hook - trigger once on page render
  useEffect(() => {
    onReload("https://pokeapi.co/api/v2/pokemon");
  });

  // Final render - view
  return (
    <>
      <h1>Fetching data from pokemon API</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div>
        {loading ? "Loading...." : <ListPokemon data={data?.results} />}

        <div className="mt-10">
          <button
            onClick={() => handlePagination("prev")}
            disabled={prev == null}
          >
            Previous
          </button>
          <button
            className="ml-10"
            onClick={() => handlePagination("next")}
            disabled={next == null}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Pokemon;
