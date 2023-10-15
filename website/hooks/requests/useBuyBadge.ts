import useSWRMutation from "swr/mutation";
export const useBuyBadge = (id: string) =>
    useSWRMutation(
        `${process.env.NEXT_PUBLIC_API_URL}/users/@me/badges/${id}`,
        async (key, {}) => {
            await fetch(key, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    );
