import { AgGridColumn, AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const Aggrid = () => {
  let gridApi: { getSelectedNodes: () => any };
  const onGridReady = (params: any) => {
    gridApi = params.api;
  };

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);
  const gridOptions = {
    rowData: rowData,
    onGridReady: onGridReady,
  };

  //  useEffect(() => {
  //      fetch('https://www.ag-grid.com/example-assets/row-data.json') // api calling
  //      .then(result => result.json())
  //      .then(rowData => setRowData(rowData))
  //  }, []);
  return (
    <div>
      <h1>Ag grid draggable rows and columns</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: 300, width: 600, marginBottom: "20px" }}
      >
        <AgGridReact gridOptions={gridOptions} rowDragManaged={true}>
          <AgGridColumn
            field="make"
            sortable={true}
            filter={true}
            rowDrag={true}
          ></AgGridColumn>
          <AgGridColumn
            field="model"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="price"
            sortable={true}
            filter={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};

export default Aggrid;
