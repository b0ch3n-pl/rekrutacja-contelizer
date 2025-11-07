import {useState} from "react";
import {TbSwitch3} from "react-icons/tb";
import {useTranslation} from "react-i18next";
import {BigRoundedButton} from "../components/ui/BigRoundedButton.tsx";
import {
    AnimatePresence,
    motion
} from "motion/react";
import Copyrights from "../components/layout/Copyrights.tsx";

export function Mixer() {
    const {t} = useTranslation();
    const [fileContent, setFileContent] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [mixedFileContent, setMixedFileContent] = useState<string>("");
    const [showOriginal, setShowOriginal] = useState<boolean>(true);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file) setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setFileContent(text);
            setMixedFileContent("");
        };
        reader.readAsText(file, "UTF-8");
        setShowOriginal(true);
    };

    const shuffleArray = <T, >(arr: T[]): T[] => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const shuffleWord = (word: string): string => {
        if (word.length <= 3) return word;

        const first = word[0];
        const last = word[word.length - 1];
        const middle = word.slice(1, -1);

        const casePattern = [...middle].map((ch) => ch === ch.toUpperCase());

        const shuffledMiddle = shuffleArray([...middle.toLowerCase()]);

        const remixedMiddle = shuffledMiddle
            .map((ch, i) => (casePattern[i] ? ch.toUpperCase() : ch))
            .join("");

        return first + remixedMiddle + last;
    };

    const mixText = (text: string): string => {
        const wordRegex = /[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+/g;

        return text.replace(wordRegex, (word) => shuffleWord(word));
    };

    const handleMix = () => {
        setMixedFileContent(mixText(fileContent));
        setShowOriginal(false);
    };

    return (
        <div className="p-4 pt-26 pb-26 flex flex-col gap-6">
            <p>{t("mixer.introduction")}</p>
            <h1 className="text-2xl text-center">{t("mixer.cta")}</h1>
            <div className="border-l-2 border-brown px-4">
                <p className="italic">{t("mixer.instruction")}</p>
            </div>
            <div>
                <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".txt"
                />
                <label
                    htmlFor="file"
                    className="inline-block px-4 py-2 bg-brown text-white rounded cursor-pointer text-center"
                >
                    {fileName ? `${t("mixer.file.loaded")}: ${fileName}` : t("mixer.file.load")}
                </label>
            </div>
            <div className="flex w-full justify-center items-center">
                <BigRoundedButton
                    label={t("mixer.bigButton")}
                    icon={<TbSwitch3/>}
                    disabled={!fileContent}
                    action={handleMix}
                />
            </div>
            {fileContent && (
                <div className="relative mt-6">
                    <div className="absolute bg-brown py-2 px-4 rounded-2xl h-16 top-[-26px] cursor-pointer"
                         onClick={() => {
                             setShowOriginal(true);
                         }}>
                        <p className="text-white">{t("mixer.file.original")}</p>
                    </div>
                    {mixedFileContent && (
                        <motion.div
                            className="absolute bg-pink py-2 px-4 rounded-2xl h-16 top-[-26px] right-0 cursor-pointer"
                            onClick={() => {
                                setShowOriginal(false)
                            }}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                        >
                            <p className="text-white">{t("mixer.file.mixed")}</p>
                        </motion.div>
                    )}
                    <pre
                        className={`relative whitespace-pre-wrap border-2 p-2 rounded-2xl bg-neutral-100 mt-2 ${showOriginal ? "border-brown" : "border-pink"}`}
                    >
                         <AnimatePresence mode="wait">
                             <motion.div
                                 key={showOriginal ? "original" : "mixed"}
                                 initial={{opacity: 0}}
                                 animate={{opacity: 1}}
                                 exit={{opacity: 0}}
                                 transition={{duration: .4}}
                             >
                                 {showOriginal ? fileContent : mixedFileContent}
                              </motion.div>
                       </AnimatePresence>
                    </pre>
                </div>
            )}
            <Copyrights/>
        </div>
    );
}
