import useSWR from "swr";

export const useGetMe = () =>
    useSWR(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, (url) =>
        fetch(url, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (!res.ok) throw new Error("Not Authenticated");
            return res.json();
        })
    );
