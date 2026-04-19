"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { getCreators, createCreator, updateCreator, deleteCreator } from "@/lib/api";
import type { Creator } from "@/types";
import Nav from "@/components/nav";
import Modal from "@/components/modal";
import Confirm from "@/components/confirm";
import { Pencil, Trash2, Plus } from "lucide-react";

type FormData = {
  name: string;
  description: string;
  avatarUrl: string;
};

const emptyForm: FormData = { name: "", description: "", avatarUrl: "" };

export default function CreatorsView() {
  const router = useRouter();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<null | "create" | "edit">(null);
  const [editTarget, setEditTarget] = useState<Creator | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Creator | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCreators(await getCreators());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login/");
      return;
    }
    load();
  }, [router, load]);

  function openCreate() {
    setForm(emptyForm);
    setModal("create");
  }

  function openEdit(c: Creator) {
    setEditTarget(c);
    setForm({ name: c.name, description: c.description, avatarUrl: c.avatarUrl ?? "" });
    setModal("edit");
  }

  function closeModal() {
    setModal(null);
    setEditTarget(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (modal === "create") {
        await createCreator({ name: form.name, description: form.description, avatarUrl: form.avatarUrl || undefined });
      } else if (modal === "edit" && editTarget) {
        await updateCreator(editTarget.id, { name: form.name, description: form.description, avatarUrl: form.avatarUrl || undefined });
      }
      closeModal();
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCreator(deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (e) {
      setError((e as Error).message);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">Creators</h1>
          <button onClick={openCreate} className="flex items-center gap-1.5 bg-white text-black rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-white/90 transition-colors">
            <Plus size={14} /> Add Creator
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4 text-red-400/60 hover:text-red-400">✕</button>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-white/40">Loading…</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/40 uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {creators.length === 0 ? (
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-white/40">No creators yet</td></tr>
                ) : creators.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white">{c.name}</td>
                    <td className="px-4 py-3 text-white/55 truncate max-w-xs">{c.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(c)} className="text-white/40 hover:text-white transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteTarget(c)} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {modal && (
        <Modal title={modal === "create" ? "Add Creator" : "Edit Creator"} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="space-y-3">
            {(["name", "avatarUrl"] as const).map((field) => (
              <div key={field}>
                <label className="mb-1 block text-xs text-white/55 capitalize">{field === "avatarUrl" ? "Avatar URL" : field}</label>
                <input
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  required={field === "name"}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25"
                />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs text-white/55">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25 resize-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm text-white/55 hover:text-white">Cancel</button>
              <button type="submit" disabled={saving} className="bg-white text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Confirm
          message={`Are you sure you want to delete "${deleteTarget.name}"? This will also delete all their repos and skills.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </>
  );
}
