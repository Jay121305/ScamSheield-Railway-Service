import React from 'react';
import type { Complaint, ComplaintStatus } from '../types';
import { IconArrowUp, IconArrowDown } from './common/Icon';

interface ComplaintCardProps {
  complaint: Complaint;
  onSelect: () => void;
}

const statusStyles: Record<ComplaintStatus, string> = {
    Filed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Validated: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    Escalated: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'In Investigation': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Closed: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, onSelect }) => {
    const priceDiff = complaint.mrp ? complaint.reportedPrice - complaint.mrp : null;

  return (
    <div 
        onClick={onSelect}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-transparent hover:border-blue-500 dark:hover:border-blue-500"
    >
        <div className="p-5">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Train No: {complaint.trainNo}</p>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{complaint.itemName}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">vs. {complaint.vendorName}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[complaint.status]}`}>
                    {complaint.status}
                </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mt-3 text-sm line-clamp-2">{complaint.description}</p>
            <div className="mt-4 flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                     <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <IconArrowUp className="w-4 h-4" />
                        <span>{complaint.upvotes}</span>
                    </div>
                     <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
                        <IconArrowDown className="w-4 h-4" />
                        <span>{complaint.downvotes}</span>
                    </div>
                </div>
                {priceDiff !== null && priceDiff > 0 && (
                    <div className="font-bold text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50 px-2 py-1 rounded">
                        Overcharged by ₹{priceDiff}
                    </div>
                )}
            </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 px-5 py-3 text-xs text-slate-500 dark:text-slate-400 rounded-b-lg border-t border-slate-100 dark:border-slate-700">
            <span>Filed by {complaint.user.name} on {new Date(complaint.timestamp).toLocaleDateString()}</span>
        </div>
    </div>
  );
};