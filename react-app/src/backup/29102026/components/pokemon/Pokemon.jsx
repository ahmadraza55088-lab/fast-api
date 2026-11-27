import { useState, useEffect, useRef } from "react";

import Sprites from "./Sprites";

// https://jsonplaceholder.typicode.com/users
// https://dummyjson.com/users?skip=30&limit=30

function Pokemon() {
  // Reactive state or reactive variables
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  // non reactive or uncontrolled var
  const isAlreadyRun = useRef(false);

  // for selected pokemeon data
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Main api client to get data from api
  const apiCall = async (url) => {
    const result = await fetch(url);
    const finalResult = await result.json();
    return finalResult;
  };

  // Function to call API
  const getData = async (url) => {
    setLoading(true);
    const finalResult = await apiCall(url);
    setData(finalResult);
    setLoading(false);
  };

  // Function to get data on reload
  const onReload = async (url) => {
    if (isAlreadyRun.current) return;
    isAlreadyRun.current = true;
    getData(url);
  };

  // Side effect hook - trigger once on page render
  useEffect(() => {
    onReload("https://pokeapi.co/api/v2/pokemon");
  });

  // function to select data on selected option
  async function handleOnChange(e) {
    const url = e.target.value;
    const result = await apiCall(url);
    setSelectedPokemon(result);
  }

  // Final render - view
  return (
    <>
      <h1>Fetching data from pokemon API</h1>
      <div>
        {loading ? (
          "Loading...."
        ) : (
          <div className="relative">
            <select
              onChange={handleOnChange}
              defaultValue=""
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled>
                --select--
              </option>
              {data?.results?.map((item) => (
                <option key={item.name} value={item.url}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          {!selectedPokemon ? (
            ""
          ) : (
            <Sprites sprites={selectedPokemon?.sprites?.other} />
          )}
        </div>
      </div>
    </>
  );
}

export default Pokemon;
