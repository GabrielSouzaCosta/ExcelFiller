import React from "react";
import DemonstrationContent from "../DemonstrationContent";
import Content from "../Content";
import { useSelector } from 'react-redux';

function Home() {
  const token = useSelector((state) => state.authReducer.token);

  return (
    <>
      
      {(token && token !== "" && token !== undefined) ? <> <Content /> </> : <> <DemonstrationContent />  </>}

    </>


    
  )
}


export default Home