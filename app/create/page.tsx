"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateMission() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    agency: "",
    description: "",
    status: "Planned"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Register New Mission</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Mission Name</label>
              <input 
                required type="text" className="form-control" 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Agency (e.g., NASA)</label>
              <input 
                required type="text" className="form-control"
                value={form.agency} 
                onChange={(e) => setForm({ ...form, agency: e.target.value })} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select 
                className="form-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Planned">Planned</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea 
                required className="form-control" rows={3}
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success me-2">Save Mission</button>
            <Link href="/" className="btn btn-secondary">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}