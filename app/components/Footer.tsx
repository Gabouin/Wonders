/* eslint-disable @next/next/no-img-element */
export function Footer() {
  return (
    <div className="relative w-full min-h-[100svh] bg-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg-effect-2.png')" }}
      />
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain md:bg-cover z-10 "
        style={{ backgroundImage: "url('/cliff-with-guy-and-heart.png')" }}
      />
    </div>
  );
}
