import ShaderBackground from "@/components/ui/shader-background";

export const DemoOne = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ShaderBackground />
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Shader Background
        </h1>
        <p className="text-lg text-white/80 drop-shadow">
          A WebGL shader running in the background.
        </p>
      </div>
    </div>
  );
};

export default DemoOne;
