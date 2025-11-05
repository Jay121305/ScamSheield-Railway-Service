import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ComplaintList } from './components/ComplaintList';
import { ComplaintForm } from './components/ComplaintForm';
import { ComplaintDetail } from './components/ComplaintDetail';
import { Login } from './components/auth/Login';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAuth } from './contexts/AuthContext';
import type { Complaint, View, ComplaintStatus, SortOption } from './types';
import { sampleComplaints } from './constants';

const App: React.FC = () => {
  const { user } = useAuth();
  const [view, setView] = useState<View>('list');
  const [complaints, setComplaints] = useState<Complaint[]>(sampleComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');

  const handleViewChange = (newView: View, complaint: Complaint | null = null) => {
    setView(newView);
    if (complaint) {
      setSelectedComplaint(complaint);
    }
    if (newView !== 'detail') {
      setSelectedComplaint(null);
    }
  };

  const handleSelectComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setView('detail');
  };

  const handleAddComplaint = (newComplaint: Omit<Complaint, 'id' | 'ticketId' | 'status' | 'timestamp' | 'user' | 'upvotes' | 'downvotes' | 'history' | 'comments'>) => {
    if (!user) return;
    const complaintToAdd: Complaint = {
      ...newComplaint,
      id: complaints.length + 1,
      ticketId: `SCAM-2024-${String(complaints.length + 1).padStart(6, '0')}`,
      status: 'Filed',
      timestamp: new Date().toISOString(),
      user: { id: user.id, name: user.name },
      upvotes: 0,
      downvotes: 0,
      history: [{ status: 'Filed', timestamp: new Date().toISOString() }],
      comments: [],
    };
    setComplaints(prev => [complaintToAdd, ...prev]);
    setView('list');
  };

  const handleUpdateStatus = (complaintId: number, newStatus: ComplaintStatus) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? {
      ...c,
      status: newStatus,
      history: [...c.history, { status: newStatus, timestamp: new Date().toISOString(), notes: `Status changed by admin.` }]
    } : c));
  };
  
  const handleVote = (complaintId: number, voteType: 'up' | 'down') => {
      setComplaints(prev => prev.map(c => {
          if (c.id === complaintId) {
              return { ...c, [voteType === 'up' ? 'upvotes' : 'downvotes']: c[voteType === 'up' ? 'upvotes' : 'downvotes'] + 1 };
          }
          return c;
      }));
      // Also update the selected complaint if it's the one being voted on
      if(selectedComplaint && selectedComplaint.id === complaintId) {
        setSelectedComplaint(prev => prev ? { ...prev, [voteType === 'up' ? 'upvotes' : 'downvotes']: prev[voteType === 'up' ? 'upvotes' : 'downvotes'] + 1 } : null)
      }
  };

  const handleAddComment = (complaintId: number, text: string) => {
    if(!user) return;
    const newComment = {
        id: Date.now(),
        user: { id: user.id, name: user.name },
        text,
        timestamp: new Date().toISOString(),
    };
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, comments: [...c.comments, newComment] } : c));
    if(selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null);
    }
  };
  
  const sortedComplaints = useMemo(() => {
    const sorted = [...complaints];
    switch(sortBy) {
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
            sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
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
        return <ComplaintForm onSubmit={handleAddComplaint} onCancel={() => handleViewChange('list')} />;
      case 'detail':
        return selectedComplaint ? <ComplaintDetail complaint={selectedComplaint} onBack={() => handleViewChange('list')} onVote={handleVote} onAddComment={handleAddComment} /> : <ComplaintList complaints={sortedComplaints} onSelectComplaint={handleSelectComplaint} currentSort={sortBy} onSortChange={setSortBy} />;
      case 'dashboard':
        return <AdminDashboard complaints={complaints} onUpdateStatus={handleUpdateStatus} />;
      case 'list':
      default:
        return <ComplaintList complaints={sortedComplaints} onSelectComplaint={handleSelectComplaint} currentSort={sortBy} onSortChange={setSortBy} />;
    }
  }, [view, complaints, sortedComplaints, selectedComplaint, user, sortBy]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      <Header onNavigate={handleViewChange} />
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
       {user && (
         <footer className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
            <p>&copy; 2024 ScamShield Rail. All rights reserved.</p>
          </footer>
        )}
    </div>
  );
};

export default App;