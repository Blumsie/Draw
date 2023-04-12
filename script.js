document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');

let drawing = false;
let pixelSize = 20;

function resizeCanvas() {
    canvas.width = Math.floor(window.innerWidth * 0.8);
    canvas.height = Math.floor(window.innerHeight * 0.8);
}

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / pixelSize);
    const y = Math.floor((event.clientY - rect.top) / pixelSize);
    return { x, y };
}

function startDrawing(event) {
    drawing = true;
    const position = getMousePosition(event);
    drawPixel(position.x, position.y, colorPicker.value);
}

function continueDrawing(event) {
    if (!drawing) return;
    const position = getMousePosition(event);
    drawPixel(position.x, position.y, colorPicker.value);
}

function stopDrawing() {
    drawing = false;
}

function saveAsPNG() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'pixel_art.png';
    link.click();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', continueDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', continueDrawing);
canvas.addEventListener('touchend', stopDrawing);
saveButton.addEventListener('click', saveAsPNG);
clearButton.addEventListener('click', clearCanvas);

});
