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

      <img
        src="/project-by.png"
        alt="project-by"
        className="absolute z-20 top-120  h-auto w-80"
        style={{ bottom: "24px", right: "120px" }}
      />
      <a href="" className="group">
        <img
          src="/teens.png"
          alt="teens"
          className="absolute group-hover:h-40  z-20 top-145 left-290 h-auto w-60"
          style={{ bottom: "24px", right: "120px" }}
        />
      </a>
      <a href="https://hackclub.com" target="_blank" className="group">
        <img
          src="/hackclub.png"
          alt="hackclub"
          className="absolute z-20 group-hover:h-40 top-165 left-330 h-auto w-60"
          style={{ bottom: "24px", right: "120px" }}
        />
      </a>
    </div>
  );
}
