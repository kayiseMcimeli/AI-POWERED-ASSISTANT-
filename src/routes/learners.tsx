import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, GraduationCap, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, Pill } from "@/components/ui-kit";

export const Route = createFileRoute("/learners")({
  component: LearnersPage,
});

type Learner = {
  name: string;
  grade: string;
  school: string;
  route: string;
  status: "Active" | "Paused" | "Overdue";
  parent: string;
};

const initialLearners: Learner[] = [
  { name: "Amahle Dlamini", grade: "Grade 7", school: "Rondebosch High", route: "2A", status: "Active", parent: "N. Dlamini" },
  { name: "Sipho Mokoena", grade: "Grade 5", school: "SACS Junior", route: "4B", status: "Active", parent: "T. Mokoena" },
  { name: "Lerato Khumalo", grade: "Grade 9", school: "Westerford", route: "1", status: "Paused", parent: "M. Khumalo" },
  { name: "Kabelo Nkosi", grade: "Grade 3", school: "Micklefield", route: "3", status: "Active", parent: "S. Nkosi" },
  { name: "Zinhle Zulu", grade: "Grade 11", school: "Rustenburg Girls", route: "2A", status: "Active", parent: "P. Zulu" },
  { name: "Thabo Mahlangu", grade: "Grade 4", school: "SACS Junior", route: "4B", status: "Overdue", parent: "R. Mahlangu" },
];

const emptyForm = { name: "", grade: "", school: "", route: "", parent: "", status: "Active" as Learner["status"] };

function LearnersPage() {
  const [learners, setLearners] = useState<Learner[]>(initialLearners);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = learners.filter((l) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [l.name, l.school, l.route, l.grade, l.parent].some((v) => v.toLowerCase().includes(q));
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLearners((prev) => [
      { ...form, name: form.name.trim(), grade: form.grade || "—", school: form.school || "—", route: form.route || "—", parent: form.parent || "—" },
      ...prev,
    ]);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <AppShell>
      <PageHeader
        title="Learners"
        subtitle="Manage the learners you transport daily."
        actions={
          <button
            onClick={() => setOpen(true)}
            className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md"
          >
            <Plus className="h-4 w-4" /> Add learner
          </button>
        }
      />

      <FloatingCard className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-[color:var(--peach-soft)] px-3 py-2 border border-border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search learners, schools, routes…"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <button className="rounded-xl bg-white border border-border px-3 py-2 text-sm">Filter</button>
        </div>
      </FloatingCard>

      <FloatingCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--peach-soft)] text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-4">Learner</th>
                <th className="p-4">Grade</th>
                <th className="p-4">School</th>
                <th className="p-4">Route</th>
                <th className="p-4">Parent</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.name} className="border-t border-border/60">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--lavender)]/40 text-[color:var(--purple-deep)]">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div className="font-medium">{l.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{l.grade}</td>
                  <td className="p-4">{l.school}</td>
                  <td className="p-4">
                    <Pill tone="lavender">Route {l.route}</Pill>
                  </td>
                  <td className="p-4 text-muted-foreground">{l.parent}</td>
                  <td className="p-4">
                    <Pill tone={l.status === "Active" ? "green" : l.status === "Paused" ? "gray" : "red"}>
                      {l.status}
                    </Pill>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-sm text-muted-foreground">
                    No learners match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </FloatingCard>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Add learner</h2>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { k: "name", label: "Full name", placeholder: "e.g. Amahle Dlamini" },
                { k: "grade", label: "Grade", placeholder: "e.g. Grade 7" },
                { k: "school", label: "School", placeholder: "e.g. Rondebosch High" },
                { k: "route", label: "Route", placeholder: "e.g. 2A" },
                { k: "parent", label: "Parent", placeholder: "e.g. N. Dlamini" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">{f.label}</label>
                  <input
                    value={form[f.k as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-border bg-[color:var(--peach-soft)] px-3 py-2 text-sm outline-none focus:border-[color:var(--purple)]"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Learner["status"] })}
                  className="w-full rounded-xl border border-border bg-[color:var(--peach-soft)] px-3 py-2 text-sm outline-none"
                >
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!form.name.trim()}
                className="bg-brand-gradient rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-50"
              >
                Add learner
              </button>
            </div>
          </form>
        </div>
      )}
    </AppShell>
  );
}
