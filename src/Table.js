import React from "react";
import { useTable } from "react-table";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { useState, useEffect } from 'react'

const DraggableHeader = ({ column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <th
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {column.render('Header')}
        </th>
      )}
    </Draggable>
  );
};



export default function Table({ columns, data,handleOnDragCol }) {
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
    <DragDropContext onDragEnd={handleOnDragCol}>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <Droppable key={index} droppableId='columns' direction="horizontal">
            {(provided) => (
              <tr {...headerGroup.getHeaderGroupProps()} ref={provided.innerRef} {...provided.droppableProps}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <DraggableHeader key={column.id} column={column} index={columnIndex} />
                ))}
                {provided.placeholder}
              </tr>
            )}
          </Droppable>
          ))}
        </thead>
        <Droppable droppableId="rows" direction="vertical">
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
    </table>
    </DragDropContext>
  );
}