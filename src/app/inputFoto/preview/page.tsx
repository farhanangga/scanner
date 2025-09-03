"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const temp = localStorage.getItem("tempPhoto");
    setPhoto(temp);

    const saved = JSON.parse(localStorage.getItem("finalPhotos") || "[]");
    setPhotos(saved);
  }, []);

  const totalPhotos = photos.length + (photo ? 1 : 0);

  const handleUlangi = () => {
    router.push("/inputFoto/camera");
  };

  const handleSelanjutnya = () => {
    if (photo) {
      const existing = JSON.parse(localStorage.getItem("finalPhotos") || "[]");
      if (existing.length < 5) {
        existing.push(photo);
        localStorage.setItem("finalPhotos", JSON.stringify(existing));
      }
    }
    router.push("/inputFoto/camera");
  };

  const handleUlangiSemua = () => {
    localStorage.removeItem("finalPhotos");
    localStorage.removeItem("tempPhoto");
    router.push("/inputFoto/camera");
  };

  const handleSelesai = () => {
  // hapus semua foto (sama kayak ulangi semua)
  localStorage.removeItem("finalPhotos");
  localStorage.removeItem("tempPhoto");

  // redirect ke halaman utama
  router.push("/");
};


  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center pb-24">
    
      <header className="fixed w-full bg-[#660066] text-white py-4 px-4 font-bold text-lg shadow text-left">
        PRIVIEW FOTO
      </header>

        {/* Grid semua foto */}
        <div className="w-full pt-15 flex flex-col items-center h-160 bg-white" >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-4 w-full max-w-xl pt-4 ">
            {photos.map((src: string, i: number) => (
            <img
                key={i}
                src={src}
                alt={`foto-${i}`}
                className="w-full aspect-square object-cover rounded-lg shadow"
            />
            ))}

            {photo && (
            <img
                src={photo}
                alt="preview"
                className="w-full aspect-square object-cover rounded-lg shadow border-2 border-purple-700"
            />
            )}
        </div>
        </div>


        {/* Navbar tombol bawah */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex flex-col md:flex-row gap-2 md:gap-4">
        <button
            onClick={handleUlangi}
            className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d] text-sm md:text-base"
        >
            Ulangi Foto
        </button>

        {totalPhotos < 5 ? (
            <button
            onClick={handleSelanjutnya}
            className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d] text-sm md:text-base"
            >
            Selanjutnya
            </button>
        ) : (
            <button
            onClick={handleSelesai}
            className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d] text-sm md:text-base"
            >
            Selesai
            </button>
        )}

        <button
            onClick={handleUlangiSemua}
            className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d] text-sm md:text-base"
        >
            Ulangi Semua
        </button>
        </div>

    </div>
  );
}
