"use client";

import { Modal } from "@heroui/react";

function ViewModal({ isOpen, onOpenChange, bookData }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[460px]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <div className="w-full">
                <p className="text-xs font-semibold uppercase tracking-[2px] text-blue-500">
                  Library Collection
                </p>
                <Modal.Heading className="mt-1 text-xl font-bold">
                  Book Details
                </Modal.Heading>
              </div>
            </Modal.Header>

            <Modal.Body>
              {bookData && (
                <div className="space-y-5">
                  {/* Book Header */}
                  <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-5 text-white shadow-lg">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-blue-200">
                          {bookData.type}
                        </span>

                        <h2 className="mt-4 text-2xl font-bold leading-tight">
                          {bookData.name}
                        </h2>

                        <p className="mt-2 text-sm text-slate-300">
                          By {bookData.author}
                        </p>
                      </div>

                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
                        📚
                      </div>
                    </div>

                    <div className="mt-5 border-t border-white/15 pt-4">
                      <p className="text-xs text-slate-400">Book Price</p>
                      <p className="mt-1 text-3xl font-bold">
                        ₹{bookData.price}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      About this book
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {bookData.description}
                    </p>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                      Additional Information
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-gray-200 p-3">
                        <p className="text-xs text-gray-500">Book ID</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          #{bookData.id}
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 p-3">
                        <p className="text-xs text-gray-500">Category</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {bookData.type}
                        </p>
                      </div>

                      <div className="col-span-2 rounded-xl border border-gray-200 p-3">
                        <p className="text-xs text-gray-500">Author</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {bookData.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default ViewModal;
