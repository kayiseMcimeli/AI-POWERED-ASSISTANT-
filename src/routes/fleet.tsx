import { createFileRoute } from "@tanstack/react-router";
import { Bus, Wrench, Fuel, Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, Pill } from "@/components/ui-kit";

export const Route = createFileRoute("/fleet")({
  component: FleetPage,
});

type Vehicle = {
  name: string;
  driver: string;
  seats: number;
  status: "Available" | "On route" | "Maintenance" | "Long-distance";
  fuel: number;
  next: string;
};

const initialFleet: Vehicle[] = [
  { name: "Toyota Quantum · CA 123-456", driver: "Bongani M.", seats: 15, status: "On route", fuel: 72, next: "Service in 800km" },
  { name: "Toyota Hiace · CA 789-012", driver: "Nomsa T.", seats: 14, status: "Available", fuel: 90, next: "OK" },
  { name: "Nissan NV350 · CA 345-678", driver: "Sipho K.", seats: 16, status: "Maintenance", fuel: 30, next: "Brake pads" },
  { name: "Mercedes Sprinter · CA 901-234", driver: "Lindiwe P.", seats: 22, status: "Long-distance", fuel: 55, next: "Trip to Mthatha" },
  { name: "Toyota Quantum · CA 567-890", driver: "Unassigned", seats: 15, status: "Available", fuel: 100, next: "OK" },
];

const emptyForm = {
  name: "",
  driver: "",
  seats: "15",
  status: "Available" as Vehicle["status"],
  fuel: "100",
  next: "OK",
};

function FleetPage() {
  const [fleet, setFleet] = useState<Vehicle[]>(initialFleet);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setFleet((prev) => [
      {
        name: form.name.trim(),
        driver: form.driver.trim() || "Unassigned",
        seats: Number(form.seats) || 0,
        status: form.status,
        fuel: Math.max(0, Math.min(100, Number(form.fuel) || 0)),
        next: form.next.trim() || "OK",
      },
      ...prev,
    ]);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <AppShell>
      <PageHeader
        title="Fleet"
        subtitle="Vehicles, drivers and maintenance at a glance."
        actions={
          <button
            onClick={() => setOpen(true)}
            className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md"
          >
            <Plus className="h-4 w-4" /> Add vehicle
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {fleet.map((v) => (
          <FloatingCard key={v.name}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-white">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{v.name}</div>
                    <div className="text-xs text-muted-foreground">Driver: {v.driver}</div>
                  </div>
                </div>
              </div>
              <Pill
                tone={
                  v.status === "Available"
                    ? "green"
                    : v.status === "Maintenance"
                    ? "red"
                    : "lavender"
                }
              >
                {v.status}
              </Pill>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[color:var(--peach-soft)] p-3">
                <div className="text-xs text-muted-foreground">Seats</div>
                <div className="font-semibold">{v.seats}</div>
              </div>
              <div className="rounded-xl bg-[color:var(--peach-soft)] p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Fuel className="h-3 w-3" /> Fuel
                </div>
                <div className="mt-1 h-2 rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${v.fuel}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Wrench className="h-3 w-3" /> {v.next}
            </div>
          </FloatingCard>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Add vehicle</h2>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <Field label="Vehicle" placeholder="e.g. Toyota Quantum · CA 123-456"
                value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Driver" placeholder="e.g. Bongani M."
                value={form.driver} onChange={(v) => setForm({ ...form, driver: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Seats" type="number" placeholder="15"
                  value={form.seats} onChange={(v) => setForm({ ...form, seats: v })} />
                <Field label="Fuel %" type="number" placeholder="100"
                  value={form.fuel} onChange={(v) => setForm({ ...form, fuel: v })} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Vehicle["status"] })}
                  className="w-full rounded-xl border border-border bg-[color:var(--peach-soft)] px-3 py-2 text-sm outline-none"
                >
                  <option>Available</option>
                  <option>On route</option>
                  <option>Maintenance</option>
                  <option>Long-distance</option>
                </select>
              </div>
              <Field label="Next service / note" placeholder="e.g. Service in 800km"
                value={form.next} onChange={(v) => setForm({ ...form, next: v })} />
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
                Add vehicle
              </button>
            </div>
          </form>
        </div>
      )}
    </AppShell>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-[color:var(--peach-soft)] px-3 py-2 text-sm outline-none focus:border-[color:var(--purple)]"
      />
    </div>
  );
}
