const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');

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
    // eslint-disable-next-line no-use-before-define
    faces.forEach(drawFace);
    requestAnimationFrame(detect);
}

function drawFace(face) {
    const { width, height, top, left } = face.boundingBox;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'hotpink';
    ctx.lineWidth = 5;
    ctx.strokeRect(left, top, width, height);
}

populateVideo().then(detect);
