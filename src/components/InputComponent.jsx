import { useEffect, useState } from "react";
// Style
import styles from  "../components/InputComponent.module.css";

const InputComponent = () => {  
    const [cityName, setCityName] = useState("");  
    const [error, setError] = useState(false);  
    const [cities, setCities] = useState([]);  
    const [suggestion, setSuggestion] = useState("");   

    useEffect(() => {  
        const fetchCities = async () => {  
            try {  
                const url = "./src/cities.json";   
                const res = await fetch(url);  
                const json = await res.json();  
                setCities(json);  
            } catch (error) {  
                console.error("This is an API Error", error);  
                setError(true);  
            }  
        };  
        fetchCities();  
    }, []);

    const changeHandler = (event) => {  
        const value = event.target.value;  
        setCityName(value);  

        if (value) {  
            const filterData = cities.filter(city =>  
                city.toLowerCase().startsWith(value.toLowerCase()));  
            setSuggestion(filterData.length > 0 ? filterData[0] : ""); 
        } else {  
            setSuggestion("");  
        }  
    };  

    const clickHandler = (city) => {  
        setCityName(city);  
        setSuggestion("");  
    };  

    const handleKeyDown = (event) => {  
        if (event.key === 'Enter' && suggestion) {  
            clickHandler(suggestion);  
        }  
    };  

    return (  
        <div className={styles.inputContainer}>
            <h1>Input Mask</h1>
            <label htmlFor="input">
                City:
                <span>{suggestion}</span>
            </label>  
            <input  
                type="text"  
                id="input"  
                placeholder="Enter your city name"
                value={cityName}  
                onChange={changeHandler}  
                onKeyDown={handleKeyDown}   
            />  
            {error && <h2>It has problem</h2>}  
        </div>  
    );  
};  

export default InputComponent;

