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
import { useRegister } from "@/hooks/requests/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const schema = z
    .object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6).max(50),
        confirmPassword: z.string().min(6),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
            });
        }
    });

export default function ResgisterPage() {
    const { trigger, isMutating } = useRegister();
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async ({
        confirmPassword,
        ...data
    }) => {
        try {
            await trigger(data);
            router.replace("/");
        } catch (e) {}
    };

    return (
        <Card className="min-w-[400px]">
            <CardHeader>
                <Image
                    className="ml-auto mr-auto"
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="John Doe"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            {...field}
                                            placeholder="john@doe.com"
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
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex-col items-end mt-4">
                        <GoldButton
                            className="w-full"
                            type="submit"
                            disabled={isMutating}
                        >
                            {isMutating && (
                                <Loader2 className="w-4 mr-2 animate-spin" />
                            )}
                            Register
                        </GoldButton>
                        <div className="flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Button variant="link" className="p-0" asChild>
                                    <Link
                                        href="/login"
                                        className="text-blue-500"
                                    >
                                        Login
                                    </Link>
                                </Button>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
