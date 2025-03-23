export default function BackgroundDecorations() {
  return (
    <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1572d3]/5 rotate-45 transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1572d3]/5 rotate-45 transform translate-y-1/2"></div>
    </div>
  );
}
