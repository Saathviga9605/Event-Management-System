// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './admin_dashboard_styles.css';
// import ssnLogo from './ssnLogo.png';
// import ssnCampus from './ssn_campus.jpeg';

// const Admin = () => {
//     const [activeTab, setActiveTab] = useState('upcoming');
//     const [showBanner, setShowBanner] = useState(true);
//     const [upcomingEvents, setUpcomingEvents] = useState([]);
//     const [approvedEvents, setApprovedEvents] = useState([]);
//     const [pendingEvents, setPendingEvents] = useState([]);
//     const [eventHistory, setEventHistory] = useState([]);
//     const [selectedEvent, setSelectedEvent] = useState(null);

//     const messages = [
//         "⏳ Hackathon registrations closing soon!",
//         "🔔 4 events left for approval",
//         "📅 Web Dev Workshop tomorrow!"
//     ];

//     useEffect(() => {
//         axios.get('http://127.0.0.1:5000/events')
//             .then(response => {
//                 setUpcomingEvents(response.data.upcoming || []);
//                 setApprovedEvents(response.data.approved || []);
//                 setPendingEvents(response.data.pending || []);
//                 setEventHistory(response.data.history || []);
//             })
//             .catch(error => console.error("Error fetching events:", error));
//     }, []);

//     useEffect(() => {
//         document.body.style.background = "#ffffff";
//         const handleScroll = () => {
//             setShowBanner(window.scrollY <= 100);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const approveEvent = (eventId) => {
//         axios.post('http://127.0.0.1:5000/approve/${eventId}')
//             .then(response => {
//                 setUpcomingEvents(response.data.upcoming || []);
//                 setApprovedEvents(response.data.approved || []);
//                 setPendingEvents(response.data.pending || []);
//                 setEventHistory(response.data.history || []);
//             })
//             .catch(error => console.error("Error approving event:", error));
//     };

//     const deleteEvent = (eventId) => {
//         axios.delete('http://127.0.0.1:5000/delete/${eventId}')
//             .then(response => {
//                 setUpcomingEvents(response.data.upcoming || []);
//                 setApprovedEvents(response.data.approved || []);
//                 setPendingEvents(response.data.pending || []);
//                 setEventHistory(response.data.history || []);
//             })
//             .catch(error => console.error("Error deleting event:", error));
//     };

//     return (
//         <div className="admin-container">
//             <nav className="navbar">
//                 <div className="navbar-left">
//                     <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
//                 </div>
//                 <div className="navbar-right">
//                     <a href="#" className="nav-link">Home</a>
//                     <a href="#" className="nav-link">About SSN</a>
//                     <a href="#" className="nav-link">Events</a>
//                     <input type="text" placeholder="Search..." className="search-bar" />
//                     <button className="logout-button">Logout</button>
//                 </div>
//             </nav>

//             {showBanner && (
//                 <div className="image-banner">
//                     <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
//                     <div className="banner-text">ADMIN DASHBOARD</div>
//                 </div>
//             )}

//             {/* News Ticker */}
//             <div className="news-ticker">
//     <marquee behavior="scroll" direction="left" scrollamount="8" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
//         🚀 February 28, 2025: One Day National Workshop on “Demystifying MEAN Stack Development” &nbsp;&nbsp;
//         ⏳ Hackathon registrations closing soon! &nbsp;&nbsp;
//         🔔 4 events left for approval &nbsp;&nbsp;
//         📅 Web Dev Workshop tomorrow!
//     </marquee>
// </div>


//             <div className="dashboard-container">
//                 <div className="sidebar">
//                     <button className={activeTab === 'upcoming' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('upcoming')}>Upcoming Events</button>
//                     <button className={activeTab === 'pending' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('pending')}>Pending Approval</button>
//                     <button className={activeTab === 'approved' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('approved')}>Approved Events</button>
//                     <button className={activeTab === 'history' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('history')}>Event History</button>
//                 </div>

//                 <div className="main-content">
//                     {activeTab === 'upcoming' && (
//                         <div className="event-list">
//                             <h2>Upcoming Events</h2>
//                             {upcomingEvents.length > 0 ? (
//                                 upcomingEvents.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                     </div>
//                                 ))
//                             ) : <p>No upcoming events.</p>}
//                         </div>
//                     )}

//                     {activeTab === 'pending' && (
//                         <div className="event-list">
//                             <h2>Pending Approval</h2>
//                             {pendingEvents.length > 0 ? (
//                                 pendingEvents.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                         <button className="approve-button" onClick={() => approveEvent(event.id)}>Approve</button>
//                                         <button className="reject-button" onClick={() => deleteEvent(event.id)}>Reject</button>
//                                     </div>
//                                 ))
//                             ) : <p>No pending events.</p>}
//                         </div>
//                     )}

