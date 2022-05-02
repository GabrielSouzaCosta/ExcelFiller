import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';


function InputSelector(props) {
    
    let [currentItem, setCurrentItem] = useState("");
    let [items, setItems] = useState([]);

    async function getItems(column_id) {
        let response = await axios.get(`items/${column_id}`);
        let data = response.data;
        let formatItems = data.map(({name}) => {return {value: name, label: name}});
        setItems(formatItems);
    }

    async function addItem(name) {
        console.log(name)
        let response = await axios.post('/add_item', {"column_id": props.columnId, "name": name});
        setCurrentItem({value: name, label: name});
        getItems(props.columnId);
    }

    useEffect(() => {
        getItems(props.columnId);
    }, [])


    switch(props.type) {
        case "text":
            {
                return ( <input type={props.type} ></input> )
            }

        case "item":
            {
                return (<>
                    <CreatableSelect options={items} value={currentItem} onChange={(e) => {setCurrentItem(e)}} onCreateOption={(e) => {addItem(e); }} />
                </>)
            }

        case "date":
            {
                return ( <input type={props.type}></input>)
            }

        case "time":
            {
                return ( <input type={props.type} ></input>)
            }

        case "autodate":
            {
                return (<input type={props.type} ></input>)
            }

        case "autotime":
            {
                return (<input type={props.type} ></input>)
            }

        default:
            return (<input type="text"></input>)
    }
}

export default InputSelector