import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, GraduationCap } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, Pill } from "@/components/ui-kit";

export const Route = createFileRoute("/learners")({
  component: LearnersPage,
});

const learners = [
  { name: "Amahle Dlamini", grade: "Grade 7", school: "Rondebosch High", route: "2A", status: "Active", parent: "N. Dlamini" },
  { name: "Sipho Mokoena", grade: "Grade 5", school: "SACS Junior", route: "4B", status: "Active", parent: "T. Mokoena" },
  { name: "Lerato Khumalo", grade: "Grade 9", school: "Westerford", route: "1", status: "Paused", parent: "M. Khumalo" },
  { name: "Kabelo Nkosi", grade: "Grade 3", school: "Micklefield", route: "3", status: "Active", parent: "S. Nkosi" },
  { name: "Zinhle Zulu", grade: "Grade 11", school: "Rustenburg Girls", route: "2A", status: "Active", parent: "P. Zulu" },
  { name: "Thabo Mahlangu", grade: "Grade 4", school: "SACS Junior", route: "4B", status: "Overdue", parent: "R. Mahlangu" },
];

function LearnersPage() {
  return (
    <AppShell>
      <PageHeader
        title="Learners"
        subtitle="Manage the learners you transport daily."
        actions={
          <button className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md">
            <Plus className="h-4 w-4" /> Add learner
          </button>
        }
      />

      <FloatingCard className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-[color:var(--peach-soft)] px-3 py-2 border border-border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
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
              {learners.map((l) => (
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
            </tbody>
          </table>
        </div>
      </FloatingCard>
    </AppShell>
  );
}
