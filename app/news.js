const path = '/assets/Autos/';

document.addEventListener("DOMContentLoaded", function() {
    showCar('car1');
});


function showCar(carId) {
    var carDescriptions = document.getElementsByClassName("car-description");

    for (var i = 0; i < carDescriptions.length; i++) {
        carDescriptions[i].style.display = "none";
    }

    var selectedCar = document.getElementById(carId);
    selectedCar.style.display = "block";
}

function changeColor(carId, color) {
    var carImage = document.getElementById(carId);
    carImage.src = path + carId + "-" + color + ".webp";
}
