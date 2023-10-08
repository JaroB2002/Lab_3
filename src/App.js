export default class App{
       constructor(){
              //console.log("App is loaded");
              this.getLocation();
       }

         getLocation(){
                  navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
                  this.showPosition.bind(this),
                  this.showError;
         }

            showPosition(position){
                    //console.log(this)
                    console.log(position);
                    let x = position.coords.latitude;
                    let y = position.coords.longitude;
                    //console.log(x,y);
                    this.getWeather(x,y);
            }

            getWeather(x,y){
            // url https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1
            // fetch, then log result
                fetch('https://api.open-meteo.com/v1/forecast?latitude='+x+'&longitude='+y+'&hourly=temperature_2m&current_weather=true&forecast_days=1')
                .then(response => response.json())
                .then((data) => {
                    //console.log(data);
                    document.querySelector("h2").innerHTML = data.current_weather.temperature + "°C";
                })
                .catch(error => console.log(error));
            }

            showError(error){
                    console.log(error);
            }
}
/* is day or night*/
/* check google ad formats */