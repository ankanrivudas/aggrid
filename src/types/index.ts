export interface CandidateData {
    [key: string]: string | number;
}

export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface ApiResponse {
    data: CandidateData[];
    total: number;
}

