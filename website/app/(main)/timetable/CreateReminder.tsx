"use client";

import { GoldButton } from "@/components/GoldButton";
import { DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    LocalizationProvider,
    StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as z from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateEvent } from "@/hooks/requests/useCreateEvent";
import { Loader2 } from "lucide-react";

const schema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    start: z.date(),
    colour: z.string(),
});

export const CreateReminder = () => {
    const { trigger, isMutating } = useCreateEvent();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            start: new Date(),
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try {
            await trigger(data);
        } catch (e) {}
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Form {...form}>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Remind me to..."
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Description"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="start"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <StaticDateTimePicker
                                        disablePast
                                        minutesStep={30}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="colour"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Colour" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {[
                                            "--info",
                                            "--warning",
                                            "--success",
                                        ].map((c) => (
                                            <SelectItem key={c} value={c}>
                                                <span
                                                    className="block w-[25px] h-[25px] rounded-full"
                                                    style={{
                                                        backgroundColor: `var(${c})`,
                                                    }}
                                                />
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className="mt-4 p-4 sticky bottom-0 bg-portal">
                    <GoldButton
                        disabled={isMutating}
                        onClick={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        {isMutating && <Loader2 className="animate-spin" />}
                        Create
                    </GoldButton>
                </DialogFooter>
            </Form>
        </LocalizationProvider>
    );
};
