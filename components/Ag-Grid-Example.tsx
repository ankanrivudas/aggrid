import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type MetricRow = {
  metric: string;
  value: number;
  region: string;
  date: string;
};

const MetricsTable = () => {
  const [rowData] = useState<MetricRow[]>([
    { metric: "Total Sales", value: 1200, region: "East", date: "2024-06-01" },
    { metric: "Active Users", value: 300, region: "West", date: "2024-06-01" },
    { metric: "Revenue", value: 45000, region: "North", date: "2024-06-02" },
  ]);

  const [columnDefs] = useState<ColDef<MetricRow>[]>([
    { field: "metric", flex: 1 },
    { field: "value", flex: 1 },
    { field: "region", flex: 1 },
    { field: "date", flex: 1 },
  ]);

  useEffect(() => {
    console.log("Component mounted");
    console.log("rowData:", rowData);
    console.log("columnDefs:", columnDefs);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>AG Grid Test</h1>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact<MetricRow> rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default MetricsTable;
