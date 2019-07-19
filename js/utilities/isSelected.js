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