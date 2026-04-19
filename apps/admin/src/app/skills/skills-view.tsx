"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { getSkills, getCreators, getRepos, createSkill, updateSkill, deleteSkill } from "@/lib/api";
import type { Skill, Creator, Repo } from "@/types";
import Nav from "@/components/nav";
import Modal from "@/components/modal";
import Confirm from "@/components/confirm";
import { Pencil, Trash2, Plus } from "lucide-react";

type FormData = {
  slug: string;
  description: string;
  url: string;
  creatorId: string;
  repoId: string;
};

const emptyForm: FormData = { slug: "", description: "", url: "", creatorId: "", repoId: "" };

export default function SkillsView() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [filterCreatorId, setFilterCreatorId] = useState("");
  const [filterRepoId, setFilterRepoId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<null | "create" | "edit">(null);
  const [editTarget, setEditTarget] = useState<Skill | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState(false);

  // repos available for the selected filter creator
  const filterRepos = allRepos.filter((r) => !filterCreatorId || r.creatorId === filterCreatorId);
  // repos available inside the form modal
  const formRepos = allRepos.filter((r) => !form.creatorId || r.creatorId === form.creatorId);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [skillsData, creatorsData, reposData] = await Promise.all([getSkills(), getCreators(), getRepos()]);
      setSkills(skillsData);
      setCreators(creatorsData);
      setAllRepos(reposData);
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

  // Reset repo filter when creator filter changes
  function handleFilterCreatorChange(creatorId: string) {
    setFilterCreatorId(creatorId);
    setFilterRepoId("");
  }

  const displayedSkills = skills.filter((s) => {
    if (filterCreatorId && s.creatorId !== filterCreatorId) return false;
    if (filterRepoId && s.repoId !== filterRepoId) return false;
    return true;
  });

  function openCreate() {
    setForm(emptyForm);
    setModal("create");
  }

  function openEdit(s: Skill) {
    setEditTarget(s);
    setForm({ slug: s.slug, description: s.description, url: s.url ?? "", creatorId: s.creatorId, repoId: s.repoId ?? "" });
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
      const payload = {
        slug: form.slug,
        description: form.description,
        url: form.url || undefined,
        creatorId: form.creatorId,
        repoId: form.repoId || undefined,
      };
      if (modal === "create") {
        await createSkill(payload);
      } else if (modal === "edit" && editTarget) {
        await updateSkill(editTarget.id, payload);
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
      await deleteSkill(deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (e) {
      setError((e as Error).message);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  const creatorName = (id: string) => creators.find((c) => c.id === id)?.name ?? id;
  const repoName = (id: string) => allRepos.find((r) => r.id === id)?.name ?? id;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">Skills</h1>
          <button onClick={openCreate} className="flex items-center gap-1.5 bg-white text-black rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-white/90 transition-colors">
            <Plus size={14} /> Add Skill
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-3">
          <select
            value={filterCreatorId}
            onChange={(e) => handleFilterCreatorChange(e.target.value)}
            className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25 [&>option]:bg-neutral-900 [&>option]:text-white"
          >
            <option value="">All creators</option>
            {creators.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          {filterCreatorId && filterRepos.length > 0 && (
            <select
              value={filterRepoId}
              onChange={(e) => setFilterRepoId(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25 [&>option]:bg-neutral-900 [&>option]:text-white"
            >
              <option value="">All repos</option>
              {filterRepos.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          )}
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
                  <th className="px-4 py-3 font-medium">Slug</th>
                  <th className="px-4 py-3 font-medium">Creator</th>
                  <th className="px-4 py-3 font-medium">Repo</th>
                  <th className="px-4 py-3 font-medium">URL</th>
                  <th className="px-4 py-3 font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedSkills.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-6 text-center text-white/40">No skills yet</td></tr>
                ) : displayedSkills.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white font-mono text-xs">{s.slug}</td>
                    <td className="px-4 py-3 text-white/55">{creatorName(s.creatorId)}</td>
                    <td className="px-4 py-3 text-white/55">{s.repoId ? repoName(s.repoId) : <span className="text-white/25">—</span>}</td>
                    <td className="px-4 py-3 text-white/55 max-w-[120px] truncate">
                      {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">{s.url}</a> : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(s)} className="text-white/40 hover:text-white transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteTarget(s)} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
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
        <Modal title={modal === "create" ? "Add Skill" : "Edit Skill"} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs text-white/55">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/55">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25 resize-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/55">URL</label>
              <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/55">Creator</label>
              <select
                value={form.creatorId}
                onChange={(e) => setForm({ ...form, creatorId: e.target.value, repoId: "" })}
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25 [&>option]:bg-neutral-900 [&>option]:text-white"
              >
                <option value="">Select creator…</option>
                {creators.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/55">Repo <span className="text-white/30">(optional)</span></label>
              <select
                value={form.repoId}
                onChange={(e) => setForm({ ...form, repoId: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/25 [&>option]:bg-neutral-900 [&>option]:text-white"
              >
                <option value="">No repo…</option>
                {formRepos.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
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
          message={`Are you sure you want to delete skill "${deleteTarget.slug}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </>
  );
}
