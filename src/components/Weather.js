import React from 'react';
import '../components/Weather.css';
import {useState, useEffect} from 'react';

export default function Weather(){
    const[weather, setWeather] = useState({})
    const[dates, setDates] = useState(['Kenya'])
    const[photos, setPhotos] = useState([])

    useEffect(()=>{
        ifClicked()
    }, [])

    const ifClicked= async ()=>{
        await fetch(`https://api.meteomatics.com/2022-11-03T00:00:00Z/t_2m:C/50,10_40,20:0.02,0.04/json${dates}&APPID={API_KEY_FOR_WEATHER_API}&units=metric`)
        .then(response => {
            if(response.ok){
                console.log(response.status);
                return response.json();
            } else{
                if(response.status = 404){
                    return alert('An error ocurred(wrong location)')
                }
                alert('There seems to be an error');
                throw new Error('Error');
            }
        })
        .then(object =>{
            setWeather(object);
            console.log(weather);
        })
        .catch(error=>{
            throw new Error(error)
        })

        fetch(`https://api.unsplash.com/search/photos?query=${dates}&client_id={API_KEY_FOR_UNSPLASH}`)
        .then(res =>{
            if(res.ok){
                return res.json();

            } else{
                if(res.status === 404){
                    throw new Error('No picture to display')
                }
            }
        })
        .then(data=>{
            setPhotos(data?.results[0]?.urls?.raw);
            console.log(data);
        })
        .catch(error =>{
            throw new Error(error);
        })
    }
    return (
        <div className='main'>
        <h1>Weather App</h1>
        <div className='wrapper'>
            <div className='search'>
              <input type='text' name='search' value={dates} 
              onChange={((e)=> setDates(e.target.value))} 
              placeholder='Input_location' className='input-location'/>
            
            <button className='find-location' onClick={ifClicked}>Find Location</button>
            </div>
            <p className="temp">Current Temperature: {weather?.main?.temp}</p>
            <div className='images'>
            <img src={photos} alt='images' className='image' />

            </div>
        </div>
        </div>

    )
}
