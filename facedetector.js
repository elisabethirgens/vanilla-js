const video = document.querySelector(".webcam");
const canvas = document.querySelector(".video");
const ctx = canvas.getContext("2d");
const faceCanvas = document.querySelector(".face");
const faceCtx = faceCanvas.getContext("2d");

let PIXELS = 14;
const slider = document.querySelector("[name=pixelation]");
slider.addEventListener("input", (e) => {
    PIXELS = e.currentTarget.value;
});

const faceDetector = new window.FaceDetector({
    fastMode: true,
});

// Declaring a function with the async keyword will let
// me use the await keyword within that function
async function populateVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
    });
    video.srcObject = stream;
    // Pause execution of this function until Promise is settled
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
    // console.log({ left, top, width, height });
}

// Destructure the face.boundingBox property and rename it for this function
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

// then() is a method that will return a Promise
// and takes a callback function as an argument
populateVideo().then(detect);
