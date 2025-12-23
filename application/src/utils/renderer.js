/* ===================================
   Renderer Module
   Handles all drawing operations
   =================================== */

import { NODES } from "../config/pipelineConfig";
import { Particle } from "./Particle";

/**
 * Draw a node (box or stage label)
 */
export function drawNode(ctx, node, images) {
  if (node.type === "stage") {
    ctx.fillStyle = node.color || "#1e293b";
    ctx.fillRect(node.x, node.y, node.width, node.height);

    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(node.label, node.x + 15, node.y + node.height / 2);
    return;
  }

  ctx.fillStyle = node.color || "#2d3748";
  ctx.strokeStyle = "#4a5568";
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.roundRect(node.x, node.y, node.width, node.height, 16);
  ctx.fill();
  ctx.stroke();

  const centerX = node.x + node.width / 2;
  const iconY = node.y + 45;

  if (node.images) {
    const spacing = 70;
    const startX = centerX - spacing / 2;

    node.images.forEach((imgKey, index) => {
      const img = images[imgKey];
      if (img) {
        const imgX = startX + index * spacing - 30;
        ctx.drawImage(img, imgX, iconY - 20, 50, 50);
      }
    });
  } else if (node.image) {
    const img = images[node.image];
    if (img) {
      const imgSize = 60;
      ctx.drawImage(
        img,
        centerX - imgSize / 2,
        iconY - imgSize / 2,
        imgSize,
        imgSize
      );
    }
  }

  // Main Label Styling
  ctx.fillStyle = "#f3f4f6"; // Slightly brighter white (Gray-100)
  ctx.font = "600 16px 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  // Add text shadow for better contrast
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 1;

  const lines = node.label.split("\n");
  const labelY = node.y + node.height - 35;

  lines.forEach((line, i) => {
    ctx.fillText(line, node.x + node.width / 2, labelY + i * 20);
  });
  
  // Reset shadow for subsequent draws
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  if (node.subtext) {
    ctx.fillStyle = "#9ca3af"; // Gray-400
    ctx.font = "400 12px 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    ctx.fillText(
      node.subtext,
      node.x + node.width / 2,
      node.y + node.height - 15
    );
  }
}

/**
 * Draw a connection line between nodes
 */
export function drawConnection(ctx, conn) {
  const from = NODES[conn.from];
  const to = NODES[conn.to];

  const tempParticle = new Particle(conn);
  tempParticle.progress = 0;
  const start = tempParticle.getNodeEdgePoint(from, to);
  tempParticle.progress = 1;
  const end = tempParticle.getNodeEdgePoint(to, from);

  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 4]);

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);

  if (conn.from === "registry" && conn.to === "webhook") {
    const midY = (start.y + end.y) / 2;
    ctx.lineTo(start.x, midY);
    ctx.lineTo(end.x, midY);
    ctx.lineTo(end.x, end.y);
  } else {
    ctx.lineTo(end.x, end.y);
  }

  ctx.stroke();
  ctx.setLineDash([]);

  if (conn.label) {
    let midX, midY;

    if (conn.from === "registry" && conn.to === "webhook") {
      midY = (start.y + end.y) / 2;
      midX = (start.x + end.x) / 2;
    } else {
      midX = (start.x + end.x) / 2;
      midY = (start.y + end.y) / 2;
    }

    ctx.fillStyle = "#0f1419";
    ctx.fillRect(midX - 30, midY - 12, 60, 24);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(conn.label, midX, midY);
  }
}

/**
 * Clear the canvas (CRITICAL FIX)
 */
export function clearCanvas(ctx, width, height) {
  // Save current transform state
  ctx.save();

  // Reset to identity transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Clear full physical canvas
  ctx.fillStyle = "#0f1419";
  ctx.fillRect(0, 0, width, height);

  // Restore previous transform
  ctx.restore();
}
