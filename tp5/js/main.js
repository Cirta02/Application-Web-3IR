// ✅ Clé API OpenWeatherMap
const API_KEY = "9fa0f08b308656e46582ee56e308e8f9";

let map = null;
let marker = null;

// Initialisation de la carte Leaflet
function initMap(lat, lon, cityName) {
    if (map) {
        map.remove();
    }

    map = L.map('map').setView([lat, lon], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([lat, lon]).addTo(map).bindPopup(cityName).openPopup();
}

// Application Vue.js
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Vue === 'undefined') {
        document.getElementById('weatherApp').innerHTML =
            '<div class="alert alert-danger">❌ Erreur : Vue.js n’est pas chargé.</div>';
        return;
    }

    console.log("🚀 Application météo démarrée");

    window.app = new Vue({
        el: "#weatherApp",
        data: {
            formCityName: "",
            message: "Application météo prête.",
            messageForm: "",
            cityList: [
                { name: "Paris" },
                { name: "Lyon" },
                { name: "Marseille" }
            ],
            cityWeather: null,
            cityWeatherLoading: false,
        },

        mounted() {
            console.log("✅ Vue.js initialisé");
            if (this.cityList.length > 0) {
                this.meteo(this.cityList[0]);
            }
        },

        methods: {
            addCity(event) {
                event.preventDefault();
                if (!this.formCityName.trim()) {
                    this.messageForm = "Veuillez saisir un nom de ville.";
                    return;
                }
                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = "Cette ville existe déjà dans la liste.";
                    return;
                }

                const newCity = { name: this.formCityName.trim() };
                this.cityList.push(newCity);
                this.messageForm = "";
                this.formCityName = "";
            },

            isCityExist(cityName) {
                return this.cityList.some(
                    c => c.name.toLowerCase() === cityName.trim().toLowerCase()
                );
            },

            remove(city) {
                this.cityList = this.cityList.filter(c => c.name !== city.name);
                if (this.cityWeather && this.cityWeather.name === city.name) {
                    this.cityWeather = null;
                    this.message = "Sélectionnez une ville pour afficher la météo.";
                }
            },

            meteo(city) {
                this.cityWeatherLoading = true;
                this.message = "Chargement en cours...";

                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&lang=fr&appid=${API_KEY}`)
                    .then(res => {
                        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
                        return res.json();
                    })
                    .then(json => {
                        this.cityWeatherLoading = false;
                        if (json.cod === 200) {
                            this.cityWeather = json;
                            this.message = "";
                            // ✅ Mise à jour de la carte Leaflet
                            setTimeout(() => {
                                initMap(json.coord.lat, json.coord.lon, json.name);
                            }, 200);
                        } else {
                            this.cityWeather = null;
                            this.message = json.message;
                        }
                    })
                    .catch(err => {
                        this.cityWeatherLoading = false;
                        this.cityWeather = null;
                        this.message = "Erreur de connexion à l'API météo.";
                        console.error(err);
                    });
            },
        },
    });
});
