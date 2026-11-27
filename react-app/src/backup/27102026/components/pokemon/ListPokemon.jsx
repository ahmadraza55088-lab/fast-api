function ListPokemon({ data }) {
  return (
    <table className="n-table">
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Name</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={item.name}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListPokemon;
