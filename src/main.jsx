import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WHATSAPP_URL =
  "https://wa.me/972548668646?text=Hey%20Chasing%20Fun%2C%20I%20went%20through%20the%20confidence%20journey%20and%20want%20to%20check%20if%20this%20trip%20fits%20me.";

const motivations = [
  {
    id: "surf",
    label: "Learn or improve surfing",
    route: "surf",
  },
  {
    id: "social",
    label: "Meet people and feel part of a group",
    route: "social",
  },
  {
    id: "reset",
    label: "Break routine and feel alive",
    route: "reset",
  },
  {
    id: "dream",
    label: "Experience a tropical dream",
    route: "reset",
  },
  {
    id: "guided",
    label: "Have someone organize it properly",
    route: "guided",
  },
  {
    id: "value",
    label: "Understand if this is worth it",
    route: "value",
  },
];

const confidenceOptions = [
  "Knowing I will not feel alone",
  "Knowing my surf level is okay",
  "Knowing it is structured but not rigid",
  "Knowing the team is serious and trustworthy",
  "Knowing it is worth the money/time",
  "Understanding how the trip actually works",
];

const routes = {
  social: {
    name: "Social Confidence",
    accent: "from-sand/35 via-dune to-aqua/70",
    chip: "People + belonging",
    reveal:
      "Wanting to arrive with people, not pressure, makes sense. This path shows how connection is built naturally from the start.",
    moduleTitle: "The social part is not left to luck.",
    moduleCopy:
      "The beginning of the trip is designed so people can land, settle, and start connecting without needing to perform or force it.",
    points: ["Soft arrival", "Shared surf rhythm", "Natural group moments"],
    proof: "Placeholder proof: “I came alone and felt part of it faster than I expected.”",
    cta: "Ask about coming solo",
  },
  surf: {
    name: "Surf Confidence",
    accent: "from-ocean/30 via-aqua to-foam",
    chip: "Surf + progress",
    reveal:
      "Wanting to surf and feeling unsure can exist together. This path shows how progress can feel supported, not pressured.",
    moduleTitle: "Surf is built around confidence, not performance.",
    moduleCopy:
      "You do not need to arrive as a surfer to get value. The rhythm is about learning, trying, laughing, and feeling more capable in the water.",
    points: ["Beginner-friendly rhythm", "Progress without pressure", "Support at your level"],
    proof: "Placeholder proof: “I was nervous about my level, then surfing became my favorite part.”",
    cta: "Talk about my surf level",
  },
  reset: {
    name: "Freedom With Support",
    accent: "from-coral/20 via-dune to-aqua/60",
    chip: "Reset + aliveness",
    reveal:
      "This is not only about leaving the country. It is about stepping into a different rhythm: ocean, people, movement, and space.",
    moduleTitle: "Freedom feels better when the important parts are held.",
    moduleCopy:
      "The trip gives you enough structure to relax, and enough openness to feel like you are actually free inside the experience.",
    points: ["Open time", "Shared adventure", "A rhythm outside routine"],
    proof: "Placeholder proof: “It felt like life opened up again for a week.”",
    cta: "Explore if this is right for me",
  },
  guided: {
    name: "Guided Confidence",
    accent: "from-aqua via-foam to-dune",
    chip: "Trust + structure",
    reveal:
      "Wanting freedom does not mean wanting to organize everything alone. This path shows the method behind the experience.",
    moduleTitle: "There is structure behind the freedom.",
    moduleCopy:
      "Chasing Fun holds the social, surf, logistics, wellbeing, destination, and enjoyment layers so you can actually relax into the trip.",
    points: ["Preparation before the trip", "Clear trip rhythm", "Support across key layers"],
    proof: "Placeholder proof: “You feel that someone thought about the small things.”",
    cta: "Ask how it works",
  },
  value: {
    name: "Value And Fit",
    accent: "from-dune via-foam to-aqua/50",
    chip: "Decision + clarity",
    reveal:
      "Comparing carefully is smart. This path helps you judge the experience by fit, trust, risk reduction, and what you want to feel.",
    moduleTitle: "The better question is not only price. It is fit.",
    moduleCopy:
      "A trip like this should reduce the chance of wasting money, time, and trust by making the experience more intentional from the start.",
    points: ["Experience quality", "Group fit", "Managed risk"],
    proof: "Placeholder proof: “The value was in how held and real the whole thing felt.”",
    cta: "Decide with a fit call",
  },
};

