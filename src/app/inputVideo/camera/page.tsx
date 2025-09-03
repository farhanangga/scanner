"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function setupCamera() {
      try {
        // Deteksi apakah device mobile
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            aspectRatio: 1, // rasio 1:1
            width: { ideal: 640 },
            height: { ideal: 640 },
            facingMode: isMobile ? { exact: "environment" } : "user", // mobile=belakang, laptop=depan
          },
          audio: true, // aktifkan audio
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9",
        });

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          chunksRef.current = [];
          const videoUrl = URL.createObjectURL(blob);

          // simpan ke localStorage (sementara pakai base64 biar persist)
          const reader = new FileReader();
          reader.onloadend = () => {
            localStorage.setItem("tempVideo", reader.result as string);
            router.push("/inputVideo/preview");
          };
          reader.readAsDataURL(blob);
        };
      } catch (err) {
        console.error("Tidak bisa akses kamera:", err);
      }
    }
    setupCamera();
  }, [router]);

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "inactive") {
      chunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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
          muted
          className="w-full max-w-md aspect-square object-cover"
        />
      </div>

      {/* tombol di bawah */}
      <div className="flex justify-center pb-10 gap-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-red-500 h-16 w-16 rounded-full shadow-lg"
          />
        ) : (
          <button
            onClick={stopRecording}
            className="bg-gray-200 h-16 w-16 rounded-full shadow-lg"
          />
        )}
      </div>
    </div>
  );
}
