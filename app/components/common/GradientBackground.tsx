export default function GradientBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-y-0 right-0 w-[300px] bg-blue-500/20 blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute inset-y-0 left-0 w-[300px] bg-purple-500/20 blur-3xl -z-10 animate-pulse-slow" />
    </>
  );
}
