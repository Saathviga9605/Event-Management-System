import { db } from "./firebase"; // Adjust path if needed
import { collection, addDoc } from "firebase/firestore";

// Sample event data
const events = [
    { title: "AI & ML Bootcamp", category: "Workshop", eventDate: "2025-04-10T10:00", format: "in-person", ticketPrice: "200", paymentOptions: "Online Payment", venue: "SSN Auditorium", registrationLink: "https://example.com/ai-bootcamp", agenda: "Basics of AI & ML, Hands-on ML models" },
    { title: "Digital Art & Illustration", category: "Workshop", eventDate: "2025-04-12T14:00", format: "in-person", ticketPrice: "150", paymentOptions: "Online Payment", venue: "Art Studio", registrationLink: "https://example.com/digital-art", agenda: "Procreate & Photoshop basics" },
    { title: "Music Production 101", category: "Cultural", eventDate: "2025-04-15T09:00", format: "in-person", ticketPrice: "300", paymentOptions: "Cash", venue: "Music Lab", registrationLink: "https://example.com/music-production", agenda: "Basics of DAWs, Beat Making" },
    { title: "Entrepreneurship & Startups", category: "Seminar", eventDate: "2025-04-18T11:00", format: "online", onlineLink: "https://meet.example.com/startups", ticketPrice: "Free", paymentOptions: "Free", venue: "Online", registrationLink: "https://example.com/startup-seminar", agenda: "Funding, Business Models" },
    { title: "Fitness & Nutrition", category: "Seminar", eventDate: "2025-04-20T16:00", format: "online", onlineLink: "https://meet.example.com/fitness", ticketPrice: "Free", paymentOptions: "Free", venue: "Online", registrationLink: "https://example.com/fitness-seminar", agenda: "Healthy Eating, Workout Plans" },
    { title: "Photography & Editing", category: "Workshop", eventDate: "2025-04-22T13:00", format: "in-person", ticketPrice: "250", paymentOptions: "Online Payment", venue: "Photography Lab", registrationLink: "https://example.com/photo-editing", agenda: "DSLR & Mobile Photography, Lightroom Editing" },
    { title: "Psychology of Human Behavior", category: "Conference", eventDate: "2025-04-25T09:30", format: "in-person", ticketPrice: "400", paymentOptions: "Cash", venue: "Main Hall", registrationLink: "https://example.com/psychology-conference", agenda: "Cognitive & Behavioral Psychology" },
    { title: "Cultural Dance Workshop", category: "Cultural", eventDate: "2025-04-28T15:00", format: "in-person", ticketPrice: "Free", paymentOptions: "Free", venue: "Dance Studio", registrationLink: "https://example.com/dance-workshop", agenda: "Bharatanatyam, Salsa, Hip-Hop" },
    { title: "Financial Planning for Students", category: "Seminar", eventDate: "2025-05-01T10:30", format: "online", onlineLink: "https://meet.example.com/finance", ticketPrice: "Free", paymentOptions: "Free", venue: "Online", registrationLink: "https://example.com/finance-seminar", agenda: "Budgeting, Investing Basics" },
    { title: "Creative Writing & Storytelling", category: "Workshop", eventDate: "2025-05-04T11:00", format: "in-person", ticketPrice: "100", paymentOptions: "Online Payment", venue: "Library Hall", registrationLink: "https://example.com/creative-writing", agenda: "Fiction & Non-Fiction Writing" },
    { title: "Wildlife Conservation Awareness", category: "Seminar", eventDate: "2025-05-07T14:30", format: "online", onlineLink: "https://meet.example.com/wildlife", ticketPrice: "Free", paymentOptions: "Free", venue: "Online", registrationLink: "https://example.com/wildlife-seminar", agenda: "Biodiversity & Climate Change" },
    { title: "Culinary Workshop: Italian Cuisine", category: "Workshop", eventDate: "2025-05-10T09:00", format: "in-person", ticketPrice: "200", paymentOptions: "Online Payment", venue: "Culinary Lab", registrationLink: "https://example.com/italian-cuisine", agenda: "Pasta & Pizza Making" },
    { title: "Public Speaking Masterclass", category: "Workshop", eventDate: "2025-05-13T12:00", format: "in-person", ticketPrice: "150", paymentOptions: "Online Payment", venue: "Auditorium", registrationLink: "https://example.com/public-speaking", agenda: "Confidence, Speech Structuring" },
    { title: "Space Exploration & Mars Colonization", category: "Conference", eventDate: "2025-05-16T15:00", format: "in-person", ticketPrice: "800", paymentOptions: "Cash", venue: "Science Auditorium", registrationLink: "https://example.com/space-exploration", agenda: "NASA & ISRO Missions, Life on Mars" }
];

// Function to upload events
const uploadEvents = async () => {
  try {
    const eventsCollection = collection(db, "events");
    for (const event of events) {
      await addDoc(eventsCollection, event);
      console.log(`Event added: ${event.title}`);
    }
    console.log("All events added successfully!");
  } catch (error) {
    console.error("Error adding events:", error);
  }
};

// Run the function
uploadEvents();
