import { useEffect, useRef } from 'react';
import { CANVAS_CONFIG } from '../config/pipelineConfig';
import { Particle } from '../utils/Particle';
import { drawNode, drawConnection, clearCanvas } from '../utils/renderer';
import { NODES, CONNECTIONS, PARTICLE_CONFIG, IMAGE_URLS } from '../config/pipelineConfig';

const PipelineCanvas = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = CANVAS_CONFIG.width;
    canvas.height = CANVAS_CONFIG.height;

    let imagesLoaded = 0;
    const totalImages = Object.keys(IMAGE_URLS).length;

    // Load all images
    const loadImages = () => {
      Object.keys(IMAGE_URLS).forEach(key => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          imagesRef.current[key] = img;
          imagesLoaded++;
          if (imagesLoaded === totalImages) {
            initializeParticles();
            animate();
          }
        };
        
        img.onerror = () => {
          console.error(`Failed to load image: ${key}`);
          imagesLoaded++;
          if (imagesLoaded === totalImages) {
            initializeParticles();
            animate();
          }
        };
        
        img.src = IMAGE_URLS[key];
      });
    };

    // Initialize particles
    const initializeParticles = () => {
      CONNECTIONS.forEach(conn => {
        const particleCount = PARTICLE_CONFIG.particlesPerConnection;
        for (let i = 0; i < particleCount; i++) {
          const particle = new Particle(conn);
          particle.progress = i / particleCount;
          particlesRef.current.push(particle);
        }
      });
    };

    // Animation loop
    const animate = () => {
      clearCanvas(ctx, canvas.width, canvas.height);
      
      // Draw all connections
      CONNECTIONS.forEach(conn => drawConnection(ctx, conn));
      
      // Draw all nodes
      Object.values(NODES).forEach(node => drawNode(ctx, node, imagesRef.current));
      
      // Update and draw all particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    loadImages();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-xl shadow-2xl"
      style={{ background: '#0f1419' }}
    />
  );
};

export default PipelineCanvas;
