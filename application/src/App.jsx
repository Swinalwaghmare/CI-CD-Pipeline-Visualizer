import { useRef, useEffect, useState } from "react";
import PipelineCanvas from "./components/PipelineCanvas";
import { CANVAS_CONFIG } from "./config/pipelineConfig";

function App() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = CANVAS_CONFIG;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // use contentRect for precise inner dimensions
        const { width, height } = entry.contentRect;
        
        // Add a small safety margin (e.g. 95% of available space)
        // so it doesn't touch the exact edges
        const availableWidth = width * 0.95;
        const availableHeight = height * 0.95;

        const scaleX = availableWidth / CANVAS_WIDTH;
        const scaleY = availableHeight / CANVAS_HEIGHT;

        // "contain" logic: fit entirely within the box
        setScale(Math.min(scaleX, scaleY));
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    // Use h-screen (or dvh for mobile) and prevent overflow
    <div className="h-screen w-full overflow-hidden flex flex-col items-center justify-between p-2 md:p-6 bg-[#0f1419]">
      
      {/* Header - flexible height but resist shrinking too much */}
      <div className="text-center shrink-0 mb-2 md:mb-6">
        <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1 md:mb-2">
          CI/CD Pipeline Visualization V3 
        </h1>
        <p className="text-gray-400 text-xs md:text-lg hidden sm:block">
          Complete GitOps Workflow with ArgoCD & Kubernetes
        </p>
      </div>

      {/* Main Container - Takes all remaining space */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 relative"> 
         {/* 
            min-h-0 is CRITICAL for flex child to shrink below content size 
            relative is for absolute positioning if needed, but flex center works here.
         */}
        
        {/* The visual box wrapper - acting only as layout/measurement container now */}
        <div 
          ref={containerRef}
          className="w-full h-full flex items-center justify-center overflow-hidden relative"
        >
             {/* Canvas Container that gets scaled AND has the visual border now */}
             <div
               style={{
                 width: CANVAS_CONFIG.width,
                 height: CANVAS_CONFIG.height,
                 transform: `scale(${scale})`,
                 transformOrigin: "center center",
               }}
               className="flex-shrink-0 border border-dark-border/30 bg-dark-bg/40 rounded-3xl shadow-2xl overflow-hidden"
             >
               <PipelineCanvas />
             </div>
        </div>
      </div>

      {/* Footer - compact on small screens */}
      <div className="mt-2 md:mt-6 flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm text-gray-500 shrink-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span>CI Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <span>CD Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <span>Data Flow</span>
        </div>
      </div>
    </div>
  );
}

export default App;
