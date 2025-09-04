export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative z-10">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl mb-4 text-gray-900">
              Welcome to <span className="font-bold">Bloom AI</span>
            </h1>
            <p className="text-gray-700 mb-6">
              Node-based image generation and editing web app by The Timeline
              Company.
            </p>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              href="/flow"
              className="rounded-full transition-all duration-200 flex items-center justify-center bg-white text-black gap-2 hover:shadow-inner font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Open Flow Editor
            </a>
            <a
              className="rounded-full transition-all duration-200 flex items-center justify-center bg-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[190px] text-gray-700 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]"
              href="https://reactflow.dev/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Flow Docs
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 hover:text-gray-800"
            href="https://github.com/AmaanBilwar/bloom-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 hover:text-gray-800"
            href="https://thetimelinecompany.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Timeline Company
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 hover:text-gray-800"
            href="https://reactflow.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Flow
          </a>
        </footer>
      </div>
    </div>
  );
}
