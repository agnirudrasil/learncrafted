import { ShareButton } from "@/components/ShareButton";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { User } from "@/models/user";

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

export const Profile = ({
    user,
    allowSharing,
}: {
    user: User;
    allowSharing: boolean;
}) => {
    return (
        <div className="flex gap-6 max-h-full overflow-hidden">
            <div className="flex flex-col gap-2 items-center">
                <Avatar className="w-[300px] h-[300px] relative rounded-md">
                    <AvatarImage
                        src={
                            user.avatar ??
                            `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user.id}`
                        }
                        alt="Profile Picture"
                        width={300}
                        height={300}
                        className="rounded-3xl shadow-md object-contain"
                    />
                </Avatar>
                <h3 className="text-2xl font-black whitespace-nowrap">
                    {user.name}
                </h3>
                <h6 className="text-lg">Level {user.level}</h6>
                {allowSharing && <ShareButton id={user.id} />}
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
                        {user.achievements.map((achievement, i) => (
                            <div
                                key={achievement.id}
                                className="w-[90px] h-[90px] rounded-md flex items-center justify-center p-4"
                                style={{
                                    backgroundColor: achievement.colour,
                                }}
                            >
                                <p className="text-xs text-white">
                                    {achievement.name}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="grow">
                <Card className="w-full min-w-[400px]">
                    <CardHeader>
                        <CardTitle>My Badges</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        {user.badges.map((badge) => (
                            <div
                                key={badge.id}
                                className="w-[100px] h-[100px] rounded-md flex items-center justify-center p-4"
                                style={{
                                    backgroundColor: badge.colour,
                                }}
                            >
                                {badge.name}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
