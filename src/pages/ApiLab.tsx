import {useTranslation} from "react-i18next";
import {useState} from "react";
import {
    getUsers,
    updateUser,
    type User
} from "../api/users.ts";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    AnimatePresence,
    motion
} from "motion/react";
import {CgClose} from "react-icons/cg";
import Copyrights from "../components/layout/Copyrights.tsx";

export function ApiLab() {
    const {t} = useTranslation();
    const [search, setSearch] = useState("");
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const queryClient = useQueryClient();

    const {data: users, isLoading, error} = useQuery({
        queryKey: ["users", search],
        queryFn: () => getUsers(search),
    });

    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]});
            setEditingUser(null);
        },
    });

    return (
        <div className="p-4 pt-26 pb-26 flex flex-col gap-6">
            <p>{t("apiLab.introduction")}</p>
            <h1 className="text-2xl text-center">{t("apiLab.cta")}</h1>
            <div className="border-l-2 border-brown px-4">
                <p className="italic">{t("apiLab.instruction")}</p>
            </div>
            <div className="gap-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t("apiLab.inputPlaceholder")}
                        value={search}
                        onFocus={() => setEditingUser(null)}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-brown border-2 rounded-full h-12 w-full px-4 font-mono text-xl bg-white"
                    />
                    <AnimatePresence>
                        {search && (
                            <motion.button
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brown text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-pink transition"
                            >
                                <CgClose size={24}/>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
                {isLoading && <div className="text-center py-16"><p>{t("apiLab.api.loading")}</p></div>}
                {error && <div className="text-center py-16"><p>{t("apiLab.api.error")}</p></div>}
                <ul className="flex flex-col gap-3 p-2 pt-4">
                    {users?.map((u, index) => {
                        const isEditing = editingUser?.id === u.id;
                        return (
                            <motion.li
                                key={u.id}
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: .3,
                                    delay: index * .05,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                }}
                                className={`grid items-center gap-4 p-2 border-2 border-neutral-200 rounded-xl bg-white
                                             ${isEditing ? "grid-cols-1" : "grid-cols-[auto_1fr_auto] items-center"}`}
                            >
                                {!isEditing && (
                                    <>
                                        <div className={`flex items-center justify-center rounded-full w-8 h-8 text-white text-sm font-bold
                                             ${u.gender ? (u.gender === "male" ? "bg-green" : "bg-pink") : "bg-gray-400"}`}
                                        >
                                            {u.gender ? (u.gender === "male" ? t("apiLab.user.shortMale") : t("apiLab.user.shortFemale")) : "?"}
                                        </div>
                                        <motion.span className="truncate"
                                                     initial={{opacity: 0}}
                                                     animate={{opacity: 1}}
                                                     exit={{opacity: 0}}
                                        >{u.name}</motion.span>
                                        <button
                                            onClick={() => setEditingUser(u)}
                                            className="text-sm text-white bg-brown px-4 py-2 rounded-full hover:bg-pink transition cursor-pointer"
                                        >
                                            {t("apiLab.user.edit")}
                                        </button>
                                    </>
                                )}
                                <AnimatePresence>
                                    {isEditing && (
                                        <motion.form
                                            key="edit-form"
                                            initial={{opacity: 0, scaleY: 0.95}}
                                            animate={{opacity: 1, scaleY: 1}}
                                            exit={{opacity: 0, y: -20}}
                                            transition={{duration: 0.3}}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                mutation.mutate(editingUser);
                                            }}
                                            className="flex flex-col gap-3 p-3 rounded-md bg-neutral-50 border-2 border-neutral-200"
                                        >
                                            <h3 className="font-semibold text-lg text-brown">{t("apiLab.user.userEdit")}</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <label
                                                        className="text-sm font-medium text-neutral-600">{t("apiLab.user.name")}</label>
                                                    <input
                                                        type="text"
                                                        value={editingUser.name}
                                                        onChange={(e) => setEditingUser({
                                                            ...editingUser,
                                                            name: e.target.value
                                                        })}
                                                        className="border bg-white border-neutral-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-brown"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label
                                                        className="text-sm font-medium text-neutral-600">{t("apiLab.user.email")}</label>
                                                    <input
                                                        type="email"
                                                        value={editingUser.email}
                                                        onChange={(e) => setEditingUser({
                                                            ...editingUser,
                                                            email: e.target.value
                                                        })}
                                                        className="border border-neutral-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-brown"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label
                                                        className="text-sm font-medium text-neutral-600">{t("apiLab.user.gender")}</label>
                                                    <select
                                                        value={editingUser.gender || ""}
                                                        onChange={(e) => setEditingUser({
                                                            ...editingUser,
                                                            gender: e.target.value
                                                        })}
                                                        className="border border-neutral-300 rounded-md p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-brown"
                                                    >
                                                        <option value="male">{t("apiLab.user.male")}</option>
                                                        <option value="female">{t("apiLab.user.female")}</option>
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label
                                                        className="text-sm font-medium text-neutral-600">{t("apiLab.user.status")}</label>
                                                    <select
                                                        value={editingUser.status || ""}
                                                        onChange={(e) => setEditingUser({
                                                            ...editingUser,
                                                            status: e.target.value
                                                        })}
                                                        className="border border-neutral-300 rounded-md p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-brown"
                                                    >
                                                        <option value="active">{t("apiLab.user.active")}</option>
                                                        <option value="inactive">{t("apiLab.user.inactive")}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4 mt-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingUser(null)}
                                                    className="px-4 py-2 rounded-full bg-neutral-300 hover:bg-neutral-400 text-sm font-medium cursor-pointer"
                                                >
                                                    {t("apiLab.user.cancel")}
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={mutation.isPending}
                                                    className="px-4 py-2 rounded-full bg-green text-white hover:bg-green-700 text-sm font-medium cursor-pointer"
                                                >
                                                    {t("apiLab.user.save")}
                                                </button>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
            <Copyrights/>
        </div>
    )
}