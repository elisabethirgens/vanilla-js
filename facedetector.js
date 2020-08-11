const video = document.querySelector(".webcam");
const canvas = document.querySelector(".video");
const ctx = canvas.getContext("2d");
const faceCanvas = document.querySelector(".face");
const faceCtx = faceCanvas.getContext("2d");
const PIXELS = 14;

const faceDetector = new window.FaceDetector({
    fastMode: true,
});

async function populateVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
    });
    video.srcObject = stream;
    await video.play();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
}

async function detect() {
    const faces = await faceDetector.detect(video);
    faces.forEach(drawFace);
    faces.forEach(censorFace);
    requestAnimationFrame(detect);
}

function drawFace(face) {
    const { width, height, top, left } = face.boundingBox;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "hotpink";
    ctx.lineWidth = 5;
    ctx.strokeRect(left, top, width, height);
}

function censorFace({ boundingBox: face }) {
    faceCtx.imageSmoothingEnabled = false;
    faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    faceCtx.drawImage(
        // source image parameters
        video,
        face.x,
        face.y,
        face.width,
        face.height,
        // destination canvas parameters
        face.x,
        face.y,
        PIXELS,
        PIXELS
    );
    faceCtx.drawImage(
        // source image parameters
        faceCanvas,
        face.x,
        face.y,
        PIXELS,
        PIXELS,
        // destination canvas parameters
        face.x,
        face.y,
        face.width,
        face.height
    );
}

populateVideo().then(detect);
