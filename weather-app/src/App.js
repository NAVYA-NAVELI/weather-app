import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  let [city, setCity]=useState('')
  let [wDetails, setWDeatails]=useState()
  let [isLoading, setIsLoading]=useState(false)
  let getData=(event)=>{
    setIsLoading(true)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod=="404"){
        setWDeatails(undefined)
      }else{
        setWDeatails(finalRes)
      } 
      setIsLoading(false) 
    })
    event.preventDefault()
    setCity('')
  }

  return (
    <div className="App">
      <div className='cityIn'>
        <h1>Simple Weather App</h1>
        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} placeholder='City Name'/>
          <button className='butt'>Search</button>
        </form>
        <div className='shadow-lg showOutput'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' width={100} className={`image ${isLoading ? '' : 'loadfalse'}`} />
          
          {wDetails!==undefined ?
            <>
              <h1>{wDetails.name} <span>{wDetails.sys.country}</span></h1>
              <h2>{wDetails.main.temp}</h2>
              <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}/>
              <p>{wDetails.weather[0].description}</p>
            </> 
            :
            "No Data"
        }
          
        </div>
      </div>
    </div>
  );
}

export default App;
