import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, Award, AlertTriangle, HeartPulse, CheckCircle2 } from 'lucide-react';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY ?? "";
const API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are an expert oral health advisor and dental wellness specialist. 
Your role is to analyze a user's dental quiz responses and generate a detailed, personalized oral health report.

---
TONE & STYLE:
- Warm, encouraging, and non-judgmental
- Clear and easy to understand (avoid heavy clinical jargon)
- Empathetic — many users may feel embarrassed about poor habits
- Actionable — every concern must come with a practical tip
- Never diagnose or replace a dentist; always recommend professional consultation where needed

---
REPORT STRUCTURE (always follow this order):
1. PERSONALIZED GREETING
   - Address the user by first name if available
   - Give a 2-line summary of their overall oral health profile
2. OVERALL ORAL HEALTH SCORE (out of 100)
   - Calculate based on their habits, symptoms, and lifestyle
   - Break it into 5 sub-scores (each out of 20): Gum Health, Cavity Risk (inverted), Breath Freshness, Enamel & Sensitivity, Daily Routine Strength
3. WHAT YOU'RE DOING WELL ✅
   - Highlight 2–3 positive habits from their answers
   - Be specific, not generic
4. YOUR KEY CONCERN AREAS ⚠️
   - Identify 2–4 problem areas based on their responses
   - Explain WHY each is a concern in simple terms
   - Give a severity level: Mild / Moderate / Needs Attention
5. PERSONALIZED DAILY ROUTINE PLAN 🪥
   - Morning routine steps
   - Night routine steps
   - Weekly habits to add
   - Tailor this entirely to their answers
6. PRODUCT RECOMMENDATIONS 🛒
   - Recommend specific types (not brands)
   - Explain WHY each product suits their profile
7. DIET & LIFESTYLE TIPS 🥗
   - Based on their answers
   - 3–5 specific, realistic tips
8. DENTIST VISIT RECOMMENDATION 🏥
   - If last visit was over 1 year ago: strongly encourage booking
   - If recent: affirm and suggest what to discuss at next visit
   - Always end with: "This report does not replace a professional dental examination."

