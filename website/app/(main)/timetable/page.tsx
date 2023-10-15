import { GoldButton } from "@/components/GoldButton";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TIMES } from "@/lib/times";
import { cn } from "@/lib/utils";
import { CreateReminder } from "./CreateReminder";
import { makeRequest } from "@/lib/request";
import { Event } from "@/models/event";
import {
    addDays,
    format,
    isEqual,
    parse,
    startOfWeek,
    subMinutes,
} from "date-fns";
import { PickDate } from "./PickDate";
import { CreateTimetableEvent } from "./CreateTimetableEvent";

export default async function TimetablePage({
    searchParams,
}: {
    searchParams: { date?: string };
}) {
    const events = await makeRequest<Event[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/events?start=${startOfWeek(
            new Date(searchParams["date"] ?? new Date())
        ).toISOString()}`,
        {
            method: "GET",
        },
        () => ({} as never)
    );

    const now = new Date(searchParams["date"] ?? new Date());

    const eventsByDay = events.reduce((acc, event) => {
        const day = new Date(event.start).toDateString();
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    return (
        <div className="flex h-full max-h-full overflow-y-hidden gap-4">
            <div className="grow">
                <div
                    className="w-full h-full max-h-full overflow-y-auto relative"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)",
                        gridTemplateRows: "repeat(49, 75px)",
                    }}
                >
                    <div className="w-full h-full border border-t-0 border-l-0 bg-background sticky top-0"></div>
                    {Array(7)
                        .fill(0)
                        .map((_, i) =>
                            addDays(startOfWeek(now, { weekStartsOn: 1 }), i)
                        )
                        .map((day) => (
                            <div
                                key={day.toISOString()}
                                className="w-full h-full border border-t-0 border-l-0 bg-background sticky top-0 flex justify-center"
                            >
                                <span className="text-center text-muted-foreground">
                                    {format(day, "d LLL")}
                                </span>
                            </div>
                        ))}
                    {TIMES.map((time, i) => (
                        <div
                            className="border-r border-b text-muted-foreground text-xs"
                            key={time}
                            style={{
                                gridRowStart: i + 2,
                            }}
                        >
                            <span>{time}</span>
                        </div>
                    ))}
                    {Array(48 * 7)
                        .fill(0)
                        .map((_, i) => {
                            const date = addDays(
                                startOfWeek(now, {
                                    weekStartsOn: 1,
                                }),
                                i % 7
                            );

                            const dateKey = date.toDateString();

                            const time = subMinutes(
                                parse(
                                    TIMES[Math.floor(i / 7)],
                                    "h:mm b",
                                    new Date(date)
                                ),
                                330
                            );

                            const datetime = new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                                time.getHours(),
                                time.getMinutes()
                            );

                            const event = eventsByDay[dateKey]?.find(
                                (e) =>
                                    format(new Date(e.start), "h:mm b") ===
                                    TIMES[Math.floor(i / 7)]
                            );

                            return (
                                <CreateTimetableEvent
                                    datetime={datetime}
                                    event={event}
                                    key={i}
                                />
                            );
                        })}
                </div>
            </div>

            <Card className="h-full flex flex-col">
                <CardHeader className="p-2">
                    <PickDate />
                </CardHeader>
                <CardFooter className="w-full mt-auto p-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <GoldButton className="w-full">
                                Create Reminder
                            </GoldButton>
                        </DialogTrigger>
                        <DialogContent className="md:w-max max-h-[500px] overflow-scroll p-0">
                            <DialogHeader className="p-4">
                                <DialogTitle>Create a reminder</DialogTitle>
                                <DialogDescription>
                                    Schedule important events and tasks.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="p-4">
                                <CreateReminder />
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    );
}
