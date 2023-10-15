import useSWRMutation from "swr/mutation";

export const useCreateEvent = () =>
    useSWRMutation(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        (
            key,
            {
                arg,
            }: {
                arg: {
                    name: string;
                    description?: string;
                    start: Date;
                    end?: Date;
                    colour: string;
                    repeat?: boolean;
                };
            }
        ) => {
            return fetch(key, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(arg),
            }).then((res) => res.json());
        }
    );
