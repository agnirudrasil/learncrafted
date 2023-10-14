import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/navbar";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/models/user";

const USER_TYPE = ["Student", "Teacher"];

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookie = cookies();
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/@me`, {
        credentials: "include",
        method: "GET",
        headers: {
            ...headers,
            Cookie: cookie.toString(),
        },
    })
        .then((res) => res.json() as Promise<User>)
        .catch(() => redirect("/login"));

    return (
        <div className="flex w-full h-full">
            <nav className="h-full p-2">
                <Navbar />
            </nav>
            <div className="grow flex flex-col">
                <header className="w-full flex items-center p-4">
                    <h1 className="text-3xl font-display">My Timetable</h1>
                    <div className="flex gap-2 ml-auto p-4 bg-muted rounded-md items-center">
                        <Avatar className="w-10 h-10">
                            <AvatarImage
                                src={
                                    user.avatar ??
                                    `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user.id}`
                                }
                            />
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-md">{user.name}</span>
                            <span className="text-muted-foreground text-xs font-semibold">
                                {USER_TYPE[user.user_type]} | Level {user.level}
                            </span>
                        </div>
                    </div>
                </header>
                <main className="p-4 max-h-full h-full overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
