import React from "react";
import { useTable } from "react-table";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { useState, useEffect } from 'react'

export default function Table({ columns, data, handleOnDragEnd }) {
    const [items, setitems] = useState(data || [])


  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="rows">
                    {(provided) => (
      <tbody {...getTableBodyProps()} {...provided.droppableProps} ref={provided.innerRef}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Draggable key={i} draggableId={i.toString()} index={i}>
                                        {(provided) => (
                    <tr {...row.getRowProps()} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                    </tr>
              )}
              </Draggable>
          );
        })}
         {provided.placeholder}
      </tbody>
         )}
         </Droppable>
     </DragDropContext>
    </table>
  );
}