import { GoldButton } from "@/components/GoldButton";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";
import { makeRequest } from "@/lib/request";
import { Badge } from "@/models/badge";
import { BuyBadge } from "./BuyBadge";
import { User } from "@/models/user";
import { Suspense } from "react";

export default async function ShopPage() {
    const badgesRequest = makeRequest<Badge[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/badges`,
        { method: "GET" }
    );

    const userRequest = makeRequest<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/@me`,
        { method: "GET" }
    );

    const [badges, user] = await Promise.all([badgesRequest, userRequest]);

    return (
        <div className="flex flex-wrap max-h-full overflow-y-auto pb-2 gap-4">
            {badges.map((badge) => (
                <Card
                    key={badge.id}
                    className="w-max bg-muted max-w-[min-content] flex flex-col"
                >
                    <CardHeader className="p-2">
                        <div
                            className="w-[200px] h-[200px] rounded-md"
                            style={{
                                backgroundColor: badge.colour,
                            }}
                        ></div>
                    </CardHeader>
                    <CardContent className="p-2">
                        <h6>{badge.name}</h6>
                        <CardDescription>{badge.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-2 mt-auto">
                        <Dialog>
                            <DialogTrigger asChild>
                                <GoldButton className="w-full mt-2">
                                    Learn More
                                </GoldButton>
                            </DialogTrigger>
                            <DialogContent className="flex">
                                <DialogHeader>
                                    <div
                                        className="w-[200px] h-[200px] rounded-md"
                                        style={{
                                            backgroundColor: badge.colour,
                                        }}
                                    ></div>
                                </DialogHeader>
                                <div className="flex flex-col grow">
                                    <div className="grow">
                                        <h3 className="text-2xl font-display">
                                            {badge.name}
                                        </h3>
                                        <DialogDescription>
                                            {badge.description}
                                        </DialogDescription>
                                        <DialogDescription className="text-primary text-md mt-2">
                                            {badge.cost} Coins
                                        </DialogDescription>
                                    </div>
                                    <CardFooter className="p-0">
                                        <Suspense
                                            fallback={<div>loading...</div>}
                                        >
                                            <BuyBadge
                                                user={user}
                                                badge={badge}
                                            />
                                        </Suspense>
                                    </CardFooter>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
