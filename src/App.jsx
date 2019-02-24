import React from 'react';
import ReactDOM from 'react-dom';
import Head from './components/Head';
import Tram from './components/Tram';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state ={
      arrivals:[],
    }
    this.onChoiceHandler = this.onChoiceHandler.bind(this);
  }
  onChoiceHandler(id)
  {
    if(!id) {this.setState({arrivals:[]}); return;}

  fetch(`https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`,{method:"GET"})
  .then(res=> res.json())
  .then(res=> {
    let arrivals;
    if(!res.length){ arrivals = [{err:true,no:'',dest:'',time:''}]; this.setState({arrivals}); return;}
    console.log(res);
    arrivals = res.map((e)=>{
      return{
        no : e.vehicleId,
        dest : e.destinationName,
        time : e.expectedArrival.slice(11,-4),
        err : false
      }
    });
    this.setState({arrivals});

    
  })
  .catch(e=>console.log(e));

  }
  render()
  {
    return (
      <div className="main"> 
      <Head onChoice = {this.onChoiceHandler} className = {this.state.arrivals.length ? "" : "single"}/>
      <div className="list">
      {
        this.state.arrivals.map((e)=>{
          return <Tram no ={e.no} dest = {e.dest} time ={e.time} err ={e.err} key ={e.no}/>
        })
      }
      

      </div>
  </div>

    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
module.hot.accept();