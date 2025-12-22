import PipelineCanvas from './components/PipelineCanvas'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          CI/CD Pipeline Visualization
        </h1>
        <p className="text-gray-400 text-lg">
          Complete GitOps Workflow with ArgoCD & Kubernetes
        </p>
      </div>

      {/* Pipeline Canvas */}
      <div className="bg-dark-bg rounded-2xl shadow-2xl p-6 border border-dark-border">
        <PipelineCanvas />
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
  )
}

export default App
