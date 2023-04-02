
// importing the necessary modules
const express = require('express')
const nodemailer = require('nodemailer')

// setting up the express router for defining the different api routes
const router = express.Router()

// importing the schema define file
const RoomBook = require("../roombook")


// setting up a route for checking the working
router.get('/', (req, res) => {
    res.send('CHECK')
})

// this post request gets called when the admin tries to book a new room
router.post('/data', async (req, res) => {

    const { room_number, email, type_room, start_time, end_time } = req.body

    // the check variable is used for tracking if there are any scheduling conflicts or not
    let check = 0;
    console.log(check);

    // creating a new room entry using the given parameters 
    const Room = new RoomBook({ room_number, email, type_room, start_time, end_time })

    // getting all the previous booking of the same room type and room number
    RoomBook.find({ type_room: type_room, room_number: room_number }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let st = new Date(start_time)
            let et = new Date(end_time)
            let datast = new Date(data[i].start_time)
            let dataet = new Date(data[i].end_time)

            // checking if there is a conflict in the room booking by checking the booking start and end dates
            if ((st < dataet) && (et > datast)) {
                check = 1
                break;
            }
        }

        // if there is no conflict found, then respond with success
        if (check == 0) {
            // saving the room to the database
            Room.save().then(() => { }) 

            // sending an email to the user that their booking is completed
            send_email(room_number, email, type_room, start_time, end_time);
            
            // sending a response back to the admin
            res.send({ success: true })
        }

        // in case of conflict send response of no success
        else {
            // sending a response to the admin that the booking didn't work
            res.send({ success: false })
        }
    })

    // the functionality of sending an email to the user is defined here
    function send_email(room_number, email, type_room, start_time, end_time) {
        
        // the email 
        const msg = {
            from: "scalerhotel@gmail.com",
            to: email,
            subject: "Congratulations! Room has been booked",
            text: `Your Room has been booked. The details are as follows:
                    Room Number: ${room_number}
                    Type Room: ${type_room}
                    Check-IN Time: ${start_time}
                    Check-OUT Time: ${end_time} `
        };
    
        // creating a transporter that will send the email
        nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "scalerhotel@gmail.com",
                pass: "xfsakjzoyutpmmcu"
            },
            port: 465,
            host: 'smtp.gmail.com'
        })
            .sendMail(msg, (err) => {
                if (err) {
                    return console.log('error occured', err);
                } else {
                    return console.log("email sent");
                }
            })
    }
    
})


// the /getData route is used for getting all the current bookings to be shown in the dashboard 
router.get('/getData', (req, res) => {
    console.log(req.query);
    if (req.query.start_time == '' || req.query.end_time == '') {
        delete req.query.start_time;
        delete req.query.end_time;
    }
    // running the query and sending the response
    RoomBook.find(req.query).then((data) => {
        res.send(data)
    })
})

// the /deleteItem route is used for deleting a particular record
router.post('/deleteItem', (req, res) => {
    // running the delte query
    RoomBook.deleteOne({ _id: req.body._id }).then(() => {
        res.end()
    })
})

// the /editItem route is used for getting the booking details in the edit window
router.post('/editItem', (req, res) => {
    console.log(req.body);
    // running the query
    RoomBook.find({ _id: req.body._id }).then((data) => {
        res.send(data)
    })
})

// the /editItemChange route is used for changing a particular booking
router.post('/editItemChange', async (req, res) => {
    const { room_number, email, type_room, start_time, end_time } = req.body
    console.log(req.body._id);
        // running the edit query
        RoomBook.updateOne({ _id: req.body._id }, {
        $set:
            req.body
    }).then((d) => {
        res.send()
    })
})

// exporting the module
module.exports = router
