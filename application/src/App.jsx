import PipelineCanvas from './components/PipelineCanvas'

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-8">
//       {/* Header */}
//       <div className="mb-8 text-center">
//         <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
//           CI/CD Pipeline Visualization
//         </h1>
//         <p className="text-gray-400 text-lg">
//           Complete GitOps Workflow with ArgoCD & Kubernetes
//         </p>
//       </div>

//       {/* Pipeline Canvas */}
//       <div className="bg-dark-bg rounded-2xl shadow-2xl p-6 border border-dark-border">
//         <PipelineCanvas />
//       </div>

//       {/* Footer Info */}
//       <div className="mt-8 flex gap-6 text-sm text-gray-500">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//           <span>CI Pipeline</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
//           <span>CD Pipeline</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
//           <span>Data Flow</span>
//         </div>
//       </div>
//     </div>
//   )
// }

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-start p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          CI/CD Pipeline Visualization
        </h1>
        <p className="text-gray-400 text-lg">
          Complete GitOps Workflow with ArgoCD & Kubernetes
        </p>
      </div>

      {/* Pipeline Canvas */}
      {/* <div className="bg-dark-bg rounded-2xl shadow-2xl p-6 border border-dark-border">
        <PipelineCanvas />
      </div> */}
      {/* Scrollable Pipeline Area */}
      <div className="flex-1 w-full flex justify-center overflow-y-auto px-6">
        {/* Border Wrapper (bigger container) */}
        <div className="w-full max-w-[1600px] bg-dark-bg/60 rounded-3xl border border-dark-border p-10">
          {/* Scaled Canvas */}
          <div className="origin-top scale-[0.85]">
            <PipelineCanvas />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 flex gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span>CI Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <span>CD Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <span>Data Flow</span>
        </div>
      </div>
    </div>
  );
}

export default App