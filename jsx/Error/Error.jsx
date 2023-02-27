import React from "react";

function Error({msg,children}){
    const text='Error';
    return (
      <div style={{backgroundColor:'#290000',color:'#FF8080',padding:10,border:'1px solid #5C0000'}}>
          {msg || children}
      </div>
    );
};

export default Error;