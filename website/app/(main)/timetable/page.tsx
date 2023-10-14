import { GoldButton } from "@/components/GoldButton";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// 12 1 2 3 4 5 6 7 8 9 10 11

const TIMES = [
    "12 AM",
    "12:30 AM",
    "1 AM",
    "1:30 AM",
    "2 AM",
    "2:30 AM",
    "3 AM",
    "3:30 AM",
    "4 AM",
    "4:30 AM",
    "5 AM",
    "5:30 AM",
    "6 AM",
    "6:30 AM",
    "7 AM",
    "7:30 AM",
    "8 AM",
    "8:30 AM",
    "9 AM",
    "9:30 AM",
    "10 AM",
    "10:30 AM",
    "11 AM",
    "11:30 AM",
    "12 PM",
    "12:30 PM",
    "1 PM",
    "1:30 PM",
    "2 PM",
    "2:30 PM",
    "3 PM",
    "3:30 PM",
    "4 PM",
    "4:30 PM",
    "5 PM",
    "5:30 PM",
    "6 PM",
    "6:30 PM",
    "7 PM",
    "7:30 PM",
    "8 PM",
    "8:30 PM",
    "9 PM",
    "9:30 PM",
    "10 PM",
    "10:30 PM",
    "11 PM",
    "11:30 PM",
];

const INDICES: number[] = [1, 2, 4, 7];

export default async function TimetablePage() {
    return (
        <div className="flex h-full max-h-full overflow-y-hidden gap-4">
            <div className="grow">
                <div
                    className="w-full h-full max-h-full overflow-y-auto relative"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)",
                        gridTemplateRows: "repeat(49, 150px)",
                    }}
                >
                    <div className="w-full h-full border border-t-0 border-l-0 bg-background sticky top-0"></div>
                    {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                    ].map((day) => (
                        <div
                            key={day}
                            className="w-full h-full border border-t-0 border-l-0 bg-background sticky top-0 flex justify-center"
                        >
                            <span
                                className="text-center text-muted-foreground"
                                key={day}
                            >
                                {day}
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
                        .map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-full h-full border border-t-0 border-l-0",
                                    INDICES.includes(i) && "bg-warning"
                                )}
                            ></div>
                        ))}
                </div>
            </div>
            <Card className="h-full flex flex-col">
                <CardHeader className="p-2">
                    <Calendar />
                </CardHeader>
                <CardFooter className="w-full mt-auto p-2">
                    <GoldButton className="w-full">Create Reminder</GoldButton>
                </CardFooter>
            </Card>
        </div>
    );
}
