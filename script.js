// Define the Flipper class as a constructor function
function Flipper(node, currentTime, nextTime) {
    // Initialize properties for the Flipper instance
    this.isFlipping = false;
    this.duration = 600;
    this.flipNode = node;
    this.frontNode = node.querySelector('.front');
    this.backNode = node.querySelector('.back');
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
}

// Define a method to set the time on the front node
Flipper.prototype.setFrontTime = function (time) {
    this.frontNode.dataset.number = time;
};

// Define a method to set the time on the back node
Flipper.prototype.setBackTime = function (time) {
    this.backNode.dataset.number = time;
};

// Define a method to initiate the flipping animation
Flipper.prototype.flipDown = function (currentTime, nextTime) {
    let _this = this;

    if (this.isFlipping) {
        return false;
    }

    this.isFlipping = true;
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
    this.flipNode.classList.add('running');
    setTimeout(() => {
        _this.flipNode.classList.remove('running');
        _this.isFlipping = false;
        _this.setFrontTime(nextTime);
    }, this.duration);
};

// Function to convert a Date object to a time string (HH:mm:ss)
let getTimeFromDate = (date) => {
    return date.toTimeString().slice(0, 8).split(":").join("");
};

// Query the DOM to select all elements with the 'flip' class
let flips = document.querySelectorAll('.flip');

// Get the current time and calculate time strings for current and next times
let now = new Date();
let nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
let nextTimeStr = getTimeFromDate(now);

// Create an array of Flipper instances by mapping over the NodeList
let Flippers = Array.from(flips).map((flip, i) => {
    return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]);
});

// Set up an interval function that runs every second (1000 milliseconds)
setInterval(() => {
    // Get the current time and calculate time strings for current and next times
    let now = new Date();
    let nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    let nextTimeStr = getTimeFromDate(now);

    // Iterate through the Flippers array and check for time differences
    for (let i = 0; i < Flippers.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
            continue; // If times are the same, skip to the next Flipper
        }
        // Call the flipDown method on the Flipper instance
        Flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }
}, 1000);
