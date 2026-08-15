const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 4000;

app.use(cors());

app.use(express.json());

let complaints = [];

let nextId = 1;

app.get("/complaints", (request, response) => {

    return response.json(complaints);

});

app.post("/complaints", (request, response) => {

    let {
        residentName,
        roomNumber,
        phone,
        category,
        description,
        priority
    } = request.body;


    if (
        !residentName ||
        !roomNumber ||
        !phone ||
        !category ||
        !description ||
        !priority
    ) {

        return response.status(400).json({
            message: "All fields are required"
        });

    }


    if (phone.length !== 10 || isNaN(phone)) {

        return response.status(400).json({
            message: "Phone number must contain 10 digits"
        });

    }


    let validCategories = [
        "Electricity",
        "Plumbing",
        "Water Supply",
        "Internet",
        "Housekeeping",
        "Maintenance",
        "Other"
    ];


    if (!validCategories.includes(category)) {

        return response.status(400).json({
            message: "Invalid complaint category"
        });

    }


    let validPriorities = [
        "Low",
        "Medium",
        "High",
        "Urgent"
    ];


    if (!validPriorities.includes(priority)) {

        return response.status(400).json({
            message: "Invalid priority"
        });

    }


    let complaint = {

        id: nextId,

        residentName: residentName,

        roomNumber: roomNumber,

        phone: phone,

        category: category,

        description: description,

        priority: priority,

        status: "Pending",

        date: new Date().toLocaleDateString()

    };


    complaints.push(complaint);
    nextId++;


    return response.status(201).json(complaint);

});

app.get("/complaints/:id", (request, response) => {

    let id = Number(request.params.id);

    let complaint = complaints.find(function(complaint) {
        return complaint.id === id;
    });

    if (!complaint) {
        return response.status(404).json({
            message: "Complaint not found"
        });
    }

    return response.json(complaint);

});

app.put("/complaints/:id", (request, response) => {

    let id = Number(request.params.id);


    let complaint = complaints.find(function(complaint) {
        return complaint.id === id;
    });


    if (!complaint) {

        return response.status(404).json({
            message: "Complaint not found"
        });

    }


    let {
        residentName,
        roomNumber,
        phone,
        category,
        description,
        priority
    } = request.body;


    if (
        !residentName ||
        !roomNumber ||
        !phone ||
        !category ||
        !description ||
        !priority
    ) {

        return response.status(400).json({
            message: "All fields are required"
        });

    }


    if (phone.length !== 10 || isNaN(phone)) {

        return response.status(400).json({
            message: "Phone number must contain 10 digits"
        });

    }

    let validCategories = [
    "Electricity",
    "Plumbing",
    "Water Supply",
    "Internet",
    "Housekeeping",
    "Maintenance",
    "Other"
];

if (!validCategories.includes(category)) {

    return response.status(400).json({
        message: "Invalid complaint category"
    });

}


let validPriorities = [
    "Low",
    "Medium",
    "High",
    "Urgent"
];

if (!validPriorities.includes(priority)) {

    return response.status(400).json({
        message: "Invalid priority"
    });

}


    complaint.residentName = residentName;

    complaint.roomNumber = roomNumber;

    complaint.phone = phone;

    complaint.category = category;

    complaint.description = description;

    complaint.priority = priority;


    return response.json(complaint);

});

app.patch("/complaints/:id/status", (request, response) => {

    let id = Number(request.params.id);

    let complaint = complaints.find(function(complaint) {
        return complaint.id === id;
    });

    if (!complaint) {

        return response.status(404).json({
            message: "Complaint not found"
        });

    }

    let newStatus = request.body.status;

    if (
        newStatus !== "Pending" &&
        newStatus !== "In Progress" &&
        newStatus !== "Resolved" &&
        newStatus !== "Cancelled"
    ) {

        return response.status(400).json({
            message: "Invalid status"
        });

    }

    complaint.status = newStatus;

    return response.json(complaint);

});

app.delete("/complaints/:id", (request, response) => {

    let id = Number(request.params.id);

    let complaintIndex = complaints.findIndex(function(complaint) {
        return complaint.id === id;
    });

    if (complaintIndex === -1) {

        return response.status(404).json({
            message: "Complaint not found"
        });

    }

    let deletedComplaint = complaints.splice(complaintIndex, 1);

    return response.json({
        message: "Complaint deleted successfully",
        complaint: deletedComplaint[0]
    });

});

app.listen(PORT, () => {
    console.log("Server Started");
});