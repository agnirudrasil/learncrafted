import { Card } from "@/components/ui/card";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-full grid place-items-center">
            <main className="w-max h-max">{children}</main>
        </div>
    );
}
