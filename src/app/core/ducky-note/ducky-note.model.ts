export interface DuckyNote {
    id?: number;
    duckyType: DuckyNoteType;
    note: string;
    active: boolean;
    sortOrder?: number;
}

export enum DuckyNoteType {
    Groceries = 1,
    Tasks,
    Other,
    Costco,
}
