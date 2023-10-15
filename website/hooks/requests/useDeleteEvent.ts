import useSWRMutation from "swr/mutation";

export const useDeleteEvent = (id: string) =>
    useSWRMutation(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
        async (key: any) => {
            return fetch(key, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    );
