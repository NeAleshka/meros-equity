import {createContext} from "react";


export type StoreContextProps = {
    favoriteArray?: number[]
    setFavoriteArray?: (array: number[]) => void
}

export const StoreContext = createContext<StoreContextProps>({})

export const FAVORITE_ARRAY_KEY = 'favorite'