//                     {activeTab === 'approved' && (
//                         <div className="event-list">
//                             <h2>Approved Events</h2>
//                             {approvedEvents.length > 0 ? (
//                                 approvedEvents.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                     </div>
//                                 ))
//                             ) : <p>No approved events.</p>}
//                         </div>
//                     )}

//                     {activeTab === 'history' && (
//                         <div className="event-list">
//                             <h2>Event History</h2>
//                             {eventHistory.length > 0 ? (
//                                 eventHistory.map(event => (
//                                     <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                                         <p>{event.title} - {event.date}</p>
//                                     </div>
//                                 ))
//                             ) : <p>No past events.</p>}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {selectedEvent && (
//                 <div className="popup-modal">
//                     <div className="modal-content">
//                         <h2>{selectedEvent.title}</h2>
//                         <p><strong>Agenda:</strong> {selectedEvent.agenda}</p>
//                         <p><strong>Category:</strong> {selectedEvent.category}</p>
//                         <p><strong>Date:</strong> {new Date(selectedEvent.eventDate).toLocaleString()}</p>
//                         <p><strong>Format:</strong> {selectedEvent.format}</p>
//                         <p><strong>Payment Options:</strong> {selectedEvent.paymentOptions}</p>
//                         <p><strong>Registration Link:</strong> <a href={selectedEvent.registrationLink} target="_blank" rel="noopener noreferrer">Click Here</a></p>
//                         <p><strong>Ticket Price:</strong> ₹{selectedEvent.ticketPrice}</p>
//                         <p><strong>Venue:</strong> {selectedEvent.venue}</p>
//                         <button onClick={() => setSelectedEvent(null)}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Admin;


// import React, { useState, useEffect } from "react";
// import { getEvents } from "./firebase";
// import "./admin_dashboard_styles.css";
// import ssnLogo from "./ssnLogo.png";
// import ssnCampus from "./ssn_campus.jpeg";

// const App = () => {
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [showBanner, setShowBanner] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   // Fetch events from Firestore
//   useEffect(() => {
//     const fetchEvents = async () => {
//       const eventData = await getEvents();
//       const updatedEvents = eventData.map(event => assignStatus(event));
//       setEvents(updatedEvents);
//     };
//     fetchEvents();
//   }, []);

//   // Handle banner visibility
//   useEffect(() => {
//     document.body.style.background = "#ffffff";
//     const handleScroll = () => setShowBanner(window.scrollY <= 100);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Assign status based on event date
//   const assignStatus = (event) => {
//     const today = new Date();
//     const eventDate = new Date(event.eventDate);
//     const diffInDays = Math.floor((today - eventDate) / (1000 * 60 * 60 * 24));
    
//     if (diffInDays < 0) return { ...event, status: "upcoming" };
//     if (diffInDays === 0) return { ...event, status: "pending" };
//     if (diffInDays <= 7) return { ...event, status: "approved" };
//     return { ...event, status: "history" };
//   };

//   // Categorize events dynamically
//   const upcomingEvents = events.filter(event => event.status === "upcoming");
//   const pendingEvents = events.filter(event => event.status === "pending");
//   const approvedEvents = events.filter(event => event.status === "approved");
//   const eventHistory = events.filter(event => event.status === "history");

//   return (
//     <div className="admin-container">
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
//         </div>
//         <div className="navbar-right">
//           <a href="#" className="nav-link">Home</a>
//           <a href="#" className="nav-link">About SSN</a>
//           <a href="#" className="nav-link">Events</a>
//           <input type="text" placeholder="Search..." className="search-bar" />
//           <button className="logout-button">Logout</button>
//         </div>
//       </nav>

//       {showBanner && (
//         <div className="image-banner">
//           <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
//           <div className="banner-text">ADMIN DASHBOARD</div>
//         </div>
//       )}

//       <div className="dashboard-container">
//         <div className="sidebar">
//           <button className={activeTab === "upcoming" ? "sidebar-btn active" : "sidebar-btn"} onClick={() => setActiveTab("upcoming")}>Upcoming Events</button>
//           <button className={activeTab === "pending" ? "sidebar-btn active" : "sidebar-btn"} onClick={() => setActiveTab("pending")}>Pending Approval</button>
//           <button className={activeTab === "approved" ? "sidebar-btn active" : "sidebar-btn"} onClick={() => setActiveTab("approved")}>Approved Events</button>
//           <button className={activeTab === "history" ? "sidebar-btn active" : "sidebar-btn"} onClick={() => setActiveTab("history")}>Event History</button>
//         </div>

