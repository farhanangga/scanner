import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white min-h-screen w-screen flex items-center justify-center p-4">
      <div className="bg-white/90 flex flex-col items-center justify-center rounded-3xl shadow-2xl shadow-black/30 gap-3 p-6 w-full max-w-sm sm:max-w-xs">

        <Link href="/qrScanner/scan" className="w-full max-w-xs">
          <button className="w-full bg-[#660066] hover:bg-[#4d004d] text-white font-semibold py-3 px-4 rounded-lg shadow">
            Qr Scannerr
          </button>
        </Link>

        <Link href="/inputFoto/camera" className="w-full max-w-xs">
          <button className="w-full bg-[#660066] hover:bg-[#4d004d] text-white font-semibold py-3 px-4 rounded-lg shadow">
            Input Foto
          </button>
        </Link>

        <Link href="/inputVideo/camera" className="w-full max-w-xs">
          <button className="w-full bg-[#660066] hover:bg-[#4d004d] text-white font-semibold py-3 px-4 rounded-lg shadow">
            Input Video
          </button>
        </Link>

      </div>
    </div>
  );
}