IMPORTANT RULES:
- Never use fear-based language
- Never say the user has a disease or condition — say "signs that may indicate" or "risk factors for"
- Always validate effort, even if habits are poor
- Keep the full report between 400–600 words
- End every report with an encouraging closing message
- Format output using basic markdown like **bold**, *italics*, and lists.`;

const QUESTIONS = [
  { category: "Gum Health", question: "Do your gums bleed when brushing or flossing?", options: ["Often", "Sometimes", "Never"] },
  { category: "Gum Health", question: "Do you have swollen or receding gums?", options: ["Yes", "No", "Not sure"] },
  { category: "Cavity Risk", question: "How often do you consume sugary foods or drinks?", options: ["Multiple times a day", "Once a day", "Rarely"] },
  { category: "Routine", question: "How often do you brush your teeth?", options: ["Twice a day or more", "Once a day", "Rarely"] },
  { category: "Routine", question: "How long do you typically brush your teeth?", options: ["2+ minutes", "About 1 minute", "Less than 1 minute"] },
  { category: "Routine", question: "How often do you floss?", options: ["Daily", "A few times a week", "Rarely/Never"] },
  { category: "Breath & Hydration", question: "Do you frequently experience bad breath?", options: ["Yes", "Sometimes", "Rarely/Never"] },
  { category: "Breath & Hydration", question: "Do you use a tongue scraper?", options: ["Yes, daily", "Sometimes", "No"] },
  { category: "Breath & Hydration", question: "How much water do you drink daily?", options: ["2 Liters or more", "1-2 Liters", "Less than 1 Liter"] },
  { category: "Enamel & Sensitivity", question: "Do you experience sensitivity to hot, cold, or sweet foods?", options: ["Often", "Sometimes", "Never"] },
  { category: "Enamel & Sensitivity", question: "Do you drink coffee, tea, or wine daily?", options: ["Yes", "No"] },
  { category: "Enamel & Sensitivity", question: "Do you grind your teeth (especially at night)?", options: ["Yes", "No", "Not sure"] },
  { category: "General", question: "When was your last dental visit?", options: ["Less than 6 months ago", "6-12 months ago", "1-2 years ago", "Over 2 years ago"] }
];

export default function OralHealthQuiz({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [theme, setTheme] = useState({
    bg: '#FFFFFF',
    primary: '#546B41',
    text: '#333333',
    cardBg: '#F8F9FA',
    border: '#E8ECF0',
    success: '#2ECC71',
    warning: '#F39C12'
  });

  useEffect(() => {
    // ISSUE 1: Scroll Fix
    document.body.style.overflow = 'hidden';
    
    // ISSUE 2: Theme & Color Palette Match
    try {
      const style = getComputedStyle(document.documentElement);
      const primaryVar = style.getPropertyValue('--color-primary').trim();
      const textVar = style.getPropertyValue('--color-text').trim();
      
      setTheme(prev => ({
        ...prev,
        primary: primaryVar || prev.primary,
        text: textVar || prev.text
      }));
    } catch (e) {
      console.warn('Could not extract CSS variables, using defaults.');
    }

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 480;

  const handleNext = () => {
    if (step === -1 && !userName.trim()) return;
    if (step >= 0 && step < QUESTIONS.length && !answers[step]) return;
    
    if (step === QUESTIONS.length - 1) {
      submitQuiz();
    } else {
      setStep(s => s + 1);
    }
  };

  const handlePrev = () => {
    setStep(s => Math.max(-1, s - 1));
  };

  const selectOption = (opt: string) => {
    setAnswers(prev => ({ ...prev, [step]: opt }));
  };

  const generateMockReport = (userName: string, answers: Record<number, string>) => {
    const name = userName || "Friend";
    let gumScore = 20, cavityScore = 20, breathScore = 20, enamelScore = 20, routineScore = 20;
    
    if (answers[0] === "Often") gumScore -= 8; else if (answers[0] === "Sometimes") gumScore -= 4;
    if (answers[1] === "Yes") gumScore -= 6;
    if (answers[2] === "Multiple times a day") cavityScore -= 8;
    if (answers[3] === "Once a day" || answers[3] === "Rarely") cavityScore -= 6;
    if (answers[6] === "Yes") breathScore -= 8; else if (answers[6] === "Sometimes") breathScore -= 4;
    if (answers[7] === "No") breathScore -= 4;
    if (answers[8] === "Less than 1 Liter") breathScore -= 4;
    if (answers[9] === "Often") enamelScore -= 8; else if (answers[9] === "Sometimes") enamelScore -= 4;
    if (answers[10] === "Yes") enamelScore -= 4;
    if (answers[11] === "Yes") enamelScore -= 6;
    if (answers[3] !== "Twice a day or more") routineScore -= 8;
    if (answers[4] !== "2+ minutes") routineScore -= 4;
    if (answers[5] !== "Daily") routineScore -= 6;

    gumScore = Math.max(0, gumScore);
    cavityScore = Math.max(0, cavityScore);
    breathScore = Math.max(0, breathScore);
    enamelScore = Math.max(0, enamelScore);
    routineScore = Math.max(0, routineScore);
    const totalScore = gumScore + cavityScore + breathScore + enamelScore + routineScore;

    return `1. PERSONALIZED GREETING
Hello **${name}**! Thank you for taking the time to complete our oral wellness quiz. Based on your answers, you've shown some great habits, but there are definitely areas where a few small changes could make a big difference.

2. OVERALL ORAL HEALTH SCORE
Your overall score is **${totalScore}/100**.
- **Gum Health:** ${gumScore}/20
- **Cavity Risk:** ${cavityScore}/20
- **Breath Freshness:** ${breathScore}/20
- **Enamel & Sensitivity:** ${enamelScore}/20
- **Daily Routine:** ${routineScore}/20

3. WHAT YOU'RE DOING WELL ✅
${routineScore >= 12 ? "- Great job maintaining a routine! Consistency is the foundation of oral health." : "- It's wonderful that you're taking the first step by assessing your habits today!"}
${answers[8] !== "Less than 1 Liter" ? "- You are drinking a good amount of water, which is excellent for your overall health." : "- Thank you for being honest about your habits—awareness is the first step!"}

