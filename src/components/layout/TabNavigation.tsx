import { useLocation } from "react-router-dom";
import { TabNavigationButton } from "../ui/TabNavigationButton.tsx";
import { TbSwitch3, TbId, TbCloudCode } from "react-icons/tb";
import {useTranslation} from "react-i18next";

export function TabNavigation() {
    const location = useLocation();
    const pathname = location.pathname;
    const {t} = useTranslation();

    const indicatorPosition =
        pathname === "/"
            ? "translate-x-0"
            : pathname === "/pesel-checker"
                ? "translate-x-[100%]"
                : pathname === "/api-lab"
                    ? "translate-x-[200%]"
                    : "translate-x-0";

    return (
        <div className="p-2 w-full fixed bottom-0 z-20 max-w-[980px] mx-auto ">
            <div className="flex backdrop-blur-md border-2 p-1 border-green rounded-full overflow-hidden z-20">
                <nav  className="relative flex py-2.5 flex-1 items-center justify-around z-20">
                        <span
                            className={`absolute top-0 left-0 h-full w-1/3 bg-green rounded-full z-30 transition-transform duration-300 ease-in-out ${indicatorPosition}`}
                        />
                    <TabNavigationButton icon={<TbSwitch3 className="w-6 h-6" />} label={t("title.mixer")} to="/" />
                    <TabNavigationButton
                        icon={<TbId className="w-6 h-6" />}
                        label={t("title.pesel")}
                        to="/pesel-checker"
                    />
                    <TabNavigationButton
                        icon={<TbCloudCode className="w-6 h-6" />}
                        label={t("title.api")}
                        to="/api-lab"
                    />
                </nav>
            </div>
        </div>
    );
}
