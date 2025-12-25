export function Background({ children }: any) {
  return (
      <div className="min-h-screen w-full bg-white relative">
          {/* Purple Gradient Grid Left Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Your Content/Components */}
    <div className="relative z-10">
            {children}
        </div>
    </div>
  )
}
