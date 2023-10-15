"use client";
import { GoldButton } from "@/components/GoldButton";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateEvent } from "@/hooks/requests/useCreateEvent";
import { cn } from "@/lib/utils";
import { Event } from "@/models/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { DeleteEvent } from "./DeleteEvent";

const schema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    colour: z.string(),
});

export const CreateTimetableEvent = ({
    event,
    datetime,
}: {
    event?: Event;
    datetime: Date;
}) => {
    const router = useRouter();
    const { trigger, isMutating } = useCreateEvent();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...event,
        },
    });
    const colour = form.watch("colour");

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try {
            await trigger({ ...data, start: datetime });
            router.refresh();
        } catch (e) {}
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Popover>
                <PopoverTrigger asChild>
                    <div
                        role="button"
                        className={cn(
                            "w-full h-full border border-t-0 border-l-0 p-2"
                        )}
                    >
                        {event && (
                            <div
                                style={{
                                    backgroundColor: `var(${event.colour})`,
                                    borderRadius: "5px",
                                    padding: "5px",
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                <p>{event.name}</p>
                            </div>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    style={{
                        backgroundColor: `var(${colour})`,
                    }}
                >
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Name"
                                                className="w-full"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="No Description"
                                                className="w-full"
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
                                                    <SelectItem
                                                        key={c}
                                                        value={c}
                                                    >
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
                            <GoldButton disabled={isMutating}>Save</GoldButton>
                            {event && <DeleteEvent id={event.id} />}
                        </form>
                    </Form>
                </PopoverContent>
            </Popover>
        </LocalizationProvider>
    );
};
