import {motion} from "motion/react";
import type {
    ReactElement,
} from "react";
import {
    FaLock,
    FaLockOpen,
    FaUnlock
} from "react-icons/fa";

type TBigRoundedButtonProps = {
    icon: ReactElement;
    label: string;
    action: () => void;
    disabled: boolean;
}

export function BigRoundedButton({icon, label, action, disabled}: TBigRoundedButtonProps) {
    const icons = [FaLock, FaUnlock, FaLockOpen];

    return (
        <div className={`relative`}>
            <button
                className={`relative w-65 h-40 rounded-full bg-pink z-10 transition-opacity cursor-pointer duration-1000 ${disabled && "opacity-20"}`}
                disabled={disabled}
                onClick={action}
            >
                <div
                    className="absolute top-0 text-[180px] flex items-center justify-center w-full h-full opacity-20 z-20 text-white">
                    {icon}
                </div>
                <h2 className="relative text-3xl text-white z-30 uppercase" style={{textShadow: '2px 2px 2px #CC7ABD'}}>
                    {label}
                </h2>
            </button>
            <div className="absolute top-[-20px] right-0">
                {disabled
                    ? (
                        <div className="relative  bg-brown p-4 rounded-full border-4 border-white z-40">
                            <FaLock className="text-white" size={36}/>
                        </div>
                    ) : (
                        <motion.div
                            className="relative bg-brown p-4 rounded-full border-4 border-white z-40"
                            initial={{opacity: 1, rotate: 0, scale: 1, x: 0, y: 0}}
                            animate={{opacity: 0, rotate: 20, scale: 0}}
                            transition={{
                                delay: .6,
                                duration: .6,
                            }}
                        >
                            <FaLock className="text-white" size={36}/>
                            {icons.map((Icon, i) => (
                                <motion.div
                                    className={`absolute top-0 left-0 bg-brown p-4 rounded-full ${i === 1 ? "-scale-x-100" : ""}`}
                                    key={i}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: i * 0.20}}
                                >
                                    <Icon className="text-white" size={36}/>
                                </motion.div>
                            ))}
                        </motion.div>
                    )
                }
            </div>
        </div>
    )
}