"use client"
// import useState hook to manage state
import React, { useState } from 'react';
// import cell component
import Cell from './Cell';
// import store
import { useSpreadsheetStore } from '../Store/spreadStore';

const Spreadsheet = () => {
  
  // destructuring 
  const { cells } = useSpreadsheetStore();
  // default page is set
  const [currentPage, setCurrentPage] = useState(0);
  // set 1 page rows
  const ROWS_PER_PAGE = 100;

  // Calculate the start and end index for the current page
  const startIndex = currentPage * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  // Calculate total number of pages based on the number of rows
  const totalPages = Math.ceil(cells.length / ROWS_PER_PAGE);

  // function for handle pagination
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  // return JSX
  return (
    <div className="p-4 w-full">
      <div className="grid grid-cols-[auto_repeat(10,_minmax(0,_1fr))] gap-0">
        {cells.slice(startIndex, endIndex).map((row, rowIndex) => (
          <React.Fragment key={rowIndex + startIndex}>
            <div className="border p-2 md:text-[15px] text-[9px] font-bold text-center">
              {rowIndex + startIndex + 1}
            </div>
            
            {row.map((cell, colIndex) => (
              <Cell key={`${rowIndex + startIndex}-${colIndex}`} row={rowIndex + startIndex} col={colIndex} />
            ))}
          </React.Fragment>
        ))}
      </div>

     {/* control pagination buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="md:px-4 md:py-2 px-2 py-1 md:text-[15px] text-[10px] bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <span className='md:px-4 md:py-2 px-2 py-1 md:text-[15px] text-[10px]'>Page {currentPage + 1} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="md:px-4 md:py-2 px-2 py-1 md:text-[15px] text-[10px] bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Spreadsheet;
