"use client";

import { useEffect, useState } from "react";
import { Check, X, Mail } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import api from "@/lib/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/contact/messages?limit=100");
      setMessages(res.data.data);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    try { await api.put(`/contact/messages/${id}/read`); load(); } catch {}
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete message from "${item.name}"?`)) return;
    try { await api.delete(`/contact/messages/${item.id}`); load(); } catch {}
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    { key: "is_read", label: "Status", render: (item: any) =>
      item.is_read
        ? <span className="text-green-400 text-xs">Read</span>
        : <span className="text-yellow-400 text-xs flex items-center gap-1"><Check className="w-3 h-3" /> New</span>
    },
    { key: "created_at", label: "Date", render: (item: any) => item.created_at ? new Date(item.created_at).toLocaleDateString() : "—" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>

      {/* Unread count */}
      {messages.filter((m) => !m.is_read).length > 0 && (
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Mail className="w-5 h-5 text-yellow-400" />
          <p className="text-sm">
            <span className="font-semibold text-yellow-400">{messages.filter((m) => !m.is_read).length}</span> unread message(s)
          </p>
        </div>
      )}

      <DataTable
        columns={columns}
        data={messages}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Mark as read buttons */}
      {messages.filter((m) => !m.is_read).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {messages.filter((m) => !m.is_read).map((m) => (
            <button
              key={m.id}
              onClick={() => markRead(m.id)}
              className="text-xs px-3 py-1.5 rounded-full glass hover:border-primary/30 transition-all flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              Mark &ldquo;{m.name}&rdquo; as read
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
