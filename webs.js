
const awsIot = require('aws-iot-device-sdk');
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Light led'))

const device = awsIot.device({
  keyPath: 'certs2/819fd596d6-private.pem.key',
  certPath: 'certs2/819fd596d6-certificate.pem.crt',
  caPath: 'certs2/root-CA.crt',
  region: 'sa-east-1a',
  debug: true,
  clientId: 'server-prod1',
  host: 'a1r14fdellvy2f-ats.iot.sa-east-1.amazonaws.com'
});

device.on('connect', function() {
  console.log('Connected');
});

app.get('/light/:state', function (req, res) {
    console.log("GET request")
    const state = req.params.state;

    const data = { light: state};
    console.log(data);
    device.publish('LED', JSON.stringify(data));

    res.send(data);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
