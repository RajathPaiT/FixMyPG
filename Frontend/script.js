async function getComplaints() {

    try {

        let response = await fetch(
            "http://localhost:4000/complaints"
        );

        let data = await response.json();

        if (!response.ok) {

            alert(data.message || "Unable to get complaints");

            return;

        }

        complaints = data;

        displayComplaints();

    }

    catch (error) {

        console.log(error);

        alert("Unable to connect to the server.");

    }

}

let complaints = [];

let editingId = null;

function showForm() {
    document.getElementById("complaintForm").style.display = "block";
}

function hideForm() {
    document.getElementById("complaintForm").style.display = "none";
}

document.getElementById("form").addEventListener("submit", async function(event) {

    event.preventDefault();

    let residentName = document.getElementById("residentName").value;
    let roomNumber = document.getElementById("roomNumber").value;
    let phone = document.getElementById("phone").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;
    let priority = document.getElementById("priority").value;


    if (
        residentName === "" ||
        roomNumber === "" ||
        phone === "" ||
        category === "" ||
        description === "" ||
        priority === ""
    ) {

        alert("Please fill all the fields.");

        return;

    }

    if (phone.length !== 10 || isNaN(phone)) {

    alert("Phone number must contain exactly 10 digits.");

    return;

    }

    if (description.length < 10) {

    alert("Description must contain at least 10 characters.");

    return;

    }


    let complaint = {

        residentName: residentName,
        roomNumber: roomNumber,
        phone: phone,
        category: category,
        description: description,
        priority: priority

    };


    let response;


    // EDIT EXISTING COMPLAINT

    if (editingId !== null) {

        response = await fetch(
            `http://localhost:4000/complaints/${editingId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(complaint)
            }
        );

    }


    // CREATE NEW COMPLAINT

    else {

        response = await fetch(
            "http://localhost:4000/complaints",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(complaint)
            }
        );

    }


    let data = await response.json();


    if (response.ok) {

        alert(
            editingId !== null
                ? "Complaint updated successfully!"
                : "Complaint submitted successfully!"
        );

        editingId = null;

        document.getElementById("form").reset();

        hideForm();

        getComplaints();

    }

    else {

        alert(data.message);

    }

});

function displayComplaints() {

    let complaintList = document.getElementById("complaintList");

    complaintList.innerHTML = "";

    if (complaints.length === 0) {

    complaintList.innerHTML = `
        <h3>No complaints found.</h3>
    `;

    return;

    }

    let searchText = document.getElementById("search").value.toLowerCase();

    let status = document.getElementById("statusFilter").value;

    let category = document.getElementById("categoryFilter").value;

    for (let complaint of complaints) {

        if (
            !complaint.residentName.toLowerCase().includes(searchText) &&
            !complaint.roomNumber.toLowerCase().includes(searchText) &&
            !complaint.category.toLowerCase().includes(searchText)
        ) {
            continue;
        }

        if (status !== "All" && complaint.status !== status) {
            continue;
        }

        if (category !== "All" && complaint.category !== category) {
            continue;
        }

        complaintList.innerHTML += `

            <div class="complaint">

                <h3>Complaint #${complaint.id}</h3>

                <p>
                    <b>Resident:</b>
                    ${complaint.residentName}
                </p>

                <p>
                    <b>Room:</b>
                    ${complaint.roomNumber}
                </p>

                <p>
                    <b>Category:</b>
                    ${complaint.category}
                </p>

                <p>
                    <b>Priority:</b>
                    ${complaint.priority}
                </p>

                <p>
                    <b>Status:</b>
                    <span class="status">
                        ${complaint.status}
                     </span>
                </p>

                <p>
                    <b>Description:</b>
                    ${complaint.description}
                </p>

                <p>
                    <b>Date:</b>
                    ${complaint.date}
                </p>

                <button onclick="viewComplaint(${complaint.id})">
                    View
                </button>

                <button onclick="editComplaint(${complaint.id})">
                    Edit
                </button>

                <button onclick="deleteComplaint(${complaint.id})">
                    Delete
                </button>

                <button onclick="changeStatus(${complaint.id})">
                    Change Status
                </button>

            </div>

        `;
    }
}

async function viewComplaint(id) {

    let response = await fetch(
        `http://localhost:4000/complaints/${id}`
    );

    let complaint = await response.json();

    if (response.ok) {

        alert(
            "Complaint ID: " + complaint.id +
            "\nResident: " + complaint.residentName +
            "\nRoom: " + complaint.roomNumber +
            "\nPhone: " + complaint.phone +
            "\nCategory: " + complaint.category +
            "\nPriority: " + complaint.priority +
            "\nStatus: " + complaint.status +
            "\nDescription: " + complaint.description +
            "\nDate: " + complaint.date
        );

    }

    else {

        alert(complaint.message);

    }

}

async function deleteComplaint(id) {

    let confirmation = confirm(
        "Are you sure you want to delete this complaint?"
    );


    if (!confirmation) {

        return;

    }


    let response = await fetch(
        `http://localhost:4000/complaints/${id}`,
        {
            method: "DELETE"
        }
    );


    let data = await response.json();


    if (response.ok) {

        alert("Complaint deleted successfully!");

        getComplaints();

    }

    else {

        alert(data.message);

    }

}

function editComplaint(id) {

    let complaint = complaints.find(function(complaint) {
        return complaint.id === id;
    });

    editingId = id;

    document.getElementById("residentName").value = complaint.residentName;

    document.getElementById("roomNumber").value = complaint.roomNumber;

    document.getElementById("phone").value = complaint.phone;

    document.getElementById("category").value = complaint.category;

    document.getElementById("description").value = complaint.description;

    document.getElementById("priority").value = complaint.priority;

    showForm();

}

document.getElementById("search").addEventListener("input", displayComplaints);

document.getElementById("statusFilter").addEventListener("change", displayComplaints);

document.getElementById("categoryFilter").addEventListener("change", displayComplaints);

async function changeStatus(id) {

    let newStatus = prompt(
        "Enter status:\nPending\nIn Progress\nResolved\nCancelled"
    );


    if (
        newStatus !== "Pending" &&
        newStatus !== "In Progress" &&
        newStatus !== "Resolved" &&
        newStatus !== "Cancelled"
    ) {

        alert("Invalid status");

        return;

    }


    let response = await fetch(
        `http://localhost:4000/complaints/${id}/status`,
        {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: newStatus
            })

        }
    );


    let data = await response.json();


    if (response.ok) {

        alert("Status updated successfully!");

        getComplaints();

    }

    else {

        alert(data.message);

    }

}

getComplaints();