import { GoldButton } from "@/components/GoldButton";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function LoginPage() {
    return (
        <Card className="min-w-[450px]">
            <CardHeader className="flex items-center">
                <Image
                    width={200}
                    height={100}
                    alt="LearnCrafted Logo"
                    src={"/logo_full_white.png"}
                />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john@doe.com" />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" />
                </div>
            </CardContent>
            <CardFooter className="flex-col items-end mt-4">
                <GoldButton className="w-full">Login</GoldButton>
                <Button variant="link">Create an account</Button>
            </CardFooter>
        </Card>
    );
}
