/* ===================================
   Particle Class
   Handles particle animation along connections
   =================================== */

import { NODES, PARTICLE_CONFIG } from '../config/pipelineConfig';

export class Particle {
    constructor(connection) {
        this.connection = connection;
        this.progress = 0;
        this.speed = PARTICLE_CONFIG.minSpeed + Math.random() * (PARTICLE_CONFIG.maxSpeed - PARTICLE_CONFIG.minSpeed);
        this.size = PARTICLE_CONFIG.minSize + Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize);
        this.color = `hsl(${180 + Math.random() * 60}, 80%, 60%)`;
        this.glow = PARTICLE_CONFIG.minGlow + Math.random() * (PARTICLE_CONFIG.maxGlow - PARTICLE_CONFIG.minGlow);
    }
    
    update() {
        this.progress += this.speed;
        if (this.progress > 1) {
            this.progress = 0;
        }
    }
    
    draw(ctx) {
        const pos = this.getPosition();
        
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    getPosition() {
        const from = NODES[this.connection.from];
        const to = NODES[this.connection.to];
        const start = this.getNodeEdgePoint(from, to);
        const end = this.getNodeEdgePoint(to, from);
        
        // Special 3-segment path for registry to webhook: down -> left -> down
        if (this.connection.from === 'registry' && this.connection.to === 'webhook') {
            // Define the three segments
            const midY = (start.y + end.y) / 2; // Middle Y position for horizontal segment
            
            const segment1End = { x: start.x, y: midY }; // End of first vertical segment
            const segment2End = { x: end.x, y: midY };   // End of horizontal segment
            const segment3End = { x: end.x, y: end.y };  // End of second vertical segment
            
            // Calculate distances for each segment
            const dist1 = Math.abs(segment1End.y - start.y);
            const dist2 = Math.abs(segment2End.x - segment1End.x);
            const dist3 = Math.abs(segment3End.y - segment2End.y);
            const totalDist = dist1 + dist2 + dist3;
            
            // Calculate progress thresholds
            const threshold1 = dist1 / totalDist;
            const threshold2 = (dist1 + dist2) / totalDist;
            
            if (this.progress < threshold1) {
                // Segment 1: Moving down from registry
                const segmentProgress = this.progress / threshold1;
                return {
                    x: start.x,
                    y: start.y + (segment1End.y - start.y) * segmentProgress
                };
            } else if (this.progress < threshold2) {
                // Segment 2: Moving left
                const segmentProgress = (this.progress - threshold1) / (threshold2 - threshold1);
                return {
                    x: segment1End.x + (segment2End.x - segment1End.x) * segmentProgress,
                    y: midY
                };
            } else {
                // Segment 3: Moving down to webhook
                const segmentProgress = (this.progress - threshold2) / (1 - threshold2);
                return {
                    x: end.x,
                    y: segment2End.y + (segment3End.y - segment2End.y) * segmentProgress
                };
            }
        } else {
            // Linear interpolation for other connections
            return {
                x: start.x + (end.x - start.x) * this.progress,
                y: start.y + (end.y - start.y) * this.progress
            };
        }
    }
    
    getNodeEdgePoint(node, targetNode) {
        const nodeCenterX = node.x + node.width / 2;
        const nodeCenterY = node.y + node.height / 2;
        const targetCenterX = targetNode.x + targetNode.width / 2;
        const targetCenterY = targetNode.y + targetNode.height / 2;
        
        // Special case: right-angle connection from registry (top) to webhook (bottom)
        if (node === NODES.registry && targetNode === NODES.webhook) {
            // Start from bottom of registry, slightly to the right
            return { x: node.x + node.width - 50, y: node.y + node.height };
        }
        if (node === NODES.webhook && targetNode === NODES.registry) {
            // End at top of webhook, slightly to the right  
            return { x: node.x + 50, y: node.y};
        }
        
        const dx = targetCenterX - nodeCenterX;
        const dy = targetCenterY - nodeCenterY;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                return { x: node.x + node.width, y: nodeCenterY };
            } else {
                return { x: node.x, y: nodeCenterY };
            }
        } else {
            if (dy > 0) {
                return { x: nodeCenterX, y: node.y + node.height };
            } else {
                return { x: nodeCenterX, y: node.y };
            }
        }
    }
}
