const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];

// Regular expression for validating names (letters and spaces only)
const nameRegex = /^[a-zA-Z\s]+$/;

// Display records
function displayRecords() {
  recordList.innerHTML = '';
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" style="text-align:center;color:red">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${record.name}</td>
          <td>${record.age}</td>
          <td>${record.email}</td>
          <td><button onclick="editRecord(${index})">Edit</button></td>
          <td><button onclick="deleteRecord(${index})">Delete</button></td>
      `;
      recordList.appendChild(row);
    });
  }
}

// Add or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const email = emailInput.value.trim();
  const editIndex = parseInt(editIndexInput.value);

  // Validate name
  if (!nameRegex.test(name)) {
    alert('Name can only contain letters and spaces.');
    return;
  }

  if (name && age && email) {
    if (editIndex === -1) {
      // Add new record
      if (records.some(record => record.email.toLowerCase() === email.toLowerCase())) {
        alert('Email already exists.');
        return;
      }
      records.push({ name, age, email });
    } else {
      // Update existing record
      records[editIndex] = { name, age, email };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    displayRecords();
  }
});

// Edit a record
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  ageInput.value = recordToEdit.age;
  emailInput.value = recordToEdit.email;
  editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
  if (confirm('Are you sure you want to delete this record?')) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    displayRecords();
  }
}

// Initial display
displayRecords();
