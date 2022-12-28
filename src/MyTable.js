import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { useQuery } from "react-query";
import { Column } from "primereact/column";
import axios from "axios";

const baseUrl = "https://api.instantwebtools.net/v1/passenger";

function MyTable() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  // Fetch the data for the current page using react-query
  const getData = async (first, rows) => {
    const page = first / rows;
    const resp = await axios.get(`${baseUrl}?page=${page}&size=${rows}`);
    return resp.data;
  };

  const { data, error, isError, isLoading, isFetching } = useQuery(
    ["tableData", { first, rows }],
    () => getData(first, rows),
    {
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: false
    }
  );

  const onPage = (e) => {
    setFirst(e.first);
    setRows(e.rows);
    // qc.invalidateQueries();
  };

  // If the data is still loading, display a loading message
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching the data, display an error message
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // If the data has been successfully fetched, render the table
  return (
    <DataTable
      paginator
      lazy
      value={data?.data}
      first={first}
      rows={rows}
      totalRecords={data?.totalPassengers}
      onPage={onPage}
      rowsPerPageOptions={[5, 10, 20, 30, 50]}
    >
      <Column field="_id" header="ID" />
      <Column field="name" header="NAME" />
      <Column field="trips" header="TRIPS" />
    </DataTable>
  );
}

export { MyTable };
