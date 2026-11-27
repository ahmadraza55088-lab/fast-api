"use client";
import { useState } from "react";
import { Modal } from "@heroui/react";

function AddEdit({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    type: "",
    description: "",
  });

  async function handleForm(e) {
    e.preventDefault();
    try {
      const API_URL = "http://localhost:8000/create-book";
      const res = await fetch(API_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.status_code == 200) {
        alert(result.message);
      } else {
        console.error("Internal server error!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function onChangeInput(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[460px] rounded-2xl shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="px-6 pt-6 pb-3">
              <div>
                <Modal.Heading className="text-xl font-bold text-gray-900">
                  Add New Book
                </Modal.Heading>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in the details below to add a new book.
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="px-6 py-4">
              <form className="space-y-4" onSubmit={handleForm}>
                {/* Book Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Book Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter book name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={formData.name}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    placeholder="Enter book author"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={formData.author}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                {/* Price & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="₹ 0.00"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      value={formData.price}
                      onChange={(e) => onChangeInput(e)}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Book Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      placeholder="e.g. Fiction"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      value={formData.type}
                      onChange={(e) => onChangeInput(e)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Write a short description about the book..."
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    value={formData.description}
                    onChange={(e) => onChangeInput(e)}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Book
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default AddEdit;