function track(event, properties = {}) {
  console.log("[prototype event]", event, {
    timestamp: new Date().toISOString(),
    ...properties,
  });
}

function App() {
  const [step, setStep] = useState("intro");
  const [selectedMotivation, setSelectedMotivation] = useState(null);
  const [confidenceGap, setConfidenceGap] = useState(null);

  const selectedRoute = selectedMotivation
    ? routes[motivations.find((item) => item.id === selectedMotivation)?.route]
    : routes.social;

  const routeId = selectedMotivation
    ? motivations.find((item) => item.id === selectedMotivation)?.route
    : null;

  const screen = useMemo(() => {
    if (step === "intro") {
      return <Intro onStart={() => {
        track("journey_started");
        track("flow_step_viewed", { step_id: "motivation" });
        setStep("q1");
      }} />;
    }

    if (step === "q1") {
      return (
        <QuestionOne
          selected={selectedMotivation}
          onSelect={(id) => {
            const route = motivations.find((item) => item.id === id)?.route;
            setSelectedMotivation(id);
            track("motivation_selected", { motivation_id: id });
            track("route_selected", { route_id: route, motivation_id: id });
          }}
          onContinue={() => {
            track("flow_step_viewed", {
              step_id: "route_reveal",
              route_id: routeId,
            });
            setStep("reveal");
          }}
          onBack={() => setStep("intro")}
        />
      );
    }

    if (step === "reveal") {
      return (
        <RouteReveal
          route={selectedRoute}
          routeId={routeId}
          onContinue={() => {
            track("cta_clicked", {
              cta_id: "continue_path",
              route_id: routeId,
            });
            track("flow_step_viewed", {
              step_id: "confidence_gap",
              route_id: routeId,
            });
            setStep("q2");
          }}
          onBack={() => setStep("q1")}
        />
      );
    }

    if (step === "q2") {
      return (
        <QuestionTwo
          route={selectedRoute}
          routeId={routeId}
          selected={confidenceGap}
          onSelect={(gap) => {
            setConfidenceGap(gap);
            track("confidence_gap_selected", {
              confidence_gap_id: gap,
              route_id: routeId,
            });
          }}
          onContinue={() => {
            track("flow_step_viewed", {
              step_id: "confidence_module",
              route_id: routeId,
            });
            setStep("confidence");
          }}
          onBack={() => setStep("reveal")}
        />
      );
    }

    if (step === "confidence") {
      return (
        <ConfidenceModule
          route={selectedRoute}
          routeId={routeId}
          confidenceGap={confidenceGap}
          onContinue={() => {
            track("section_engaged", {
              section_id: "confidence_module",
              route_id: routeId,
            });
            track("cta_seen", {
              cta_id: "final_whatsapp",
              route_id: routeId,
              cta_readiness: "medium_high",
            });
            setStep("final");
          }}
          onBack={() => setStep("q2")}
        />
      );
    }

    return (
      <FinalCta
        route={selectedRoute}
        routeId={routeId}
        onBack={() => setStep("confidence")}
      />
    );
  }, [step, selectedMotivation, confidenceGap, selectedRoute, routeId]);

  return (
    <main className="min-h-screen overflow-hidden bg-foam text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col px-5 py-5 sm:max-w-[520px]">
        {screen}
      </div>
    </main>
  );
}

