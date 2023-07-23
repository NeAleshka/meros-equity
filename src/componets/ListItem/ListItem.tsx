import {IListItem} from "../../types";
import cls from './ListItem.module.css'
import {Accordion} from "../Accordion/Accordion.tsx";
import {UseStore} from "../../providers";
import {useState} from "react";
import CheckBox from "../CheckBox/CheckBox.tsx";


const ListItem = ({Kod, Name, children, ID}: IListItem) => {
    const {favoriteArray, changeFavoriteArray} = UseStore()
    const [isAdded, setIsAdded] = useState(Boolean(favoriteArray.findIndex(item => item === ID) >= 0));

    const add = (id: number | undefined) => {
        id && favoriteArray.push(id)
        changeFavoriteArray(favoriteArray)
        setIsAdded(true)
    }

    const remove = (id: number | undefined) => {
        id && changeFavoriteArray(favoriteArray.filter(item => item !== id))
        setIsAdded(false)
    }

    return (
        <div className={cls.item}>
            <div className={cls.item_wrapper} style={Number(Kod?.length) <= 2 ? {margin: '10px 0'} : {}}>
                <CheckBox onClick={() => isAdded ? remove(ID) : add(ID)} defaultChecked={isAdded}/>
                <div className={cls.item_info}>{Kod} {Name}</div>
            </div>
            <div className={cls.item_child}>
                {children?.map(({children, Kod, Name, ID, SubKod3}) => (!SubKod3 && !children.length) ?
                    <ListItem key={ID} children={children} Kod={Kod} Name={Name} ID={ID}/> :
                    <Accordion key={ID} children={children} Kod={Kod} Name={Name} ID={ID}/>)}
            </div>
        </div>
    );
};


export default ListItem;





