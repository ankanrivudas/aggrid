import axios from 'axios';
import { CandidateData } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const fetchMetricsData = async (
    startDate?: string,
    endDate?: string
): Promise<CandidateData[]> => {
    try {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const response = await axios.get<CandidateData[]>(
            `${API_BASE_URL}/metrics?${params.toString()}`
        );

        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to fetch metrics data');
    }
};

// Mock data function - FIXED date filtering
export const fetchMockMetricsData = async (
    startDate?: string,
    endDate?: string
): Promise<CandidateData[]> => {
    console.log('Mock API called with:', { startDate, endDate });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockData: CandidateData[] = [
        { metric: "Total Sales", value: 1200, region: "East", date: "2024-06-01", growth: "12%" },
        { metric: "Active Users", value: 300, region: "West", date: "2024-06-01", growth: "8%" },
        { metric: "Revenue", value: 45000, region: "North", date: "2024-06-02", growth: "15%" },
        { metric: "Conversion Rate", value: 3.5, region: "South", date: "2024-06-02", growth: "5%" },
        { metric: "Page Views", value: 15000, region: "East", date: "2024-06-03", growth: "22%" },
        { metric: "Bounce Rate", value: 42, region: "West", date: "2024-06-03", growth: "-3%" },
        { metric: "Avg Session Duration", value: 245, region: "North", date: "2024-06-04", growth: "18%" },
        { metric: "Customer Satisfaction", value: 4.7, region: "South", date: "2024-06-04", growth: "10%" },
    ];

    // Filter by date range if both dates provided
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        console.log('Filtering dates between:', start, 'and', end);

        const filtered = mockData.filter(item => {
            const itemDate = new Date(item.date as string);
            const isInRange = itemDate >= start && itemDate <= end;
            console.log(`${item.date}: ${isInRange ? 'INCLUDED' : 'EXCLUDED'}`);
            return isInRange;
        });

        console.log(`Filtered ${filtered.length} items from ${mockData.length} total`);
        return filtered;
    }

    console.log(`Returning all ${mockData.length} items (no date filter)`);
    return mockData;
};