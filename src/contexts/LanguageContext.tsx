import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "kn";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("rrdch_language") as Language) || "en";
  });

  useEffect(() => {
    const applyTranslation = (lang: Language) => {
      if (lang === "kn") {
        document.cookie = "googtrans=/en/kn; path=/";
        document.cookie = `googtrans=/en/kn; path=/; domain=${window.location.hostname}`;
        
        if (!window.google?.translate) {
          const script = document.createElement("script");
          script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          script.async = true;
          document.body.appendChild(script);

          window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              { pageLanguage: "en", includedLanguages: "en,kn", autoDisplay: false },
              "google_translate_element"
            );
          };
        }
      } else {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      }
    };
    
    applyTranslation(language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "kn" : "en";
      localStorage.setItem("rrdch_language", next);
      
      // A clean reload is often required for Google Translate to trigger immediately 
      // without needing complex DOM reconstruction logic.
      window.location.reload();
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <div id="google_translate_element" className="hidden"></div>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}
