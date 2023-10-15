import useSWRMutation from "swr/mutation";

export const useLogout = () =>
    useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, (key) => {
        return fetch(key, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    });
