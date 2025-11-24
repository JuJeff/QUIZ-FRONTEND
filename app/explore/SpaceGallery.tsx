"use client";

import { useState } from "react";

interface NasaPhoto {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  title: string;
  url: string;
}

export default function SpaceGallery({ photos }: { photos: NasaPhoto[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<NasaPhoto>(photos[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // --- CONFIG: IKON STIKER LUCU (Tanpa Label Teks) ---
  const getCardStyle = (index: number) => {
    const types = [
      // Index 0: ROCKET (Pink)
      { 
        color: "#ff9ecd", 
        imgUrl: "https://cdn-icons-png.flaticon.com/512/3212/3212567.png", 
        border: "dashed" 
      },
      // Index 1: UFO (Biru)
      { 
        color: "#a0e7e5", 
        imgUrl: "https://cdn-icons-png.flaticon.com/512/3212/3212629.png", 
        border: "double" 
      },
      // Index 2: PLANET (Kuning)
      { 
        color: "#fbe7b2", 
        imgUrl: "https://cdn-icons-png.flaticon.com/512/3212/3212604.png", 
        border: "dotted" 
      },
      // Index 3: MOON (Hijau)
      { 
        color: "#b4f8c8", 
        imgUrl: "https://cdn-icons-png.flaticon.com/512/3212/3212538.png", 
        border: "solid" 
      }
    ];
    return types[index % 4];
  };

  const activeStyle = getCardStyle(selectedIndex);

  return (
    <div className="d-flex flex-column align-items-center justify-content-between" style={{ height: "85vh" }}>
      
      {/* --- BAGIAN ATAS: LAYAR UTAMA --- */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center w-100 p-2">
        <div 
          className="card bg-black shadow-lg overflow-hidden position-relative"
          style={{ 
            width: "100%", 
            maxWidth: "1100px", 
            height: "550px", 
            border: `3px solid ${activeStyle.color}`, 
            boxShadow: `0 0 40px ${activeStyle.color}40`, 
            borderRadius: "25px"
          }}
        >
          <div className="row g-0 h-100">
            
            {/* KIRI: IMAGE VIEWER */}
            <div className="col-md-8 position-relative h-100 bg-black d-flex align-items-center justify-content-center border-end border-secondary">
              
              {/* Background Icon Besar (Transparan) */}
              <img 
                src={activeStyle.imgUrl} 
                alt="bg-icon"
                className="position-absolute"
                style={{ width: "300px", opacity: 0.1, filter: "grayscale(0%)" }}
              />

              {selectedPhoto.media_type === "image" ? (
                <img 
                  src={selectedPhoto.hdurl ? selectedPhoto.hdurl : selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  className="w-100 h-100"
                  style={{ objectFit: "contain", zIndex: 10 }}
                />
              ) : (
                <div className="text-center text-white" style={{ zIndex: 10 }}>
                  <span className="display-1">🎥</span>
                  <p className="mt-2">VIDEO CONTENT</p>
                  <a href={selectedPhoto.url} target="_blank" className="btn btn-light rounded-pill px-4">
                    Watch Video
                  </a>
                </div>
              )}
            </div>

            {/* KANAN: PENJELASAN (Tanpa Tombol Download) */}
            <div className="col-md-4 d-flex flex-column h-100 bg-dark">
              <div className="p-4 overflow-auto custom-scroll" style={{ height: "100%" }}>
                
                {/* Header dengan Stiker Kecil */}
                <div className="d-flex align-items-center gap-2 mb-3">
                   <img src={activeStyle.imgUrl} width="50" height="50" alt="icon" />
                   <div>
                      <small className="text-white-50 d-block" style={{fontSize: "0.7rem"}}>DATE: {selectedPhoto.date}</small>
                      <h5 className="fw-bold text-white mb-0" style={{ fontFamily: 'sans-serif' }}>
                        {selectedPhoto.title}
                      </h5>
                   </div>
                </div>
                <hr style={{ borderColor: activeStyle.color, opacity: 0.5 }} />

                {/* Deskripsi */}
                <p className="small text-light" style={{ lineHeight: "1.8", textAlign: "justify", color: "#ddd" }}>
                  {selectedPhoto.explanation || "No description provided."}
                </p>

                {/* Tombol Download SUDAH DIHAPUS */}
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* --- BAGIAN BAWAH: KARTU STIKER (Tanpa Label Teks) --- */}
      <div className="container-fluid pb-3">
        
        <div className="d-flex justify-content-center gap-3 overflow-auto py-2" style={{ scrollbarWidth: "none" }}>
          {photos.map((photo, index) => {
            const style = getCardStyle(index);
            const isActive = selectedIndex === index;

            return (
              <div 
                key={index}
                onClick={() => {
                  setSelectedPhoto(photo);
                  setSelectedIndex(index);
                }}
                className="card cursor-pointer position-relative bg-black"
                style={{ 
                  width: "100px", 
                  height: "130px", 
                  border: `2px ${style.border} ${style.color}`,
                  borderRadius: "15px",
                  // Efek miring hanya jika aktif
                  transform: isActive ? "translateY(-15px) rotate(-3deg)" : "rotate(0deg)", 
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: isActive ? `0 0 20px ${style.color}` : "none",
                  flexShrink: 0
                }}
              >
                <div className="d-flex flex-column align-items-center justify-content-center h-100 p-2">
                   
                   {/* Ikon Stiker */}
                   <div style={{ marginBottom: "10px" }}>
                      <img 
                        src={style.imgUrl} 
                        alt="sticker" 
                        style={{ width: "45px", height: "45px", objectFit: "contain", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.2))" }} 
                      />
                   </div>
                   
                   {/* Thumbnail Foto NASA */}
                   <div style={{ width: "100%", height: "45px", borderRadius: "10px", overflow: "hidden", border: "1px solid #555" }}>
                     <img 
                      src={photo.url} 
                      className="w-100 h-100" 
                      style={{ objectFit: "cover", filter: isActive ? "none" : "grayscale(80%)" }}
                      alt="thumb" 
                     />
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}