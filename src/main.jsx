import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const WHATSAPP_BASE_URL = "https://wa.me/972548668646";
const MAX_SELECTIONS = 3;

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
  {
    id: "not_alone",
    label: "לדעת שלא ארגיש לבד",
  },
  {
    id: "surf_level",
    label: "לדעת שהרמה שלי בגלישה מתאימה",
  },
  {
    id: "structure",
    label: "להבין שיש מבנה, אבל לא טיול נוקשה",
  },
  {
    id: "trust_team",
    label: "להרגיש שאני יכול לסמוך על הצוות",
  },
  {
    id: "value",
    label: "להבין שזה שווה את הזמן והכסף",
  },
  {
    id: "how_it_works",
    label: "להבין איך הטיול עובד בפועל",
  },
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

const routeExperience = {
  social: {
    typicalTitle: "איך זה נראה ביום רגיל כשבאים בשביל אנשים?",
    typicalCopy:
      "יום טוב לא צריך להרגיש כמו פעילות חברתית מאולצת. הוא נבנה מרגעים קטנים: גלישה ביחד, אוכל, הליכה, צחוקים, זמן פתוח, ושיחות שקורות בלי שמישהו מנסה לייצר אותן בכוח.",
    typicalMoments: ["בוקר סביב הים", "ארוחה משותפת", "ערב שנפתח טבעי"],
    methodTitle: "החיבור מתחיל כבר בתחילת הטיול.",
    methodCopy:
      "השלבים הראשונים בנויים כדי לעזור לאנשים לנחות, להכיר, ולהרגיש חלק לפני שהחוויה נהיית גדולה ומהירה יותר.",
    proofTitle: "מה צריך להוכיח כאן?",
    proofCopy:
      "כאן נכניס עדות אמיתית של מישהו שהגיע לבד, חשש מהקבוצה, ובסוף הרגיש חלק מהחבורה.",
  },
  surf: {
    typicalTitle: "איך נראה יום כשהגלישה היא חלק מהקצב?",
    typicalCopy:
      "הגלישה לא צריכה להשתלט על כל היום או להפוך למבחן. היא חלק מהקצב: נכנסים למים, מנסים, נופלים, צוחקים, לומדים, ואז ממשיכים לחיות את היום.",
    typicalMoments: ["סשן גלישה", "מנוחה ואוכל", "רגע קטן של התקדמות"],
    methodTitle: "ההתקדמות מגיעה מהקצב, לא מלחץ.",
    methodCopy:
      "הטיול מחזיק את הגלישה בצורה שמאפשרת למתחילים ומשתפרים להרגיש שיש מקום לרמה שלהם.",
    proofTitle: "מה צריך להוכיח כאן?",
    proofCopy:
      "כאן נכניס עדות של מתחיל או משתתף שפחד מהרמה שלו וגילה שהוא יכול ליהנות ולהתקדם.",
  },
  reset: {
    typicalTitle: "איך מרגיש יום של ריסט אמיתי?",
    typicalCopy:
      "זה לא רק יעד יפה. זה קצב אחר: ים, אנשים, תנועה, זמן פתוח, שקיעה, רגעים לא מתוכננים, והתחושה שאתה סוף סוף לא רץ אחרי היום.",
    typicalMoments: ["ים ותנועה", "זמן פתוח", "רגע של חופש"],
    methodTitle: "המסגרת קיימת כדי לאפשר חופש.",
    methodCopy:
      "כשמישהו אחר מחזיק את הדברים החשובים, קל יותר לשחרר, להיות נוכח, ולתת לחוויה לעבוד.",
    proofTitle: "מה צריך להוכיח כאן?",
    proofCopy:
      "כאן נכניס רגע ויזואלי או עדות שמראה שהטיול מרגיש כמו שינוי מצב, לא רק חופשה.",
  },
  guided: {
    typicalTitle: "איך נראה יום שיש בו סדר בלי נוקשות?",
    typicalCopy:
      "יש קצב, יש אנשים שמחזיקים את התמונה, ויש מספיק גמישות כדי שזה לא ירגיש כמו טיול מאורגן כבד.",
    typicalMoments: ["הכנה ברורה", "מעבר חלק", "חופש בתוך מסגרת"],
    methodTitle: "יש שכבות שמחזיקות את החוויה.",
    methodCopy:
      "הטיול נבנה סביב שכבות: חברה, גלישה, לוגיסטיקה, רווחה, יעד, הנאה ותיעוד. זה מה שמאפשר לחוויה להרגיש חופשית אבל לא כאוטית.",
    proofTitle: "מה צריך להוכיח כאן?",
    proofCopy:
      "כאן נכניס וידאו קצר של דור/צוות, רגע מאחורי הקלעים, או הוכחה שהחוויה מוחזקת מקצועית.",
  },
  value: {
    typicalTitle: "איפה מרגישים את הערך ביום עצמו?",
    typicalCopy:
      "הערך לא נמצא רק ברשימת דברים שמקבלים. הוא נמצא באיך שהיום מרגיש: פחות התעסקות, יותר ביטחון, אנשים נכונים, גלישה, יעד, וקצב שלא היית בונה לבד.",
    typicalMoments: ["חוויה מוחזקת", "אנשים נכונים", "פחות סיכון"],
    methodTitle: "השיטה היא חלק מהערך.",
    methodCopy:
      "כשיש מבנה מאחורי החוויה, הסיכוי לבזבז זמן, כסף ואמון יורד. זה ההבדל בין עוד חופשה לבין חוויה שנבנתה נכון.",
    proofTitle: "מה צריך להוכיח כאן?",
    proofCopy:
      "כאן נכניס עדות או רגע שמראה למה החוויה מרגישה שווה יותר מסתם חופשה או טיול גלישה רגיל.",
  },
};