function Shell({ children, tone = "from-aqua/40 via-foam to-dune/80" }) {
  return (
    <section className="relative flex min-h-[calc(100vh-40px)] flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-soft">
      <div className={`absolute inset-0 bg-gradient-to-br ${tone}`} />
      <div className="absolute -right-20 top-12 h-56 w-56 rounded-full bg-ocean/15 blur-3xl" />
      <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-sand/20 blur-3xl" />
      <div className="relative z-10 flex min-h-[calc(100vh-40px)] flex-col p-5">
        {children}
      </div>
    </section>
  );
}

function Header({ label, onBack }) {
  return (
    <div className="flex items-center justify-between">
      <button
        className={`rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition ${
          onBack ? "hover:bg-white/70" : "opacity-0"
        }`}
        onClick={onBack}
        aria-label="Go back"
        disabled={!onBack}
      >
        Back
      </button>
      <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
        {label}
      </span>
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <Shell>
      <div className="flex items-center justify-between">
        <img
          className="h-14 w-auto object-contain"
          src="/chasing-fun-logo.png"
          alt="Chasing Fun"
        />
        <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold text-ink/65">
          2 quick questions
        </span>
      </div>

      <div className="animate-reveal mt-10 overflow-hidden rounded-[28px] bg-ink text-foam shadow-card">
        <div className="media-ocean flex min-h-56 flex-col justify-end p-5">
          <p className="max-w-52 text-sm font-semibold text-white/75">
            Warm ocean energy. Real people. A guided path before details.
          </p>
        </div>
      </div>

      <div className="animate-reveal-delayed mt-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-sand">
          Confidence Journey
        </p>
        <h1 className="text-4xl font-black leading-[0.96] text-ink">
          Before details, find what matters most for you.
        </h1>
        <p className="mt-5 text-lg leading-7 text-ink/72">
          Answer two simple questions and get a short path based on what you are
          actually looking for.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onStart}>Start the journey</PrimaryButton>
        <p className="mt-3 text-center text-sm font-medium text-ink/55">
          No pressure. No decision needed here.
        </p>
      </div>
    </Shell>
  );
}

