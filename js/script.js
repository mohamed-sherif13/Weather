/*Todays*/
let todayName = document.getElementById("today_day");
let todayNumber = document.getElementById("today_Number");
let todayMonth = document.getElementById("today_month");
let todayLocation = document.getElementById("location");
let todayTemp = document.getElementById("todays_temp");
let todayConditionImg = document.getElementById("todays_Cond_img");
let todayConditionText = document.getElementById("todayConditionText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");
/*Next Days*/
let nextDay = document.getElementsByClassName("nextDay");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let next_Cond_img = document.getElementsByClassName("next_Cond_img");
let next_Cond_text = document.getElementsByClassName("next_Cond_text");
/*search button*/
let searchInput = document.getElementById("search");



/***************Get API Data**********************/
async function getWeatherData(city) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}


/**********************Todays Day******************/
function getTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" });
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" });
    todayNumber.innerHTML = todayDate.getDate();
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", "https:" + data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "Km/h";
    windDirection.innerHTML = data.current.wind_dir;

}


/**********************Next Day******************/
function getNextData(data) {
    let forcastData = data.forecast.forecastday;
    console.log(forcastData);
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forcastData[i + 1].date);
        console.log(nextDate);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" });
        nextMaxTemp[i].innerHTML = forcastData[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forcastData[i + 1].day.mintemp_c;
        next_Cond_text[i].innerHTML = forcastData[i + 1].day.condition.text;
        next_Cond_img[i].setAttribute("src", "https:" + forcastData[i + 1].day.condition.icon);
    }
}





async function StartWebsite(city = "cairo") {
    let weatherData = await getWeatherData(city);
    if (!weatherData.error) {
        getTodayData(weatherData);
        getNextData(weatherData);
    }

}
StartWebsite();

searchInput.addEventListener("input", function() {
    StartWebsite(searchInput.value);
})