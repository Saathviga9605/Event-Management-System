// import React, { useState, useEffect } from 'react';
// import './admin_dashboard_styles.css';

// const AdminDashboard = () => {
//     const [upcomingEvents, setUpcomingEvents] = useState([]);
//     const [approvedEvents, setApprovedEvents] = useState([]);
//     const [pendingEvents, setPendingEvents] = useState([]);
//     const [eventHistory, setEventHistory] = useState([]);

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const fetchEvents = async () => {
//         const response = await fetch('http://127.0.0.1:5000/events');
//         const data = await response.json();
//         setUpcomingEvents(data.upcoming);
//         setApprovedEvents(data.approved);
//         setPendingEvents(data.pending);
//         setEventHistory(data.history);
//     };

//     const approveEvent = async (eventId) => {
//         await fetch(`http://127.0.0.1:5000/approve/${eventId}`, { method: 'POST' });
//         fetchEvents();
//     };

//     const deleteEvent = async (eventId) => {
//         await fetch(`http://127.0.0.1:5000/delete/${eventId}`, { method: 'DELETE' });
//         fetchEvents();
//     };

//     return (
//         <div>
//             <h1>Admin Dashboard</h1>
//             <h2>Upcoming Events</h2>
//             <ul>{upcomingEvents.map(event => <li key={event.id}>{event.title} - {event.date}</li>)}</ul>
            
//             <h2>To Be Approved</h2>
//             <ul>
//                 {pendingEvents.map(event => (
//                     <li key={event.id}>
//                         {event.title} - {event.date}
//                         <button onClick={() => approveEvent(event.id)}>Approve</button>
//                         <button onClick={() => deleteEvent(event.id)}>Reject</button>
//                     </li>
//                 ))}
//             </ul>

//             <h2>Approved Events</h2>
//             <ul>{approvedEvents.map(event => <li key={event.id}>{event.title} - {event.date}</li>)}</ul>

//             <h2>Event History</h2>
//             <ul>{eventHistory.map(event => <li key={event.id}>{event.title} - {event.date}</li>)}</ul>
//         </div>
//     );
// };

// export default AdminDashboard;
