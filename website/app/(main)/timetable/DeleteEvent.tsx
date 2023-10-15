"use client";
import { Button } from "@/components/ui/button";
import { useDeleteEvent } from "@/hooks/requests/useDeleteEvent";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const DeleteEvent = ({ id }: { id: string }) => {
    const router = useRouter();
    const { trigger, isMutating } = useDeleteEvent(id);
    return (
        <Button
            variant="destructive"
            onClick={async () => {
                try {
                    await trigger();
                    router.refresh();
                } catch (error) {}
            }}
        >
            {isMutating ? (
                <Loader2 className="w-4 mr-2 animate-spin" />
            ) : (
                <Trash className="w-4 mr-2" />
            )}{" "}
            Delete
        </Button>
    );
};
