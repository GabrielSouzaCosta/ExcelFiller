import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import CurrencyInput from 'react-currency-input-field'


function InputSelector(props) {
    
    let [currentItem, setCurrentItem] = useState("");
    let [items, setItems] = useState([]);
    let [currencyValue, setCurrencyValue] = useState("")

    function getDate() {
        const options = {year: 'numeric', month: '2-digit', day: '2-digit' }
        let current = new Date();
        let date = current.toLocaleDateString('pt-BR').split('/')
        date = date.reverse().join('-')
        console.log(date)
        return date
    }

    function getTime() {
        let current = new Date();
        let time = current.toLocaleTimeString('pt-BR')
        return time
    }
        
    async function getItems(column_id) {
        let response = await axios.get(`items/${column_id}`);
        let data = response.data;
        let formatItems = data.map(({name}) => {return {value: name, label: name}});
        setItems(formatItems);
    }

    async function addItem(name) {
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
                    <CreatableSelect options={items} value={currentItem} onChange={(e) => {setCurrentItem(e)}} onCreateOption={(e) => {addItem(e); }}  placeholder="Select or Create..."/>
                </>)
            }

        case "autodate":
            {

                return (<input type="date" defaultValue={getDate()} ></input>)
            }
                
        case "autotime":
            {
                return (<input type="time"  defaultValue={getTime()}></input>)
            }

        case "date":
            {
                return ( <input type={props.type}></input>)
            }

        case "time":
            {
                return (<input type={props.type}></input>)
            }

        case "currency":
            {
                return (<>
                    <CurrencyInput placeholder='$100,000,000' value={currencyValue} onValueChange={(e) =>setCurrencyValue(e)} prefix='R$' step={50} disableGroupSeparators decimalSeparator="," fixedDecimalLength={2}/>
                </>)
            }

        default:
            return (<input type="text"></input>)
    }
}

export default InputSelector