/* ===================================
   Renderer Module
   Handles all drawing operations
   =================================== */

import { NODES } from '../config/pipelineConfig';
import { Particle } from './Particle';

/**
 * Draw a node (box or stage label)
 */
export function drawNode(ctx, node, images) {
    // Handle stage labels differently
    if (node.type === 'stage') {
        ctx.fillStyle = node.color || '#1e293b';
        ctx.fillRect(node.x, node.y, node.width, node.height);
        
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x + 15, node.y + node.height / 2);
        return;
    }
    
    // Draw box background
    ctx.fillStyle = node.color || '#2d3748';
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.roundRect(node.x, node.y, node.width, node.height, 12);
    ctx.fill();
    ctx.stroke();
    
    // Draw image(s)
    const centerX = node.x + node.width / 2;
    const iconY = node.y + 45;
    
    if (node.images) {
        // Multiple images (for registry)
        const spacing = 70;
        const startX = centerX - spacing / 2;
        
        node.images.forEach((imgKey, index) => {
            const img = images[imgKey];
            if (img) {
                const imgX = startX + (index * spacing) - 30;
                ctx.drawImage(img, imgX, iconY - 20, 50, 50);
            }
        });
    } else if (node.image) {
        // Single image
        const img = images[node.image];
        if (img) {
            const imgSize = 60;
            ctx.drawImage(img, centerX - imgSize / 2, iconY - imgSize / 2, imgSize, imgSize);
        }
    }
    
    // Draw label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const lines = node.label.split('\n');
    const labelY = node.y + node.height - 35;
    lines.forEach((line, i) => {
        const yOffset = i * 18;
        ctx.fillText(line, node.x + node.width / 2, labelY + yOffset);
    });
    
    // Draw subtext if present
    if (node.subtext) {
        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial';
        ctx.fillText(node.subtext, node.x + node.width / 2, node.y + node.height - 15);
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
    
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    
    // Special 3-segment path for registry to webhook: down -> left -> down
    if (conn.from === 'registry' && conn.to === 'webhook') {
        const midY = (start.y + end.y) / 2;
        
        // Segment 1: Down from registry
        ctx.lineTo(start.x, midY);
        
        // Segment 2: Left to align with webhook
        ctx.lineTo(end.x, midY);
        
        // Segment 3: Down to webhook
        ctx.lineTo(end.x, end.y);
    } else {
        // Straight line for other connections
        ctx.lineTo(end.x, end.y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw label
    if (conn.label) {
        let midX, midY;
        
        if (conn.from === 'registry' && conn.to === 'webhook') {
            // Position label on the horizontal segment (middle segment)
            const segmentMidY = (start.y + end.y) / 2;
            midX = (start.x + end.x) / 2;
            midY = segmentMidY;
        } else {
            midX = (start.x + end.x) / 2;
            midY = (start.y + end.y) / 2;
        }
        
        ctx.fillStyle = '#0f1419';
        ctx.fillRect(midX - 30, midY - 12, 60, 24);
        
        ctx.fillStyle = '#9ca3af';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(conn.label, midX, midY);
    }
}

/**
 * Clear the canvas
 */
export function clearCanvas(ctx, width, height) {
    ctx.fillStyle = '#0f1419';
    ctx.fillRect(0, 0, width, height);
}
