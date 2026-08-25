/* eslint-disable @next/next/no-img-element */
export function Footer() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg-effect-2.png')" }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center z-10 "
        style={{ backgroundImage: "url('/cliff-with-guy-and-heart.png')" }}
      />
    </div>
  );
}
