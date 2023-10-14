import useSWRMutation from "swr/mutation";

export const useRegister = () =>
    useSWRMutation(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        (
            key,
            { arg }: { arg: { name: string; email: string; password: string } }
        ) => {
            return fetch(key, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(arg),
            }).then((res) => res.json());
        }
    );
