const API_KEY = '03b7bf129071b419d5ade106316b9768'
const navigator = window.navigator

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function handleGeoSucces(position){
    const latitude =  position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude);
}

function handleGeoError(position){
    console.log('Cant get your position.');
}

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(function(response){
        return response.json();
    })
        .then(function(json){
        weather = json.weather[0].id
        let weatherCss = ''
        if(weather>=200 && weather<300){
            weather = 'thunder'
        }else if(weather>=300 && weather<400){
            weather = 'drizzle'
        }else if(weather>=500 && weather<600){
            weather = 'rainy'
        }else if(weather>=600 && weather<700){
            weather = 'snowy'
        }else if(weather>=700 && weather<800){
            weather = 'mist'
            weatherCss = 'top: -55px;'
        }else if(weather === 800){
            weather = 'day'
            weatherCss = 'top: -55px; transform: scale(2);'
        }else{
            weather = 'cloudy'
            weatherCss = 'top: -52px;'
        }
        const $today = document.querySelectorAll('.today .date__text')[0]
        const weatherImgSrc = "http://yesimjin.com/image/weather/"+weather+".svg"
        const weatherImg = document.createElement('img')
        weatherImg.setAttribute('src',weatherImgSrc)
        weatherImg.setAttribute('style',weatherCss)
        $today.appendChild(weatherImg)
    });
}

askForCoords()