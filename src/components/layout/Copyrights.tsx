import {useTranslation} from "react-i18next";

export default function Copyrights() {
    const {t} = useTranslation();

    return (
        <div className="text-center text-sm pt-10">
            <p>2025 © Michał Bocheński {t("copyrights.for")} Contelizer</p>
            <p>{t("copyrights.statement")}</p>
        </div>
    );
}