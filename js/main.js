const searchInput = document.querySelector('#searchInput');
const findBtn = document.querySelector('#find');
const city = document.querySelector('h5.city');
const tempOne = document.querySelector('#tempOne');
const condition = document.querySelector('#condition');
const icon = document.querySelector('#icon-1');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const windDir = document.querySelector('#windDir');
const currentDay = document.querySelector('#currentDay');
const dayOfMonth = document.querySelector('#dayOfMonth');
const month = document.querySelector('#month');
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

navigator.geolocation.getCurrentPosition(getPosition)
function getPosition(position){
    let pos = `${position.coords.latitude} ${position.coords.longitude}`
    forecast(pos);
}

async function forecast(country) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1c079622ad154119bd6204456241412&q=${country}&days=3`);
    let resData = await response.json();
    city.innerHTML = resData.location.name;
    tempOne.innerHTML = `${resData.current.temp_c}<sup>o</sup>C`;
    condition.innerHTML = resData.current.condition.text;
    icon.setAttribute("src", `https:${resData.current.condition.icon}`);
    wind.innerHTML = `<i class="fa-solid fa-wind"></i> ${resData.current.wind_kph} km/h`;
    humidity.innerHTML = `<i class="fa-solid fa-umbrella"></i> ${resData.current.humidity}%`;
    windDir.innerHTML = `<i class="fa-solid fa-compass"></i> ${resData.current.wind_dir}`;
    let day = new Date(resData.location.localtime);
    let dayName = days[day.getDay()];
    let monthDay = day.getDate();
    let theMonth = months[day.getMonth()];
    currentDay.innerHTML = dayName;
    dayOfMonth.innerHTML = monthDay;
    month.innerHTML = theMonth;
     getSecond(resData);
     getThird(resData);
};

const secDay = document.querySelector('#secDay');
const iconTwo = document.getElementById('iconTwo');
const tempTwo = document.getElementById('tempTwo');
const conditionTwo = document.getElementById('conditionTwo');
const minTempTwo = document.getElementById('minTempTwo');

function getSecond(data){
    let day2 = new Date(data.forecast.forecastday[1].date);
    let day2Name = days[day2.getDay()];
    secDay.innerHTML = day2Name;
    iconTwo.setAttribute('src', `https:${data.forecast.forecastday[1].day.condition.icon}`);
    conditionTwo.innerHTML = data.forecast.forecastday[1].day.condition.text;
    tempTwo.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    minTempTwo.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`;
    
};

const dayThree = document.querySelector('#dayThree');
const iconThree = document.getElementById('iconThree');
const tempThree = document.getElementById('tempThree');
const conditionThree = document.getElementById('conditionThree');
const minTempThree = document.getElementById('minTempThree');

function getThird(data) {
    let day3 = new Date(data.forecast.forecastday[2].date);
    let day3Name = days[day3.getDay()];
    dayThree.innerHTML = day3Name;
    iconThree.setAttribute('src', `https:${data.forecast.forecastday[2].day.condition.icon}`);
    conditionThree.innerHTML = data.forecast.forecastday[2].day.condition.text;
    tempThree.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
    minTempThree.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`;
};

findBtn.addEventListener('click', ()=>{
    forecast(searchInput.value);
});