import React from 'react';
import classname from 'classnames'
import './ShowSeats.css'

const ShowSeats = ({ seats, seatSelect, selected }) => {
    
    if (seats.length) {
        return (
            <div className="show-seat">
                {
                    seats.map(seat => {
                        const bookedClassName = classname({
                            'self': seat.booked && selected === seat.id,
                            'booked': seat.booked && selected !== seat.id,
                            "active":selected === seat.id , 
                            "show-seat__seat":true
                          });
                        return (
                            <div key={seat.id} className={bookedClassName} onClick={() => seatSelect(seat.id)}>
                                <p>{seat.id}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div>
            Loading seat selection ...
        </div>
    )
}

export default ShowSeats;