import { useEffect, useState, useRef } from "react";
import ViewModal from "./VewModal";
import AddEdit from "./AddEdit";

function Books() {
  const [data, setData] = useState([]);
  const isAlreadyCall = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);

  // API call
  async function getAllBooks() {
    if (isAlreadyCall.current) return;
    isAlreadyCall.current = true;

    const API_URL = "http://127.0.0.1:8000/books";
    const res = await fetch(API_URL);
    const result = await res.json();
    setData(result);
  }

  useEffect(() => {
    const initAPI = () => {
      getAllBooks();
    };

    initAPI();
  }, []);

  function handleView(item) {
    setIsModalOpen(true);
    setSelectedBook(item);
  }

  function addEditHandle() {
    setIsAddEditModalOpen(true);
  }

  async function handleDelete(id) {
    try {
      const isConfirmed = confirm("Are you sure?");

      if (!isConfirmed) return;

      const API_URL = `http://127.0.0.1:8000/delete/${id}`;
      const res = await fetch(API_URL, { method: "delete" });
      const result = await res.json();
      if (result.status_code == 200) {
        setData(data.filter((item) => item.id != id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Books Library
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage and organize your book collection.
              </p>
            </div>

            <button
              onClick={() => addEditHandle()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-700 hover:shadow-lg hover:shadow-emerald-600/30 active:translate-y-0"
            >
              <span className="text-lg leading-none">+</span>
              Add New Record
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  All Books
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Your complete book collection
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {data.length} Records
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">S.R.</th>
                    <th className="px-6 py-4 font-semibold">Book Name</th>
                    <th className="px-6 py-4 font-semibold">Description</th>
                    <th className="px-6 py-4 font-semibold">Author</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="group transition-colors duration-200 hover:bg-slate-50/80"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800 transition-colors group-hover:text-blue-700">
                          {item.name}
                        </span>
                      </td>

                      <td className="max-w-xs px-6 py-4 text-slate-500">
                        <span className="block truncate">
                          {item.description.length > 50
                            ? item.description.slice(0, 50) + " ..."
                            : item.description}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        {item.author}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="font-semibold text-emerald-700">
                          ₹{item.price}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                          {item.type}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(item)}
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            View
                          </button>

                          <button className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-all duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white">
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white"
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

            {/* Empty State */}
            {data.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                  📚
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  No books found
                </h3>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Your library is currently empty. Add your first book to get
                  started.
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 text-right text-xs text-slate-400">
            Books Management System
          </p>
        </div>
      </div>

      {/* Single reusable modal */}
      <ViewModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        bookData={selectedBook}
      />

      <AddEdit
        isOpen={isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
      />
    </>
  );
}

export default Books;
