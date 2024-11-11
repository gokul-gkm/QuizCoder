export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-y-0 right-0 w-[300px] bg-blue-500/20 blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute inset-y-0 left-0 w-[300px] bg-purple-500/20 blur-3xl -z-10 animate-pulse-slow" />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse-slow" />

        <div className="relative p-4">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping delay-300" />

          <div className="relative w-16 h-16 flex items-center justify-center backdrop-blur-sm bg-blue-950/10 rounded-full border border-blue-500/20">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              &lt;&gt;
            </span>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-blue-400/80 animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
}
