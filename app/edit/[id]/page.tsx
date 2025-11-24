"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({
    name: "",
    agency: "",
    description: "",
    status: "Planned"
  });

  // 1. Ambil data lama saat halaman dibuka
  useEffect(() => {
    // Kita panggil API Detail (tapi karena API detail khusus belum dibuat, 
    // kita pakai cara manual fetch list atau buat endpoint GET by ID.
    // Trik Cepat: Kita asumsikan endpoint GET [missionId] belum ada, 
    // jadi kita buat Fetch khusus di useEffect ini manual atau pakai Server Component.
    // Tapi karena ini Client Component, kita fetch saja langsung.
    
    // CATATAN PENTING: Agar codingan Step 1 tadi lengkap, 
    // Anda sebaiknya menambahkan fungsi GET single data di route.ts tadi.
    // TAPI, untuk mempersingkat waktu, kita bisa passing data via cara lain.
    // Agar standar, mari kita asumsikan Anda pakai GET.
    
    // *Supaya gampang, saya buatkan fetch logic sederhana:*
    fetch('/api/missions')
      .then(res => res.json())
      .then(data => {
        // Cari manual data yang ID-nya cocok (Cara Cepat)
        const mission = data.find((m: any) => m.id === parseInt(params.id));
        if (mission) {
          setForm({
            name: mission.name,
            agency: mission.agency,
            description: mission.description,
            status: mission.status
          });
        }
        setLoading(false);
      });
  }, [params.id]);

  // 2. Fungsi Simpan Perubahan (Update)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await fetch(`/api/missions/${params.id}`, {
      method: "PUT", // Pakai method PUT yang baru kita buat
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/"); // Balik ke home
    router.refresh(); // Refresh data
  };

  if (loading) return <div className="text-white text-center mt-5">Loading Mission Data...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg bg-dark text-white border-warning">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0 fw-bold">EDIT MISSION DATA ✏️</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label text-info">Mission Name</label>
              <input 
                required type="text" className="form-control bg-secondary text-white border-0" 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-info">Agency</label>
              <input 
                required type="text" className="form-control bg-secondary text-white border-0"
                value={form.agency} 
                onChange={(e) => setForm({ ...form, agency: e.target.value })} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-info">Current Status</label>
              <select 
                className="form-select bg-secondary text-white border-0"
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
              <label className="form-label text-info">Description</label>
              <textarea 
                required className="form-control bg-secondary text-white border-0" rows={3}
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
              ></textarea>
            </div>
            
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-warning fw-bold w-100">UPDATE DATA</button>
                <Link href="/" className="btn btn-outline-light w-100">CANCEL</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}