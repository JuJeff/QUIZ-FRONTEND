import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";

const prisma = new PrismaClient();

export default async function MissionDetail({ params }: { params: { id: string } }) {
  const mission = await prisma.mission.findUnique({
    where: { id: Number(params.id) },
  });

  if (!mission) return notFound();

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          Mission Detail
        </div>
        <div className="card-body">
          <h2 className="card-title">{mission.name}</h2>
          <h5 className="text-muted mb-4">{mission.agency}</h5>
          <p className="card-text lead">{mission.description}</p>
          <div className="alert alert-secondary d-inline-block">
            Status: <strong>{mission.status}</strong>
          </div>
          <br /><br />
          
          {/* Tombol Back */}
          <Link href="/" className="btn btn-outline-primary me-2">
             &larr; Back to List
          </Link>
          
          {/* Tombol Delete (Client Component) */}
          <DeleteButton id={mission.id} />
        </div>
        <div className="card-footer text-muted">
          Recorded at: {new Date(mission.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}