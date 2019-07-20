function getMouseCoordinates(canvas, event) {
    let clickCoordinates = {};
    let rect = canvas.getBoundingClientRect();
    clickCoordinates.x = event.clientX - rect.left;
    clickCoordinates.y = event.clientY - rect.top;
    return (clickCoordinates);
}
