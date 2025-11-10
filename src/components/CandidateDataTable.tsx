import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchMockMetricsData } from '../services/api';
import { CandidateData } from '../types';
import DateRangePicker from './DateRangePicker';

ModuleRegistry.registerModules([AllCommunityModule]);

const CandidateDataTable: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [data, setData] = useState<CandidateData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);

    const columnDefs = useMemo<ColDef[]>(() => {
        if (data.length === 0) return [];

        const keys = Object.keys(data[0]);

        return keys.map(key => ({
            field: key,
            headerName: '',
            flex: 1,
            minWidth: 120,
            cellStyle: { padding: '12px' }
        }));
    }, [data]);

    const gridOptions: GridOptions = {
        suppressMovableColumns: true,
        rowHeight: 50,
        domLayout: 'autoHeight',
        animateRows: true,
        suppressCellFocus: true,
        suppressHeaderFocus: true
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        setInitialLoad(false);

        try {
            const result = await fetchMockMetricsData(startDate, endDate);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        fetchData();
    };
    console.log("data:", data)
    return (
        <div className="max-w-[1400px] mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-gray-200 m-0">
                    Candidates Selection Dashboard
                </h1>
            </div>

            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onSearch={handleSearch}
                loading={loading}
            />

            {error && (
                <div className="p-4 mb-4 bg-red-500/10 dark:bg-red-400/15
                        text-red-500 dark:text-red-400
                        rounded-base border border-red-500/20 dark:border-red-400/25">
                    <strong className="font-semibold">Error:</strong> {error}
                </div>
            )}

            {!initialLoad && !loading && data.length === 0 && !error && (
                <div className="p-4 mb-4 bg-brown-600/12 dark:bg-gray-400/15
                        text-slate-500 dark:text-gray-300/70
                        rounded-base border border-brown-600/20 dark:border-gray-400/30">
                    No data found for the selected date range.
                </div>
            )}

            <div className="bg-cream-100 dark:bg-charcoal-800
                      rounded-base shadow-sm
                      border border-brown-600/12 dark:border-gray-400/20
                      overflow-hidden">
                {loading ? (
                    <div className="text-center py-10 text-slate-500 dark:text-gray-300/70">
                        Loading data...
                    </div>
                ) : data.length > 0 ? (
                    <div className="ag-theme-alpine w-full">
                        <AgGridReact
                            rowData={data}
                            columnDefs={columnDefs}
                            gridOptions={gridOptions}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CandidateDataTable;

