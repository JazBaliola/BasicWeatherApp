
let apiKey = ""; // your unique api key here
let geolocationObj = navigator.geolocation;
let xhr = new XMLHttpRequest();


// Method for when request is success
let success = positon => {
        
    let latitude = positon.coords.latitude;
    let longitude = positon.coords.longitude;

    let api = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

    // request get method in api
    xhr.open('GET', api , true);

    // on load execute callback function
    xhr.onload = () => {

        // check status of the request
        if(xhr.readyState == 4 && xhr.status == 200){
            
            // parse result to json
            let parsedResult = JSON.parse(xhr.responseText);
            
            // show result to dom object 
            document.body.style.backgroundImage = "url('images/" + parsedResult.weather[0].main.toLowerCase() + ".jpg')";
            document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + parsedResult.weather[0].icon + "@2x.png";
            document.getElementById('location').innerHTML = parsedResult.name + ", " + parsedResult.sys.country;
            document.getElementById('temp').innerHTML = parseInt(Math.round(parsedResult.main.temp)) + "c";
            document.getElementById('desc').innerHTML = parsedResult.weather[0].description;
            document.getElementById('tempHigh').innerHTML = "H: " + parseInt(Math.round(parsedResult.main.temp_max)) + "c";
            document.getElementById('tempLow').innerHTML = "L: " + parseInt(Math.round(parsedResult.main.temp_min)) + "c";
        }else{
            alert("404 Not Found!");
        }

    }

    // send http request
    xhr.send();
}

// Method for when request is denied
let denied = () => {
    alert("This Application needs to access your geolocation to work.");
    document.write('This Application needs to access your geolocation to work. <br><br> Please reload and allow geolocation.');
}

// request to user for geolocation
geolocationObj.getCurrentPosition(success, denied)
    
