"use client";

import React from 'react';

// import store
import { useSpreadsheetStore } from '../Store/spreadStore';

// toolbar component
const Toolbar = () => {
  // destructuring undo , redo, currCell , formatCell
  const { formatCell, currentCell, undo, redo } = useSpreadsheetStore();
  
 // we have 2 types of format data one is only a particular cell and second is all cells formate to align left, center, right
  
 //function for single cell format to align text left, center, right 
  const handleFormat = (format) => {
     if (currentCell.row !== undefined && currentCell.col !== undefined) {
      formatCell(currentCell.row, currentCell.col, format);
    }
  };

  // function for format all cells to text align left, center, right
  const handleFormatAll = ( format ,applyAll = false)=>{
    if (applyAll) {
      const cells = Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 10 }, (_, colIndex) => ({ row: rowIndex, col: colIndex }))
      ).flat();
      cells.forEach(({ row, col }) => formatCell(row, col, format));
  }
 }
  // return JSX
  return (
    <div className="flex  p-4 flex-wrap gap-1 justify-center">
      <button onClick={undo} className="px-2 py-1 text-[9px] md:text-[14px] bg-green-500 rounded hover:bg-green-400 text-white transition-all">
        Undo
      </button>
      <button onClick={redo} className="px-2 py-1 text-[9px] md:text-[14px] bg-green-500 rounded hover:bg-green-300 text-white transition-all">
        Redo
      </button>
      <button onClick={() => handleFormat({ align: 'text-left' })} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Align Left
      </button>
      <button onClick={() => handleFormat({ align: 'text-center' })} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Align Center
      </button>
      <button onClick={() => handleFormat({ align: 'text-right' })} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Align Right
      </button>
      <button onClick={() => handleFormat({ fontSize: 'text-sm' })} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Font Small
      </button>
      <button onClick={() => handleFormat({ fontSize: 'text-base' })} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Font Base
      </button>
      <button onClick={() => handleFormat({ fontSize: 'text-xl' })} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Font Large
      </button>
      <button onClick={() => handleFormatAll({ align: 'text-left' }, true)} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Align All Left
      </button>
      <button onClick={() => handleFormatAll({ align: 'text-center' }, true)} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Align All Center
      </button>
      <button onClick={() => handleFormatAll({ align: 'text-right' }, true)} className="px-2 py-1 text-[9px] md:text-[14px] bg-gray-200 rounded hover:bg-gray-300">
        Align All Right
      </button>
    </div>
  );
};

export default Toolbar;
