from flask import Flask, request, send_file
from flask_cors import CORS
import torch
import io
import cv2
import numpy as np
from PIL import Image
import logging

app = Flask(__name__)
CORS(app) 

# Aqio se Carga el modelo de YOLOv5
model_path = 'yolov5s.pt'  # Ajusta esto si tu archivo .pt esta en otro lugar
model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)  # Utiliza el repositorio de yolo con el que entrenaste a tu modelo

@app.route('/process', methods=['POST'])
def process_frame():
    if 'frame' not in request.files:
        return "No frame provided", 400

    file = request.files['frame']
    img = Image.open(io.BytesIO(file.read()))

    results = model(img)

    # Convertir resultados a imagen con anotaciones
    img_result = np.squeeze(results.render())  

    # Convertir la imagen de nuevo a jpeg
    _, img_encoded = cv2.imencode('.jpg', img_result)
    return send_file(io.BytesIO(img_encoded.tobytes()), mimetype='image/jpeg')

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    
    def log_ready():
        logger.info("Server running on port 5000")
    
    app.before_first_request(log_ready)
    app.run(debug=True, host='0.0.0.0', port=5000)
