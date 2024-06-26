//https://api.openweathermap.org/data/2.5/forecast?q=Baku&appid=9940ce27b8ad80f4c9c3b95fe52688af
let apiKey = "9940ce27b8ad80f4c9c3b95fe52688af"
let siteUrl = "https://api.openweathermap.org"
let days = "40";


async function GetWeatherByCityName(cityName){
    let fullUrl = `${siteUrl}/data/2.5/forecast?q=${cityName}&cnt=${days}&appid=${apiKey}`;
    await fetch(fullUrl)
    .then(function(resp) { return resp.json() })
    .then(function(data) 
    { 
        console.log(data);
        if(GetCityState(data) == 1){
            GetWeather(data); 
            GetDescription(data);
            GetWeatherPic(data);
            GetOptionalInfo(data);
            load5daysForecast(data);
        }
    })
    .catch(function(){

    });
}


function GetDescription(d){
    var desc = d.list[0].weather[0].description;
    document.querySelector("#weatherDescription").textContent = desc;
}

function GetWeather(d){
    var celcius = Math.round(parseFloat(d.list[0].main.temp)-273.15);
    document.querySelector("#mainWeatherInfo").textContent = `${celcius}℃`
}

function GetCityState(d){
    if(d.cod == "200"){
        TogglePageOpacity(false);
        let cityName = document.querySelector("#currentWeatherName");
        cityName.textContent = d.city.name
        return 1;
    }
    else{
        document.querySelector("#currentWeatherName").textContent = "City not found!";
        TogglePageOpacity(true);
        return 0;
    } 
}

function TogglePageOpacity(isHide){
    let MWI = document.querySelector("#mainWeatherInfo");
    let PB = document.querySelector("#picBlock");
    let OWI = document.querySelector("#optionalWeatherInfoBlock");
    let WD = document.querySelector("#weatherDescription");
    let GFF = document.querySelector("#btnGetForecast");
    if(isHide == false){
        MWI.style.opacity = 1;
        PB.style.opacity = 1;
        OWI.style.opacity = 1;
        WD.style.opacity = 1;
        GFF.style.opacity = 1;
    }
    else if(isHide == true){
        MWI.style.opacity = 0;
        PB.style.opacity = 0;
        OWI.style.opacity = 0;
        WD.style.opacity = 0;
        GFF.style.opacity = 0;
    }
}

function GetOptionalInfo(d){
    let date = document.querySelector("#dateOfLastUpdate");
    let code = document.querySelector("#countryCode");
    let speed = document.querySelector("#windSpeed");
    let pop = document.querySelector("#PoP");
    let pressure = document.querySelector("#atmPressure");
    date.textContent = `Date of last update: ${d.list[0].dt_txt}`;
    code.textContent = `Country code: ${d.city.country}`;
    speed.textContent = `Wind speed: ${Math.round(d.list[0].wind.speed / 1000 * 3600).toString()}km/h`;
    pop.textContent = `Propbably of precipitation: ${(parseInt(d.list[0].pop) * 100).toString()}%`;
    pressure.textContent = `Atmosphere pressure: ${d.list[0].main.pressure} millibars`;
}

function GetWeatherPic(d){
    let weatherInfo = d.list[0].weather[0].main;
    let element = document.querySelector("#pic");
    switch(weatherInfo){
        case "Clouds":
            element.src = 'icons/cloud.png';
        break;
        case "Snow":
            element.src = 'icons/sleet.png';
        break;
        case "Rain":
            element.src = 'icons/rainy.png';
        break;
        case "Thunderstorm":
            element.src = 'icons/thunderstorm.png';
        break;
        case "Drizzle":
            element.src = 'icons/rainy.png';
        break;
        case "Clear":
            element.src = 'icons/sun.png';
        break;
        case "Mist":
            element.src = 'icons/fog.png';
        break;
        case "Smoke":
            element.src = 'icons/fog.png';
        break;
        case "Haze":
            element.src = 'icons/fog.png';
        break;
        case "Dust":
            element.src = 'icons/fog.png';
        break;
        case "Fog":
            element.src = 'icons/fog.png';
        break;
        case "Sand":
            element.src = 'icons/fog.png';
        break;
        case "Dust":
            element.src = 'icons/fog.png';
        break;
        case "Ash":
            element.src = 'icons/fog.png';
        break;
        case "Squall":
            element.src = 'icons/fog.png';
        break;
        case "Tornado":
            element.src = 'icons/fog.png';
        break;
    }
}

function load5daysDaysOfWeek(){
    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      var d = new Date();
      var n = d.getDay();
      console.log(days[n]);
    for(let y = 1; y < 6; ++y){
        var element = document.querySelector(`#card${y}DayOfWeek`)
        element.textContent = days[n + (y - 1)]
    }
}

function load5daysTemp(d){
    let i = 0;
    for(let y = 1; y < 6; ++y){
        console.log(y);
        var element = document.querySelector(`#card${y}temp`)
        var weatherInfo = Math.round(parseFloat(d.list[i].main.temp)-273.15);
        element.textContent = weatherInfo + "℃";
        if(y < 5)
            i += 8;
        else if(y == 5)
            i += 7;
    }
}

function load5daysDate(d){
    let i = 0;
    for(let y = 1; y < 6; ++y){
        console.log(y);
        var element = document.querySelector(`#card${y}Date`)
        var dateInfo = d.list[i].dt_txt;
        element.textContent = dateInfo.split(' ')[0];
        if(y < 5)
            i += 8;
        else if(y == 5)
            i += 7;
    }
}

function load5daysIcons(d){
    let i = 0;
    for(let y = 1; y < 6; ++y){
        console.log(y);
        var element = document.querySelector(`#card${y}pic`)
        var weatherInfo = d.list[i].weather[0].main;
        switch(weatherInfo){
            case "Clouds":
                element.src = 'miniIcons/cloud.png';
            break;
            case "Snow":
                element.src = 'miniIcons/sleet.png';
            break;
            case "Rain":
                element.src = 'miniIcons/rainy.png';
            break;
            case "Thunderstorm":
                element.src = 'miniIcons/thunderstorm.png';
            break;
            case "Drizzle":
                element.src = 'miniIcons/rainy.png';
            break;
            case "Clear":
                element.src = 'miniIcons/sun.png';
            break;
            case "Mist":
                element.src = 'miniIcons/fog.png';
            break;
            case "Smoke":
                element.src = 'miniIcons/fog.png';
            break;
            case "Haze":
                element.src = 'miniIcons/fog.png';
            break;
            case "Dust":
                element.src = 'miniIcons/fog.png';
            break;
            case "Fog":
                element.src = 'miniIcons/fog.png';
            break;
            case "Sand":
                element.src = 'miniIcons/fog.png';
            break;
            case "Dust":
                element.src = 'miniIcons/fog.png';
            break;
            case "Ash":
                element.src = 'miniIcons/fog.png';
            break;
            case "Squall":
                element.src = 'miniIcons/fog.png';
            break;
            case "Tornado":
                element.src = 'miniIcons/fog.png';
            break;
        }
        if(y < 5)
            i += 8;
        else if(y == 5)
            i += 7;
    }
}

function load5daysForecast(d){
    load5daysIcons(d);
    load5daysTemp(d);
    load5daysDaysOfWeek();
    load5daysDate(d);
}