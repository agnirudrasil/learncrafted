"use client";
import {
    BookCopy,
    UserSquare2,
    ShoppingBag,
    CalendarClock,
    LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/requests/useLogout";

const LINKS = [
    {
        icon: <BookCopy />,
        href: "/courses",
    },
    {
        icon: <UserSquare2 />,
        href: "/profile",
    },
    {
        icon: <ShoppingBag />,
        href: "/shop",
    },
    {
        icon: <CalendarClock />,
        href: "/timetable",
    },
];

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { trigger, isMutating } = useLogout();

    return (
        <ul
            className="h-full bg-muted p-4 rounded-xl flex flex-col gap-4"
            style={{
                boxShadow: "4px 4px 0 0px hsl(var(--shadow))",
            }}
        >
            {LINKS.map(({ icon, href }) => (
                <li key={href}>
                    <Button
                        className={cn(
                            "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--muted))]",
                            pathname.startsWith(href) &&
                                "bg-[hsl(var(--foreground))] text-[hsl(var(--muted))]"
                        )}
                        variant="ghost"
                        size="icon"
                        asChild
                    >
                        <Link href={href}>{icon}</Link>
                    </Button>
                </li>
            ))}
            <li className="mt-auto">
                <Button
                    onClick={async () => {
                        try {
                            await trigger();
                            router.push("/login");
                        } catch (e) {}
                    }}
                    disabled={isMutating}
                    className="text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--muted))]"
                    variant="ghost"
                    size="icon"
                >
                    <LogOut />
                </Button>
            </li>
        </ul>
    );
};
