import { useEffect, useState, useRef } from "react";
import ViewModal from "./VewModal";

function Books() {
  const [data, setData] = useState([]);
  const isAlreadyCall = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Get API list call
  async function getAPI() {
    const API_URL = "http://127.0.0.1:8000/books";
    const res = await fetch(API_URL);
    const result = await res.json();
    setData(result);
  }

  // API call
  async function getAllBooks() {
    if (isAlreadyCall.current) return;
    isAlreadyCall.current = true;

    await getAPI();
  }

  useEffect(() => {
    const initAPI = () => {
      getAllBooks();
    };

    initAPI();
  });

  function handleView(item) {
    setIsModalOpen(true);
    setSelectedBook(item);
  }

  async function handleDelete(id) {
    try {
      const isConfirmed = confirm("Are you sure?");

      if (!isConfirmed) return;

      const API_URL = `http://127.0.0.1:8000/delete/${id}`;
      const res = await fetch(API_URL, { method: "delete" });
      const result = await res.json();
      if (result.status_code == 200) {
        await getAPI();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg">
        <table className="w-full min-w-[800px] text-left text-sm text-gray-600">
          <thead className="bg-gray-900 text-xs uppercase tracking-wider text-white">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr
                key={item.id}
                className="transition-colors duration-200 hover:bg-blue-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {item.name}
                </td>
                <td className="max-w-xs px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.author}</td>
                <td className="px-6 py-4 font-semibold text-green-700">
                  ₹{item.price}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(item)}
                      className="cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      View
                    </button>

                    <button className="cursor-pointer rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-600 transition">
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="cursor-pointer rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Single reusable modal */}
      <ViewModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        bookData={selectedBook}
      />
    </>
  );
}

export default Books;
