
// importing react hooks
import React, { useEffect, useState } from 'react'

// importing the styling
import '../ViewData.css';


function ViewData() {

    // creating states 
    const [room_number, setroomNumber] = useState('');
    const [email, setEmail] = useState('');
    const [type_room, setTypeRoom] = useState('A');
    const [start_time, setcheckIn] = useState(new Date());
    const [end_time, setcheckOut] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [currentRoom, setCurrentRoom] = useState(100);
    const [_id, setId] = useState();
    const [data, setData] = useState([])

    // calculating the price of the room
    useEffect(() => {
        const checkIn = new Date(start_time)
        const checkOut = new Date(end_time)
        console.log(start_time, end_time);
        console.log(Math.floor(Math.abs(checkIn - checkOut) / 36e5));
        setPrice(currentRoom * Math.floor(Math.abs(checkIn - checkOut) / 36e5))
    }, [start_time, end_time, type_room])

    // getting all the entries
    useEffect(() => {
        callData()
    }, [])

    // room numbers based on room types
    const room_number_arrA = [
        101,
        102,
    ];
    const room_number_arrB = [
        201,
        202,
        203,
    ];
    const room_number_arrC = [
        301,
        302,
        303,
        304,
        305
    ];

    // all room numbers
    const room_number_arr = [
        101,
        102,
        201,
        202,
        203,
        301,
        302,
        303,
        304,
        305
    ];


    let type;
    let options;

    // setting the room number options based on room type
    if (type_room == 'A') {
        type = room_number_arrA
    } else if (type_room == 'B')
        type = room_number_arrB
    else
        type = room_number_arrC

    if (type) {
        options = type.map((el) => <option value={el}>{el}</option>)
    }


    // handling changes to room booking entries

    const handleRoomNumber = (e) => { setroomNumber(e.target.value) }

    const handleEmail = (e) => { setEmail(e.target.value) }

    const changeTypeRoom = (e) => {
        if (e == 'A')
            setCurrentRoom(100)
        if (e == 'B')
            setCurrentRoom(80)
        if (e == 'C')
            setCurrentRoom(50)
        setTypeRoom(e);
    }

    const handleTypeRoom = (e) => {
        changeTypeRoom(e.target.value)
    };

    const handleCheckIn = (e) => {
        setcheckIn(e.target.value);
        changeTypeRoom(type_room)
    };

    const handleCheckOut = (e) => {
        setcheckOut(e.target.value);
        changeTypeRoom(type_room)
    };


    const room_type = [
        'A', 'B', 'C'
    ]


    // getting all the room booking entries
    const callData = async () => {
        document.querySelector('table').style.display = 'none'
        document.querySelector('.loading').style.display = 'block'
        const formData = new FormData(document.querySelector('form'));
        const asString = new URLSearchParams(formData).toString();
        
        // sending the get request for fetching all the entries
        const res = await fetch('/getData?' + asString, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        const details = await res.json()
        setData(details)
        document.querySelector('.loading').style.display = 'none'
        document.querySelector('table').style.display = 'block'
    }


    // the deleteItem function is called whenever a record is deleted
    const deleteItem = async (id, start) => {
        // sends the http request to delete from db
        const res = await fetch('/deleteItem', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                _id: id
            })
        })

        const time = new Date(start)
        const curr = new Date()
        console.log(time, curr);

        // calculating the refund amount based on the time before checkin
        if (Math.floor(Math.abs(time - curr) / 36e5) >= 48) {
            alert('You will get your full REFUND')
        } else if (Math.floor(Math.abs(time - curr) / 36e5) >= 24) {
            alert('You will get your half REFUND')
        } else {
            alert('You will get your no REFUND')
        }

        callData()
    }

    // get all the data for the room booking, to show in the editing window
    const editItem = async (id) => {
        document.getElementById('editItem').style.top = '0'
        console.log(id);
        const res = await fetch('/editItem', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                _id: id
            })
        })

        // updating all the states, based on the respose from get request
        const details = await res.json()
        setEmail(details[0].email)
        setTypeRoom(details[0].type_room)
        setcheckIn(details[0].start_time)
        setcheckOut(details[0].end_time)
        setroomNumber(details[0].room_number)
        setId(details[0]._id)
    }

    // hiding the edit window, and only showing it only when edit option is selected
    const hideEdit = () => {
        document.querySelector('#editItem').style.top = '-100vh'
    }

    // handling the submit of editing the room booking
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/editItemChange', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id, room_number, email, type_room, start_time, end_time
            })
        });
        callData()
    }

    const exp_type = () => {
        if(document.querySelector('.type_room_col').style.height != 'fit-content')
        document.querySelector('.type_room_col').style.height = 'fit-content'
        else
        document.querySelector('.type_room_col').style.height = '0'
    }

    const exp_number = () => {
        if(document.querySelector('.room_no_col').style.height != 'fit-content')
        document.querySelector('.room_no_col').style.height = 'fit-content'
        else
        document.querySelector('.room_no_col').style.height = '0'
    }

    
    return (
        <div className='content'>

            {/* filter options for filtering through all the entries of room bookings */}
            <form>
                <h4><i class="fa-solid fa-filter"></i> Filter</h4>

                {/* filter by type of room */}
                <h3 onClick={exp_type}><i class="fa-solid fa-sort-down" ></i>Type Of Room</h3>
                <div className='type_room_col'>
                    {room_type.map((item) =>
                        <span className='filter_item'>
                            <input type="checkbox" value={item} name='type_room' onChange={callData} />
                            <label>{item}</label>
                        </span>)}
                </div>

                {/* filter by room numbers */}
                <h3 onClick={exp_number}><i class="fa-solid fa-sort-down"></i>Room Number</h3>
                <div className='room_no_col'>
                    {room_number_arr.map((item) =>
                        <span className='filter_item'>
                            <input type="checkbox" value={item} name='room_number' onChange={callData} />
                            <label>{item}</label>
                        </span>)}
                </div>

                {/* filter by checkin time */}
                <h3><i class="fa-solid fa-sort-down"></i>Starting Time</h3>
                <span className='filter_item'>
                    <input type="datetime-local" name='start_time' onChange={callData} />
                </span>
                {/* filter by checkout time */}
                <h3><i class="fa-solid fa-sort-down"></i>Ending Time</h3>
                <span className='filter_item'>
                    <input type="datetime-local" name='end_time' onChange={callData} />
                </span>
            </form>

            {/* the window for editing a room booking */}
            <div id='editItem'>
                <i class="fa-solid fa-xmark" onClick={hideEdit}></i>
                <h5>Edit Item</h5>
                <form>
                    <input type="hidden" name="_id" value={_id} />
                    <span>
                        <label className="label">Email ID</label>
                        <input onChange={handleEmail} className="input"
                            value={email} type="text" />
                    </span>

                    <div>
                        <span>
                            {/* type of room select */}
                            <label className="label">Type Of Room</label>
                            <select onChange={handleTypeRoom} value={type_room}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </span>

                        <span>
                            {/* room number select */}
                            <label className="label">Room Number</label>
                            <select onChange={handleRoomNumber} value={room_number}>
                                {options}
                            </select>
                        </span>
                    </div>

                    {/* checkin and checkout time select */}
                    <div>
                        <span>
                            <label className="label">Check IN</label>
                            <input onChange={handleCheckIn} className="input"
                                value={start_time} type="datetime-local" id='dt' />
                        </span>
                        <span>
                            <label className="label">Check OUT</label>
                            <input onChange={handleCheckOut} className="input"
                                value={end_time} type="datetime-local" />
                        </span>
                    </div>

                    {/* shows the updated price */}
                    <h4>Total Price : {price}</h4>

                    {/* submit button */}
                    <input className="btn" type="submit" value='Update Room' onClick={handleEditSubmit} />
                </form>
            </div>

            {/* shows the loading animation */}
            <span className='loading'></span>

            {/* shows the table of all current room bookings */}
            <table>
                <tr>
                    <th>Email ID</th>
                    <th>Room Number</th>
                    <th>Type Of Room</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Delete Booking</th>
                    <th>Edit Booking</th>
                </tr>
                {/* show a room booking entry for all the returned db records */}
                {data.map(elem =>
                    <tr>
                        <td>{elem.email}</td>
                        <td>{elem.room_number}</td>
                        <td>{elem.type_room}</td>
                        <td>{elem.start_time}</td>
                        <td>{elem.end_time}</td>
                        {/* the delete button calls the deleteItem function for deleting the booking */}
                        <td className='buttons delete'><i onClickCapture={() => deleteItem(`${elem._id}`, `${elem.start_time}`)} class="fa-regular fa-trash-can"></i></td>
                        {/* the edit button calls the editItem function for changing the booking */}
                        <td className='buttons edit'><i onClickCapture={() => editItem(`${elem._id}`)} class="fa-regular fa-pen-to-square"></i></td>
                    </tr>
                )}

            </table>

        </div>
    )
}

export default ViewData;
