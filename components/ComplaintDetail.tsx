import React, { useState } from 'react';
import type { Complaint, ComplaintStatus, Comment } from '../types';
import { IconArrowLeft, IconMapPin, IconCurrencyRupee, IconTag, IconArrowUp, IconArrowDown } from './common/Icon';
import { useAuth } from '../contexts/AuthContext';

interface ComplaintDetailProps {
  complaint: Complaint;
  onBack: () => void;
  onVote: (complaintId: number, voteType: 'up' | 'down') => void;
  onAddComment: (complaintId: number, text: string) => void;
}

const statusStyles: Record<ComplaintStatus, string> = {
    Filed: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
    Validated: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700',
    Escalated: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
    'In Investigation': 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700',
    Resolved: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
    Closed: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600',
    Rejected: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
};

const CommentForm: React.FC<{ onSubmit: (text: string) => void }> = ({ onSubmit }) => {
    const [text, setText] = useState('');
    const { user } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && user) {
            onSubmit(text);
            setText('');
        }
    };

    if (!user) return null;

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex space-x-3">
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Add your comment..."
                className="flex-grow px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">Post</button>
        </form>
    );
};


export const ComplaintDetail: React.FC<ComplaintDetailProps> = ({ complaint, onBack, onVote, onAddComment }) => {
  const priceDiff = complaint.mrp ? complaint.reportedPrice - complaint.mrp : null;
  const priceDiffPct = complaint.mrp ? ((complaint.reportedPrice - complaint.mrp) / complaint.mrp * 100).toFixed(0) : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold mb-6">
        <IconArrowLeft className="w-5 h-5" />
        <span>Back to List</span>
      </button>

      <div className="flex flex-col md:flex-row justify-between md:items-center border-b dark:border-slate-700 pb-4 mb-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">TICKET #{complaint.ticketId}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{complaint.itemName}</h2>
          <p className="text-slate-600 dark:text-slate-300">Complaint against <span className="font-semibold">{complaint.vendorName}</span> on Train <span className="font-semibold">{complaint.trainNo}</span></p>
        </div>
        <div className={`mt-4 md:mt-0 text-lg font-bold px-4 py-2 rounded-lg border ${statusStyles[complaint.status]}`}>
          Status: {complaint.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Complaint Details</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded-md">{complaint.description}</p>
          </div>
          
          {complaint.evidenceUrl && (
            <div>
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Evidence</h4>
              <img src={complaint.evidenceUrl} alt="Evidence for complaint" className="rounded-lg shadow-md max-w-full h-auto border dark:border-slate-700" />
            </div>
          )}

          <div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Community Discussion</h3>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  {complaint.comments.map(comment => (
                      <div key={comment.id} className="border-b border-slate-200 dark:border-slate-700 py-3 last:border-b-0">
                          <p className="text-slate-800 dark:text-slate-200">{comment.text}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">by {comment.user.name} on {new Date(comment.timestamp).toLocaleDateString()}</p>
                      </div>
                  ))}
                  {complaint.comments.length === 0 && <p className="text-slate-500 dark:text-slate-400 text-sm">No comments yet.</p>}
                  <CommentForm onSubmit={(text) => onAddComment(complaint.id, text)} />
              </div>
          </div>

        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Community Validation</h3>
            <div className="flex items-center space-x-4">
                <button onClick={() => onVote(complaint.id, 'up')} className="flex items-center space-x-2 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-4 py-2 rounded-lg hover:bg-green-200 dark:hover:bg-green-900 transition">
                    <IconArrowUp className="w-5 h-5"/> <span>Upvote</span> <strong>({complaint.upvotes})</strong>
                </button>
                 <button onClick={() => onVote(complaint.id, 'down')} className="flex items-center space-x-2 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition">
                    <IconArrowDown className="w-5 h-5"/> <span>Downvote</span> <strong>({complaint.downvotes})</strong>
                </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Summary</h3>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center">
                  <IconTag className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-3" />
                  <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Item</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{complaint.itemName}</p>
                  </div>
              </div>
              <div className="flex items-center">
                  <IconCurrencyRupee className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-3" />
                  <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Price Charged</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">₹{complaint.reportedPrice}</p>
                  </div>
              </div>
              {complaint.mrp && (
                  <div className="flex items-center">
                      <IconTag className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-3" />
                      <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">MRP</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">₹{complaint.mrp}</p>
                      </div>
                  </div>
              )}
              {priceDiff !== null && priceDiff > 0 && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900/50 dark:border-red-500 dark:text-red-300 p-3 rounded">
                      <p className="font-bold">Overcharged by ₹{priceDiff} ({priceDiffPct}%)</p>
                  </div>
              )}
              {complaint.geolocation && (
                <div className="flex items-center pt-2">
                  <IconMapPin className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-3" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{complaint.geolocation.lat.toFixed(4)}, {complaint.geolocation.lng.toFixed(4)}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 pt-2">
              <p>Filed by: <span className="font-medium text-slate-600 dark:text-slate-300">{complaint.user.name}</span></p>
              <p>Date: <span className="font-medium text-slate-600 dark:text-slate-300">{new Date(complaint.timestamp).toLocaleString()}</span></p>
            </div>
          </div>

          <div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Status History</h3>
              <div className="space-y-3">
                  {complaint.history.map((h, index) => (
                      <div key={index} className="flex items-start text-sm">
                          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 mr-3 border-2 ${statusStyles[h.status]}`}></div>
                          <div>
                              <p className="font-semibold text-slate-800 dark:text-slate-100">{h.status}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(h.timestamp).toLocaleString()}</p>
                              {h.notes && <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1">"{h.notes}"</p>}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};