//         <div className="main-content">
//           {["upcoming", "pending", "approved", "history"].map(tab => (
//             activeTab === tab && (
//               <div className="event-list" key={tab}>
//                 <h2>{tab.charAt(0).toUpperCase() + tab.slice(1)} Events</h2>
//                 {(tab === "upcoming" ? upcomingEvents :
//                   tab === "pending" ? pendingEvents :
//                   tab === "approved" ? approvedEvents :
//                   eventHistory).length > 0 ? (
//                     (tab === "upcoming" ? upcomingEvents :
//                       tab === "pending" ? pendingEvents :
//                       tab === "approved" ? approvedEvents :
//                       eventHistory).map(event => (
//                         <div key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
//                           <p>{event.title} - {new Date(event.eventDate).toLocaleDateString()}</p>
//                         </div>
//                       ))
//                   ) : <p>No events available.</p>}
//               </div>
//             )
//           ))}
//         </div>
//       </div>

//       {selectedEvent && (
//         <div className="popup-modal">
//           <div className="modal-content">
//             <h2>{selectedEvent.title}</h2>
//             <p><strong>Agenda:</strong> {selectedEvent.agenda}</p>
//             <p><strong>Category:</strong> {selectedEvent.category}</p>
//             <p><strong>Date:</strong> {new Date(selectedEvent.eventDate).toLocaleString()}</p>
//             <p><strong>Format:</strong> {selectedEvent.format}</p>
//             <p><strong>Payment:</strong> {selectedEvent.paymentOptions}</p>
//             <p><strong>Price:</strong> ₹{selectedEvent.ticketPrice}</p>
//             <p><strong>Venue:</strong> {selectedEvent.venue}</p>
//             <button onClick={() => setSelectedEvent(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;




import React, { useState, useEffect } from "react";
import { getEvents, approveEvent, deleteEvent } from "./firebase";
import "./admin_dashboard_styles.css";
import ssnLogo from "./ssnLogo.png";
import ssnCampus from "./ssn_campus.jpeg";


const App = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [showBanner, setShowBanner] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventData = await getEvents();
      const uniqueEvents = Array.from(new Map(eventData.map(event => [event.id, event])).values());
      setEvents(uniqueEvents.map(event => assignStatus(event)));
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    document.body.style.background = "#ffffff";
    const handleScroll = () => setShowBanner(window.scrollY <= 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const assignStatus = (event) => {
    const eventDate = new Date(event.eventDate);
    const today = new Date();
    if (event.status !== "approved") {
      return { ...event, status: "pending" };
    }
    return eventDate < today ? { ...event, status: "history" } : { ...event, status: "upcoming" };
  };

  const handleApprove = async (eventId) => {
    await approveEvent(eventId);
    setEvents(events.map(event => event.id === eventId ? { ...event, status: "approved" } : event));
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
        </div>
        <div className="navbar-right">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">About SSN</a>
          <a href="#" className="nav-link">Events</a>
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="logout-button">Logout</button>
        </div>
      </nav>

      {showBanner && (
        <div className="image-banner">
          <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
          <div className="banner-text">ADMIN DASHBOARD</div>
        </div>
      )}

      <div className="dashboard-container">
        <div className="sidebar">
          {["pending", "upcoming", "approved", "history"].map(tab => (
            <button key={tab} className={activeTab === tab ? "sidebar-btn active" : "sidebar-btn"} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
        </div>

        <div className="main-content">
          {activeTab === "pending" && (
            <div className="event-list">
              <h2>Pending Approval</h2>
              {events.filter(event => event.status === "pending").map(event => (
                <div key={event.id} className="event-item">
                  <p>{event.title} - {new Date(event.eventDate).toLocaleDateString()}</p>
                  <button className="approve-button" onClick={() => handleApprove(event.id)}>Approve</button>
                  <button className="reject-button" onClick={() => handleDelete(event.id)}>Reject</button>
                </div>
              ))}
            </div>
          )}

          {["upcoming", "approved", "history"].map(tab => (
            activeTab === tab && (
              <div className="event-list" key={tab}>
                <h2>{tab.charAt(0).toUpperCase() + tab.slice(1)} Events</h2>
                {events.filter(event => event.status === tab).map(event => (
                  <div key={event.id} className="event-item">
                    <p>{event.title} - {new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;