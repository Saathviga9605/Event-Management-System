import React, { useState, useEffect } from 'react';
import './EventOrganizer.css';
import ssnLogo from './ssnLogo.png';
import ssnCampus from './ssn_campus.jpeg';

const EventOrganizer = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [showBanner, setShowBanner] = useState(true);
    const [createdEvents, setCreatedEvents] = useState([]);
    const [requestedEvents, setRequestedEvents] = useState([]);
    const [approvedEvents, setApprovedEvents] = useState([]);
    const [publishedEvents, setPublishedEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        category: '',
        description: '',
        eventDate: '',
        venue: '',
        onlineLink: '',
        format: 'in-person',
        registrationLink: '',
        ticketPrice: '',
        paymentOptions: '',
        agenda: '',
        speakers: '',
        organizerDetails: '',
        contactInfo: '',
        specialInstructions: '',
        socialLinks: '',
        sponsors: '',
        image: null,
    });

    useEffect(() => {
        const handleScroll = () => {
            setShowBanner(window.scrollY <= 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setCreatedEvents([
            { id: 1, title: 'ML Workshop', date: '2025-03-12', status: 'approved' },
            { id: 2, title: 'Robotics Expo', date: '2025-04-05', status: 'approved' },
        ]);
        setRequestedEvents([
            { id: 3, title: 'AI Symposium', date: '2025-05-15', status: 'pending' }
        ]);
        setApprovedEvents([
            { id: 4, title: 'Data Science Conference', date: '2025-06-20', status: 'approved' }
        ]);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewEvent({ ...newEvent, [name]: files[0] });
        } else {
            setNewEvent({ ...newEvent, [name]: value });
        }
    };

    const createEvent = () => {
        if (newEvent.title && newEvent.eventDate) {
            const eventToRequest = { ...newEvent, id: requestedEvents.length + 1, status: 'pending' };
            setRequestedEvents([...requestedEvents, eventToRequest]);
            setNewEvent({
                title: '',
                category: '',
                description: '',
                eventDate: '',
                venue: '',
                onlineLink: '',
                format: 'in-person',
                registrationLink: '',
                ticketPrice: '',
                paymentOptions: '',
                agenda: '',
                speakers: '',
                organizerDetails: '',
                contactInfo: '',
                specialInstructions: '',
                socialLinks: '',
                sponsors: '',
                image: null,
            });
        }
    };

    const publishEvent = (event) => {
        setPublishedEvents([...publishedEvents, event]);
        setApprovedEvents(approvedEvents.filter(e => e.id !== event.id));
    };

    return (
        <div className="event-organizer-container">
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
                    <img src={ssnCampus} alt="SSN Campus" className="event-banner-image" />
                    <div className="banner-text">EVENT ORGANIZER DASHBOARD</div>
                </div>
            )}

            <div className="dashboard-container">
                <div className="sidebar">
                    <button className={activeTab === 'create' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('create')}>Create Event</button>
                    <button className={activeTab === 'requested' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('requested')}>Requested</button>
                    <button className={activeTab === 'approved' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('approved')}>Approved</button>
                    <button className={activeTab === 'history' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('history')}>Event History</button>
                    <button className={activeTab === 'published' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('published')}>Published</button>
                </div>

                <div className="main-content">
                    {activeTab === 'create' && (
                        <div className="create-event">
                            <h2>Create New Event</h2>
                            <input type="text" name="title" placeholder="Event Title" value={newEvent.title} onChange={handleInputChange} />
                            <select name="category" value={newEvent.category} onChange={handleInputChange}>
                                <option value="">Select Category</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Conference">Conference</option>
                                <option value="Cultural">Cultural</option>
                            </select>
                            <textarea name="description" placeholder="Event Description" value={newEvent.description} onChange={handleInputChange}></textarea>
                            <input type="datetime-local" name="eventDate" value={newEvent.eventDate} onChange={handleInputChange} placeholder="Event Date" />
                            <input type="text" name="venue" placeholder="Venue Address" value={newEvent.venue} onChange={handleInputChange} />
                            <button className="create-button" onClick={createEvent}>Request Approval</button>
                        </div>
                    )}

                    {activeTab === 'approved' && (
                        <div className="event-approved">
                            <h2>Approved Events</h2>
                            {approvedEvents.map(event => (
                                <div key={event.id} className="event-item">
                                    <p>{event.title} - {event.date} (Status: {event.status})</p>
                                    <button className="publish-button" onClick={() => publishEvent(event)}>Publish</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'published' && (
                        <div className="event-published">
                            <h2>Published Events</h2>
                            {publishedEvents.map(event => (
                                <div key={event.id} className="event-item">
                                    <p>{event.title} - {event.date}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventOrganizer;
