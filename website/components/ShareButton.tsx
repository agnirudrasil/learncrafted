"use client";
import { GoldButton } from "@/components/GoldButton";

export const ShareButton: React.FC<{ id: string }> = ({ id }) => {
    const onShare = async () => {
        try {
            await navigator.share({
                url: "/profile/" + id,
            });
        } catch (e) {
            navigator.clipboard.writeText(`${window.location.href}/${id}`);
        }
    };

    return (
        <GoldButton onClick={onShare} className="w-full mt-2">
            Share
        </GoldButton>
    );
};
