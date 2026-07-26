"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import api from "@/lib/api";

export default function AdminTestimonials() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ client_name: "", client_role: "", client_company: "", content: "", rating: 5 });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { const res = await api.get("/testimonials?limit=100"); setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditItem(null); setForm({ client_name: "", client_role: "", client_company: "", content: "", rating: 5 }); setModalOpen(true); };
  const openEdit = (item: any) => { setEditItem(item); setForm({ client_name: item.client_name, client_role: item.client_role || "", client_company: item.client_company || "", content: item.content, rating: item.rating }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem) await api.put(`/testimonials/${editItem.id}`, form);
      else await api.post("/testimonials", form);
      setModalOpen(false); load();
    } catch (e: any) { alert(e?.response?.data?.detail || "Error saving"); } finally { setSaving(false); }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete testimonial from "${item.client_name}"?`)) return;
    try { await api.delete(`/testimonials/${item.id}`); load(); } catch {}
  };

  const columns = [
    { key: "client_name", label: "Client", sortable: true },
    { key: "rating", label: "Rating", render: (item: any) => "★".repeat(item.rating) + "☆".repeat(5 - item.rating) },
    { key: "content", label: "Review", render: (item: any) => <span className="text-muted text-xs line-clamp-1">{item.content}</span> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Testimonials</h1>
      <DataTable columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} onAdd={openCreate} loading={loading} />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Testimonial" : "New Testimonial"}>
        <div className="space-y-4">
          <div><label className="text-sm font-medium block mb-1">Client Name</label><Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Role</label><Input value={form.client_role} onChange={(e) => setForm({ ...form, client_role: e.target.value })} placeholder="CEO" /></div>
          <div><label className="text-sm font-medium block mb-1">Company</label><Input value={form.client_company} onChange={(e) => setForm({ ...form, client_company: e.target.value })} placeholder="Acme Inc." /></div>
          <div><label className="text-sm font-medium block mb-1">Content</label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Rating (1-5)</label><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : "Save"}</Button>
        </div>
      </FormModal>
    </div>
  );
}
