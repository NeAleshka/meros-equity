import {FC, ReactNode, useMemo, useState} from "react";
import {FAVORITE_ARRAY_KEY, StoreContext} from "./StoreContext.ts";


interface StoreProviderProps {
    children: ReactNode
}

const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    const defaultFavoriteArray = JSON.parse(localStorage.getItem(`${FAVORITE_ARRAY_KEY}`) as string) ?? []

    const [favoriteArray, setFavoriteArray] = useState<number[]>(defaultFavoriteArray);

    const defaultProps = useMemo(() => ({
        favoriteArray,
        setFavoriteArray
    }), [favoriteArray])

    return (
        <StoreContext.Provider value={defaultProps}>
            {children}
        </StoreContext.Provider>
    )

}

export default StoreProvider
