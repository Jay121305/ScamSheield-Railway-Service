import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ALL_STATUSES = ['Filed', 'Validated', 'Escalated', 'In Investigation', 'Resolved', 'Closed', 'Rejected'];

export const AdminDashboard = ({ complaints, onUpdateStatus }) => {
  const [filter, setFilter] = useState('');

  const filteredComplaints = complaints.filter((complaint) => {
    const term = filter.toLowerCase();
    return (
      complaint.ticketId.toLowerCase().includes(term) ||
      complaint.trainNo.toLowerCase().includes(term) ||
      complaint.vendorName.toLowerCase().includes(term) ||
      complaint.itemName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Ticket, Train, Vendor..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ticket ID
              </th>
              <th scope="col" className="px-6 py-3">
                Train No
              </th>
              <th scope="col" className="px-6 py-3">
                Vendor
              </th>
              <th scope="col" className="px-6 py-3">
                Item
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap"
                >
                  {complaint.ticketId}
                </th>
                <td className="px-6 py-4">{complaint.trainNo}</td>
                <td className="px-6 py-4">{complaint.vendorName}</td>
                <td className="px-6 py-4">{complaint.itemName}</td>
                <td className="px-6 py-4">{complaint.user.name}</td>
                <td className="px-6 py-4">
                  <select
                    value={complaint.status}
                    onChange={(event) => onUpdateStatus(complaint.id, event.target.value)}
                    className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  >
                    {ALL_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  complaints: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};