function QuestionOne({ selected, onSelect, onContinue, onBack }) {
  return (
    <Shell tone="from-foam via-aqua/60 to-dune/80">
      <Header label="1 of 2" onBack={onBack} />
      <div className="animate-reveal mt-12">
        <p className="mb-3 text-sm font-bold text-sand">Start with the pull</p>
        <h2 className="text-3xl font-black leading-tight">
          What pulled you toward a trip like this?
        </h2>
        <p className="mt-3 text-base leading-6 text-ink/65">
          Choose the answer that feels closest. No need to overthink it.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {motivations.map((item) => (
          <button
            key={item.id}
            className={`answer-card ${selected === item.id ? "answer-card-selected" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton disabled={!selected} onClick={onContinue}>
          Continue
        </PrimaryButton>
      </div>
    </Shell>
  );
}

function RouteReveal({ route, routeId, onContinue, onBack }) {
  return (
    <Shell tone={route.accent}>
      <Header label="Your path" onBack={onBack} />
      <div className="animate-reveal mt-12">
        <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-ink/65 shadow-card">
          {route.chip}
        </span>
        <h2 className="mt-5 text-4xl font-black leading-[0.95] text-ink">
          {route.name}
        </h2>
        <p className="mt-5 text-lg leading-7 text-ink/72">{route.reveal}</p>
      </div>

      <div className="animate-reveal-delayed mt-8 rounded-[30px] bg-white/75 p-4 shadow-card backdrop-blur">
        <div className="media-wave flex min-h-52 items-end rounded-[24px] p-5">
          <p className="max-w-56 text-base font-bold leading-6 text-white">
            Placeholder route media: replace with real {routeId} visual.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onContinue}>Continue my path</PrimaryButton>
      </div>
    </Shell>
  );
}

function QuestionTwo({ route, selected, onSelect, onContinue, onBack }) {
  return (
    <Shell tone="from-foam via-dune/70 to-aqua/60">
      <Header label="2 of 2" onBack={onBack} />
      <div className="animate-reveal mt-10">
        <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight">
          What would help you feel more confident before talking?
        </h2>
        <p className="mt-3 text-base leading-6 text-ink/65">
          This helps the journey answer the part that usually creates the most
          hesitation.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {confidenceOptions.map((label) => (
          <button
            key={label}
            className={`answer-card ${selected === label ? "answer-card-selected" : ""}`}
            onClick={() => onSelect(label)}
          >
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton disabled={!selected} onClick={onContinue}>
          Show my confidence path
        </PrimaryButton>
      </div>
    </Shell>
  );
}

function ConfidenceModule({ route, routeId, confidenceGap, onContinue, onBack }) {
  return (
    <Shell tone="from-aqua/50 via-foam to-dune/70">
      <Header label="Confidence" onBack={onBack} />
      <div className="animate-reveal mt-8">
        <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight">
          {route.moduleTitle}
        </h2>
        <p className="mt-4 text-lg leading-7 text-ink/72">{route.moduleCopy}</p>
        {confidenceGap && (
          <p className="mt-4 rounded-2xl bg-white/70 p-4 text-sm font-semibold leading-6 text-ink/65">
            Your focus: {confidenceGap}
          </p>
        )}
      </div>

      <div className="mt-7 grid gap-3">
        {route.points.map((point, index) => (
          <div key={point} className="rounded-[22px] bg-white/80 p-4 shadow-card">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-ocean">
              0{index + 1}
            </p>
            <p className="mt-2 text-lg font-extrabold text-ink">{point}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] bg-ink p-5 text-foam shadow-card">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-aqua">
          Proof placeholder
        </p>
        <p className="mt-3 text-lg font-semibold leading-7">{route.proof}</p>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue}>Show the next step</PrimaryButton>
      </div>
    </Shell>
  );
}

function FinalCta({ route, routeId, onBack }) {
  return (
    <Shell tone="from-dune via-foam to-aqua/70">
      <Header label="Next step" onBack={onBack} />
      <div className="animate-reveal mt-10">
        <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-4xl font-black leading-[0.96]">
          Want to check if this is actually right for you?
        </h2>
        <p className="mt-5 text-lg leading-7 text-ink/72">
          The next step is a short fit conversation. We understand what you are
          looking for, answer what matters, and see if the trip fits.
        </p>
      </div>

      <div className="animate-reveal-delayed mt-8 rounded-[30px] bg-white/80 p-5 shadow-card">
        <img
          className="mx-auto h-20 w-auto object-contain opacity-90"
          src="/chasing-fun-logo.png"
          alt="Chasing Fun logo"
        />
        <blockquote className="mt-5 text-center text-xl font-black leading-7 text-ink">
          “Chasing fun is one of the most important things from everything you
          chase in life.”
        </blockquote>
        <p className="mt-3 text-center text-sm font-bold text-sand">
          Dor Damary
        </p>
      </div>

      <div className="mt-auto pt-8">
        <a
          className="primary-button flex items-center justify-center"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            track("cta_clicked", {
              cta_id: "final_whatsapp",
              route_id: routeId,
              route_name: route.name,
            });
            track("call_booking_clicked", {
              route_id: routeId,
              cta_id: "final_whatsapp",
            });
          }}
        >
          {route.cta} on WhatsApp
        </a>
        <p className="mt-3 text-center text-sm font-medium text-ink/55">
          Opens WhatsApp with the Chasing Fun team.
        </p>
      </div>
    </Shell>
  );
}

function PrimaryButton({ children, disabled, onClick }) {
  return (
    <button
      className="primary-button w-full disabled:pointer-events-none disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

createRoot(document.getElementById("root")).render(<App />);

