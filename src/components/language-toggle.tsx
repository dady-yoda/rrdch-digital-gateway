import { useLanguage } from "@/contexts/LanguageContext";
import { ButtonHTMLAttributes, useState } from "react";

interface LanguageToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textClassName?: string;
  mutedClassName?: string;
}

const EnIcon = ({ className }: { className: string }) => (
  <svg 
    className={`h-[1.2rem] w-[1.2rem] ${className}`} 
    viewBox="0 0 1024 1024" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M512 960C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448z m0-64c212.064 0 384-171.936 384-384S724.064 128 512 128 128 299.936 128 512s171.936 384 384 384z m103.04-428.32v7.232c10.464-13.856 21.952-24.032 34.432-30.528 12.48-6.496 26.784-9.728 42.976-9.728 15.744 0 29.824 3.424 42.24 10.272 12.384 6.848 21.632 16.576 27.776 29.12 3.936 7.264 6.496 15.136 7.648 23.616 1.152 8.448 1.76 19.232 1.76 32.352v111.136c0 11.968-2.752 20.992-8.224 27.136a27.264 27.264 0 0 1-21.312 9.184 27.52 27.52 0 0 1-21.664-9.408c-5.536-6.272-8.32-15.232-8.32-26.88v-99.552c0-19.68-2.72-34.752-8.192-45.184-5.472-10.432-16.384-15.648-32.704-15.648-10.656 0-20.352 3.2-29.12 9.536-8.736 6.336-15.136 15.04-19.2 26.144-2.944 8.896-4.384 25.504-4.384 49.856v74.816c0 12.096-2.816 21.184-8.448 27.232a28.352 28.352 0 0 1-21.76 9.088 27.04 27.04 0 0 1-21.216-9.408c-5.536-6.272-8.32-15.232-8.32-26.88V468.576c0-11.392 2.496-19.872 7.456-25.504 4.96-5.6 11.744-8.416 20.32-8.416 5.28 0 10.016 1.248 14.24 3.712a26.624 26.624 0 0 1 10.176 11.168c2.56 4.96 3.84 11.008 3.84 18.144z m-112.736-66.272H355.968v78.72H490.72c9.92 0 17.312 2.24 22.208 6.72a22.688 22.688 0 0 1 7.328 17.6 23.552 23.552 0 0 1-7.232 17.824c-4.8 4.576-12.256 6.88-22.304 6.88H355.968v91.2h151.36c10.24 0 17.92 2.4 23.104 7.136a24.416 24.416 0 0 1 7.744 18.912c0 7.584-2.56 13.76-7.744 18.496-5.184 4.736-12.864 7.104-23.104 7.104H330.816c-14.144 0-24.32-3.136-30.528-9.408-6.176-6.272-9.28-16.416-9.28-30.4V391.136c0-9.344 1.376-16.96 4.16-22.88a25.792 25.792 0 0 1 12.992-12.896c5.92-2.688 13.44-4.032 22.656-4.032h171.52c10.336 0 18.016 2.272 23.04 6.88a23.296 23.296 0 0 1 7.552 18.048 23.552 23.552 0 0 1-7.552 18.24c-5.024 4.608-12.704 6.912-23.04 6.912z" />
  </svg>
);

const KnIcon = ({ className }: { className: string }) => (
  <svg 
    className={`h-[1.2rem] w-[1.2rem] ${className}`} 
    viewBox="0 0 30 30" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M 15 0 A 15 15 0 1 1 15 30 A 15 15 0 1 1 15 0 Z M15.9,13.3c0.2,0.4,0.3,0.7,0.3,1c0,0.4-0.1,0.7-0.3,0.9h4v1.4l-1.9,0c0.5,0.3,0.8,0.7,1.1,1.1 s0.4,1,0.4,1.5c0,1.2-0.4,2.1-1.2,2.7c-0.8,0.7-2,1-3.4,1c-1.4,0-2.5-0.3-3.3-1s-1.2-1.6-1.2-2.7c0-1.1,0.5-2,1.4-2.7l-1.9,0v-1.4 h4.2c0.3-0.3,0.5-0.6,0.5-1c0-0.3-0.1-0.7-0.3-1H9.9v-1.5h5.9c0.7,0,1.2,0,1.6-0.1c0.3-0.1,0.6-0.2,0.8-0.4 c0.2-0.2,0.3-0.5,0.3-0.8c0-0.8-0.4-1.7-1.3-2.5L18.5,7c0.5,0.6,0.9,1.2,1.2,1.7c0.3,0.6,0.4,1.2,0.4,1.8c0,0.5-0.1,0.9-0.4,1.4 s-0.6,0.8-1.1,1s-1.3,0.4-2.4,0.4H15.9z M14.9,16.7c-1,0-1.7,0.2-2.2,0.7s-0.8,1-0.8,1.8c0,0.7,0.3,1.3,0.8,1.7 c0.5,0.4,1.2,0.6,2.2,0.6s1.7-0.2,2.2-0.6c0.5-0.4,0.8-1,0.8-1.7c0-0.8-0.3-1.4-0.8-1.8S15.9,16.7,14.9,16.7z" />
  </svg>
);

export function LanguageToggle({ className, textClassName, mutedClassName, ...props }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const defaultClassName = "search-toggle-btn relative";

  // Determine which icon is active to show based on language and hover state
  const showEn = language === "en" ? !isHovered : isHovered;
  const showKn = language === "kn" ? !isHovered : isHovered;

  return (
    <button
      id="language-toggle-btn"
      onClick={toggleLanguage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={className || defaultClassName}
      aria-label={language === "en" ? "Switch to Kannada" : "Switch to English"}
      title={language === "en" ? "Switch to ಕನ್ನಡ" : "Switch to English"}
      {...props}
    >
      <EnIcon className={`absolute inset-0 m-auto transition-all ${showEn ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <KnIcon className={`absolute inset-0 m-auto transition-all ${showKn ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
      <span className="sr-only">Toggle language</span>
    </button>
  );
}
