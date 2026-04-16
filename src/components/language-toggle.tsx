import { useLanguage } from "@/contexts/LanguageContext";
import { ButtonHTMLAttributes } from "react";

interface LanguageToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textClassName?: string;
  mutedClassName?: string;
}

export function LanguageToggle({ className, textClassName, mutedClassName, ...props }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  const defaultClassName = "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all hover:bg-primary-foreground/20 h-9 px-2 gap-1 text-primary-foreground select-none min-w-[70px] flex-shrink-0 whitespace-nowrap";
  const defaultTextClass = "text-xs font-bold tracking-wide flex-shrink-0";
  const defaultMutedClass = "text-xs text-primary-foreground/50 font-normal flex-shrink-0";
  const defaultSlashClass = "text-primary-foreground/50 text-xs";

  const tClass = textClassName || defaultTextClass;
  const mClass = mutedClassName || defaultMutedClass;
  const sClass = textClassName ? "text-xs opacity-50" : defaultSlashClass;

  return (
    <button
      id="language-toggle-btn"
      onClick={toggleLanguage}
      className={className || defaultClassName}
      aria-label={language === "en" ? "Switch to Kannada" : "Switch to English"}
      title={language === "en" ? "Switch to ಕನ್ನಡ" : "Switch to English"}
      {...props}
    >
      <span
        className="transition-all duration-300"
        style={{ fontFamily: language === "kn" ? "'Noto Sans Kannada', sans-serif" : "inherit" }}
      >
        {language === "en" ? (
          <span className="flex items-center gap-1">
            <span className={tClass}>EN</span>
            <span className={sClass}>/</span>
            <span className={mClass} style={{ fontFamily: "'Noto Sans Kannada', sans-serif" }}>ಕ</span>
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <span className={mClass}>EN</span>
            <span className={sClass}>/</span>
            <span className={tClass} style={{ fontFamily: "'Noto Sans Kannada', sans-serif" }}>ಕ</span>
          </span>
        )}
      </span>
    </button>
  );
}
