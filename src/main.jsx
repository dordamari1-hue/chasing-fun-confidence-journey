import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WHATSAPP_BASE_URL = "https://wa.me/972548668646";

const motivations = [
  {
    id: "surf",
    label: "בא לי ללמוד או להשתפר בגלישה",
    route: "surf",
  },
  {
    id: "social",
    label: "בא לי להכיר אנשים ולהרגיש חלק מקבוצה",
    route: "social",
  },
  {
    id: "reset",
    label: "אני צריך לצאת מהשגרה ולהרגיש חי",
    route: "reset",
  },
  {
    id: "dream",
    label: "בא לי חוויה טרופית מיוחדת",
    route: "reset",
  },
  {
    id: "guided",
    label: "חשוב לי שמישהו יארגן את זה כמו שצריך",
    route: "guided",
  },
  {
    id: "value",
    label: "אני רוצה להבין אם זה באמת שווה את זה",
    route: "value",
  },
];

const confidenceOptions = [
  "לדעת שלא ארגיש לבד",
  "לדעת שהרמה שלי בגלישה מתאימה",
  "להבין שיש מבנה, אבל לא טיול נוקשה",
  "להרגיש שאני יכול לסמוך על הצוות",
  "להבין שזה שווה את הזמן והכסף",
  "להבין איך הטיול עובד בפועל",
];

