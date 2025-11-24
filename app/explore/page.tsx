import Link from "next/link";
import SpaceGallery from "./SpaceGallery";

async function getNasaData() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=8`, {
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Failed to fetch NASA data');
  return res.json();
}

export default async function ExplorePage() {
  const photos = await getNasaData();

  return (
    <div className="container-fluid py-3 px-4" style={{ minHeight: "100vh", backgroundColor: "#0d0d0d" }}>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-white fw-bold">🚀 Deep Space Network</h3>
        <Link href="/" className="btn btn-outline-secondary btn-sm">
          Exit to Command Center
        </Link>
      </div>

      <SpaceGallery photos={photos} />
      
    </div>
  );
}