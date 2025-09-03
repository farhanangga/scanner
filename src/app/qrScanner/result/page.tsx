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
      <header className="fixed w-full bg-[#660066] text-white py-4 px-4 font-bold text-lg shadow text-left">
        QR SCANNER
      </header>

      <div className="flex flex-col items-center justify-center flex-1 gap-4 mt-16">
        <div className="text-black border-2 border-dashed border-gray-400 p-4 rounded-lg break-words w-[200px] text-center">
          {qrData}
        </div>

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
