const inputVideo = document.getElementById('inputVideo');
const outputCanvas = document.getElementById('outputCanvas');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const processedImage = document.getElementById('processedImage');  
const processedCanvas = document.getElementById('processedCanvas'); 
const serverUrl = 'http://localhost:5000/process';  // URL del servidor Flask

let stream;
let canvasContext = outputCanvas.getContext('2d');
let requestAnimationFrameId;
let sendingFrame = false;  


async function startVideo() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        inputVideo.srcObject = stream;
        startButton.disabled = true;
        stopButton.disabled = false;
        drawVideoOnCanvas();
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
}

function stopVideo() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    cancelAnimationFrame(requestAnimationFrameId);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function drawVideoOnCanvas() {
    canvasContext.drawImage(inputVideo, 0, 0, outputCanvas.width, outputCanvas.height);
    if (!sendingFrame) {  
        sendingFrame = true;  // Marcar que se esta enviando un frame
        sendFrameToServer(outputCanvas.toDataURL('image/jpeg'));
    }
    requestAnimationFrameId = requestAnimationFrame(drawVideoOnCanvas);
}

async function sendFrameToServer(dataUrl) {
    const blob = await fetch(dataUrl).then(res => res.blob());
    const formData = new FormData();
    formData.append('frame', blob, 'frame.jpg');

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const processedBlob = await response.blob();
            displayProcessedFrame(processedBlob);
        } else {
            console.error('Error processing frame:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending frame to server:', error);
    }
    sendingFrame = false;  // Permitir el  siguiente frame
}

function displayProcessedFrame(blob) {
    const url = URL.createObjectURL(blob);
    processedImage.src = url;  // Mostrar la imagen procesada en el tag <img>

    const img = new Image();
    img.onload = () => {
        const processedCanvasContext = processedCanvas.getContext('2d');
        processedCanvasContext.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}

startButton.addEventListener('click', startVideo);
stopButton.addEventListener('click', stopVideo);
