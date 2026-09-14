const patientName = document.getElementById("patientName");
const patientAge = document.getElementById("patientAge");
const patientDisease = document.getElementById("patientDisease");

const addPatientBtn = document.getElementById("addPatientBtn");
const patientTableBody = document.getElementById("patientTableBody");

let patients = [];
let patientId = 1;


// Add Patient
addPatientBtn.addEventListener("click", function () {

    const name = patientName.value.trim();
    const age = patientAge.value;
    const disease = patientDisease.value.trim();

    if (name === "" || age === "" || disease === "") {
        alert("Please fill all fields.");
        return;
    }

    const patient = {
        id: patientId++,
        name: name,
        age: age,
        disease: disease
    };

    patients.push(patient);

    displayPatients();

    patientName.value = "";
    patientAge.value = "";
    patientDisease.value = "";
});


// Display Patients
function displayPatients() {

    patientTableBody.innerHTML = "";

    patients.forEach(function (patient) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.disease}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deletePatient(${patient.id})">
                    Delete
                </button>
            </td>
        `;

        patientTableBody.appendChild(row);
    });
}


// Delete Patient
function deletePatient(id) {

    patients = patients.filter(function (patient) {
        return patient.id !== id;
    });

    displayPatients();
}