export function PipelineDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative h-px w-full bg-border"
    >
      <div className="absolute inset-0 flex items-center justify-between px-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-accent"
            style={{ opacity: 0.35 + i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}