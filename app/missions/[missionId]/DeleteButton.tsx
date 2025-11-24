"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to abort (delete) this mission?")) {
      await fetch(`/api/missions/${id}`, { method: "DELETE" });
      router.push("/");
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete Mission
    </button>
  );
}