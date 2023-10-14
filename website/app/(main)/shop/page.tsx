import { GoldButton } from "@/components/GoldButton";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

export default async function ShopPage() {
    return (
        <div className="flex flex-wrap max-h-full overflow-y-auto pb-2 gap-4">
            {Array(24)
                .fill(0)
                .map((_, i) => (
                    <Card
                        key={i}
                        className="w-max bg-muted max-w-[min-content]"
                    >
                        <CardHeader className="p-2">
                            <div className="w-[200px] h-[200px] bg-accent rounded-md"></div>
                        </CardHeader>
                        <CardContent className="p-2">
                            <h6>Lorem Ipsum</h6>
                            <CardDescription>
                                Lorem ipsum dolor sit amet.
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="p-2">
                            <GoldButton className="w-full mt-2">Buy</GoldButton>
                        </CardFooter>
                    </Card>
                ))}
        </div>
    );
}
