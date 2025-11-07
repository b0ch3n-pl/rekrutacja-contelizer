import {useTranslation} from "react-i18next";
import {BigRoundedButton} from "../components/ui/BigRoundedButton.tsx";
import {TbId,} from "react-icons/tb";
import {useState} from "react";
import {
    AnimatePresence,
    motion
} from "motion/react";
import {CgClose} from "react-icons/cg";
import Copyrights from "../components/layout/Copyrights.tsx";

export function PeselChecker() {
    const {t} = useTranslation();
    const [pesel, setPesel] = useState<string>("");
    const [popup, setPopup] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const validatePesel = (value: string) => {
        if (value.length < 11) return t("pesel.number.tooShort");
        if (value.length > 11) return t("pesel.number.tooLong");
        if (!/^\d{11}$/.test(value)) return t("pesel.number.numbersOnly");

        const digits = value.split("").map(Number);
        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        const controlSum = digits
            .slice(0, 10)
            .reduce((sum, digit, i) => sum + digit * weights[i], 0);
        const controlDigit = (10 - (controlSum % 10)) % 10;

        if (controlDigit !== digits[10]) return t("pesel.number.wrong");

        return null;
    };

    const handleCheck = () => {
        const error = validatePesel(pesel);
        if (error) {
            setPopup({type: "error", message: error});
        } else {
            setPopup({type: "success", message: t("pesel.number.ok")});
        }
        setTimeout(() => setPopup(null), 3000);
    };

    return (
        <div className="p-4 pt-26 pb-26 flex flex-col gap-6">
            <p>{t("pesel.introduction")}</p>
            <h1 className="text-2xl text-center">{t("pesel.cta")}</h1>
            <div className="border-l-2 border-brown px-4">
                <p className="italic">{t("pesel.instruction")}</p>
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="border-brown border-2 rounded-full h-12 w-full px-4 font-mono text-xl text-center bg-white"
                    placeholder={t("pesel.inputPlaceholder")}
                    value={pesel}
                    onChange={(e) => setPesel(e.target.value.replace(/\D/g, ""))}
                />
                <AnimatePresence>
                    {pesel && (
                        <motion.button
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            type="button"
                            onClick={() => setPesel("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brown text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-pink transition"
                        >
                            <CgClose size={24}/>
                        </motion.button>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {popup && (
                        <motion.div
                            key="popup"
                            initial={{opacity: 0, scale: 2, rotate: -10}}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: [2.3, 0.95, 1],
                                transition: {duration: 0.4, ease: "easeOut"},
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                y: 40,
                                rotate: [-10, 0, 5],
                                transition: {duration: 0.5, ease: "easeInOut"},
                            }}
                            className={`z-200 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-auto border-beige border-2 rounded-full text-white font-bold uppercase text-center  ${
                                popup.type === "success" ? "bg-green-700" : "bg-red-600"
                            }`}
                        >
                            {popup.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex w-full justify-center items-center">
                <BigRoundedButton
                    label={t("pesel.bigButton")}
                    icon={<TbId/>}
                    disabled={!pesel || !!popup}
                    action={handleCheck}
                />
            </div>
            <Copyrights/>
        </div>
    )
}