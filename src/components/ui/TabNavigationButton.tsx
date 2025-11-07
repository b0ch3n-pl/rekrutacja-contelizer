import type {ReactNode} from "react";
import {NavLink} from "react-router-dom";

type TTabNavigationButtonProps = {
    icon: ReactNode;
    label: string;
    to: string;
}

export function TabNavigationButton({icon, label, to}: TTabNavigationButtonProps) {

    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                `
                z-100 flex py-1 px-2 flex-col items-center justify-center w-24 rounded-full text-sm gap-1 ${isActive ? "text-white cursor-default" : "hover:text-pink cursor-pointer"}
                transition-all duration-500 ease-in-out
                `
            }
        >
            <span>
                {icon}
            </span>
            <p className="text-xs font-body text-center">
                {label}
            </p>
        </NavLink>
    )
}