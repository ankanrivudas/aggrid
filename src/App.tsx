import React from "react";
import CandidateDataTable from "./components/CandidateDataTable";
import MetricsTable from "./components/Ag-Grid-Example";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-700">
      <CandidateDataTable />
      <MetricsTable />
    </div>
  );
};

export default App;
