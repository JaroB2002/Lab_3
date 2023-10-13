export default class App {
    constructor() {
        console.log("Hello from App.js");
        this.getLocation();
        this.loadRandomFoodPhoto();

    }

    //Get the location of the user
    getLocation() {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }

    //Show the position of the user
    showPosition(position) {
        console.log(position);
        //x - coordinate
        let x = position.coords.latitude;
        console.log(x);
        //y - coordinate
        let y = position.coords.longitude;
        console.log(position.coords.longitude);

        this.getWeather(x, y);
    }
    loadRandomFoodPhoto() {
        const photoContainer = document.querySelector("#food-photo");
        photoContainer.src = "https://source.unsplash.com/400x300/?food";
        photoContainer.onload = () => {
            photoContainer.style.maxWidth = "100%"; /* Voeg deze regel toe */
            photoContainer.style.maxHeight = "100%"; /* Voeg deze regel toe */
        };
    }
    // Toon de willekeurige foto op het scherm
    displayPhoto(photoUrl) {
        const imageElement = document.createElement("img");
        imageElement.src = photoUrl;
        imageElement.alt = "Random Food Photo";
        const photoContainer = document.querySelector("#photo");
        photoContainer.appendChild(imageElement);
    }


    //Get the weather from the API
    getWeather(x, y) {
        //url: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1
        //fetch, then log results
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" + x + "&longitude=" + y + "&hourly=temperature_2m&current_weather=true&forecast_days=1")
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                //Get the temperature from the API
                let temp = data.current_weather.temperature;
                document.querySelector("#temperature").innerHTML = temp + "°C";

                // Call the Dad Jokes API if the temperature is 15 degrees or higher
                if (temp >= 15) {
                    this.getDadJoke();
                }
            })
            .catch(error => console.log(error));
    }

    // Get a random dad joke from the Dad Jokes API
    getDadJoke() {
        fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Get the joke from the API
            const joke = data.joke;

            // Display the joke on the screen
            document.querySelector("#joke").innerHTML = joke;
        })
        .catch(error => console.error(error));
    }
}

