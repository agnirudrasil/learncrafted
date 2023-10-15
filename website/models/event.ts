export interface Event {
    id: string;
    name: string;
    description?: string;
    start: Date;
    end?: Date;
    colour: string;
    repeat?: boolean;
}
