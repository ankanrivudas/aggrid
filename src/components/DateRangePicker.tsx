import React from 'react';


interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  loading
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-end mb-6">
      <div className="flex flex-col gap-2 min-w-[180px]">
        <label
          htmlFor="startDate"
          className="text-xs font-medium text-slate-500 dark:text-gray-300/70 uppercase tracking-wider"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="px-3 py-2 border border-brown-600/20 dark:border-gray-400/30
                     rounded-base bg-cream-100 dark:bg-charcoal-800
                     text-slate-900 dark:text-gray-200 text-base
                     focus:outline-none focus:border-teal-500 dark:focus:border-teal-300
                     focus:ring-2 focus:ring-teal-500/10 dark:focus:ring-teal-300/10
                     transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2 min-w-[180px]">
        <label
          htmlFor="endDate"
          className="text-xs font-medium text-slate-500 dark:text-gray-300/70 uppercase tracking-wider"
        >
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="px-3 py-2 border border-brown-600/20 dark:border-gray-400/30
                     rounded-base bg-cream-100 dark:bg-charcoal-800
                     text-slate-900 dark:text-gray-200 text-base
                     focus:outline-none focus:border-teal-500 dark:focus:border-teal-300
                     focus:ring-2 focus:ring-teal-500/10 dark:focus:ring-teal-300/10
                     transition-colors"
        />
      </div>

      <button
        onClick={onSearch}
        disabled={loading}
        className="px-6 py-2.5 bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900
                   rounded-base text-base font-medium
                   hover:bg-teal-600 dark:hover:bg-teal-400
                   active:bg-teal-700 dark:active:bg-teal-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-teal-500/40 dark:focus:ring-teal-300/40"
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};

export default DateRangePicker;