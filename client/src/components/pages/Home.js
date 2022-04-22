import React from "react";
import Navbar from "../Navbar";
import DemonstrationContent from "../DemonstrationContent";
import Content from "../Content";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { useSelector, useDispatch } from 'react-redux';
import { createTable } from '../../redux/actions/createTableAction'


const options = [
  { value: 'manualtype', label: 'Manual type'},
  { value: 'date', label: 'Date'},
  { value: 'time', label: 'Time'},
  { value: 'currency', label: 'Currency'},
  { value: 'autodate', label: 'Automatic Date'},
  { value: 'autotime', label: 'Automatic Time'},
  { value: 'Item', label: 'Item'},
]



function Home() {
  const table = useSelector((state) => state.tableReducer);
  const token = useSelector((state) => state.loginReducer.token);
  const dispatch = useDispatch();

  function addTable(value) {
    dispatch(createTable(value));
  }


  return (
    (token && token !== "" && token !== undefined) ? <Content /> : <DemonstrationContent />


    
  )
}


export default Home