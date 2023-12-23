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
        listItem.textContent = `Date: ${user.date}, Time: ${user.time}`;
        userDetailsList.appendChild(listItem);
      });

      userDetailsContainer.appendChild(userDetailsList);
    } else {
      userDetailsContainer.textContent = 'No user details found.';
    }
  }
