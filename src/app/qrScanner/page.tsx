"use client";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const router = useRouter();

  // Inisialisasi Scanner
  useEffect(() => {
    if (!videoRef.current) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const preferredCamera = isMobile ? "environment" : "user";

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        setQrData(result.data);
        qrScanner.stop();
      },
      { preferredCamera }
    );

    qrScanner.start();
    qrScannerRef.current = qrScanner;

    return () => {
      qrScanner.stop();
    };
  }, []);

  // Reset untuk scan lagi
  const handleScanAgain = () => {
    setQrData(null);
    if (qrScannerRef.current) {
      qrScannerRef.current.start();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen w-screen relative">
      {/* Kamera selalu fullscreen */}
      {!qrData ? (
        <div className="w-full h-screen bg-black overflow-hidden shadow-lg">
          <video ref={videoRef} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="mt-6 w-full md:w-[200px]">
          <div className="text-black border-2 border-dashed border-gray-400 p-4 rounded-lg break-words">
            {qrData}
          </div>
        </div>
      )}

      {/* Tombol */}
      {qrData && (
        <>
          {/* Laptop/Desktop: vertikal, di bawah hasil */}
          <div className="hidden md:flex flex-col gap-4 mt-4 w-100 shadow-2xl">
            <button
              onClick={handleScanAgain}
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
          </div>

          {/* Mobile: absolute, tetap di bawah layar */}
          <div className="md:hidden absolute bottom-0 left-0 w-full p-4 flex flex-col gap-4 bg-white">
            <button
              onClick={handleScanAgain}
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
          </div>
        </>
      )}
    </div>
  );
}
