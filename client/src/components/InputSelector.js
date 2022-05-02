import React from 'react'
import CreatableSelect from 'react-select/creatable'

function InputSelector(props) {

    switch(props.type) {
        case "text":
            {
                return ( <input type={props.type} ></input> )
            }

        case "item":
            {
                return ( <CreatableSelect  /> )
            }

        case "date":
            {
                return ( <input type={props.type} ></input>)
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
    }
}

export default InputSelector