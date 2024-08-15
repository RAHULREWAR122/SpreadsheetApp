// import zustand package
import create from "zustand";

export const useSpreadsheetStore = create((set) => ({
  // create cells with length of 10000
  cells: Array.from({ length: 10000 }, () =>
    Array.from({ length: 10 }, () => ({
      value: "",
      align: "left",
      fontSize: "text-base",
      validation: "number",
    }))
  ),
  // check current cell
  currentCell: { row: 0, col: 0 },
  // set current cell
  setCurrentCell: (row, col) => set({ currentCell: { row, col } }),
  // it will work when user search and if find data then it work
  highlightedCells: [],
  //update highlighted cell 
  setHighlightedCells: (cells) => set({ highlightedCells: cells }),

  // history and future we use both to update cell , redo and also undo 
  history: [],
  // future 
  future: [],

  // updating cell
  updateCell: (row, col, value) =>
    set((state) => {
      const newCells = state.cells.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? { ...c, value } : c))
      );
      return {
        cells: newCells,
        history: [...state.history, state.cells],
        future: [],
      };
    }),
 
  // formate the cell
  formatCell: (row, col, format) =>
    set((state) => {
      const newCells = state.cells.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? { ...c, ...format } : c))
      );
      return { cells: newCells };
    }),

    // undo cells
  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const [lastState, ...restHistory] = state.history;
      return {
        cells: lastState,
        history: restHistory,
        future: [state.cells, ...state.future],
      };
    }),

  // redo cells 
  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const [nextState, ...restFuture] = state.future;
      return {
        cells: nextState,
        history: [...state.history, state.cells],
        future: restFuture,
      };
    }),
}));
