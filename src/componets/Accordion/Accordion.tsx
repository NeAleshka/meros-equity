import React, {useState} from "react";
import cls from "./Accordion.module.css";
import listItemCls from "../ListItem/ListItem.module.css";
import {IListItem} from "../../types";
import {UseStore} from "../../providers";
import {addToFavourite, removeFromFavourite} from "../../utils";
import CheckBox from "../CheckBox/CheckBox.tsx";

export const Accordion = (props: IListItem) => {
    const {children, Kod, Name, ID} = props
    const {favoriteArray, changeFavoriteArray} = UseStore()


    const isHaveAddedChildren = children.map(element => {
        return favoriteArray.findIndex(item => item === element.ID) >= 0
    }).some(el => el)

    const checkIsAdded = (id: number | undefined) => {
        if (Boolean(favoriteArray.findIndex(item => item === ID) >= 0) && !isHaveAddedChildren) return false
        return Boolean(favoriteArray.findIndex(item => item === id) >= 0)
    }
    const [isOpen, setIsOpen] = useState(checkIsAdded(ID) || isHaveAddedChildren);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    let idArray: number[] = []
    const add = (event: React.ChangeEvent<HTMLInputElement>, item: IListItem) => {
        event.stopPropagation()
        const addId = (item: IListItem) => {
            idArray.push(item.ID)
            if (item.children) {
                item.children.forEach(item => addId(item))
            }
        }
        addId(item)
        addToFavourite({idArray, favoriteArray, changeFavoriteArray})
        idArray = []
    }
    const remove = (event: React.ChangeEvent<HTMLInputElement>, item: IListItem) => {
        event.stopPropagation()
        const addId = (item: IListItem) => {
            idArray.push(item.ID)
            if (item.children) {
                item.children.forEach(item => addId(item))
            }
        }
        addId(item)
        removeFromFavourite({idArray, favoriteArray, changeFavoriteArray})
        idArray = []
    }
    return (
        <div className={listItemCls.item}>
            <div className={cls.title} onClick={handleClick}>
                <CheckBox
                    onChange={(event) => checkIsAdded(ID) ? remove(event, props) : add(event, props)}
                    checked={checkIsAdded(ID)}
                    onClick={(event => event.stopPropagation())}
                />
                <div className={listItemCls.item_info} style={{flexGrow: '1'}}>{Kod} {Name}</div>
                <div className={`${cls.arrow} ${isOpen ? cls.clicked : ''}`}/>
            </div>
            <div className={`${cls.content} ${isOpen ? cls.show : cls.close} `}>
                {
                    children?.map(item => <div
                        key={item.ID}
                        style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}
                    >
                        <CheckBox
                            id={item?.ID?.toString()}
                            className={cls.checkbox}
                            onChange={(event) => (checkIsAdded(item.ID)) ? remove(event, item) : add(event, item)}
                            checked={checkIsAdded(item.ID)}
                            onClick={event => event.stopPropagation()}
                        />
                        {item.Kod} {item.Name}
                    </div>)
                }
            </div>
        </div>
    )
}

