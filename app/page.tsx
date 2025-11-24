import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import MissionControl from "./MissionControl"; 

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

const spaceImages = [
  "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&auto=format&fit=crop&q=60", 
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60", 
  "https://images.unsplash.com/photo-1614728853913-1e22ba61d527?w=500&auto=format&fit=crop&q=60", 
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&auto=format&fit=crop&q=60", 
  "https://images.unsplash.com/photo-1541185933-717852c42243?w=500&auto=format&fit=crop&q=60", 
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60", 
];

export default async function Home() {
  const missions = await prisma.mission.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      {/* --- HEADER --- */}
      <div className="p-5 mb-5 rounded-3 border border-secondary shadow-lg" 
           style={{ 
             background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80')",
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="container-fluid py-2">
          <h1 className="display-4 fw-bold text-white">Mission Control Center 🚀</h1>
          <p className="col-md-8 fs-5 text-light">Monitoring active space exploration missions.</p>
          <hr className="my-4 border-light" />
          <div className="d-flex text-white gap-4">
            <div>
              <small className="text-info text-uppercase">Commander</small>
              <h5 className="mb-0">Juan Jefferson</h5>
            </div>
            <div>
              <small className="text-info text-uppercase">ID Badge</small>
              <h5 className="mb-0">NIM 134</h5>
            </div>
          </div>
        </div>
      </div>

      {/* --- NAVIGASI --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold border-start border-4 border-info ps-3 mb-0">Active Missions</h3>
        <div className="d-flex gap-2">
          <Link href="/create" className="btn btn-primary">
            <span className="me-2">+</span> New Mission
          </Link>
          <Link href="/explore" className="btn btn-outline-info">
            Explore Universe 🔭
          </Link>
        </div>
      </div>

      {/* --- LIST KARTU --- */}
      <div className="row">
        {missions.length === 0 ? (
          <div className="col-12 text-center py-5 text-muted border border-dashed border-secondary rounded">
            <h4>No signal detected.</h4>
            <p>Start a new mission to track data.</p>
          </div>
        ) : (
          missions.map((mission, index) => (
            <div key={mission.id} className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm position-relative" style={{ backgroundColor: "#1e1e1e", overflow: 'hidden' }}>
                
                <div className="position-absolute top-0 end-0 p-2" style={{ zIndex: 999 }}>
                    <MissionControl id={mission.id} />
                </div>

                <div style={{ height: "180px", overflow: "hidden" }}>
                   <img 
                    src={spaceImages[index % spaceImages.length]} 
                    alt="Mission Patch" 
                    className="w-100 h-100"
                    style={{ objectFit: "cover", opacity: 0.8 }}
                   />
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-secondary">{mission.agency}</span>
                    <span className={`badge ${mission.status === 'Success' ? 'bg-success' : mission.status === 'Failed' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                      {mission.status}
                    </span>
                  </div>
                  
                  <h4 className="card-title fw-bold text-white">{mission.name}</h4>
                  <p className="card-text text-muted small text-truncate">
                    {mission.description}
                  </p>

                  <div className="mt-4 d-grid">
                    {/* Tombol Hiasan (Terkunci) sesuai request */}
                    <button type="button" className="btn btn-outline-light btn-sm opacity-50" style={{ cursor: "not-allowed" }}>
                      Access Mission Log 🔒
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}