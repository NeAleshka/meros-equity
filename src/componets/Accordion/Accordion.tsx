import React, {useState} from "react";
import cls from "./Accordion.module.css";
import listItemCls from "../ListItem/ListItem.module.css";
import {IListItem} from "../../types";
import {UseStore} from "../../providers";
import {addToFavourite, removeFromFavourite} from "../../utils";
import CheckBox from "../CheckBox/CheckBox.tsx";

export const Accordion = ({children, Kod, Name, ID}: IListItem) => {
    const {favoriteArray, changeFavoriteArray} = UseStore()
    const [isAdded, setIsAdded] = useState(Boolean(favoriteArray.findIndex(item => item === ID) >= 0));
    const checkIsAdded = (id: number | undefined) => {
        return Boolean(favoriteArray.findIndex(item => item === id) >= 0)
    }

    const isHaveAddedChildren = children.map(element => {
        return favoriteArray.findIndex(item => item === element.ID) >= 0
    }).some(el => el)


    const [isOpen, setIsOpen] = useState(checkIsAdded(ID) || isHaveAddedChildren);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    const add = (event: React.MouseEvent<HTMLInputElement>, id: number | undefined) => {
        addToFavourite({event, id, favoriteArray, changeFavoriteArray})
        setIsAdded(true)
    }
    const remove = (event: React.MouseEvent<HTMLInputElement>, id: number | undefined) => {
        removeFromFavourite({event, id, favoriteArray, changeFavoriteArray})
        setIsAdded(false)
    }

    return (
        <div onClick={handleClick} className={listItemCls.item}>
            <div className={cls.title}>
                <CheckBox onClick={(event) => isAdded ? remove(event, ID) : add(event, ID)} defaultChecked={isAdded}/>
                <div className={listItemCls.item_info} style={{flexGrow: '1'}}>{Kod} {Name}</div>
                <div className={`${cls.arrow} ${isOpen ? cls.clicked : ''}`}/>
            </div>
            <div className={`${cls.content} ${isOpen ? cls.show : cls.close} `}>
                {
                    children?.map(item => <div
                        onClick={(event) => event.stopPropagation()}
                        key={item.ID}
                        style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}
                    >
                        <CheckBox
                            id={item?.ID?.toString()}
                            className={cls.checkbox}
                            onClick={(event) => (checkIsAdded(item.ID)) ? remove(event, item.ID) : add(event, item.ID)}
                            defaultChecked={checkIsAdded(item.ID)}/>
                        {item.Kod} {item.Name}
                    </div>)
                }
            </div>
        </div>
    )
}