const routes = {
  social: {
    name: "ביטחון חברתי",
    accent: "from-sand/35 via-dune to-aqua/70",
    chip: "אנשים + שייכות",
    mediaCue: "וידאו מתאים: רגעי הגעה, ארוחה משותפת, צחוקים אחרי גלישה, מישהו שהגיע לבד ונכנס לקבוצה.",
    reveal:
      "אם מה שמושך אותך זה האנשים, זה אומר הרבה. החוויה לא בנויה על מזל חברתי. היא בנויה כדי שאנשים יוכלו להיפתח, להתחבר ולהרגיש חלק.",
    moduleTitle: "החיבור בין האנשים לא נשאר למקרה.",
    moduleCopy:
      "ההתחלה של הטיול נבנית כדי שאפשר יהיה לנחות, להרגיש בנוח, ולהיכנס לקבוצה בלי להוכיח כלום ובלי להילחץ.",
    points: ["נחיתה רכה", "קצב משותף סביב הים", "רגעים שמחברים אנשים טבעי"],
    proof: "מקום לעדות: “הגעתי לבד, ובפועל הרגשתי חלק מהחבורה הרבה יותר מהר ממה שחשבתי.”",
    cta: "לשאול על הגעה לבד",
    whatsapp:
      "היי Chasing Fun, עברתי את המסלול של הביטחון החברתי. אני רוצה לבדוק אם מתאים לי להגיע לבד ולהשתלב בקבוצה.",
  },
  surf: {
    name: "ביטחון בגלישה",
    accent: "from-ocean/30 via-aqua to-foam",
    chip: "גלישה + התקדמות",
    mediaCue: "וידאו מתאים: מתחילים במים, מדריך עוזר, נפילה מצחיקה, הצלחה קטנה על גל, חיוך אחרי סשן.",
    reveal:
      "אפשר לרצות לגלוש ועדיין לפחד מהרמה. זה בדיוק המקום הנכון להתחיל ממנו. המסלול הזה מראה איך הגלישה יכולה להיות חוויה של ביטחון, לא מבחן.",
    moduleTitle: "הגלישה בנויה סביב התקדמות, לא סביב לחץ.",
    moduleCopy:
      "לא צריך להגיע בתור גולש. הקצב הוא ללמוד, לנסות, לצחוק, ליפול, לקום, ולהרגיש כל יום קצת יותר חופשי במים.",
    points: ["מתאים גם למתחילים", "התקדמות בלי לחץ", "ליווי לפי הרמה שלך"],
    proof: "מקום לעדות: “פחדתי מהרמה שלי, ובסוף הגלישה הפכה לחלק שהכי חיכיתי לו.”",
    cta: "לדבר על הרמה שלי בגלישה",
    whatsapp:
      "היי Chasing Fun, עברתי את המסלול של הביטחון בגלישה. אני רוצה לבדוק אם הרמה שלי מתאימה לטיול.",
  },
  reset: {
    name: "חופש עם מסגרת",
    accent: "from-coral/20 via-dune to-aqua/60",
    chip: "ריסט + חיים",
    mediaCue: "וידאו מתאים: ים פתוח, נסיעה, שקיעה, רגע שקט, צחוק קבוצתי, תחושת חופש בלי עומס.",
    reveal:
      "לפעמים זה לא רק לטוס. זה להיכנס לקצב אחר. ים, אנשים, תנועה, שמש, מרחב, והתחושה שמשהו בך נפתח מחדש.",
    moduleTitle: "חופש מרגיש טוב יותר כשמחזיקים את הדברים החשובים.",
    moduleCopy:
      "יש מספיק מבנה כדי שתוכל להירגע, ומספיק פתיחות כדי שזה עדיין ירגיש כמו חופש אמיתי, לא כמו לו״ז שמנהל אותך.",
    points: ["זמן פתוח", "הרפתקה משותפת", "קצב אחר מהשגרה"],
    proof: "מקום לעדות: “זה הרגיש כאילו החיים נפתחו שוב לשבוע אחד.”",
    cta: "לבדוק אם זה הריסט שאני צריך",
    whatsapp:
      "היי Chasing Fun, עברתי את המסלול של חופש עם מסגרת. אני רוצה לבדוק אם הטיול הזה מתאים לריסט שאני מחפש.",
  },
  guided: {
    name: "ביטחון במעטפת",
    accent: "from-aqua via-foam to-dune",
    chip: "אמון + ארגון",
    mediaCue: "וידאו מתאים: צוות בשטח, הכנה לפני פעילות, מעבר לוקיישן, רגע של סדר בתוך חוויה חופשית.",
    reveal:
      "לרצות חופש לא אומר לרצות לארגן הכל לבד. המסלול הזה מראה את השיטה שמחזיקה את החוויה מאחורי הקלעים.",
    moduleTitle: "יש מבנה מאחורי החופש.",
    moduleCopy:
      "Chasing Fun מחזיקה את השכבות החשובות: חברה, גלישה, לוגיסטיקה, רווחה, יעד, הנאה ותיעוד. ככה אפשר להיכנס לחוויה בלי להחזיק הכל בראש.",
    points: ["הכנה לפני הטיול", "קצב ברור במהלך החוויה", "מעטפת סביב הדברים החשובים"],
    proof: "מקום לעדות: “מרגישים שמישהו חשב על הדברים הקטנים.”",
    cta: "לשאול איך זה עובד",
    whatsapp:
      "היי Chasing Fun, עברתי את המסלול של ביטחון במעטפת. אני רוצה להבין איך הטיול עובד ומה בדיוק אתם מחזיקים עבורנו.",
  },
  value: {
    name: "ערך והתאמה",
    accent: "from-dune via-foam to-aqua/50",
    chip: "החלטה + בהירות",
    mediaCue: "וידאו מתאים: רגעים שמראים איכות, ליווי, קבוצה, גלישה, יעד, והתחושה שזה יותר מסתם חופשה.",
    reveal:
      "להשוות זה חכם. השאלה היא לא רק כמה זה עולה, אלא האם זו החוויה הנכונה, עם האנשים הנכונים, והמעטפת שמקטינה סיכון.",
    moduleTitle: "השאלה הטובה היא לא רק מחיר. היא התאמה.",
    moduleCopy:
      "טיול כזה צריך להקטין את הסיכוי לבזבז כסף, ימי חופש ואמון. הערך נמצא באיכות החוויה, בביטחון, בקבוצה ובדרך שבה הכל מוחזק.",
    points: ["איכות החוויה", "התאמה לקבוצה", "פחות סיכון בהחלטה"],
    proof: "מקום לעדות: “הערך היה בזה שהחוויה הרגישה אמיתית, מדויקת ומוחזקת.”",
    cta: "לבדוק אם זה שווה לי",
    whatsapp:
      "היי Chasing Fun, עברתי את המסלול של ערך והתאמה. אני רוצה להבין אם הטיול הזה באמת מתאים ושווה לי.",
  },
};

