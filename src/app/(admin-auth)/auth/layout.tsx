import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#00040a]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gobai-blue-dark/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gobai-cyan-dark/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-gobai-cyan) 0.5px, transparent 0.5px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
