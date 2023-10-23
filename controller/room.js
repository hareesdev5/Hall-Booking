

const room = [
    {
        roomId:"0",
        seatsAvailable:"4",
        amenities:"TV,AC",
        pricePerhr:"100"
    },
    {
        roomId:"1",
        seatsAvailable:"10",
        amenities:"TV,Non-AC",
        pricePerhr:"200"
    }
]

const booking = [{
    customer: "Harees",
    bookingDate: "23-11-2023",
    startTime: "10:00 am",
    endTime: "10:00 pm",
    roomId: "0",
    status: "booked",
},
{
    customer: "Itachi",
    bookingDate: "01-12-2023",
    startTime: "10:30 am",
    endTime: "10:30 pm",
    roomId: "1",
    status: "booked",
}]



const customer = [
    {
        name:'Harees',
        booking:[{
            customer: "Harees",
            bookingDate: "23/11/2023",
            startTime: "10:00 am",
            endTime: "10:00 pm",
            roomId: "0",
            status: "booked",
        }]
        
    },
    {
        name:'Itachi',
        booking:[{        
            customer: "Itachi",
            bookingDate: "01/12/2023",
            startTime: "10:30 am",
            endTime: "10:30 pm",
            roomId: "1",
            status: "booked",
        }]
    }
]

const getRoom = (req,res)=>{
    res.status(200).send({
        message:'Room List',
        count:room.length,
        room
    })
}

const createRoom = (req,res)=>{
    let data = req.body
    let filtererData = room.filter((e)=>e.roomId==data.roomId)
    if(filtererData.length===0){
        room.push(data)
        res.status(201).send({
            message:'Room created successfully'
        })
    }
    else{
        res.status(400).send({
            message:'Room Already Exists'
        })
    }
}

const createBooking = (req,res)=>{
    try{
        const id =req.params.id;
        let bookRoom = req.body;
        let date = new Date();
        let currentDate = date.toLocaleDateString();
        let roomExist = room.find((e)=>e.roomId === id)
        if(roomExist === undefined){
            res.status(400).send({
                message:"Room Does Not Exist.",
                RoomList:room
            })
        }
        let matchID = booking.filter((b)=>b.roomId === id)
        if(matchID.length===0)
        {
            let dateCheck = matchID.filter((m)=> m.bookingDate === bookRoom.bookingDate)
            if(dateCheck.lenght===0){
                let newID = "B"+(booking.length+1)
                let newBooking = {...bookRoom, bookingID:newID, roomdID:id, status:"booked", booked_On: currentDate}
                booking.push(newBooking)
                res.status(201).send({
                    message:"Hall Booked",
                    Booking:booking,
                    added:newBooking
                })
            }
            else{
                res.status(400).send({
                    message:"Hall already booked for this date, Choose another hall",
                    Bookings:booking
                })
            }
           
        }
        else{
            let newID = "B"+(bookings.length + 1);
            let newbooking = {...bookRoom, bookingID: newID, roomId:id, status:"booked",booked_On: currentDate}
            booking.push(newbooking);
            const customerdetails = customer.find(cust => 
              cust.name === newbooking.customer);
              if (customerdetails) {
                  customerdetails.booking.push(newbooking);
              } else {
                  customer.push({ name:newbooking.customer,bookings:[newbooking]});
              }
             res.status(201).send({
                message:"hall booked", 
                Bookings:booking, 
                added:newbooking});
    }
  }
    catch(error){
            res.status(400).send({
                message:"Error in Booking Room",
                Error:error,
                date:booking
            })
    }
}

const viewBooking = (req,res) => {
    const bookedRooms = booking.map(booking => {
        const {roomId ,Status,customer,bookingDate,startTime,endTime} = booking;
        return {roomId ,Status,customer,bookingDate,startTime,endTime} 
    });
    res.status(201).send({
        count:bookedRooms.length,
        Message:bookedRooms
        
})
}

const getCustomer = (req, res) => {
    let CBookings = customer.map(customer =>{
        let {name,booking} = customer;
        let CDetail = booking.map(booking =>{
            let {roomId,bookingDate,startTime,endTime} = booking;
            return{name,roomId,bookingDate,startTime,endTime}
        })
        return CDetail
    })
    res.send({CBookings})
  }

const getCustomerByName = (req,res)=>{
    let {name} = req.params
    let customers = customer.find(cust => cust.name === name)
    if(!customers){
        res.status(404).send({ error:'customer not found'})
        return
    }
    const CBookings = customers.booking.map(booking=>{
        const {customers,roomId,startTime,endTime,status,bookingDate,booked_On} = booking
        return {customers,roomId,startTime,endTime,status,bookingDate,booked_On}
    } )
    res.send({
        count : CBookings.length,
        message:`${name} booked ${count} time(s)`,
        customer:CBookings
    })
}
  






module.exports = {
    getRoom,
    createRoom,
    createBooking,
    viewBooking,
    getCustomer,
    getCustomerByName

}

