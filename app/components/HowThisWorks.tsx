/* eslint-disable @next/next/no-img-element */

type StepColor = "red" | "green" | "blue";

interface Step {
  img: string;
  border: string;
  color: StepColor;
  title: string;
  desc: string;
}

export function HowThisWorks() {
  const steps: Step[] = [
    {
      img: "/step-1.png",
      border: "/text-border.png",
      color: "red",
      title: "Get the most stupid, cursed idea YOU can think of",
      desc: "Make it!!!! don't care how many hours you farm, HOURS do not MATTER here",
    },
    {
      img: "/step-2.png",
      border: "/text-border-2.png",
      color: "green",
      title: "Ship it!!!!",
      desc: "and WAIT for your WONDERFUL project to get REVIEWED by our wonderful reviewers :3",
    },
    {
      img: "/step-3.png",
      border: "/text-border-3.png",
      color: "blue",
      title: "Get your wonderful reviewer feedback",
      desc: "and wait for your wonderful surprise :3",
    },
  ];

  const theme: Record<StepColor, { bg: string; text: string }> = {
    red: {
      bg: "bg-[#e8b4b4]/60",
      text: "text-[#8f2d2d]",
    },
    green: {
      bg: "bg-[#a8c98a]/60",
      text: "text-[#3d6b1f]",
    },
    blue: {
      bg: "bg-[#a3d9d3]/60",
      text: "text-[#1f4a6b]",
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg-effect-2.png')" }}
      />
      {/* <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{ backgroundImage: "url('/bg-part-4.png')" }}
      /> */}

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <div className="pt-20">
          <img
            src="/how-this-works.png"
            alt="How this works!"
            className="h-auto w-150 object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-8">
          {steps.map((s, i) => {
            const t = theme[s.color];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center rounded-xl p-4"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-130 h-auto object-contain rounded-lg"
                />

                <div className="relative w-full mt-4">
                  <img
                    src={s.border}
                    alt=""
                    className="absolute inset-0 w-full h-full object-fill"
                  />
                  <p className="relative py-4 px-6 font-poppins font-bold text-white text-lg">
                    {s.title}
                  </p>
                </div>

                <div className="w-full mt-3 py-3 px-4 rounded-lg">
                  <p className={`font-poppins font-medium text-black`}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
