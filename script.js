let lastId = 2;
const video = document.getElementById('video')


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo())

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width+200, height: video.height}
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    if(resizedDetections.length > 0) {
        resizedDetections[0].detection._box._x+= 75;
        

        resizedDetections[0].detection.box._x+= 75;
        let dim = resizedDetections[0].detection._box        
        
        calculate(dim._x, dim._x+dim._width, 920)
    }
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
  }, 1000)
})

function calculate(x, y, scr) {
  let avg = (scr/2)+130;
  let width = y-x;
  let avg_w = width/2;
  if(x > avg - 100 && x < avg + 100 && (avg - y > -170)) {
    console.log(true)
    
    console.log(1)
  } else if(x < avg - 100 && y > avg + 100) {
    console.log(true)
    
    
  }else if(x > avg - 100 && y < avg + 100) {
    console.log(true)
    
    
  } else if( x > avg - 100 && y < avg + 100 ) {
    console.log(true)
    
  } else {
    if(x > (avg+100) || y <(avg - 100) || y < avg || x > avg) {
      sendRequest(0); //Turn Right (Cam in left)
    } else {
      sendRequest(1); //Turn Left (Cam in Right)
    }
    console.log(false)
  }
}

function sendRequest(id) {
  if(lastId === id) return;
  lastId = id;
 fetch('http://localhost:3000/bob', {
    method: 'POST',
    body: `{
      "id": ${id}
    }`,
    headers: {
      "Content-Type":"application/json"
    }
  })
  .then(resp => resp.text())
  .then(data => {
    console.log(data);
  })
}