const methodStages = ["לפני", "התחלה", "אמצע", "סיום", "אחרי"];
const methodLayers = ["חברה", "גלישה", "לוגיסטיקה", "רווחה", "יעד", "הנאה", "תיעוד"];

function getMotivation(id) {
  return motivations.find((item) => item.id === id);
}

function getConfidenceOption(id) {
  return confidenceOptions.find((item) => item.id === id);
}

function toggleLimitedSelection(list, id) {
  if (list.includes(id)) {
    return list.filter((item) => item !== id);
  }

  if (list.length >= MAX_SELECTIONS) {
    return [...list.slice(1), id];
  }

  return [...list, id];
}

function getWhatsappUrl({
  route,
  routeId,
  motivationId,
  motivationIds = [],
  confidenceGap,
  confidenceGaps = [],
  ctaId,
}) {
  const baseMessage =
    route?.whatsapp ||
    "היי Chasing Fun, עברתי את המסע ורוצה לבדוק אם הטיול מתאים לי.";
  const context = [
    "",
    "---",
    `route_id: ${routeId || "unknown"}`,
    `motivation_id: ${motivationId || "unknown"}`,
    `motivation_ids: ${motivationIds.length ? motivationIds.join(",") : "unknown"}`,
    `confidence_gap: ${confidenceGap || "unknown"}`,
    `confidence_gaps: ${confidenceGaps.length ? confidenceGaps.join(",") : "unknown"}`,
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
  const [selectedMotivations, setSelectedMotivations] = useState([]);
  const [primaryMotivation, setPrimaryMotivation] = useState(null);
  const [selectedConfidenceGaps, setSelectedConfidenceGaps] = useState([]);
  const [primaryConfidenceGap, setPrimaryConfidenceGap] = useState(null);

  const selectedRouteId = primaryMotivation
    ? getMotivation(primaryMotivation)?.route
    : null;

  const selectedRoute = selectedRouteId ? routes[selectedRouteId] : routes.social;
  const confidenceGapLabel = primaryConfidenceGap
    ? getConfidenceOption(primaryConfidenceGap)?.label
    : null;

  const screen = useMemo(() => {
    if (step === "intro") {
      return (
        <Intro
          skipHref={getWhatsappUrl({
            route: null,
            routeId: null,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: primaryConfidenceGap,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_intro",
          })}
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
          selected={selectedMotivations}
          onSelect={(id) => {
            const route = motivations.find((item) => item.id === id)?.route;
            const nextSelected = toggleLimitedSelection(selectedMotivations, id);
            setSelectedMotivations(nextSelected);
            if (primaryMotivation && !nextSelected.includes(primaryMotivation)) {
              setPrimaryMotivation(null);
            }
            track("motivation_selected", {
              motivation_id: id,
              route_id: route,
              motivation_ids: nextSelected,
              confidence_gap: null,
              cta_id: null,
            });
          }}
          onContinue={() => {
            if (selectedMotivations.length === 1) {
              const motivationId = selectedMotivations[0];
              const route = getMotivation(motivationId)?.route;
              setPrimaryMotivation(motivationId);
              track("primary_motivation_selected", {
                motivation_id: motivationId,
                motivation_ids: selectedMotivations,
                route_id: route,
                confidence_gap: null,
                cta_id: null,
              });
              track("route_selected", {
                route_id: route,
                motivation_id: motivationId,
                motivation_ids: selectedMotivations,
                confidence_gap: null,
                cta_id: null,
              });
              track("flow_step_viewed", {
                step_id: "route_reveal",
                route_id: route,
                motivation_id: motivationId,
                motivation_ids: selectedMotivations,
                confidence_gap: null,
                cta_id: null,
              });
              setStep("reveal");
              return;
            }

            track("flow_step_viewed", {
              step_id: "primary_motivation",
              route_id: null,
              motivation_id: null,
              motivation_ids: selectedMotivations,
              confidence_gap: null,
              cta_id: null,
            });
            setStep("q1_primary");
          }}
          onBack={() => setStep("intro")}
          skipHref={getWhatsappUrl({
            route: null,
            routeId: null,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: primaryConfidenceGap,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_q1",
          })}
        />
      );
    }

    if (step === "q1_primary") {
      return (
        <PrimaryMotivation
          selectedMotivations={selectedMotivations}
          primary={primaryMotivation}
          onSelect={(id) => {
            const route = getMotivation(id)?.route;
            setPrimaryMotivation(id);
            track("primary_motivation_selected", {
              motivation_id: id,
              motivation_ids: selectedMotivations,
              route_id: route,
              confidence_gap: null,
              cta_id: null,
            });
            track("route_selected", {
              route_id: route,
              motivation_id: id,
              motivation_ids: selectedMotivations,
              confidence_gap: null,
              cta_id: null,
            });
          }}
          onContinue={() => {
            const route = getMotivation(primaryMotivation)?.route;
            track("flow_step_viewed", {
              step_id: "route_reveal",
              route_id: route,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: null,
              cta_id: null,
            });
            setStep("reveal");
          }}
          onBack={() => setStep("q1")}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: primaryConfidenceGap,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_primary_motivation",
          })}
        />
      );
    }

    if (step === "reveal") {
      return (
        <RouteReveal
          route={selectedRoute}
          routeId={selectedRouteId}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: confidenceGapLabel,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_route_reveal",
          })}
          onContinue={() => {
            track("cta_clicked", {
              cta_id: "continue_path",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: null,
            });
            track("flow_step_viewed", {
              step_id: "confidence_gap",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
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
          selected={selectedConfidenceGaps}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: confidenceGapLabel,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_q2",
          })}
          onSelect={(gap) => {
            const nextSelected = toggleLimitedSelection(selectedConfidenceGaps, gap);
            setSelectedConfidenceGaps(nextSelected);
            if (primaryConfidenceGap && !nextSelected.includes(primaryConfidenceGap)) {
              setPrimaryConfidenceGap(null);
            }
            track("confidence_gap_selected", {
              confidence_gap_id: gap,
              confidence_gap: gap,
              confidence_gaps: nextSelected,
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              cta_id: null,
            });
          }}
          onContinue={() => {
            if (selectedConfidenceGaps.length === 1) {
              const gapId = selectedConfidenceGaps[0];
              const gapLabel = getConfidenceOption(gapId)?.label;
              setPrimaryConfidenceGap(gapId);
              track("primary_confidence_gap_selected", {
                confidence_gap_id: gapId,
                confidence_gap: gapLabel,
                confidence_gaps: selectedConfidenceGaps,
                route_id: selectedRouteId,
                motivation_id: primaryMotivation,
                motivation_ids: selectedMotivations,
                cta_id: null,
              });
              track("flow_step_viewed", {
                step_id: "confidence_module",
                route_id: selectedRouteId,
                motivation_id: primaryMotivation,
                motivation_ids: selectedMotivations,
                confidence_gap: gapLabel,
                confidence_gaps: selectedConfidenceGaps,
                cta_id: null,
              });
              setStep("confidence");
              return;
            }

            track("flow_step_viewed", {
              step_id: "primary_confidence_gap",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: null,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: null,
            });
            setStep("q2_primary");
          }}
          onBack={() => setStep("reveal")}
        />
      );
    }

    if (step === "q2_primary") {
      return (
        <PrimaryConfidenceGap
          route={selectedRoute}
          selectedConfidenceGaps={selectedConfidenceGaps}
          primary={primaryConfidenceGap}
          onSelect={(id) => {
            const gapLabel = getConfidenceOption(id)?.label;
            setPrimaryConfidenceGap(id);
            track("primary_confidence_gap_selected", {
              confidence_gap_id: id,
              confidence_gap: gapLabel,
              confidence_gaps: selectedConfidenceGaps,
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              cta_id: null,
            });
          }}
          onContinue={() => {
            track("flow_step_viewed", {
              step_id: "confidence_module",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: null,
            });
            setStep("confidence");
          }}
          onBack={() => setStep("q2")}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: confidenceGapLabel,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_primary_confidence",
          })}
        />
      );
    }

    if (step === "confidence") {
      return (
        <ConfidenceModule
          route={selectedRoute}
          routeId={selectedRouteId}
          confidenceGap={confidenceGapLabel}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: confidenceGapLabel,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_confidence",
          })}
          onContinue={() => {
            track("section_engaged", {
              section_id: "confidence_module",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: null,
            });
            track("cta_seen", {
              cta_id: "continue_to_typical_day",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_readiness: "medium",
            });
            track("flow_step_viewed", {
              step_id: "typical_day",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: null,
            });
            setStep("typical");
          }}
          onBack={() => setStep("q2")}
        />
      );
    }

    if (step === "typical") {
      return (
        <TypicalDay
          route={selectedRoute}
          routeId={selectedRouteId}
          experience={routeExperience[selectedRouteId]}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: confidenceGapLabel,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_typical_day",
          })}
          onContinue={() => {
            track("section_engaged", {
              section_id: "typical_day",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: "continue_to_method",
            });
            track("flow_step_viewed", {
              step_id: "method",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: null,
            });
            setStep("method");
          }}
          onBack={() => setStep("confidence")}
        />
      );
    }

    if (step === "method") {
      return (
        <MethodModule
          route={selectedRoute}
          routeId={selectedRouteId}
          experience={routeExperience[selectedRouteId]}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: confidenceGapLabel,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_method",
          })}
          onContinue={() => {
            track("section_engaged", {
              section_id: "method",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: "continue_to_proof",
            });
            track("flow_step_viewed", {
              step_id: "proof_values",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: null,
            });
            setStep("proof");
          }}
          onBack={() => setStep("typical")}
        />
      );
    }

    if (step === "proof") {
      return (
        <ProofValues
          route={selectedRoute}
          routeId={selectedRouteId}
          experience={routeExperience[selectedRouteId]}
          skipHref={getWhatsappUrl({
            route: selectedRoute,
            routeId: selectedRouteId,
            motivationId: primaryMotivation,
            motivationIds: selectedMotivations,
            confidenceGap: confidenceGapLabel,
            confidenceGaps: selectedConfidenceGaps,
            ctaId: "skip_to_call_proof",
          })}
          onContinue={() => {
            track("section_engaged", {
              section_id: "proof_values",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_id: "continue_to_final_cta",
            });
            track("cta_seen", {
              cta_id: "final_whatsapp",
              route_id: selectedRouteId,
              motivation_id: primaryMotivation,
              motivation_ids: selectedMotivations,
              confidence_gap: confidenceGapLabel,
              confidence_gaps: selectedConfidenceGaps,
              cta_readiness: "high",
            });
            setStep("final");
          }}
          onBack={() => setStep("method")}
        />
      );
    }

    return (
      <FinalCta
        route={selectedRoute}
        routeId={selectedRouteId}
        motivationId={primaryMotivation}
        motivationIds={selectedMotivations}
        confidenceGap={confidenceGapLabel}
        confidenceGaps={selectedConfidenceGaps}
        onBack={() => setStep("confidence")}
      />
    );
  }, [
    step,
    selectedMotivations,
    primaryMotivation,
    selectedConfidenceGaps,
    primaryConfidenceGap,
    confidenceGapLabel,
    selectedRoute,
    selectedRouteId,
  ]);

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

