"use client";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!videoRef.current) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const preferredCamera = isMobile ? "environment" : "user";

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        qrScanner.stop();
        router.push(`/qrScanner/result?data=${encodeURIComponent(result.data)}`);
      },
      { preferredCamera }
    );

    qrScanner.start();
    qrScannerRef.current = qrScanner;

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy(); // optional: release semua resource
        qrScannerRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center mt-40 ">
      {/* video square */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-sm aspect-square object-cover shadow"
      />
    </div>
  );
}
