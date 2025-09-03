"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const [video, setVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const temp = localStorage.getItem("tempVideo");
    setVideo(temp);

    const saved = JSON.parse(localStorage.getItem("finalVideos") || "[]");
    setVideos(saved);
  }, []);

  const totalVideos = videos.length + (video ? 1 : 0);

  const handleUlangi = () => {
    router.push("/inputVideo/camera");
  };

  const handleSelanjutnya = () => {
    if (video) {
      const existing = JSON.parse(localStorage.getItem("finalVideos") || "[]");
      if (existing.length < 2) {
        existing.push(video);
        localStorage.setItem("finalVideos", JSON.stringify(existing));
      }
    }
    router.push("/inputVideo/camera");
  };

  const handleUlangiSemua = () => {
    localStorage.removeItem("finalVideos");
    localStorage.removeItem("tempVideo");
    router.push("/inputVideo/camera");
  };

  const handleSelesai = () => {
    localStorage.removeItem("finalVideos");
    localStorage.removeItem("tempVideo");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center pb-24">
      <header className="fixed w-full bg-[#660066] text-white py-4 px-4 font-bold text-lg shadow text-left">
        PREVIEW VIDEO
      </header>

      {/* Grid semua video */}
      <div className="w-full pt-15 flex flex-col items-center h-160 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 w-full max-w-xl pt-4 ">
          {videos.map((src: string, i: number) => (
            <video
              key={i}
              src={src}
              controls
              className="w-full aspect-square object-cover rounded-lg shadow"
            />
          ))}

          {video && (
            <video
              src={video}
              controls
              className="w-full aspect-square object-cover rounded-lg shadow border-2 border-purple-700"
            />
          )}
        </div>
      </div>

      {/* Navbar tombol bawah */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex flex-col md:flex-row gap-2 md:gap-4">
        <button
          onClick={handleUlangi}
          className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d]"
        >
          Ulangi Video
        </button>

        {totalVideos < 2 ? (
          <button
            onClick={handleSelanjutnya}
            className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d]"
          >
            Selanjutnya
          </button>
        ) : (
          <button
            onClick={handleSelesai}
            className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d]"
          >
            Selesai
          </button>
        )}

        <button
          onClick={handleUlangiSemua}
          className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d]"
        >
          Ulangi Semua
        </button>
      </div>
    </div>
  );
}
