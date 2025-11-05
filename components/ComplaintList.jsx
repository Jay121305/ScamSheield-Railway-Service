import React from 'react';
import PropTypes from 'prop-types';
import { ComplaintCard } from './ComplaintCard';

export const ComplaintList = ({ complaints, onSelectComplaint, currentSort, onSortChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b-2 border-slate-200 dark:border-slate-700 pb-2">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">Recent Complaints</h2>
        <div>
          <label htmlFor="sort-by" className="text-sm font-medium text-slate-600 dark:text-slate-400 mr-2">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={currentSort}
            onChange={(event) => onSortChange(event.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-1.5 px-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="date">Newest First</option>
            <option value="votes">Most Upvoted</option>
            <option value="overcharge">Highest Overcharge</option>
          </select>
        </div>
      </div>

      {complaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onSelect={() => onSelectComplaint(complaint)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow">
          <p className="text-slate-500 dark:text-slate-400">
            No complaints filed yet. Be the first to report an issue!
          </p>
        </div>
      )}
    </div>
  );
};

ComplaintList.propTypes = {
  complaints: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectComplaint: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
