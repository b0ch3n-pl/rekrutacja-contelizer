import {useTranslation} from "react-i18next";
import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    AnimatePresence,
    motion
} from "motion/react"
import {useLocation} from "react-router-dom";
import {LanguageIcon} from "../ui/LanguageIcon.tsx";

export const PageHeader = () => {
    const {i18n, t} = useTranslation();
    const {pathname} = useLocation();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const currentLang = i18n.language;

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsExpanded(false);
    };


    const headerText = (() => {
        switch (pathname) {
            case "/":
                return t("title.mixer");
            case "/pesel-checker":
                return t("title.pesel");
            case "/api-lab":
                return t("title.api");
        }
    })();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(event.target as Node)
            ) {
                setIsExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 bg-green w-screen z-50 transition-all duration-400 ease-out ${
                isExpanded ? "h-[135px]" : "h-[90px]"
            }`}
            style={{
                clipPath: "ellipse(100% 95% at 50% 0%)",
            }}
        >
            <div className="flex flex-col items-center justify-center bg-green py-6 text-center space-y-3">
                <motion.div className="relative"
                            initial={{opacity: 0, y: -30}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: .6, ease: "easeIn"}}
                            key={pathname}
                >
                    <h1 className="text-3xl font-heading  text-white"  >
                        {headerText}
                    </h1>
                    <div
                        className="absolute w-5 h-5 right-[-26px] top-[-16px] cursor-pointer text-4xl"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                       <LanguageIcon lang={currentLang} />
                    </div>
                </motion.div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div className="flex gap-4 text-white font-medium"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: .3, ease: "easeInOut" }}
                        >
                            {[
                                {code: "pl", label: "Polski"},
                                {code: "en", label: "English"},
                            ].map(({code, label}) => (
                                <button
                                    key={code}
                                    onClick={() => changeLanguage(code)}
                                    className={
                                        `cursor-pointer ${currentLang === code
                                            ? "underline underline-offset-4 font-semibold"
                                            : ""}`
                                    }
                                >
                                    {label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </header>
    );
};
