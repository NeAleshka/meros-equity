import React from "react";

export interface IListItem {
    ID?: number;
    Section?: string;
    SectionName?: string;
    Kod?: string;
    Name?: string;
    Notes?: string | null;
    SubKod1?: string;
    SubKod2?: string;
    SubKod3?: string;
    WhenAdd?: string;
    Source?: string;
    children: IListItem[]
    likesArray?: number[]
}

export interface IChangeFuncProps {
    event: React.MouseEvent<HTMLInputElement>,
    id: number | undefined,
    favoriteArray: number[],
    changeFavoriteArray: (array: number[]) => void
}
