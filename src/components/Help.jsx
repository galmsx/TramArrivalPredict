import React from 'react';

function Help({title,onChoice,id})
{
    return <div className="help" onClick={()=>onChoice(id,title)}><span>{title}</span></div>;
}
export default Help;