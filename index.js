const express = require('express')
const app = express()
const parkings = require('./parkings.json')
const reservations = require('./reservations.json')
app.use(express.json())

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

/* ------------------------------------------------------------------------------parkings */
app.get('/parkings', (req, res) => {
    res.status(200).json(parkings)
})
app.post('/parkings', (req, res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})
app.put('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name = req.body.name,
        parking.city = req.body.city,
        parking.type = req.body.type,
        res.status(200).json(parking)
})

app.get('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})
app.delete('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    if (parkings.indexOf(parking) == -1 ){return;}
    parkings.splice(parkings.indexOf(parking), 1)
    res.status(200).json(parkings)
})
/* --------------------------------------------------------------------------Reservation */
app.get('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id)
    const reservation = reservations.filter(reservations => reservations.parkingId === id)
    res.status(200).json(reservation)
})
app.get('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id)
    const idReservation = parseInt(req.params.idReservation)
    const reservation = reservations.find(reservations => reservations.id === idReservation)
    if (reservation.parkingId != id) { return }
    res.status(200).json(reservation)
})
app.post('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id)
    req.body.parkingId = id;
    reservations.push(req.body);
    res.status(200).json(reservations)
})
app.put('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id)
    const idReservation = parseInt(req.params.idReservation)
    let reservation = reservations.find(reservation => reservation.id === idReservation)

    if (req.body.parking != undefined) {
        reservation.parking = req.body.parking;
    }
    if (req.body.parkingId != undefined) {
        reservation.parkingId = req.body.parkingId;
    }
    if (req.body.city != undefined) {
        reservation.city = req.body.city;
    }
    if (req.body.vehicle != undefined) {
        reservation.vehicle = req.body.vehicle;
    }
    if (req.body.licensePlate != undefined) {
        reservation.licensePlate = req.body.licensePlate;
    }
    if (req.body.checkin != undefined) {
        reservation.checkin = req.body.checkin;
    }
    if (req.body.checkout != undefined) {
        reservation.checkout = req.body.checkout;
    }

    res.status(200).json(reservation)
})

app.delete('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id)
    const idReservation = parseInt(req.params.idReservation)
    let reservation = reservations.find(reservation => reservation.id === idReservation)
    if(reservations.indexOf(reservation) == -1 || reservation.parkingId != id){return};
    reservations.splice(reservations.indexOf(reservation), 1)
    res.status(200).json(parkings)
})
