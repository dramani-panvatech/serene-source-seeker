import React, { useState, useEffect } from "react";
import SessionDialog from "./SessionDialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { getClassSessionsSimpleList } from "@/lib/sessionService";
import { useToast } from "@/components/ui/use-toast";

const PAGE_SIZE = 10;

const SessionList = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editSession, setEditSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line
  }, [page]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await getClassSessionsSimpleList({ pageNumber: page, pageSize: PAGE_SIZE });
      setSessions(res.data || []);
      // If API returns total count, set it here. Otherwise, estimate.
      setTotal(res.totalCount || ((res.data && res.data.length === PAGE_SIZE) ? (page * PAGE_SIZE + 1) : page * PAGE_SIZE));
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to load sessions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditSession(null);
    setDialogOpen(true);
  };

  const handleEdit = (session) => {
    setEditSession(session);
    setDialogOpen(true);
  };

  const handleDelete = (session) => {
    // TODO: Implement delete logic
    setSessions(sessions.filter(s => s.classSessionId !== session.classSessionId));
  };

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => p + 1);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sessions</h2>
        <Button onClick={handleAdd}>Add Session</Button>
      </div>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Service</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Instructor</th>
            <th className="p-2 border">Start</th>
            <th className="p-2 border">End</th>
            <th className="p-2 border">Max</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Currency</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Meeting Link</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={13} className="p-4 text-center">Loading...</td></tr>
          ) : sessions.length === 0 ? (
            <tr><td colSpan={13} className="p-4 text-center">No sessions found.</td></tr>
          ) : sessions.map(session => (
            <tr key={session.classSessionId}>
              <td className="p-2 border">{session.title}</td>
              <td className="p-2 border">{session.description}</td>
              <td className="p-2 border">{session.serviceName}</td>
              <td className="p-2 border">{session.locationName}</td>
              <td className="p-2 border">{session.instructorName}</td>
              <td className="p-2 border">{session.startTime}</td>
              <td className="p-2 border">{session.endTime}</td>
              <td className="p-2 border">{session.maxCapacity}</td>
              <td className="p-2 border">{session.price}</td>
              <td className="p-2 border">{session.currency}</td>
              <td className="p-2 border">{session.notes}</td>
              <td className="p-2 border"><a href={session.meetingLink} target="_blank" rel="noopener noreferrer">Link</a></td>
              <td className="p-2 border">
                <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => handleEdit(session)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => handleDelete(session)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePrev} disabled={page === 1 || loading}>Previous</Button>
        <span>Page {page}</span>
        <Button onClick={handleNext} disabled={loading || (sessions.length < PAGE_SIZE)}>Next</Button>
      </div>
      {dialogOpen && (
        <SessionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSuccess={() => { setDialogOpen(false); fetchSessions(); }}
          session={editSession}
        />
      )}
    </div>
  );
};

export default SessionList; 