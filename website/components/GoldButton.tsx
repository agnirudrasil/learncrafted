import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const GoldButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "p-3 bg-gradient-to-b from-primary via-deepgold to-richgold rounded-md border-warning inline-flex items-center justify-center shadow-gold hover:-translate-y-0.5 transition active:translate-y-0 hover:shadow-goldhover active:shadow-goldactive",
                    className
                )}
                style={{}}
                ref={ref}
                {...props}
            />
        );
    }
);

GoldButton.displayName = "GoldButton";
