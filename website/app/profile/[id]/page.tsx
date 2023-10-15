import { Profile } from "@/components/Profile";
import { makeRequest } from "@/lib/request";
import { User } from "@/models/user";
import { notFound } from "next/navigation";

export default async function PublicProfile({
    params,
}: {
    params: { id: string };
}) {
    const user = await makeRequest<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`,
        {
            method: "GET",
        },
        () => notFound()
    );
    return (
        <main className="w-full h-screen flex p-4">
            <Profile user={user} allowSharing={false} />
        </main>
    );
}