4. YOUR KEY CONCERN AREAS ⚠️
${gumScore < 15 ? "- **Gum Sensitivity (Needs Attention):** You mentioned bleeding or swelling. This is often an early sign of gingivitis, but can be reversed with improved flossing!" : ""}
${cavityScore < 15 ? "- **Sugar Intake (Moderate):** Frequent consumption of sugary foods can increase your risk of cavities. Try to rinse with water after sugary snacks." : ""}
${enamelScore < 15 ? "- **Enamel Protection (Needs Attention):** Experiencing sensitivity or grinding your teeth can wear down your enamel." : ""}
${totalScore >= 80 ? "- You are doing fantastic! Just keep up the good work and don't skip your regular checkups." : ""}

5. PERSONALIZED DAILY ROUTINE PLAN 🪥
- **Morning:** Brush for a full 2 minutes using a soft-bristled brush.
- **Throughout the day:** Rinse your mouth with water after meals, especially after coffee or sugary snacks.
- **Night:** Floss thoroughly, then brush for 2 minutes. Spit, but do not rinse with water immediately.

6. PRODUCT RECOMMENDATIONS 🛒
- **Toothbrush:** A soft-bristled brush (manual or electric).
- **Toothpaste:** A fluoride toothpaste. ${enamelScore < 15 ? "Look for one specifically designed for 'Sensitivity'." : ""}
- **Floss:** String floss or a water flosser.
${gumScore < 15 ? "- **Mouthwash:** An antibacterial, alcohol-free mouthwash." : ""}

7. DIET & LIFESTYLE TIPS 🥗
- Drink water throughout the day to keep your mouth hydrated.
${answers[10] === "Yes" ? "- Since you enjoy coffee/tea, try drinking water alongside it to prevent staining." : "- Limit snacking between meals to give your teeth a break from acid attacks."}

8. DENTIST VISIT RECOMMENDATION 🏥
${answers[12] === "Over 2 years ago" || answers[12] === "1-2 years ago" ? "Since it has been a while, **I strongly encourage you to book a checkup soon.** Regular professional cleanings are essential!" : "It's great that you've visited the dentist recently! Keep up with your scheduled cleanings."}

