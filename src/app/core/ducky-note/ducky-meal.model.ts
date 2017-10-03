export interface DuckyMeal {
    date: Date;
    dinner: string;
    sides: { id: number, side: string }[];
}
