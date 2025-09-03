"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qrData = searchParams.get("data");

  const handleOpenLink = () => {
    if (qrData) {
      window.open(qrData, "_blank"); // langsung buka apapun isinya
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen w-screen relative">
      {/* Header */}
      <header className="Fixed w-full bg-[#660066] text-white py-4 px-4 font-bold text-lg shadow text-left">
        QR SCANNER
      </header>

      {/* Konten Desktop (tengah layar) */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1">
        {/* Hasil scan */}
        <div className="w-[200px]">
          <div className="text-black border-2 border-dashed border-gray-400 p-4 rounded-lg break-words text-center">
            {qrData}
          </div>
        </div>

        {/* Tombol */}
        <div className="flex flex-col gap-4 mt-4 w-[200px]">
          <button
            onClick={() => router.push("/qrScanner/scan")}
            className="bg-[#660066] hover:bg-[#4d004d] text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Scan Lagi
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-[#660066] hover:bg-[#4d004d] text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Kembali
          </button>
          <button
            onClick={handleOpenLink}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Buka Data
          </button>
        </div>
      </div>

      {/* Konten Mobile */}
      <div className="md:hidden mt-6">
        {/* Hasil scan */}
        <div className="mx-4">
          <div className="text-black border-2 border-dashed border-gray-400 p-4 rounded-lg break-words">
            {qrData}
          </div>
        </div>
      </div>

      {/* Tombol Mobile: absolute di bawah */}
      <div className="md:hidden absolute bottom-0 left-0 w-full p-4 flex flex-col gap-4 bg-white">
        <button
          onClick={() => router.push("/qrScanner/scan")}
          className="bg-[#660066] hover:bg-[#4d004d] text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Scan Lagi
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-[#660066] hover:bg-[#4d004d] text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Kembali
        </button>
        <button
          onClick={handleOpenLink}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Buka Data
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
