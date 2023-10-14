import { GoldButton } from "@/components/GoldButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const COLOURS = [
    "#002366",
    "#4E9A59",
    "#800000",
    "#007F7F",
    "#6A287E",
    "#708090",
    "#FF7034",
    "#4B0082",
    "#556B2F",
    "#800020",
];

export default async function ProfilePage() {
    const user = {};
    return (
        <div className="flex gap-6 max-h-full overflow-hidden">
            <div className="flex flex-col gap-2 items-center">
                <Image
                    src="/photo.jpg"
                    width={500}
                    height={500}
                    alt="Profile Picture"
                    className="rounded-3xl shadow-md"
                />
                <h3 className="text-2xl font-black whitespace-nowrap">
                    Agnirudra Sil
                </h3>
                <h6 className="text-lg">Level 2</h6>
                <GoldButton className="w-full mt-2">Share</GoldButton>
            </div>
            <div className="grow flex flex-col gap-4 max-h-full">
                <Card className="w-full grow max-h-full overflow-auto">
                    <CardHeader>
                        <CardTitle>In Progress...</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <h6>Lorem, ipsum</h6>
                            <div className="flex items-center gap-3">
                                <div className="grow h-2 bg-background rounded-full">
                                    <span className="block w-96 rounded-full bg-warning h-full" />
                                </div>
                                <span>80%</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h6>Lorem, ipsum</h6>
                            <div className="flex items-center gap-3">
                                <div className="grow h-2 bg-background rounded-full">
                                    <span className="block w-32 rounded-full bg-destructive h-full" />
                                </div>
                                <span>40%</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h6>Lorem, ipsum</h6>
                            <div className="flex items-center gap-3">
                                <div className="grow h-2 bg-background rounded-full">
                                    <span className="block w-80 rounded-full bg-success h-full" />
                                </div>
                                <span>70%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full grow max-h-full overflow-auto">
                    <CardHeader>
                        <CardTitle>My Achievements</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-full flex gap-4 flex-wrap">
                        {Array(12)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="w-[75px] h-[75px] rounded-full"
                                    style={{
                                        backgroundColor:
                                            COLOURS[i % COLOURS.length],
                                    }}
                                ></div>
                            ))}
                    </CardContent>
                </Card>
            </div>
            <div className="grow">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>My Badges</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        {Array(12)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="w-[100px] h-[100px] rounded-full"
                                    style={{
                                        backgroundColor:
                                            COLOURS[i % COLOURS.length],
                                    }}
                                ></div>
                            ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