function Intro({ onStart, skipHref }) {
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
        <SkipToCallLink href={skipHref} ctaId="skip_to_call_intro" stepId="intro" />
        <p className="mt-3 text-center text-sm font-medium text-ink/55">
          בלי התחייבות. בלי החלטה עכשיו. רק בהירות.
        </p>
      </div>
    </Shell>
  );
}

function QuestionOne({ selected, onSelect, onContinue, onBack, skipHref }) {
  return (
    <Shell tone="from-foam via-aqua/60 to-dune/80">
      <Header label="1 מתוך 2" onBack={onBack} />
      <div className="animate-reveal mt-12">
        <p className="mb-3 text-sm font-bold text-sand">נתחיל במה שמושך אותך</p>
        <h2 className="text-3xl font-black leading-tight">
          מה גרם לך לעצור על טיול כזה?
        </h2>
        <p className="mt-3 text-base leading-6 text-ink/65">
          אפשר לבחור עד 3 דברים שמרגישים נכונים. אחר כך נבין מה הכי חזק עכשיו.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {motivations.map((item) => (
          <button
            key={item.id}
            className={`answer-card ${selected.includes(item.id) ? "answer-card-selected" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <p className="mb-3 text-center text-sm font-bold text-ink/55">
          נבחרו {selected.length} מתוך {MAX_SELECTIONS}
        </p>
        <PrimaryButton disabled={!selected.length} onClick={onContinue}>
          להמשיך
        </PrimaryButton>
        <SkipToCallLink href={skipHref} ctaId="skip_to_call_q1" stepId="q1" />
      </div>
    </Shell>
  );
}

function PrimaryMotivation({
  selectedMotivations,
  primary,
  onSelect,
  onContinue,
  onBack,
  skipHref,
}) {
  return (
    <Shell tone="from-foam via-aqua/60 to-dune/80">
      <Header label="מה הכי חזק" onBack={onBack} />
      <div className="animate-reveal mt-12">
        <p className="mb-3 text-sm font-bold text-sand">בחרת כמה דברים נכונים</p>
        <h2 className="text-3xl font-black leading-tight">
          ומה הכי מושך אותך עכשיו?
        </h2>
        <p className="mt-3 text-base leading-6 text-ink/65">
          זה לא מוחק את השאר. זה רק עוזר לנו לפתוח את המסלול מהמקום הכי חי.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {selectedMotivations.map((id) => {
          const item = getMotivation(id);
          return (
            <button
              key={id}
              className={`answer-card ${primary === id ? "answer-card-selected" : ""}`}
              onClick={() => onSelect(id)}
            >
              <span>{item?.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton disabled={!primary} onClick={onContinue}>
          לפתוח את המסלול שלי
        </PrimaryButton>
        <SkipToCallLink
          href={skipHref}
          ctaId="skip_to_call_primary_motivation"
          stepId="primary_motivation"
        />
      </div>
    </Shell>
  );
}

function RouteReveal({ route, routeId, skipHref, onContinue, onBack }) {
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
        <SkipToCallLink
          href={skipHref}
          ctaId="skip_to_call_route_reveal"
          stepId="route_reveal"
        />
      </div>
    </Shell>
  );
}

function QuestionTwo({ route, selected, skipHref, onSelect, onContinue, onBack }) {
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
          אפשר לבחור עד 3 דברים שיושבים לך בראש. אחר כך נענה קודם על מה שהכי חשוב.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {confidenceOptions.map((option) => (
          <button
            key={option.id}
            className={`answer-card ${selected.includes(option.id) ? "answer-card-selected" : ""}`}
            onClick={() => onSelect(option.id)}
          >
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <p className="mb-3 text-center text-sm font-bold text-ink/55">
          נבחרו {selected.length} מתוך {MAX_SELECTIONS}
        </p>
        <PrimaryButton disabled={!selected.length} onClick={onContinue}>
          להראות לי את הביטחון במסלול
        </PrimaryButton>
        <SkipToCallLink href={skipHref} ctaId="skip_to_call_q2" stepId="q2" />
      </div>
    </Shell>
  );
}

function PrimaryConfidenceGap({
  route,
  selectedConfidenceGaps,
  primary,
  onSelect,
  onContinue,
  onBack,
  skipHref,
}) {
  return (
    <Shell tone="from-foam via-dune/70 to-aqua/60">
      <Header label="מה קודם" onBack={onBack} />
      <div className="animate-reveal mt-10">
        <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight">
          ומה הכי חשוב שנענה עליו קודם?
        </h2>
        <p className="mt-3 text-base leading-6 text-ink/65">
          כל מה שבחרת נשאר בהקשר. עכשיו נתחיל מהמקום שהכי יכול להוריד התלבטות.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {selectedConfidenceGaps.map((id) => {
          const option = getConfidenceOption(id);
          return (
            <button
              key={id}
              className={`answer-card ${primary === id ? "answer-card-selected" : ""}`}
              onClick={() => onSelect(id)}
            >
              <span>{option?.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton disabled={!primary} onClick={onContinue}>
          להתחיל מזה
        </PrimaryButton>
        <SkipToCallLink
          href={skipHref}
          ctaId="skip_to_call_primary_confidence"
          stepId="primary_confidence_gap"
        />
      </div>
    </Shell>
  );
}

function ConfidenceModule({ route, routeId, confidenceGap, skipHref, onContinue, onBack }) {
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
        <SkipToCallLink
          href={skipHref}
          ctaId="skip_to_call_confidence"
          stepId="confidence_module"
        />
      </div>
    </Shell>
  );
}

function TypicalDay({ route, experience, skipHref, onContinue, onBack }) {
  return (
    <Shell tone="from-coral/20 via-dune to-aqua/50">
      <Header label="איך זה מרגיש" onBack={onBack} />
      <div className="animate-reveal mt-8">
        <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight">
          {experience.typicalTitle}
        </h2>
        <p className="mt-4 text-lg leading-7 text-ink/72">
          {experience.typicalCopy}
        </p>
      </div>

      <div className="animate-reveal-delayed mt-7 rounded-[30px] bg-white/75 p-4 shadow-card backdrop-blur">
        <div className="media-day flex min-h-56 items-end rounded-[24px] p-5">
          <p className="max-w-64 text-base font-bold leading-6 text-white">
            Placeholder: כאן ייכנס מיני מונטאז׳ יום טיפוסי לפי הנתיב.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {experience.typicalMoments.map((moment) => (
          <div key={moment} className="rounded-[22px] bg-white/80 p-4 shadow-card">
            <p className="text-lg font-extrabold text-ink">{moment}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue}>להראות לי את השיטה מאחורי זה</PrimaryButton>
        <SkipToCallLink
          href={skipHref}
          ctaId="skip_to_call_typical_day"
          stepId="typical_day"
        />
      </div>
    </Shell>
  );
}

function MethodModule({ route, experience, skipHref, onContinue, onBack }) {
  return (
    <Shell tone="from-aqua/50 via-foam to-dune/70">
      <Header label="השיטה" onBack={onBack} />
      <div className="animate-reveal mt-8">
        <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight">
          {experience.methodTitle}
        </h2>
        <p className="mt-4 text-lg leading-7 text-ink/72">
          {experience.methodCopy}
        </p>
      </div>

      <div className="mt-7 rounded-[28px] bg-white/80 p-5 shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-ocean">
          Trip stages
        </p>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {methodStages.map((stage) => (
            <div key={stage} className="rounded-2xl bg-aqua/70 px-2 py-3 text-center text-sm font-extrabold text-ink">
              {stage}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[28px] bg-ink p-5 text-foam shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-aqua">
          Trip layers
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {methodLayers.map((layer) => (
            <span key={layer} className="rounded-full bg-white/12 px-3 py-2 text-sm font-bold">
              {layer}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue}>להראות לי הוכחה וערכים</PrimaryButton>
        <SkipToCallLink href={skipHref} ctaId="skip_to_call_method" stepId="method" />
      </div>
    </Shell>
  );
}

function ProofValues({ route, experience, skipHref, onContinue, onBack }) {
  return (
    <Shell tone="from-dune via-foam to-aqua/70">
      <Header label="הוכחה" onBack={onBack} />
      <div className="animate-reveal mt-8">
        <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold text-ink/60">
          {route.name}
        </span>
        <h2 className="mt-5 text-3xl font-black leading-tight">
          {experience.proofTitle}
        </h2>
        <p className="mt-4 text-lg leading-7 text-ink/72">
          {experience.proofCopy}
        </p>
      </div>

      <div className="mt-7 rounded-[28px] bg-white/80 p-5 shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-sand">
          Chasing Fun values
        </p>
        <div className="mt-4 grid gap-3">
          <p className="rounded-2xl bg-dune/80 p-4 text-base font-bold leading-6 text-ink">
            חוויה לפני פרטים. אנשים לפני לוגיסטיקה. חופש עם אחריות.
          </p>
          <p className="rounded-2xl bg-aqua/70 p-4 text-base font-bold leading-6 text-ink">
            Fun הוא לא משהו שזורקים על הטיול בסוף. הוא משהו שבונים סביבו חוויה.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[24px] bg-ink p-5 text-foam shadow-card">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-aqua">
          Placeholder proof
        </p>
        <p className="mt-3 text-lg font-semibold leading-7">
          כאן תיכנס עדות אמיתית, quote, או קטע וידאו קצר לפי הנתיב.
        </p>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={onContinue}>לעבור לשיחת התאמה</PrimaryButton>
      </div>
    </Shell>
  );
}

function FinalCta({
  route,
  routeId,
  motivationId,
  motivationIds,
  confidenceGap,
  confidenceGaps,
  onBack,
}) {
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
            motivationIds,
            confidenceGap,
            confidenceGaps,
            ctaId,
          })}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            track("cta_clicked", {
              cta_id: ctaId,
              route_id: routeId,
              motivation_id: motivationId,
              motivation_ids: motivationIds,
              confidence_gap: confidenceGap,
              confidence_gaps: confidenceGaps,
              route_name: route.name,
            });
            track("call_booking_clicked", {
              route_id: routeId,
              motivation_id: motivationId,
              motivation_ids: motivationIds,
              confidence_gap: confidenceGap,
              confidence_gaps: confidenceGaps,
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

function SkipToCallLink({ href, ctaId, stepId }) {
  return (
    <a
      className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-white/65 px-4 text-center text-sm font-extrabold text-ink/70 shadow-card transition hover:bg-white/85"
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        track("skip_to_call_clicked", {
          cta_id: ctaId,
          step_id: stepId,
        });
      }}
    >
      אני מעדיף לדבר עם מישהו
    </a>
  );
}

createRoot(document.getElementById("root")).render(<App />);
