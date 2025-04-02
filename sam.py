import React, { useState, useEffect } from 'react';
import { db,storage } from "./firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './EventOrganizer.css';
import ssnLogo from './assets/ssnLogo.png';
import ssnCampus from './assets/ssn_campus.jpeg';

const EventOrganizer = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [showBanner, setShowBanner] = useState(true);
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
        document.body.style.background = "#ffffff";

        const handleScroll = () => {
            setShowBanner(window.scrollY <= 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewEvent({ ...newEvent, [name]: files[0] });
        } else {
            setNewEvent({ ...newEvent, [name]: value });
        }
    };

    const createEvent = async () => {
        const { title, category, eventDate, venue, registrationLink, image } = newEvent;
        
        if (!title || !category || !eventDate || !venue || !registrationLink) {
            alert("Please fill in all mandatory fields: Title, Category, Date & Time, Venue, and Registration Link.");
            return;
        }

        try {
            let imageUrl = "";
            if (image) {
                const storage = getStorage();
                const imageRef = ref(storage, event_images/${image.name});
                const snapshot = await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const docRef = await addDoc(collection(db, "events"), {
                ...newEvent,
                image: imageUrl,
            });

            alert("Event submitted successfully! Event ID: " + docRef.id);
            setNewEvent({
                title: '', category: '', description: '', eventDate: '', venue: '',
                onlineLink: '', format: 'in-person', registrationLink: '', ticketPrice: '',
                paymentOptions: '', agenda: '', speakers: '', organizerDetails: '',
                contactInfo: '', specialInstructions: '', socialLinks: '', sponsors: '',
                image: null,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting event. Please try again.");
        }
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
                    <img src={ssnCampus} alt="SSN Campus" className="campus-image" />
                    <div className="banner-text">EVENT ORGANIZER DASHBOARD</div>
                </div>
            )}

            <div className="dashboard-container">
                <div className="sidebar">
                    <button className={activeTab === 'create' ? 'sidebar-btn active' : 'sidebar-btn'} onClick={() => setActiveTab('create')}>Create Event</button>
                </div>

                <div className="main-content">
                    {activeTab === 'create' && (
                        <div className="create-event">
                            <h2>Create New Event</h2>
                            <label>Event Title:</label>
                            <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Enter event title" required />
                            <label>Category:</label>
                            <select name="category" value={newEvent.category} onChange={handleInputChange} required>
                                <option value="">Select Category</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Conference">Conference</option>
                                <option value="Cultural">Cultural</option>
                            </select>
                            <label>Date & Time:</label>
                            <input type="datetime-local" name="eventDate" value={newEvent.eventDate} onChange={handleInputChange} required />
                            <label>Venue:</label>
                            <input type="text" name="venue" value={newEvent.venue} onChange={handleInputChange} placeholder="Enter venue" required />
                            <label>Registration Link:</label>
                            <input type="text" name="registrationLink" value={newEvent.registrationLink} onChange={handleInputChange} placeholder="Enter registration link" required />
                            <label>Upload Image:</label>
                            <input type="file" name="image" onChange={handleInputChange} />
                            <button className="create-button" onClick={createEvent}>Submit Event</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventOrganizer;