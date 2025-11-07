import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface IProps {
    lang: string;
}

export const LanguageIcon: React.FC<IProps> = ({ lang }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.svg
                key={lang}
                width="42"
                height="42"
                viewBox="0 0 24 26"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={lang === "pl" ? "Polski" : "English"}
                role="img"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.25 }}
            >
                <defs>
                    <clipPath id={`flag-clip-${lang}`}>
                        <path d="M3 3h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                    </clipPath>
                </defs>

                <path
                    d="M3 3h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 5v-5H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                    fill="none"
                    stroke="#563D24"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />

                <g clipPath={`url(#flag-clip-${lang})`}>
                    {lang === "en" ? (
                        <>
                            <path d="M0 3h24v18H0z" fill="#012169" />
                            <path d="M0 3l24 18m0-18L0 21" stroke="#fff" strokeWidth="4" />
                            <path d="M0 3l24 18m0-18L0 21" stroke="#C8102E" strokeWidth="2" />
                            <path d="M10 3h4v18h-4zM0 10h24v4H0z" fill="#fff" />
                            <path d="M11 3h2v18h-2zM0 11h24v2H0z" fill="#C8102E" />
                        </>
                    ) :  (
                        <>
                            <path d="M0 3h24v9H0z" fill="#fff" />
                            <path d="M0 12h24v9H0z" fill="#dc2626" />
                        </>
                    )}
                </g>
            </motion.svg>
        </AnimatePresence>
    );
};