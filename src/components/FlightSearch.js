import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const FlightSearch = () => {
    const baseRoute = "www.escapetothesecities.com"
    const [userInput, setUserInput] = useState('');
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bestRoute, setBestRoute] = useState(null);

    useEffect(() => {
        async function fetchCities() {
            // returning here as the api is not available
            return;
            try {
                const cities = axios.get(`${baseRoute}/cities?q=${userInput}`);
                setCities(cities.data);
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchCities()
    }, [userInput])

    const getBestRoute = (city) => {
        setUserInput(city)
        setIsLoading(true)
        try {
            const route = axios.get(baseRoute + '/route');
            setBestRoute(route.data);
            setIsLoading(false)
        }
        catch (err) {
            console.error(err)
            setIsLoading(false)
        }
    }

    return (
        <div className='flightSearch'>
            <Autocomplete
                className='input'
                freeSolo
                options={cities}
                onSelect={(city) => getBestRoute()}
                renderInput={(params) => <TextField {...params} label="City" placeholder='Select boarding location...' />}
            />
            {isLoading ? <div className='centerItem'><CircularProgress /></div> : null}
            {bestRoute ? <div className='routes'>{bestRoute.length ? bestRoute : "No route available"} </div> : null}
        </div>
    )
}

export default FlightSearch;