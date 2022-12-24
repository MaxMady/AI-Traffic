const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json())
app.post('/bob', function (req, res) {
    console.log(req.body);
    const dir = req.body.id;
    if(dir == 0) { //Turn Right
        bt('a')
    } else if(dir == 1) {
        bt('b')
    } else {
        return console.log(`[ERROR] Unwanted characters found!`)
    }
  res.send('Hello World')
})

app.listen(3000)

// Import dependencies
const SerialPort = require('serialport')
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("COM3", {
    baudRate: 9600,
});

const parser = new Readline();
port.pipe(parser);

// Read the data from the serial port
parser.on("data", (line) => console.log(line));
async function bt(data) {
    port.write(data)
    
}

function log(content) {
    if(!content) return;
    console.log(content)
}

setTimeout(function() {
    console.log(`Sending Data...`)
    bt('a');
}, 5000)