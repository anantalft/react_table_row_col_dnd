import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";

import Table from "./Table";
import "./index.css";

function App() {
  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */

  const columns = useMemo(
    () => [
          {
            Header: "Name",
            accessor: "show.name",
          },
          {
            Header: "Type",
            accessor: "show.type",
          },
         {
          Header: "Language",
          accessor: "show.language",
        },
          {
            Header: "Genre(s)",
            accessor: "show.genres",
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",
          },
          {
            Header: "Status",
            accessor: "show.status",
          }
    ],
    []
  );
 
  const handleOnDragEnd = (result) => {
    if (!result?.destination) return

    const tasks = [...data]

    const [reorderedItem] = tasks.splice(result.source.index, 1)

    tasks.splice(result.destination.index, 0, reorderedItem)
    setData(tasks)
}

const handleOnDragCol = (result) => {
  debugger;
  if (!result?.destination) return

  const tcols = [...cols]

  const [reorderedItem] = tcols.splice(result.source.index, 1)

  tcols.splice(result.destination.index, 0, reorderedItem)
  debugger;
  setCols(tcols)
}

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);
  const [cols, setCols] = useState(columns || '');

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={cols} data={data} handleOnDragCol={handleOnDragCol}/>
    </div>
  );
}
export default App;
