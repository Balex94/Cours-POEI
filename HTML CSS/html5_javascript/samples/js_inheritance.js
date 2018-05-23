function Car() { }

Car.prototype.start = function () {
    console.log("Engine started");
}

function Deloreane() { }

// copie le prototype de Car sur le prototype de Deloreane
Deloreane.prototype = Object.create(Car.prototype).prototype;

// équivalent d'une surcharge
Deloreane.prototype.start = function () {
    // équivalent de super
    Car.prototype.start.apply(this);
    console.log("... 2.21 GigoWatts !");
}

