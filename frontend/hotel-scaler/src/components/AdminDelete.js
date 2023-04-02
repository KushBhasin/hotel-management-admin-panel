import React, { useEffect, useState } from 'react'

function AdminDelete() {

    const deleteItem = async (id, start) => {
        // Send HTTP request for deletion of room booking
        const res = await fetch('/deleteItem', {
            // sending an post request here
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json",
                "Access-Control-Allow-Origin" : "*",
              },
            // sending the id in the http body, for identifying which record to delete
            body: JSON.stringify({
                _id : id
            })
        });


        const time = new Date(start);
        const curr = new Date();
        console.log(time,  curr);

        // checking how much refund the customer will get, based on the given conditions
        if(Math.floor(Math.abs(time - curr) / 36e5) >= 48) {
            alert('You will get your full REFUND');
        }else if(Math.floor(Math.abs(time - curr) / 36e5) >= 24){
            alert('You will get your half REFUND');
        }else{
            alert('You will get your no REFUND');
        }

    }

    
    return (<></>);
};

export default AdminDelete;
