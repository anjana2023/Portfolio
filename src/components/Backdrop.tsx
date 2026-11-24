
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 12% 8%, rgba(120,138,22,0.30), transparent 70%), radial-gradient(45% 50% at 92% 25%, rgba(120,95,20,0.16), transparent 70%)",
        }}
      />
    </div>
  );
}
