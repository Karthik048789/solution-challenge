/**
 * Decorative animated gradient orb for backgrounds.
 */
export default function GradientOrb({
  className = "",
  color = "indigo",
}: {
  className?: string;
  color?: "indigo" | "pink" | "cyan";
}) {
  const colorMap = {
    indigo: "from-indigo-500 to-purple-500",
    pink: "from-pink-500 to-orange-400",
    cyan: "from-cyan-400 to-blue-500",
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-gradient-to-br ${colorMap[color]} opacity-30 blur-3xl animate-float ${className}`}
    />
  );
}
