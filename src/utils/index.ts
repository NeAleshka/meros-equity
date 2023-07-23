import {IChangeFuncProps} from "../types";

export const refactor = (inputArray: any[]) => {
    const res = []
    let sectionName = ''
    let parentIndex = 0
    let childrenIndex = 0
    for (let i = 0; i < inputArray.length; i++) {
        if (!inputArray[i].SubKod2 && !inputArray[i].SubKod3) {
            res.push({...inputArray[i], children: []})
            sectionName = inputArray[i].SectionName
            i > 0 && parentIndex++
            childrenIndex = 0
        } else if (!inputArray[i].SubKod3 && inputArray[i].SectionName === sectionName) {
            res[parentIndex].children.push({...inputArray[i], children: []})
            childrenIndex = res[parentIndex].children.length - 1
        } else if (inputArray[i].SubKod3 && sectionName === inputArray[i].SectionName) {
            res[parentIndex].children[childrenIndex].children.push(inputArray[i])
        }
    }

    return res
}


export const addToFavourite = ({event, id, favoriteArray, changeFavoriteArray}: IChangeFuncProps) => {
    event.stopPropagation()
    id && favoriteArray.push(id)
    changeFavoriteArray(favoriteArray)
}

export const removeFromFavourite = ({event, id, favoriteArray, changeFavoriteArray}: IChangeFuncProps) => {
    event.stopPropagation()
    id && changeFavoriteArray(favoriteArray.filter(item => item !== id))
}
