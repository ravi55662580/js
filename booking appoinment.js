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