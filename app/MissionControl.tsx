"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MissionControl({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Konfirmasi sebelum hapus (biar aman)
    if (confirm("WARNING: Are you sure you want to scrub this mission from database?")) {
      await fetch(`/api/missions/${id}`, { method: "DELETE" });
      router.refresh(); // Refresh halaman otomatis
    }
  };

  return (
    <div className="d-flex gap-2" style={{ zIndex: 50 }}>
      {/* Tombol Edit (Kuning/Warning) */}
      <Link href={`/edit/${id}`} className="btn btn-sm btn-warning fw-bold text-dark" style={{ fontSize: "0.7rem" }}>
        EDIT ✏️
      </Link>
      
      {/* Tombol Delete (Merah/Danger) */}
      <button 
        onClick={handleDelete} 
        className="btn btn-sm btn-danger fw-bold" 
        style={{ fontSize: "0.7rem" }}
      >
        DEL 🗑️
      </button>
    </div>
  );
}