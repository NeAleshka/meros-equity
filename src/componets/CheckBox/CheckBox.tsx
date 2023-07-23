import './CheckBox.css'
import {InputHTMLAttributes} from "react";


const CheckBox = (props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) => {
    return (
        <input type={"checkbox"} {...props}/>
    );
};

export default CheckBox;
