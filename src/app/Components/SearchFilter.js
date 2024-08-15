"use client";

// import useState hook to manage state
import React, { useState } from 'react';
// import store 
import { useSpreadsheetStore } from '../Store/spreadStore';

const SearchFilter = () => {
  // state for search term
  const [search, setSearch] = useState('');
  // if click to search btn then check and show result
  const [show, setShow] = useState(false);
  // store results , because when we search data then chance that more then 1 or 1+ data matches
  const [results, setResults] = useState([]);
  // destructuring cells and highlighted cell
  const { cells , setHighlightedCells } = useSpreadsheetStore();
  
  // function to search data
  const handleSearch = () => {
    //if input is empty then nothing to show 
    if (search.trim() === '') {
        setResults([]);
        setShow(false);
        setHighlightedCells([]);
        return;
    }
    // if result found then store
    const foundResults = [];
    // go to each cells and check where data is present and collect them
    cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.value.includes(search)) {
          foundResults.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    // if result found then store it in result and show data and highlight cell and keep input box empty
    setResults(foundResults);
    setShow(true);
    setHighlightedCells(foundResults);
    setSearch("")
};

//  return JSX
  return (
    <div className="flex relative  flex-col space-y-2 p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          placeholder="Search..."
          className="border rounded px-4 w-[90%] md:w-[30%] py-2"
        />
        <button 
          onClick={handleSearch} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      
      {show &&  results.length >= 1 && (
        <ul className="mt-4 border absolute bg-white min-w-[250px] overflow-hidden max-w-[700px]  w-[80%] min-h-[200px] top-[60px] rounded p-4">
         <h3 className='text-center font-bold'>Result Found</h3>
        
           <button onClick={()=>setShow(!show)} className='absolute right-[-5px] top-[-4px] rounded-[6px] px-6 py-2 bg-red-600 text-white'>Hide</button>
           {results.map((result, index) => (
            <li key={index} className='flex mb-1 px-4 py-1  items-center'>
             <span>{index+1}. </span> &nbsp; Row: {result.row + 1}, Column: {result.col + 1}
            </li>
          ))}
        </ul>
      )}

      {show && results.length === 0 && (
        <p className="mt-4">No results found.</p>
      )}
    </div>
  );
};

export default SearchFilter;
