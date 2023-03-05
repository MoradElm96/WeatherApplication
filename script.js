//capturar elementos del dom
let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let search_input = document.getElementById("search_input");
let degreeNumber = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let tempDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let tempMin = document.getElementById("min");
let tempMax = document.getElementById("max");


//declarar funciones secundarias
//declaramos la funcion getweatherdata

const displayBackgroundImage = (coord) => {

    console.log(coord.dt);
    //extraer la hora del objeto que contiene los datos del tiempo
    //convertir a una hora que entendamos
    let dateS = new Date(coord.dt * 1000).toLocaleString("es-ES", {
        timeStyle: "short",
        dateStyle: "long"
    });
    console.log(dateS);

    //manipular el dom para incluir la hora

    date.textContent = `Ultima actualizacion ${dateS}`;

    const dayHour = new Date(coord.dt * 1000).getHours();
    console.log(dayHour);
    //logica

    //si es de dia
    if (dayHour > 6 && dayHour < 18) {
        container.classList.remove("night");
        container.classList.add("day");

    } else {

        container.classList.remove("day");
        container.classList.add("night");

    }

}

const displayData = (data) => {
    console.log(data);
    degreeNumber.textContent = Math.floor(data.main.temp);
    timeZone.textContent = data.name;
    console.log(data.name);

    const icon = data.weather[0].icon;
    weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`;
    tempMin.textContent = Math.floor(data.main.temp_min);
    tempMax.textContent = Math.floor(data.main.temp_max);
    //obtenemos el texto descripcion y convertimos la primera letra a mayuscula
    tempDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
}


const getWeatherData = async (city) => {
    // tiene que consumir la api
    //hace un request a la api de openweathermap, y  obtiene un objeto de los datos de la ciudad
    //fetch

   
  

    let apiKey = "66bef29284069a4b3bbda229393ac02e";
    //templet literals ' ' 
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`;

    const res = await fetch(urlApi);

    //si existe en la base datos de la api
    if (!res.ok) {
        alert('Ciudad inexistente');
        return;
    }


    const data = await res.json(); //pasa a json
    console.log(data);




    //cambiar el fondo de pantalla segun sea dia o noche
    displayBackgroundImage(data);


    //mostramos los datos en pantalla capturadno los elementos del dom

    displayData(data);
}
//obtenemos el texto escrito
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = search_input.value.trim();

    if (city.length === 0) {
        alert('Porfavor introduza una ciudad');
        return;
    }

    if (/[^a-zA-Z\s]/.test(city)) {
        alert('Ciudad incorrecta o inexistente');
        return;

    }




    console.log(city);
    getWeatherData(city);

});

//al cargar la pagina, cargar una ciudad
window.onload = () => {
    getWeatherData("Mostoles");
};