import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/navbar";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { headers } from "next/headers";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                            <AvatarImage src="/photo.jpg" />
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-md">Agnirudra Sil</span>
                            <span className="text-muted-foreground text-xs font-semibold">
                                Student | Level 2
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
