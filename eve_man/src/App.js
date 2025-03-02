import React, { useState, useEffect } from 'react';
import './App.css';
import ssnLogo from './ssnLogo.png';
import ssnCampus from './ssn_campus.jpeg';

const AdminDashboard = () => {
    const [showBanner, setShowBanner] = useState(true);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [approvedEvents, setApprovedEvents] = useState([]);
    const [pendingEvents, setPendingEvents] = useState([]);
    const [eventHistory, setEventHistory] = useState([]);
    const [modalType, setModalType] = useState(null);


    const messages = [
        "⏳ Hackathon registrations closing soon!",
        "🔔 4 events left for approval",
        "📅 Web Dev Workshop tomorrow!"
    ];

    // Handle banner visibility on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowBanner(window.scrollY <= 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sample events
    useEffect(() => {
        setUpcomingEvents([
            { id: 1, title: 'Tech Talk 2025', date: '2025-03-10' },
            { id: 2, title: 'Hackathon', date: '2025-03-15' },
            { id: 3, title: 'Web Dev Workshop', date: '2025-03-12' },
            { id: 4, title: 'AI Seminar', date: '2025-03-18' },
            { id: 5, title: 'Python Bootcamp', date: '2025-03-20' }
        ]);

        setApprovedEvents([
            { id: 6, title: 'Cultural Fest', date: '2025-02-28' },
            { id: 7, title: 'Women in Tech', date: '2025-02-25' },
            { id: 8, title: 'Startup Expo', date: '2025-03-01' },
            { id: 9, title: 'Ethnic Day', date: '2025-03-03' }
        ]);

        setPendingEvents([
            { id: 10, title: 'Workshop on AI', date: '2025-03-05' },
            { id: 11, title: 'Digital Marketing', date: '2025-03-08' },
            { id: 12, title: 'Blockchain Summit', date: '2025-03-09' },
            { id: 13, title: 'Cybersecurity Bootcamp', date: '2025-03-07' }
        ]);

        setEventHistory([
            { id: 14, title: 'Alumni Meet', date: '2025-01-20' },
            { id: 15, title: 'Science Fair', date: '2025-01-18' },
            { id: 16, title: 'Tech Quiz', date: '2025-01-22' },
            { id: 17, title: 'Project Expo', date: '2025-01-25' }
        ]);
    }, []);

      // News ticker rotation logic
      const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

      useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex+1) % messages.length);
        }, 5000); // 4s for animation + 1s gap

        return () => clearInterval(interval);
    }, []);

    const approveEvent = (eventId) => {
        const eventToApprove = pendingEvents.find(event => event.id === eventId);
        setApprovedEvents([...approvedEvents, eventToApprove]);
        setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
    };

    const deleteEvent = (eventId) => {
        setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
    };

    const openModal = (type) => {
        setModalType(type);  // Set the type directly
        document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
    };
    
    const closeModal = () => {
        setModalType(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };
    
    const getEventsByType = () => {
        switch (modalType) {
            case 'upcoming': return upcomingEvents;
            case 'approved': return approvedEvents;
            case 'pending': return pendingEvents;
            case 'history': return eventHistory;
            default: return [];
        }
    };
    
    const EventCard = ({ title, type, events }) => (
        <div className="event-card">
            <h2 className="event-header">{title}</h2>
            {events.slice(0, 3).map(event => (
                <div key={event.id} className="event-item">
                    <p>{event.title} - {event.date}</p>
                    {type === 'pending' && (
                        <div className="button-group">
                            <button className="approve-button" onClick={() => approveEvent(event.id)}>Accept</button>
                            <button className="reject-button" onClick={() => deleteEvent(event.id)}>Reject</button>
                        </div>
                    )}
                </div>
            ))}
            {events.length > 3 && (
                <button className="view-more-button" onClick={() => openModal(type)}>View More</button>
            )}
        </div>
    );    

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={ssnLogo} alt="SSN College Logo" className="ssn-logo" />
                </div>
                <div className="navbar-right">
                    <a href="#" className="nav-link">Home</a>
                    <a href="#" className="nav-link">About SSN</a>
                    <a href="#" className="nav-link">List of Events</a>
                    <input type="text" placeholder="Search..." className="search-bar" />
                    <button className="logout-button">Logout</button>
                </div>
            </nav>

            {/* Image Banner */}
            {showBanner && (
                <div className="image-banner">
                    <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
                    <div className="banner-text">ADMIN DASHBOARD</div>
                </div>
            )}

            {/* News Ticker */}
            <div className="news-ticker">
    <marquee behavior="scroll" direction="left" scrollamount="8" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
        🚀 February 28, 2025: One Day National Workshop on “Demystifying MEAN Stack Development” &nbsp;&nbsp;
        ⏳ Hackathon registrations closing soon! &nbsp;&nbsp;
        🔔 4 events left for approval &nbsp;&nbsp;
        📅 Web Dev Workshop tomorrow!
    </marquee>
</div>

            {/* Dashboard Content */}
<div className="event-container">
    <div className="event-row">
        <EventCard title="Upcoming Events" type="upcoming" events={upcomingEvents} />
        <EventCard title="To Be Approved" type="pending" events={pendingEvents} />
    </div>
    <div className="event-row">
        <EventCard title="Approved Events" type="approved" events={approvedEvents} />
        <EventCard title="Event History" type="history" events={eventHistory} />
    </div>
</div>



            {/* Modal for "View More" */}
            {modalType && (
    <div className={`modal-overlay ${modalType ? 'active' : ''}`}>
        <div className="modal-content">
            <h2>{modalType.charAt(0).toUpperCase() + modalType.slice(1)} Events</h2>
            {getEventsByType().map(event => (
                <div key={event.id} className="modal-event-item">
                    <p>{event.title} - {event.date}</p>
                    {modalType === 'pending' && (
                        <div className="action-buttons">
                            <button className="approve-button" onClick={() => approveEvent(event.id)}>Accept</button>
                            <button className="reject-button" onClick={() => deleteEvent(event.id)}>Reject</button>
                        </div>
                    )}
                </div>
            ))}
            <button className="close-modal-button" onClick={closeModal}>Close</button>
        </div>
    </div>
)}
        </div>
    );
};

export default AdminDashboard;
