/* ===================================
   Configuration & Node Definitions
   =================================== */

// Canvas dimensions
export const CANVAS_CONFIG = {
    width: 1400,
    height: 600
};

// Image URLs for icons
export const IMAGE_URLS = {
    folder: '/assets/icons/folder.png',
    github: '/assets/icons/github.png',
    githubActions: '/assets/icons/github-actions.png',
    docker: '/assets/icons/docker.png',
    aws: '/assets/icons/aws.png',
    dockerHub: '/assets/icons/dockerhub.png',
    webhook: '/assets/icons/webhook.png',
    argocd: '/assets/icons/argocd.png',
    kubernetes: '/assets/icons/kubernetes.png',
    git: '/assets/icons/git.png'
};

// Node definitions with positions and styles
export const NODES = {
    // CI Pipeline (Top Row - Left to Right)
    sourceBox: { 
        x: 50, y: 50, width: 180, height: 120, 
        label: 'Source Code', type: 'box', color:'#24292e',
        image: 'folder'
    },
    github: { 
        x: 280, y: 50, width: 150, height: 120, 
        label: 'GitHub', type: 'box', color: '#24292e',
        image: 'github'
    },
    action: { 
        x: 480, y: 50, width: 150, height: 120, 
        label: 'GitHub Action', type: 'box', color: '#24292e',
        image: 'githubActions',
        subtext: 'Build & Push'
    },
    dockerImage: { 
        x: 680, y: 50, width: 150, height: 120, 
        label: 'Docker Image', type: 'box', color: '#24292e',
        image: 'docker'
    },
    registry: { 
        x: 880, y: 50, width: 180, height: 120, 
        label: 'ECR / Docker Hub', type: 'box', color: '#24292e',
        images: ['aws', 'dockerHub']
    },
    
    // CD Pipeline (Bottom Row - Left to Right)
    webhook: { 
        x: 50, y: 430, width: 180, height: 120, 
        label: 'Webhook Event', type: 'box', color: '#1e3a8a',
        image: 'webhook',
        subtext: 'Detect Change'
    },
    githubActions2: { 
        x: 280, y: 430, width: 150, height: 120, 
        label: 'GitHub Actions', type: 'box', color: '#24292e',
        image: 'githubActions',
        subtext: 'Update Helm'
    },
    gitRepo: { 
        x: 480, y: 430, width: 150, height: 120, 
        label: 'Git Repository', type: 'box', color: '#24292e',
        image: 'git',
        subtext: 'Helm Charts'
    },
    argocd: { 
        x: 680, y: 430, width: 150, height: 120, 
        label: 'ArgoCD', type: 'box', color: '#e85d2d',
        image: 'argocd',
        subtext: 'Sync & Deploy'
    },
    kubernetes: { 
        x: 880, y: 430, width: 180, height: 120, 
        label: 'Kubernetes', type: 'box', color: '#326ce5',
        image: 'kubernetes',
        subtext: 'Update Pods'
    },
    
    // Stage labels
    ciStage: {
        x: 50, y: 15, width: 1010, height: 25,
        label: 'CI Pipeline - Build & Push', type: 'stage', color: '#1e293b'
    },
    cdStage: {
        x: 50, y: 395, width: 1010, height: 25,
        label: 'CD Pipeline - GitOps Deployment', type: 'stage', color: '#1e293b'
    }
};

// Connection paths (from -> to)
export const CONNECTIONS = [
    // CI Pipeline (Top Row - Left to Right)
    { from: 'sourceBox', to: 'github', label: 'Push' },
    { from: 'github', to: 'action', label: 'Trigger' },
    { from: 'action', to: 'dockerImage', label: 'Build' },
    { from: 'dockerImage', to: 'registry', label: 'Push' },
    
    // Bridge - Curved connection from registry to webhook event
    { from: 'registry', to: 'webhook', label: 'Event' },
    
    // CD Pipeline (Bottom Row - Left to Right)
    { from: 'webhook', to: 'githubActions2', label: 'Trigger' },
    { from: 'githubActions2', to: 'gitRepo', label: 'Update' },
    { from: 'gitRepo', to: 'argocd', label: 'Sync' },
    { from: 'argocd', to: 'kubernetes', label: 'Deploy' }
];

// Particle configuration
export const PARTICLE_CONFIG = {
    minSpeed: 0.005,
    maxSpeed: 0.008,
    minSize: 4,
    maxSize: 7,
    minGlow: 15,
    maxGlow: 25,
    particlesPerConnection: 5
};
