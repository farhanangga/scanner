"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function setupCamera() {
      try {
        // Deteksi apakah mobile
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            aspectRatio: 1, // rasio 1:1
            width: { ideal: 640 },
            height: { ideal: 640 },
            facingMode: isMobile ? { exact: "environment" } : "user", // mobile = belakang, laptop = depan
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Tidak bisa akses kamera:", err);
      }
    }

    setupCamera();
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataUrl = canvasRef.current.toDataURL("image/png");
        localStorage.setItem("tempPhoto", dataUrl);
        router.push("/inputFoto/preview");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-black">
      {/* video square 1:1 */}
      <div className="flex-grow flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md aspect-square object-cover"
        />
      </div>

      {/* canvas hidden */}
      <canvas
        ref={canvasRef}
        width={640}
        height={640}
        className="hidden"
      />

      {/* tombol di bawah */}
      <div className="flex justify-center pb-10">
        <button
          onClick={takePhoto}
          className="bg-white h-16 w-16 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
}
