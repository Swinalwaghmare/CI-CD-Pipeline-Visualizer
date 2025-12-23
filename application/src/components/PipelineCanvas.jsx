import { useEffect, useRef } from "react";
import {
  CANVAS_CONFIG,
  NODES,
  CONNECTIONS,
  PARTICLE_CONFIG,
  IMAGE_URLS,
} from "../config/pipelineConfig";
import { Particle } from "../utils/Particle";
import { drawNode, drawConnection, clearCanvas } from "../utils/renderer";

const PipelineCanvas = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // 🔒 FIXED DESIGN SIZE (THIS IS IMPORTANT)
    canvas.width = CANVAS_CONFIG.width;
    canvas.height = CANVAS_CONFIG.height;

    let imagesLoaded = 0;
    const totalImages = Object.keys(IMAGE_URLS).length;

    const loadImages = () => {
      Object.entries(IMAGE_URLS).forEach(([key, src]) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          imagesRef.current[key] = img;
          imagesLoaded++;
          if (imagesLoaded === totalImages) {
            initParticles();
            animate();
          }
        };

        img.onerror = () => {
          imagesLoaded++;
          if (imagesLoaded === totalImages) {
            initParticles();
            animate();
          }
        };

        img.src = src;
      });
    };

    const initParticles = () => {
      particlesRef.current = [];
      CONNECTIONS.forEach((conn) => {
        for (let i = 0; i < PARTICLE_CONFIG.particlesPerConnection; i++) {
          const p = new Particle(conn);
          p.progress = i / PARTICLE_CONFIG.particlesPerConnection;
          particlesRef.current.push(p);
        }
      });
    };

    const animate = () => {
      clearCanvas(ctx, CANVAS_CONFIG.width, CANVAS_CONFIG.height);

      CONNECTIONS.forEach((c) => drawConnection(ctx, c));
      Object.values(NODES).forEach((n) => drawNode(ctx, n, imagesRef.current));

      particlesRef.current.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    loadImages();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="rounded-xl shadow-2xl"
        style={{ background: "#0f1419" }}
      />
    </div>
  );
};

export default PipelineCanvas;