function getWhatsappUrl({ route, routeId, motivationId, confidenceGap, ctaId }) {
  const baseMessage =
    route?.whatsapp ||
    "היי Chasing Fun, עברתי את המסע ורוצה לבדוק אם הטיול מתאים לי.";
  const context = [
    "",
    "---",
    `route_id: ${routeId || "unknown"}`,
    `motivation_id: ${motivationId || "unknown"}`,
    `confidence_gap: ${confidenceGap || "unknown"}`,
    `cta_id: ${ctaId || "final_whatsapp"}`,
  ].join("\n");
  const message = `${baseMessage}${context}`;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

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

  const selectedRouteId = selectedMotivation
    ? motivations.find((item) => item.id === selectedMotivation)?.route
    : null;

  const selectedRoute = selectedRouteId ? routes[selectedRouteId] : routes.social;

  const screen = useMemo(() => {
    if (step === "intro") {
      return (
        <Intro
          onStart={() => {
            track("journey_started", {
              route_id: null,
              motivation_id: null,
              confidence_gap: null,
              cta_id: "start_journey",
            });
            track("flow_step_viewed", {
              step_id: "motivation",
              route_id: null,
              motivation_id: null,
              confidence_gap: null,
              cta_id: null,
            });
            setStep("q1");
          }}
        />
      );
    }

    if (step === "q1") {
      return (
        <QuestionOne
          selected={selectedMotivation}
          onSelect={(id) => {
            const route = motivations.find((item) => item.id === id)?.route;
            setSelectedMotivation(id);
            track("motivation_selected", {
              motivation_id: id,
              route_id: route,
              confidence_gap: null,
              cta_id: null,
            });
            track("route_selected", {
              route_id: route,
              motivation_id: id,
              confidence_gap: null,
              cta_id: null,
            });
          }}
          onContinue={() => {
            track("flow_step_viewed", {
              step_id: "route_reveal",
              route_id: selectedRouteId,
              motivation_id: selectedMotivation,
              confidence_gap: null,
              cta_id: null,
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
          routeId={selectedRouteId}
          onContinue={() => {
            track("cta_clicked", {
              cta_id: "continue_path",
              route_id: selectedRouteId,
              motivation_id: selectedMotivation,
              confidence_gap: null,
            });
            track("flow_step_viewed", {
              step_id: "confidence_gap",
              route_id: selectedRouteId,
              motivation_id: selectedMotivation,
              confidence_gap: null,
              cta_id: null,
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
          routeId={selectedRouteId}
          selected={confidenceGap}
          onSelect={(gap) => {
            setConfidenceGap(gap);
            track("confidence_gap_selected", {
              confidence_gap_id: gap,
              confidence_gap: gap,
              route_id: selectedRouteId,
              motivation_id: selectedMotivation,
              cta_id: null,
            });
          }}
          onContinue={() => {
            track("flow_step_viewed", {
              step_id: "confidence_module",
              route_id: selectedRouteId,
              motivation_id: selectedMotivation,
              confidence_gap: confidenceGap,
              cta_id: null,
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
          routeId={selectedRouteId}
          confidenceGap={confidenceGap}
          onContinue={() => {
            track("section_engaged", {
              section_id: "confidence_module",
              route_id: selectedRouteId,
              motivation_id: selectedMotivation,
              confidence_gap: confidenceGap,
              cta_id: null,
            });
            track("cta_seen", {
              cta_id: "final_whatsapp",
              route_id: selectedRouteId,
              motivation_id: selectedMotivation,
              confidence_gap: confidenceGap,
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
        routeId={selectedRouteId}
        motivationId={selectedMotivation}
        confidenceGap={confidenceGap}
        onBack={() => setStep("confidence")}
      />
    );
  }, [step, selectedMotivation, confidenceGap, selectedRoute, selectedRouteId]);

  return (
    <main dir="rtl" lang="he" className="min-h-screen overflow-hidden bg-foam text-ink">
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
        aria-label="חזרה"
        disabled={!onBack}
      >
        חזרה
      </button>
      <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-ink/60">
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
          2 שאלות קצרות
        </span>
      </div>

      <div className="animate-reveal mt-10 overflow-hidden rounded-[28px] bg-ink text-foam shadow-card">
        <div className="media-ocean flex min-h-56 flex-col justify-end p-5">
          <p className="max-w-56 text-sm font-semibold text-white/80">
            כאן ייכנס וידאו פתיחה: ים, אנשים, תנועה, וחיוך אמיתי של Chasing Fun.
          </p>
        </div>
      </div>

      <div className="animate-reveal-delayed mt-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-sand">
          Confidence Journey
        </p>
        <h1 className="text-4xl font-black leading-[1.02] text-ink">
          לפני הפרטים, בוא נבין מה באמת חשוב לך בטיול.
        </h1>
        <p className="mt-5 text-lg leading-7 text-ink/72">
          שתי שאלות קצרות, ומסלול אישי שמראה את החלק בחוויה שהכי יכול לבנות לך ביטחון.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onStart}>להתחיל את המסע</PrimaryButton>
        <p className="mt-3 text-center text-sm font-medium text-ink/55">
          בלי התחייבות. בלי החלטה עכשיו. רק בהירות.
        </p>
      </div>
    </Shell>
  );
}

function QuestionOne({ selected, onSelect, onContinue, onBack }) {
  return (
    <Shell tone="from-foam via-aqua/60 to-dune/80">
      <Header label="1 מתוך 2" onBack={onBack} />
      <div className="animate-reveal mt-12">
        <p className="mb-3 text-sm font-bold text-sand">נתחיל במה שמושך אותך</p>
        <h2 className="text-3xl font-black leading-tight">
          מה גרם לך לעצור על טיול כזה?
        </h2>
        <p className="mt-3 text-base leading-6 text-ink/65">
          תבחר את מה שהכי קרוב אליך עכשיו. לא צריך לדייק מושלם.
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
          להמשיך
        </PrimaryButton>
      </div>
    </Shell>
  );
}

function RouteReveal({ route, routeId, onContinue, onBack }) {
  return (
    <Shell tone={route.accent}>
      <Header label="המסלול שלך" onBack={onBack} />
      <div className="animate-reveal mt-12">
        <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-ink/65 shadow-card">
          {route.chip}
        </span>
        <h2 className="mt-5 text-4xl font-black leading-[1.02] text-ink">
          {route.name}
        </h2>
        <p className="mt-5 text-lg leading-7 text-ink/72">{route.reveal}</p>
      </div>

      <div className="animate-reveal-delayed mt-8 rounded-[30px] bg-white/75 p-4 shadow-card backdrop-blur">
        <div className="media-wave flex min-h-52 items-end rounded-[24px] p-5">
          <p className="max-w-64 text-base font-bold leading-6 text-white">
            {route.mediaCue}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onContinue}>להמשיך במסלול שלי</PrimaryButton>
      </div>
    </Shell>
  );
}

function QuestionTwo({ route, selected, onSelect, onContinue, onBack }) {
  return (
    <Shell tone="from-foam via-dune/70 to-aqua/60">
      <Header label="2 מתוך 2" onBack={onBack} />
      <div className="animate-reveal mt-10">
        <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight">
          מה יעזור לך להרגיש יותר בטוח לפני שיחה?
        </h2>
        <p className="mt-3 text-base leading-6 text-ink/65">
          זה עוזר לנו להראות את החלק בחוויה שבדרך כלל מוריד הכי הרבה התלבטות.
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
          להראות לי את הביטחון במסלול
        </PrimaryButton>
      </div>
    </Shell>
  );
}

function ConfidenceModule({ route, routeId, confidenceGap, onContinue, onBack }) {
  return (
    <Shell tone="from-aqua/50 via-foam to-dune/70">
      <Header label="ביטחון" onBack={onBack} />
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
            מה שחשוב לך עכשיו: {confidenceGap}
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
          Proof moment
        </p>
        <p className="mt-3 text-lg font-semibold leading-7">{route.proof}</p>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue}>להראות לי את השלב הבא</PrimaryButton>
      </div>
    </Shell>
  );
}

function FinalCta({ route, routeId, motivationId, confidenceGap, onBack }) {
  const ctaId = "final_whatsapp";

  return (
    <Shell tone="from-dune via-foam to-aqua/70">
      <Header label="השלב הבא" onBack={onBack} />
      <div className="animate-reveal mt-10">
        <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-4xl font-black leading-[1.02]">
          רוצה לבדוק אם זה באמת מתאים לך?
        </h2>
        <p className="mt-5 text-lg leading-7 text-ink/72">
          השלב הבא הוא שיחת התאמה קצרה. מבינים מה אתה מחפש, עונים על מה שחשוב,
          ובודקים אם יש טיול שבאמת מתאים לך.
        </p>
      </div>

      <div className="animate-reveal-delayed mt-8 rounded-[30px] bg-white/80 p-5 shadow-card">
        <img
          className="mx-auto h-20 w-auto object-contain opacity-90"
          src="/chasing-fun-logo.png"
          alt="Chasing Fun logo"
        />
        <blockquote className="mt-5 text-center text-xl font-black leading-7 text-ink">
          “Chasing fun is one of the most important things from everything you chase in life.”
        </blockquote>
        <p className="mt-3 text-center text-sm font-bold text-sand">
          Dor Damary
        </p>
      </div>

      <div className="mt-auto pt-8">
        <a
          className="primary-button flex items-center justify-center"
          href={getWhatsappUrl({
            route,
            routeId,
            motivationId,
            confidenceGap,
            ctaId,
          })}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            track("cta_clicked", {
              cta_id: ctaId,
              route_id: routeId,
              motivation_id: motivationId,
              confidence_gap: confidenceGap,
              route_name: route.name,
            });
            track("call_booking_clicked", {
              route_id: routeId,
              motivation_id: motivationId,
              confidence_gap: confidenceGap,
              cta_id: ctaId,
            });
          }}
        >
          {route.cta} בוואטסאפ
        </a>
        <p className="mt-3 text-center text-sm font-medium text-ink/55">
          נפתח וואטסאפ עם הודעה מותאמת למסלול שלך.
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
