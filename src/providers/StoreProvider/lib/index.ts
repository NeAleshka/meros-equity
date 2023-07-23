import {useContext} from "react";
import {FAVORITE_ARRAY_KEY, StoreContext} from "../StoreContext.ts";


type UseAddResult = {
    favoriteArray: number[]
    changeFavoriteArray: (newFavArray: number[]) => void
}

export const UseStore = (): UseAddResult => {
    const {setFavoriteArray, favoriteArray = []} = useContext(StoreContext)
    const changeFavoriteArray = (newFavArray: number[]) => {
        setFavoriteArray?.(newFavArray)
        localStorage.setItem(`${FAVORITE_ARRAY_KEY}`, JSON.stringify(newFavArray))
    }


    return {
        favoriteArray,
        changeFavoriteArray
    }
}
