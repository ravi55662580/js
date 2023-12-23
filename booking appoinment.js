async function bookAppointment() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    try {
      const response = await fetch('https://crudcrud.com/api/d61c0e2c76eb40daa4c0fd9ef35a6b51/appoinmentData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time }),
      });

      const data = await response.json();
      console.log('Appointment booked successfully:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
async function fetchAndDisplayUserDetails() {
    try {
      // Make a GET request to retrieve user details
      const response = await fetch('https://crudcrud.com/api/d61c0e2c76eb40daa4c0fd9ef35a6b51/appoinmentData');
      const userDetails = await response.json();

      // Display user details on the website
      displayUserDetails(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  // Function to display user details on the website
function displayUserDetails(userDetails) {
    const userDetailsContainer = document.getElementById('userDetails');
    userDetailsContainer.innerHTML = ''; // Clear previous content

    if (userDetails && userDetails.length > 0) {
      const userDetailsList = document.createElement('ul');

      userDetails.forEach(user => {
        const listItem = document.createElement('li');

        // Display user details
        listItem.textContent = `Date: ${user.date}, Time: ${user.time}`;

        // delete icon
        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '&#x274C;'; // Unicode for "cross mark" character
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.onclick = () => deleteAppointment(user._id);
        
        // edit icon
        const editIcon = document.createElement('span');
        editIcon.innerHTML = '&#x270E;'; // Unicode for "pencil" character
        editIcon.style.cursor = 'pointer';
        editIcon.onclick = () => populateEditForm(user);


        // Append delete icon to the list item
        listItem.appendChild(deleteIcon);
        listItem.appendChild(editIcon);

        // Append list item to the list
        userDetailsList.appendChild(listItem);
      });

      // Append the list to the container
      userDetailsContainer.appendChild(userDetailsList);
    } else {
      userDetailsContainer.textContent = 'No user details found.';
    }
  }

  // Function to delete an appointment
async function deleteAppointment(appointmentId) {
    try {
      // Send a DELETE request to delete the appointment
      await fetch(`https://crudcrud.com/api/d61c0e2c76eb40daa4c0fd9ef35a6b51/appoinmentData/${appointmentId}`, {
        method: 'DELETE',
      });

      console.log('Appointment deleted successfully:', appointmentId);

      // Fetch and display updated user details after deletion
      fetchAndDisplayUserDetails();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  }

// Function to populate the edit form with user details
function populateEditForm(user) {
    // Create date object from ISO format
    const dateObject = new Date(user.date);
  
    // Get hours and minutes as separate strings
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  
    // Format time as "HH:mm"
    const formattedTime = `${hours}:${minutes}`;
  
    // Get date in "yyyy-MM-dd" format
    const formattedDate = dateObject.toISOString().split('T')[0];
  
    document.getElementById('date').value = formattedDate;
    document.getElementById('time').value = formattedTime;
  }

  // Fetch and display user details when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayUserDetails);

