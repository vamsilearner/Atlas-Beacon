import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const MainGrape: React.FC = () => {
  const [gridApi, setGridApi] = useState<AgGridReact | null>(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const gridOptions = {
    rowData,
    onGridReady,
  };
 

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: "300px",
      width: "auto",
      storageManager: true,
      panels: { defaults: [] },
    });
    const h1 = editor.DomComponents.addComponent({
      tagName: "div",
      content: `
      <table style="width:100%; border: 1px solid #ddd;">
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Item 1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Item 2</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Item 3</td>
      </tr>
    </table>
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
    <AgGridReact
    gridOptions={gridOptions}
      rowSelection="multiple"
      rowDragManaged={true}          
    >
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
    `
  },{type:"component"});

  }, []);
  return (
  <>
  <div id='gjs'>
  </div>
  </>
  )
}

export default MainGrape;
