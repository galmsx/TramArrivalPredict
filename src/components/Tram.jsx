import React from 'react';
 function Tram({no,time,dest,err})
 {
     if(err) return(
         <div className="list-item">
         <strong>{"There are no trams today("}</strong>
         </div>
     );
     return(
<div className="list-item">
<div className="icon"></div>
<span>{"Tram№:"} <br/> {no}</span>
<span>{"Arrival:"} <br/> {time} </span>
<span>{"Destination:"} <br/> {dest} </span>
</div>);
 }

 export default Tram;