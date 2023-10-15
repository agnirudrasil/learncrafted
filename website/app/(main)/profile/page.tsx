import { GoldButton } from "@/components/GoldButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { makeRequest } from "@/lib/request";
import { User } from "@/models/user";
import Link from "next/link";
import { ShareButton } from "../../../components/ShareButton";
import { Profile } from "@/components/Profile";

export default async function ProfilePage() {
    const user = await makeRequest<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/@me`,
        {
            method: "GET",
        }
    );

    return <Profile user={user} allowSharing />;
}
