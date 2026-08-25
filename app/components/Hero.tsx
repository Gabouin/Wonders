/* eslint-disable @next/next/no-img-element */
export function Hero() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <a
        href="https://rsvp.hackclub.community/wonders"
        target="_blank"
        className="group"
      >
        <img
          src="/rsvp.png"
          alt="rsvp"
          className="absolute z-20 bottom-10 left-[50%] translate-x-[-50%] w-66 h-auto group-hover:w-77 transition-all"
        />
      </a>
    </div>
  );
}
