addEventListener("DOMContentLoaded",()=>{
    if(document.cookie.length > 0)
        GetWeatherByCityName(getCookie("cityName"));
});
const btnSearch = document.querySelector("#button-addon2");
const inputSearch = document.querySelector("#searchInput");
const btnForecast = document.querySelector("#btnGetForecast");
const btnCloseCard = document.querySelector("#btnCloseCard");

btnForecast.addEventListener("click", ()=>{
    event.preventDefault();
    ForecastCard();
})

btnCloseCard.addEventListener("click",()=>{
    event.preventDefault();
    const card = document.querySelector("#futureForecast");
    card.style.opacity = 0;
})

btnSearch.addEventListener("click",()=>{
    event.preventDefault();
    if(inputSearch != ""){
        GetWeatherByCityName(inputSearch.value);
        document.cookie = "cityName=" + inputSearch.value;
    }
        
})


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}



function ForecastCard(){
    const card = document.querySelector("#futureForecast");
    card.style.opacity = 1;
}