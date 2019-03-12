const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const seats = require('./seats.json')
const app = express();

// Serve the static files from the React app
app.use(express.static('build'));
app.use(bodyParser.json())
let transporter = nodemailer.createTransport('smtps://apikey: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@smtp.sendgrid.net')
//NodeMailer
async function mailer(seatId, name, email) {

    // create reusable transporter object using the default SMTP transport
    let mailOptions = {
        from: 'satheeshsuriya@gmail.com',
        to: email,
        subject: "Your seat has booked", // Subject line
        text: "Your seat no " + seatId + ' has booked. Thanks', // plain text body
    };
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.info(info)
}


// An api endpoint that returns a short list of items
app.get('/api/get-seats', (req, res) => {
    res.json(seats);
});
app.post('/api/book', (req, res) => {
    const { id, name, email } = req.body;
    const index = seats.findIndex(seat => seat.id === req.body.id);
    if (seats[index].booked) {
        res.json({
            success: false,
            message: 'Seat No: ' + req.body.id + ' is unavailable. Refresh to see available seats'
        })
    }
    else {
        mailer(id, name, email).catch(err => console.error(err));
        seats[index].booked = true;
        res.json({
            success: true,
            message: 'Seat No: ' + req.body.id + ' has booked successfully. Check your mail'
        })

    }
});

app.post('/api/cancel', (req, res) => {
    const index = seats.findIndex(seat => seat.id === req.body.id);
    seats[index].booked = false;
    res.json({
        success: true
    })
})

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

const port = process.env.PORT || 5001;
app.listen(port);

console.log('App is listening on port ' + port);