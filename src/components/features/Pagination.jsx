import React from 'react'
import { AiOutlineDown, AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
var Items_Per_Page = 8
const Pagination = ({ page, setPage, handlePage, totalItems }) => {

  return (
    <div className="flex items-center justify-between border-2 border-gray-400 rounded-lg bg-white px-4 py-3 sm:px-6 my-8">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * Items_Per_Page + 1}</span> to <span className="font-medium">{page * Items_Per_Page}</span> of{totalItems}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <p
              // href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <AiOutlineLeft className="h-5 w-5" aria-hidden="true" />
            </p>
            {Array.from({ length: Math.ceil(totalItems / Items_Per_Page) }).map(
              (el, index) => (
                <div
                  onClick={e => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative z-10 cursor-pointer inline-flex items-center ${index + 1 === page ? "bg-indigo-600 text-white" : "text-gray-400"}  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>)
            )
            }
            <p
              // href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <AiOutlineRight className="h-5 w-5" aria-hidden="true" />
            </p>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination