"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import api from "@/lib/api";

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ name: "", category: "", proficiency: 80, icon: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/skills?limit=100");
      setSkills(res.data.data);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditItem(null);
    setForm({ name: "", category: "ai", proficiency: 80, icon: "" });
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setForm({ name: item.name, category: item.category || "", proficiency: item.proficiency, icon: item.icon || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem) {
        await api.put(`/skills/${editItem.id}`, form);
      } else {
        await api.post("/skills", form);
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      alert(e?.response?.data?.detail || "Error saving");
    } finally { setSaving(false); }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try { await api.delete(`/skills/${item.id}`); load(); } catch {}
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "category", label: "Category" },
    { key: "proficiency", label: "Proficiency", render: (item: any) => `${item.proficiency}%` },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Skills</h1>
      <DataTable columns={columns} data={skills} onEdit={openEdit} onDelete={handleDelete} onAdd={openCreate} loading={loading} />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Skill" : "New Skill"}>
        <div className="space-y-4">
          <div><label className="text-sm font-medium block mb-1">Name</label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Category</label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="ai, development, marketing" /></div>
          <div><label className="text-sm font-medium block mb-1">Proficiency (0-100)</label><Input type="number" min={0} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) || 0 })} /></div>
          <div><label className="text-sm font-medium block mb-1">Icon (emoji)</label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🧠" /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : "Save"}</Button>
        </div>
      </FormModal>
    </div>
  );
}
