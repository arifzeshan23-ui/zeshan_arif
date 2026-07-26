"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import api from "@/lib/api";

export default function AdminCertificates() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ title: "", issuer: "", issue_date: "", credential_url: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { const res = await api.get("/certificates?limit=100"); setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditItem(null); setForm({ title: "", issuer: "", issue_date: "", credential_url: "" }); setModalOpen(true); };
  const openEdit = (item: any) => { setEditItem(item); setForm({ title: item.title, issuer: item.issuer, issue_date: item.issue_date || "", credential_url: item.credential_url || "" }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem) await api.put(`/certificates/${editItem.id}`, form);
      else await api.post("/certificates", form);
      setModalOpen(false); load();
    } catch (e: any) { alert(e?.response?.data?.detail || "Error saving"); } finally { setSaving(false); }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try { await api.delete(`/certificates/${item.id}`); load(); } catch {}
  };

  const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "issuer", label: "Issuer" },
    { key: "issue_date", label: "Date" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Certificates</h1>
      <DataTable columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} onAdd={openCreate} loading={loading} />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Certificate" : "New Certificate"}>
        <div className="space-y-4">
          <div><label className="text-sm font-medium block mb-1">Title</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Issuer</label><Input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Date</label><Input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Credential URL</label><Input value={form.credential_url} onChange={(e) => setForm({ ...form, credential_url: e.target.value })} /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : "Save"}</Button>
        </div>
      </FormModal>
    </div>
  );
}
