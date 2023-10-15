"use client";
import { GoldButton } from "@/components/GoldButton";
import { useBuyBadge } from "@/hooks/requests/useBuyBadge";
import { Badge } from "@/models/badge";
import { User } from "@/models/user";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BuyBadge = ({ badge, user }: { badge: Badge; user: User }) => {
    const router = useRouter();
    const { trigger, isMutating } = useBuyBadge(badge.id);
    return (
        <GoldButton
            onClick={async () => {
                try {
                    await trigger();
                    router.refresh();
                } catch (e) {}
            }}
            className="w-full"
            disabled={
                badge.cost > user.coins ||
                Boolean(user.badges.find(({ id }) => id === badge.id)) ||
                isMutating
            }
        >
            {isMutating && <Loader2 className="animate-spin mr-2" />}
            {badge.cost > user.coins
                ? "Insufficient Coins"
                : user.badges.find(({ id }) => id === badge.id)
                ? "Already Purchased"
                : "Buy"}
        </GoldButton>
    );
};
