 function isSelected(clickX, clickY, jutsuCoordinates, width, height) {
        if (
            clickX >= jutsuCoordinates.x &&
            clickX <= jutsuCoordinates.x + width &&
            clickY >= jutsuCoordinates.y &&
            clickY <= jutsuCoordinates.y + height
        ) {
            return true;
        }else{
            return false;
        }
    }

function computeDamage (player1, player2, index){
    let jutsu = player1.jutsu[index];
    let damage = (jutsu.power/player2.defense)*jutsu.accuracy;
    return damage;  
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function getMouseCoordinates(canvas, event) {
    let clickCoordinates = {};
    let rect = canvas.getBoundingClientRect();
    clickCoordinates.x = event.clientX - rect.left;
    clickCoordinates.y = event.clientY - rect.top;
    return (clickCoordinates);
}

 function displayInfo(canvas,event, coordinatesArray, hoverArray) {
        let clickCoordinates = getMouseCoordinates(canvas, event);


        for (let i = 0; i < coordinatesArray.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, coordinatesArray[i], coordinatesArray[i].width, coordinatesArray[i].height)) {

                hoverArray[i] = true;
            }

            if (!isSelected(clickCoordinates.x, clickCoordinates.y, coordinatesArray[i],coordinatesArray[i].width, coordinatesArray[i].height)) {
                hoverArray[i] = false;
            }

        }

    }

