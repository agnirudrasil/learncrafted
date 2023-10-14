"use client";

import { GoldButton } from "@/components/GoldButton";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/requests/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
});

export default function LoginPage() {
    const { trigger, isMutating } = useLogin();
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try {
            await trigger(data);
            router.replace("/timetable");
        } catch (e) {}
    };

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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="john@doe.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex-col items-end mt-4">
                        <GoldButton disabled={isMutating} className="w-full">
                            Login
                        </GoldButton>
                        <Button variant="link" asChild>
                            <Link href="/register">Create an account</Link>
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
