"use client";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { string } from "zod";

export const PickDate = () => {
    const router = useRouter();
    const params = useSearchParams();
    return (
        <Calendar
            mode="single"
            selected={
                params.get("date")
                    ? new Date(params.get("date") as string)
                    : undefined
            }
            onSelect={(date) => {
                router.push(
                    "/timetable?date=" +
                        format(date ?? new Date(), "yyyy-MM-dd")
                );
            }}
        />
    );
};