*This report does not replace a professional dental examination.*`;
  };

  const submitQuiz = async () => {
    setStep(QUESTIONS.length);
    setLoading(true);
    setError("");

    try {
      if (!API_KEY) {
        await new Promise(r => setTimeout(r, 1500));
        setReport(generateMockReport(userName, answers));
        setStep(QUESTIONS.length + 1);
        setLoading(false);
        return;
      }
      const formattedAnswers = QUESTIONS.map((q, idx) => `Q: ${q.question}\nA: ${answers[idx]}`).join('\n\n');
      const userMessage = `User Name: ${userName || "Friend"}\n\nHere are my dental quiz responses:\n${formattedAnswers}\n\nPlease generate my personalized oral health report according to your instructions.`;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-call": "true"
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      setReport(data?.content?.[0]?.text || "Unable to generate report.");
      setStep(QUESTIONS.length + 1);
    } catch (err: any) {
      console.warn("API failed, falling back to mock report:", err);
      setReport(generateMockReport(userName, answers));
      setStep(QUESTIONS.length + 1);
    } finally {
      setLoading(false);
    }
  };

  const formatReport = (text: string) => {
    return text.split('\n').map((line, i) => {
      let formattedLine = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      // Parse Scores for Animated Bars
      if (line.includes('/20')) {
        const parts = line.split(':**');
        if (parts.length === 2) {
          const label = parts[0].replace('- **', '').trim();
          const scoreStr = parts[1].trim().split('/')[0];
          const score = parseInt(scoreStr, 10) || 0;
          const percentage = (score / 20) * 100;
          
          return (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                <span>{label}</span>
                <span>{score}/20</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: theme.border, borderRadius: '4px', overflow: 'hidden' }}>
                {/* ISSUE 4: Score bars must animate from 0 to final value on render using CSS transition: width 1s ease */}
                <div 
                  className="score-bar-fill"
                  style={{ 
                    height: '100%', 
                    backgroundColor: theme.primary, 
                    borderRadius: '4px',
                    width: '0%', // Starting width for animation
                    transition: 'width 1s ease'
                  }}
                  ref={(el) => {
                    if (el) setTimeout(() => { el.style.width = `${percentage}%`; }, 100);
                  }}
                />
              </div>
            </div>
          );
        }
      }

      if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') || line.startsWith('6.') || line.startsWith('7.') || line.startsWith('8.')) {
        return <h4 key={i} style={{ fontSize: '18px', fontWeight: 'bold', color: theme.primary, marginTop: '24px', marginBottom: '16px', paddingBottom: '8px', borderBottom: `1px solid ${theme.border}` }}>{line}</h4>;
      }
      if (line.startsWith('-')) {
        return (
          <div key={i} style={{ marginLeft: '16px', marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', color: theme.text }}>
            <span style={{ color: theme.primary, marginTop: '2px' }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: line.substring(1).replace(boldRegex, '<strong>$1</strong>') }} />
          </div>
        );
      }
      if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />;
      return <p key={i} style={{ marginBottom: '12px', color: theme.text, lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: line.replace(boldRegex, '<strong>$1</strong>') }} />;
    });
  };

  const containerPadding = isMobile ? '20px' : '32px';

  return createPortal(
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .oral-quiz-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9998;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
        .oral-quiz-card {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          background-color: ${theme.bg};
          width: 90%; /* For mobile responsiveness alongside max-width */
          max-width: 600px;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          color: ${theme.text};
          max-height: 80vh;
        }
        .oral-quiz-content {
          padding: ${containerPadding};
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .oral-quiz-input {
          width: 100%;
          padding: 16px 24px;
          border-radius: 9999px;
          border: 2px solid ${theme.border};
          font-family: inherit;
          font-size: 16px;
          text-align: center;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .oral-quiz-input:focus {
          border-color: ${theme.primary};
          box-shadow: 0 0 0 4px ${theme.primary}20;
        }
        .oral-quiz-btn-primary {
          background-color: ${theme.primary};
          color: #ffffff;
          padding: 12px 32px;
          border-radius: 9999px;
          font-family: inherit;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .oral-quiz-btn-primary:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .oral-quiz-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .oral-quiz-btn-ghost {
          background-color: transparent;
          color: ${theme.text};
          padding: 12px 24px;
          border-radius: 9999px;
          font-family: inherit;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid ${theme.border};
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .oral-quiz-btn-ghost:hover {
          background-color: ${theme.cardBg};
        }
        .oral-quiz-option {
          width: 100%;
          text-align: left;
          padding: 16px 24px;
          border-radius: 16px;
          border: 2px solid ${theme.border};
          background-color: ${theme.bg};
          font-family: inherit;
          font-size: 16px;
          font-weight: 500;
          color: ${theme.text};
          cursor: pointer;
          transition: all 0.15s ease-in-out;
        }
        .oral-quiz-option:hover:not(.selected) {
          border-color: ${theme.primary}50;
          background-color: ${theme.cardBg};
        }
        .oral-quiz-option.selected {
          border-color: ${theme.primary};
          background-color: ${theme.primary};
          color: #ffffff;
          box-shadow: 0 4px 12px ${theme.primary}40;
          transform: scale(1.02);
        }
        .oral-quiz-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: ${theme.cardBg};
          color: ${theme.text};
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
          z-index: 10;
        }
        .oral-quiz-close:hover {
          background-color: ${theme.border};
        }
        .oral-quiz-fade-in {
          animation: fadeSlideUp 0.15s ease-in-out forwards;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spinner-spin {
          to { transform: rotate(360deg); }
        }
      `}} />

      {/* ISSUE 1: Fixed overlay with overflow auto, WebkitOverflowScrolling touch */}
      <div className="oral-quiz-overlay" onClick={onClose} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}></div>
      
      <div className="oral-quiz-card" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
        <button className="oral-quiz-close" onClick={onClose} aria-label="Close Quiz">
          <X size={20} />
        </button>

          {/* Inner content wrapper without overflow hidden */}
          <div className="oral-quiz-content">
            
            {error && step !== QUESTIONS.length && (
              <div style={{ backgroundColor: `${theme.warning}20`, color: theme.warning, padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}>
                <AlertTriangle size={20} />
                <p>{error}</p>
              </div>
            )}

            {step === -1 && (
              <div className="oral-quiz-fade-in" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary, marginBottom: '24px' }}>
                  <HeartPulse size={40} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Discover Your Oral Health Score</h2>
                <p style={{ color: theme.text, opacity: 0.8, marginBottom: '32px', maxWidth: '400px', lineHeight: '1.5' }}>
                  Take our quick interactive quiz to receive a personalized, AI-powered oral wellness report designed just for you.
                </p>
                <div style={{ width: '100%', maxWidth: '320px', marginBottom: '32px' }}>
                  <input 
                    type="text" 
                    placeholder="What's your first name?"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="oral-quiz-input"
                    onKeyDown={(e) => e.key === 'Enter' && userName.trim() && handleNext()}
                  />
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!userName.trim()}
                  className="oral-quiz-btn-primary"
                >
                  Start Quiz <ChevronRight size={20} />
                </button>
              </div>
            )}

            {step >= 0 && step < QUESTIONS.length && (
              <div className="oral-quiz-fade-in" key={step} style={{ display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '6px', backgroundColor: theme.border, borderRadius: '3px', marginBottom: '32px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: theme.primary, borderRadius: '3px', width: `${(step / QUESTIONS.length) * 100}%`, transition: 'width 0.3s ease' }} />
                </div>
                
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.primary, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {QUESTIONS[step].category}
                </span>
                
                {/* ISSUE 3: Section spacing 24px between question block elements */}
                <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', lineHeight: '1.3' }}>
                  {QUESTIONS[step].question}
                </h3>
                
                {/* ISSUE 3: 12px gap between options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectOption(opt)}
                      className={`oral-quiz-option ${answers[step] === opt ? 'selected' : ''}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.border}`, paddingTop: '20px', marginTop: 'auto' }}>
                  <button onClick={handlePrev} className="oral-quiz-btn-ghost">
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button onClick={handleNext} disabled={!answers[step]} className="oral-quiz-btn-primary">
                    {step === QUESTIONS.length - 1 ? 'Analyze Results' : 'Next'} <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === QUESTIONS.length && (
              <div className="oral-quiz-fade-in" style={{ textAlign: 'center', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '32px' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `4px solid ${theme.border}` }}></div>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `4px solid ${theme.primary}`, borderTopColor: 'transparent', animation: 'spinner-spin 1s linear infinite' }}></div>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary }}>
                    <Award size={32} />
                  </div>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>Analyzing your results...</h3>
                <p style={{ color: theme.text, opacity: 0.7, maxWidth: '300px' }}>
                  Our AI specialist is evaluating your habits and preparing a personalized oral wellness plan.
                </p>
              </div>
            )}

            {step === QUESTIONS.length + 1 && (
              <div className="oral-quiz-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ backgroundColor: `${theme.primary}10`, borderRadius: '16px', padding: '24px', marginBottom: '24px', textAlign: 'center', border: `1px solid ${theme.primary}30` }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.primary, marginBottom: '8px' }}>Your Oral Wellness Report</h2>
                  <p style={{ fontWeight: 500, color: theme.text, opacity: 0.8 }}>Generated specially for {userName}</p>
                </div>
                
                <div style={{ flex: 1, backgroundColor: theme.cardBg, borderRadius: '16px', padding: containerPadding, border: `1px solid ${theme.border}` }}>
                  {formatReport(report)}
                </div>

                <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                  <button onClick={onClose} className="oral-quiz-btn-ghost">
                    Close Report
                  </button>
                  <Link to="/login" onClick={onClose} className="oral-quiz-btn-primary">
                    Book Appointment <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            )}
          </div>
      </div>
    </>,
    document.body
  );
}
