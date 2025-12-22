# CI/CD Pipeline Visualization - React App

A modern, interactive visualization of a complete CI/CD pipeline with GitOps deployment workflow built with **React**, **Vite**, and **Tailwind CSS**.

## � Features

- ✨ **Modern React** with hooks and functional components
- 🎨 **Tailwind CSS** for beautiful, responsive styling
- 🌙 **Dark Theme** with gradient backgrounds
- 🎬 **Smooth Animations** with Canvas API
- 📦 **Vite** for lightning-fast development
- 🔄 **Real-time Pipeline Visualization** with animated particles
- 🎯 **GitOps Workflow** showing complete CI/CD flow

## 📁 Project Structure

```
frontend/
├── public/
│   └── assets/
│       └── icons/              # All pipeline component icons
├── src/
│   ├── components/
│   │   └── PipelineCanvas.jsx  # Main canvas component
│   ├── config/
│   │   └── pipelineConfig.js   # Pipeline configuration
│   ├── utils/
│   │   ├── Particle.js         # Particle animation logic
│   │   └── renderer.js         # Canvas rendering functions
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind CSS & global styles
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies & scripts
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Canvas API** | Pipeline visualization |
| **ES6 Modules** | Code organization |

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🚀 Running the App

### Development Mode
```bash
npm run dev
```
- Opens at `http://localhost:3000`
- Hot module replacement enabled
- Auto-opens in browser

### Production Build
```bash
npm run build
```
- Creates optimized build in `dist/` folder
- Minified and optimized for production

### Preview Production Build
```bash
npm run preview
```
- Preview the production build locally

## 🎨 Customization

### Change Pipeline Layout

Edit `src/config/pipelineConfig.js`:

```javascript
export const NODES = {
    sourceBox: { 
        x: 50,      // X position
        y: 50,      // Y position
        width: 180, // Width
        height: 120 // Height
        // ... other properties
    }
}
```

### Modify Colors

**Tailwind CSS** (in `src/App.jsx`):
```jsx
<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500">
```

**Canvas Colors** (in `src/config/pipelineConfig.js`):
```javascript
webhook: { 
    color: '#1e3a8a', // Box background color
    // ...
}
```

### Adjust Animation Speed

Edit `src/config/pipelineConfig.js`:
```javascript
export const PARTICLE_CONFIG = {
    minSpeed: 0.005,  // Slower
    maxSpeed: 0.008,  // Faster
    particlesPerConnection: 5  // Number of particles
};
```

### Change Dark Theme

Edit `tailwind.config.js`:
```javascript
theme: {
    extend: {
        colors: {
            dark: {
                bg: '#0f1419',      // Canvas background
                card: '#1a1a2e',    // Card background
                border: '#4a5568',  // Border color
            }
        }
    }
}
```

## 🏗️ Architecture

### Component Hierarchy

```
App
└── PipelineCanvas
    ├── Canvas Element
    ├── Image Loading
    ├── Particle System
    └── Animation Loop
```

### Data Flow

1. **Configuration** (`pipelineConfig.js`) defines nodes and connections
2. **PipelineCanvas** component initializes canvas and loads images
3. **Particle** class handles individual particle animations
4. **Renderer** functions draw nodes, connections, and particles
5. **Animation loop** continuously updates and renders the scene

## 🎯 Pipeline Flow

### CI Pipeline (Top Row)
```
Source Code → GitHub → GitHub Action → Docker Image → ECR/Docker Hub
```

### Bridge Connection
```
ECR/Docker Hub ⤵ (curved) → Webhook Event
```

### CD Pipeline (Bottom Row)
```
Webhook Event → GitHub Actions → Git Repository → ArgoCD → Kubernetes
```

## 🎨 Tailwind CSS Features Used

- **Gradients**: `bg-gradient-to-br`, `bg-gradient-to-r`
- **Dark Theme**: Custom dark color palette
- **Animations**: `animate-pulse` for indicators
- **Flexbox**: `flex`, `items-center`, `justify-center`
- **Spacing**: `p-8`, `mb-8`, `gap-6`
- **Shadows**: `shadow-2xl`
- **Borders**: `border`, `rounded-2xl`
- **Typography**: `text-4xl`, `font-bold`

## 📝 Key Files Explained

### `src/App.jsx`
- Main application component
- Contains header, canvas, and footer
- Uses Tailwind CSS for styling

### `src/components/PipelineCanvas.jsx`
- React component wrapping the canvas
- Manages canvas lifecycle with `useEffect`
- Handles image loading and animation

### `src/config/pipelineConfig.js`
- Central configuration file
- Defines all nodes, connections, and settings
- Easy to modify without touching logic

### `src/utils/Particle.js`
- Particle class for animations
- Handles bezier curve calculations
- Manages particle movement and rendering

### `src/utils/renderer.js`
- Drawing functions for canvas
- Renders nodes, connections, and labels
- Handles both straight and curved paths

## � Development Tips

### Hot Reload
- Vite provides instant hot module replacement
- Changes reflect immediately in the browser

### React DevTools
- Install React DevTools browser extension
- Inspect component hierarchy and props

### Tailwind IntelliSense
- Install Tailwind CSS IntelliSense VS Code extension
- Get autocomplete for Tailwind classes

## 🐛 Troubleshooting

### Icons not loading
- Ensure `public/assets/icons/` contains all icon files
- Check browser console for 404 errors

### Tailwind classes not working
- Verify `tailwind.config.js` content paths
- Check that `index.css` imports Tailwind directives

### Canvas not rendering
- Check browser console for errors
- Ensure all image paths are correct

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## � License

This project is open source and available for educational purposes.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
