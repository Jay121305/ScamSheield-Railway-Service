import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ComplaintList } from './components/ComplaintList';
import { ComplaintForm } from './components/ComplaintForm';
import { ComplaintDetail } from './components/ComplaintDetail';
import { Login } from './components/auth/Login';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAuth } from './contexts/AuthContext';
import { sampleComplaints } from './constants';

const buildTicketId = (count) => `SCAM-2024-${String(count).padStart(6, '0')}`;

const App = () => {
  const { user } = useAuth();
  const [view, setView] = useState('list');
  const [complaints, setComplaints] = useState(sampleComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  const handleViewChange = (newView, complaint = null) => {
    setView(newView);
    if (complaint) {
      setSelectedComplaint(complaint);
    }
    if (newView !== 'detail') {
      setSelectedComplaint(null);
    }
  };

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setView('detail');
  };

  const handleAddComplaint = (newComplaint) => {
    if (!user) return;
    const timestamp = new Date().toISOString();
    const complaintToAdd = {
      ...newComplaint,
      id: complaints.length + 1,
      ticketId: buildTicketId(complaints.length + 1),
      status: 'Filed',
      timestamp,
      user: { id: user.id, name: user.name },
      upvotes: 0,
      downvotes: 0,
      history: [{ status: 'Filed', timestamp }],
      comments: [],
    };
    setComplaints((prev) => [complaintToAdd, ...prev]);
    setView('list');
  };

  const handleUpdateStatus = (complaintId, newStatus) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: newStatus,
              history: [
                ...complaint.history,
                {
                  status: newStatus,
                  timestamp: new Date().toISOString(),
                  notes: 'Status changed by admin.',
                },
              ],
            }
          : complaint,
      ),
    );
  };

  const handleVote = (complaintId, voteType) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              [voteType === 'up' ? 'upvotes' : 'downvotes']:
                complaint[voteType === 'up' ? 'upvotes' : 'downvotes'] + 1,
            }
          : complaint,
      ),
    );

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint((prev) =>
        prev
          ? {
              ...prev,
              [voteType === 'up' ? 'upvotes' : 'downvotes']:
                prev[voteType === 'up' ? 'upvotes' : 'downvotes'] + 1,
            }
          : null,
      );
    }
  };

  const handleAddComment = (complaintId, text) => {
    if (!user) return;
    const newComment = {
      id: Date.now(),
      user: { id: user.id, name: user.name },
      text,
      timestamp: new Date().toISOString(),
    };
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, comments: [...complaint.comments, newComment] }
          : complaint,
      ),
    );
    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : null,
      );
    }
  };

  const sortedComplaints = useMemo(() => {
    const sorted = [...complaints];
    switch (sortBy) {
      case 'votes':
        sorted.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'overcharge':
        sorted.sort((a, b) => {
          const overchargeA = a.mrp ? a.reportedPrice - a.mrp : -1;
          const overchargeB = b.mrp ? b.reportedPrice - b.mrp : -1;
          return overchargeB - overchargeA;
        });
        break;
      case 'date':
      default:
        sorted.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        break;
    }
    return sorted;
  }, [complaints, sortBy]);

  const renderContent = useCallback(() => {
    if (!user) {
      return <Login />;
    }

    switch (view) {
      case 'form':
        return (
          <ComplaintForm
            onSubmit={handleAddComplaint}
            onCancel={() => handleViewChange('list')}
          />
        );
      case 'detail':
        return selectedComplaint ? (
          <ComplaintDetail
            complaint={selectedComplaint}
            onBack={() => handleViewChange('list')}
            onVote={handleVote}
            onAddComment={handleAddComment}
          />
        ) : (
          <ComplaintList
            complaints={sortedComplaints}
            onSelectComplaint={handleSelectComplaint}
            currentSort={sortBy}
            onSortChange={setSortBy}
          />
        );
      case 'dashboard':
        return (
          <AdminDashboard complaints={complaints} onUpdateStatus={handleUpdateStatus} />
        );
      case 'list':
      default:
        return (
          <ComplaintList
            complaints={sortedComplaints}
            onSelectComplaint={handleSelectComplaint}
            currentSort={sortBy}
            onSortChange={setSortBy}
          />
        );
    }
  }, [view, complaints, sortedComplaints, selectedComplaint, user, sortBy]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      <Header onNavigate={handleViewChange} />
      <main className="container mx-auto p-4 md:p-6">{renderContent()}</main>
      {user && (
        <footer className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
          <p>&copy; 2024 ScamShield Rail. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
};

export default App;
