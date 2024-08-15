"use client"
// import useEffect and useRef hook
import React, { useEffect, useRef } from 'react';
// import here spread store 
import { useSpreadsheetStore } from '../Store/spreadStore';

// Cell Component
const Cell = ({ row, col }) => {
    // destructuring cells , updateCell, setCurrentCell , highlightedCells
    const { cells, updateCell, setCurrentCell , highlightedCells } = useSpreadsheetStore();
    const cell = cells[row][col];
    const cellRef = useRef(null);
   
    // use useEffect to focus on current cell 
    useEffect(()=>{
      const handleFocus = () => {
        setCurrentCell(row, col);
    };  
      
      //focus set current cell 
      const cellElement = cellRef.current;
      cellElement.addEventListener('focus', handleFocus);
      
      // remove focus on dom or we can say unMounting
      return () => {
        cellElement.removeEventListener('focus', handleFocus);
      };
    }, [row, col, setCurrentCell]);
  
    // handle input in cells 
    const handleInput = (e) => {
      const newValue = e.target.textContent;
      // check validation of cell we need only numeric data if user put correct value then we update cell else give alert to enter valid value
      if (cell.validation === 'number') {
        const isValidNumber = /^-?\d*\.?\d*$/.test(newValue);
        if (isValidNumber || newValue === '') {
          // update cell  
          updateCell(row, col, newValue);
        } else {
          alert('Please enter a valid number');
          // Revert to previous valid value
          e.target.textContent = cell.value;
        }
      } else {
        updateCell(row, col, newValue);
      }
    };
  
    // highlight cell if found in search 
    const isHighlighted = highlightedCells.some(
      // match row and column
      (highlightedCell) => highlightedCell.row === row && highlightedCell.col === col
    );
  
    // return JSX
    return (
      <div
        ref={cellRef}
        className={`border-1 border p-2 min-w-[10px] max-w-[400px] text-left overflow-hidden cursor-text ${cell.align} ${cell.fontSize}  ${isHighlighted ? 'bg-green-500 text-white' : ''}`}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleInput}
        style={{ direction: 'ltr' }}
      >
        {cell.value}
      </div>
    );
  };
  
  export default Cell;
