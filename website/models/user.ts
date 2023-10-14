export interface User {
    id: string;
    name: string;
    email: string;
    user_type: number;
    avatar?: string;
    bio?: string;
    level: number;
    xp: number;
    coins: number;
}
