let currentFloor = 1;
let queue = [];
const elevatorArrivalSound = document.getElementById('elevator-arrival-sound');
const buttonClickSound = document.getElementById('button-click-sound');

function requestElevator(floor) {
    if (!queue.includes(floor)) {
        queue.push(floor);
        moveElevator();
        playSound(buttonClickSound); 
    }
}

function selectFloor(floor) {
    if (currentFloor !== floor) {
        queue.push(floor);
        moveElevator();
        playSound(buttonClickSound); 
    }
}

function moveElevator() {
    queue.sort((a, b) => a - b);

    while (queue.length > 0) {
        let nextFloor = queue.shift();
        animateElevator(nextFloor);
    }
}

function animateElevator(destination) {
    let elevator = document.querySelector('.elevator');
    let floorHeight = 75;

    let animationDuration = Math.abs(currentFloor - destination) * 1000;
    elevator.style.transition = `bottom ${animationDuration}ms`;

    elevator.style.bottom = `${(destination - 1) * floorHeight}px`;

    setTimeout(() => {
        currentFloor = destination;
        elevator.style.transition = 'none';
        playSound(elevatorArrivalSound); 
    }, animationDuration);
}

function playSound(soundElement) {
    soundElement.currentTime = 0; 
    soundElement.play();
}
