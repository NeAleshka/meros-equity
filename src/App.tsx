import './App.css'
import {useEffect, useState} from "react";
import ListItem from "./componets/ListItem/ListItem.tsx";
import {refactor} from "./utils";
import {IListItem} from "./types";


function App() {
    const [data, setData] = useState<IListItem[] | null>(null);
    const [search, setSearch] = useState('');
    const handleSearch = (searchValue: string) => {
        setSearch(searchValue)
    }

    const filteredData = data?.map(item => {
        const filteredChildren = item.children.filter(child =>
            child.Name?.toLowerCase().includes(search.toLowerCase()) ||
            child.Kod?.toLowerCase().includes(search.toLowerCase())
        );
        return {...item, children: filteredChildren};
    }).filter(item => item.children.length > 0);


    useEffect(() => {
        fetch('/OKVED.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (res: IListItem[]) {
                setData(refactor(res))
            })
            .catch(function (error) {
                console.log('Ошибка:', error);
            });
    }, []);


    return (
        <div className={'wrapper'}>
            <header>
                <h1>Коды ОКЭВД</h1>
                <input placeholder={'Поиск'} className={'search_input'}
                       onChange={(event) => handleSearch(event.currentTarget.value)}/>
            </header>
            <main>
                {
                    filteredData?.length ? filteredData?.map(({Kod, children, Name, ID}, index) =>
                            <ListItem key={index} children={children} Kod={Kod} Name={Name} ID={ID}/>) :
                        data?.length ? <h2>Совпадений не найдено</h2> : <h2>Загрузка...</h2>
                }</main>
        </div>
    )
}

export default App
