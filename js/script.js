let BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast'; // 'https://api.openweathermap.org/data/2.5/weather';

let API_KEY = 'e6115c5f06a65bf17159292d411282d3';

window.onload = function(){
    this.getWeatherByCity("vancouver, ca");
}

function getWeatherByCity(city){
    var url = BASE_URL + "?q=" + city + "&appid=" + API_KEY + "&units=metric";

    for (var i = 0; i < 7; i++){
        getJSON(url, function(status,data){
            
            let icon = data.list[0].weather[0].icon;
            let name = data.city.name;
            let temp = data.list[i].main.temp;
            let dt_txt = data.list[i].dt_txt;
            let speed = data.list[i].wind.speed;
            let deg = data.list[i].wind.deg;

            var w = "";
            w += "<article>" + 
                    "<img alt='weather icon' src='http://openweathermap.org/img/w/"+icon+".png' />" +
                    "<h1>"+temp+" ºC</h1>" +
                    "<p>"+dt_txt+" ºC</p>" +
                    "<p>"+speed+" m/s</p>" +
                    "<p>"+deg+" hpa</p>" +
                "</article>";
            document.getElementById('weather_widget').innerHTML += w;
        });
    }
}

function getJSON(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function(){
        var status = xhr.status;
        if (status === 200){
            console.log('OK!');
        }else {
            console.log('ERROR!' + status);
        }
        callback(status, xhr.response);
    }
    xhr.send();
}