import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { code: "en", label: "English", countryCode: "GB" },
  { code: "fr", label: "Fran\u00e7ais", countryCode: "FR" },
  { code: "de", label: "Deutsch", countryCode: "DE" },
  { code: "es", label: "Espa\u00f1ol", countryCode: "ES" },
  { code: "sw", label: "Kiswahili", countryCode: "KE" },
  { code: "ja", label: "\u65E5\u672C\u8A9E", countryCode: "JP" },
  { code: "zh-CN", label: "\u4E2D\u6587", countryCode: "CN" },
  { code: "ar", label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", countryCode: "SA" },
  { code: "pt", label: "Portugu\u00EAs", countryCode: "PT" },
  { code: "it", label: "Italiano", countryCode: "IT" },
  { code: "ko", label: "\uD55C\uAD6D\uC5B4", countryCode: "KR" },
  { code: "ru", label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", countryCode: "RU" },
];

function CountryFlag({ countryCode, className = "" }: { countryCode: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png 2x`}
      alt={countryCode}
      className={`inline-block rounded-sm object-cover ${className}`}
      style={{ width: "20px", height: "14px" }}
      loading="lazy"
    />
  );
}

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((l) => l.code).join(","),
          layout: 0,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setReady(true);
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => setReady(false);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (lang: typeof languages[0]) => {
    setSelected(lang);
    setOpen(false);

    if (lang.code === "en") {
      const iframe = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement | null;
      if (iframe) {
        const restoreBtn = iframe.contentDocument?.querySelector(".goog-te-button button") as HTMLButtonElement | null;
        if (restoreBtn) {
          restoreBtn.click();
          return;
        }
      }
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
      window.location.reload();
      return;
    }

    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <div id="google_translate_element" className="hidden" />
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors"
        data-testid="button-language-selector"
      >
        <Globe className="h-3 w-3" />
        <CountryFlag countryCode={selected.countryCode} />
        <span className="hidden sm:inline">{selected.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50 min-w-[180px] max-h-[320px] overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors hover:bg-red-50 ${
                selected.code === lang.code
                  ? "text-primary bg-red-50/50"
                  : "text-gray-700"
              }`}
              data-testid={`button-lang-${lang.code}`}
            >
              <CountryFlag countryCode={lang.countryCode} />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
