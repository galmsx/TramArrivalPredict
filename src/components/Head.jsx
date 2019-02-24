import React from 'react';
import Help from './Help';

class Head extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            title: "",
            helps:[],
            placeholder: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onChoiceHandler = this.onChoiceHandler.bind(this);
    }

    handleChange(e)
    {
        let title = e.target.value;
        this.setState({title});
        if(!title.length) {this.setState({helps:[]}); return;}
        fetch(`https://api.tfl.gov.uk/StopPoint/Search/${title}?modes=tram&maxResults=4&tflOperatedNationalRailStationsOnly=true&app_id=11d81f3a&app_key=3dbf283b1f7682d9048d4fe669633d23 `,{method:'GET'}) 
        .then(response => response.json())
        .then(data=>{
            data = data.matches.filter((e)=>e.id.length == 11);//api doesnt have indo about shorter id's
            let helps = data.map((e)=>{
            return {title : e.name , id : e.id};
        });
        this.setState({helps});
    })
        .catch(alert)
    }

    onChoiceHandler(id,title){
        if(id){
            this.setState({
                placeholder:title,
                helps:[],
                title:""
            });
            this.props.onChoice(id);
            return;
        } 
        if(!this.state.helps.length) return;
        let ID = this.state.helps[0].id;
        this.setState({
            placeholder : this.state.helps[0].title,
            helps:[],
            title:""
        });
        this.props.onChoice(ID); 
    }

    render(){
        return (
            <div className={"head "+ this.props.className}>
            <div className="inputArea">
            <form onSubmit = {(e)=>{e.preventDefault(); e.target.title.blur(); this.onChoiceHandler();}}>
                    <input type="text"
                    name ="title"
                     placeholder={this.state.placeholder || "Enter tram stop name"}
                      value={this.state.title} 
                      className = {(!this.state.helps.length) ? "withoutHelp" : ''}
                      onChange = {e=>this.handleChange(e)}
                      onFocus ={() => {this.props.onChoice(0); this.setState({placeholder:''})}}
                       />
            </form>

                    {this.state.helps.map((e)=>{
                        return <Help title ={e.title} id = {e.id} onChoice = {this.onChoiceHandler} key ={e.id}/>;
                    })}

             </div>
            
        </div>
        );
    }
}
export default Head;