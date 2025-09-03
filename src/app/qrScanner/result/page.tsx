"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qrData = searchParams.get("data");

  const handleOpenLink = () => {
    if (typeof window !== "undefined" && qrData) {
      window.open(qrData, "_blank");
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen w-screen relative">
      {/* Header */}
      <header className="fixed w-full bg-[#660066] text-white py-4 px-4 font-bold text-lg shadow text-left">
        QR SCANNER
      </header>

      {/* Isi konten */}
      <div className="flex flex-col items-center justify-center flex-1 gap-4 mt-16 px-4">
        <div className="text-black border-2 border-dashed border-gray-400 p-4 rounded-lg break-words w-[200px] text-center">
          {qrData}
        </div>
      </div>

      {/* Navbar tombol bawah */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex flex-col md:flex-row gap-2 md:gap-4">
        <button
          onClick={() => router.push("/qrScanner/scan")}
          className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d] text-sm md:text-base"
        >
          Scan Lagi
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full py-2 md:py-3 rounded-lg text-white bg-[#660066] hover:bg-[#4d004d] text-sm md:text-base"
        >
          Kembali
        </button>

        <button
          onClick={handleOpenLink}
          className="w-full py-2 md:py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
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