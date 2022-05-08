import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import CurrencyInput from 'react-currency-input-field';
import Modal from 'react-modal';


function InputSelector(props) {
    let [currentText, setCurrentText] = useState("");
    let [currentItem, setCurrentItem] = useState("");
    let [items, setItems] = useState([]);
    let [currencyValue, setCurrencyValue] = useState("");
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [prefix, setPrefix] = useState("");
    let [sufix, setSufix] = useState("");
    let [dateFormat, setDateFormat] = useState("pt-BR")


    function getDate() {
        let current = new Date();
        let date = current.toLocaleDateString('pt-BR').split('/');
        date = date.reverse().join('-');
        return date;
    }

    function getTime() {
        let current = new Date();
        let time = current.toLocaleTimeString('pt-BR');
        return time;
    }
        
    async function getItems(column_id) {
        let response = await axios.get(`https://lit-bastion-94694.herokuapp.com/items/${column_id}`);
        let data = response.data;
        let formatItems = data.map(({name}) => {return {value: name, label: name}});
        setItems(formatItems);
    }

    async function addItem(name) {
        await axios.post('https://lit-bastion-94694.herokuapp.com/add_item', {"column_id": props.columnId, "name": name});
        setCurrentItem({value: name, label: name});
        getItems(props.columnId);
    }

    async function deleteItem(e, currentItem) {
        e.preventDefault()
        await axios.delete('https://lit-bastion-94694.herokuapp.com/delete_item', {data: {"column_id": props.columnId, "name": currentItem.value} } );
        setCurrentItem("")
        getItems(props.columnId)
    }   

    useEffect(() => {
        getItems(props.columnId);
    }, [])

    switch(props.type) {
        case "text":
            {
                return (<>
                    <div className='input-group'>
                        <input id={`value-${props.index}`} className="form-control text-center" type={props.type} value={currentText} onChange={(e) => {setCurrentText(e.target.value)} }></input> 
                        <div className='input-group-append'><input type="image" onClick={(e) => e.preventDefault()} className="img-fluid p-1 mt-2" src='gear.svg' data-bs-toggle="modal" data-bs-target="#exampleModal"></input></div>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Manual text Configuration</h5>
                            </div>
                            <div className="modal-body">
                                <p>Prefix: <input className='form-control-sm' value={prefix} onChange={(e) => setPrefix(e.target.value)} ></input></p>
                                <p>Sufix: <input className='form-control-sm' value={sufix} onChange={(e) => setSufix(e.target.value)}></input></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>


        </>)
            }

        case "item":
            {
                return (<>
                <div className="input-group">
                    <CreatableSelect options={items} className={"form-control p-0 border-0 rounded"} value={currentItem} onChange={(e) => {setCurrentItem(e)}} onCreateOption={(e) => {addItem(e); }}  placeholder="Start typing.."/>
                    {(currentItem !== "") ? 
                    <div className="input-group-append" >
                        <input tabIndex={-1} className="btn px-0 ms-1" type="image" alt='delete-item' id="button-delete" src='delete_item.png' onClick={(e) => {deleteItem(e, currentItem)}}></input>
                    </div> : ""
                    }
                    <input id={`value-${props.index}`} className="d-none" value={currentItem.value}></input>
                </div>
                </>)
            }

        case "autodate":
            {

                return (<input className="form-control" id={`value-${props.index}`} type="date" format={dateFormat} defaultValue={getDate()} ></input>)
            }
                
        case "autotime":
            {
                return (<input id={`value-${props.index}`} className={"form-control"} type="time"  defaultValue={getTime()}></input>)
            }

        case "date":
            {
                return ( <input id={`value-${props.index}`} className={"form-control"} type={props.type}></input>)
            }

        case "time":
            {
                return (<input id={`value-${props.index}`} className={"form-control"} type={props.type}></input>)
            }

        case "currency":
            {
                return (<>
                    <CurrencyInput id={`value-${props.index}`} className={"form-control"} placeholder='$100,000,000' value={currencyValue} onValueChange={(e) =>setCurrencyValue(e)} prefix="R$" step={50} disableGroupSeparators decimalSeparator="," fixedDecimalLength={2}/>
                </>)
            }

        default:
            return (<input className={"form-control"} type="text"></input>)
    }
}

export default InputSelector