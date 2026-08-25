/* eslint-disable @next/next/no-img-element */
export function Hero() {
  return (
    <div
      className="relative w-full min-h-[100svh] bg-no-repeat bg-center bg-contain md:bg-cover"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundColor: "#5aa8a8",
      }}
    >
      <a
        href="https://rsvp.hackclub.community/wonders"
        target="_blank"
        className="group"
      >
        <img
          src="/rsvp.png"
          alt="rsvp"
          className="absolute z-20 bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-40 sm:w-52 md:w-66 h-auto group-hover:w-44 sm:group-hover:w-58 md:group-hover:w-77 transition-all"
        />
      </a>
      <a href="/dashboard" className="group">
        <img
          src="/open-dash.png"
          alt="open dash"
          className="absolute z-20 top-6 sm:bottom-10 right-4 w-30 sm:w-42 md:w-56 h-auto group-hover:w-34 sm:group-hover:w-48 md:group-hover:w-67 transition-all"
        />
      </a>
    </div>
  );
}
