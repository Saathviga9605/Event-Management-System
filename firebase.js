// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBsBFpJv8SzYzKEf62dIwOp4qk8I",
//   authDomain: "event-management-b5f16.firebaseapp.com",
//   projectId: "event-management-b5f16",
//   storageBucket: "event-management-b5f16.appspot.com",
//   messagingSenderId: "777325040227",
//   appId: "1:777325040227:web:78f0ca75bc03fa13661e56",
//   measurementId: "G-WT6S7B0ZVK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);

// // Function to fetch all events
// const getEvents = async () => {
//   try {
//     console.log("Fetching events from Firestore...");
    
//     const eventCollection = collection(db, "events");
//     const eventSnapshot = await getDocs(eventCollection);

//     if (eventSnapshot.empty) {
//       console.log("No events found in Firestore.");
//       return [];
//     }

//     const events = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     console.log("Fetched events:", events); // ✅ Log the data
//     return events;
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     return [];
//   }
// };

// // Function to update event status
// const updateEventStatus = async (eventId, status) => {
//   try {
//     console.log(`Updating event ${eventId} to ${status}...`);

//     const response = await fetch("http://127.0.0.1:5000/update_event_status", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id: eventId, status }),
//     });

//     const result = await response.json();
//     console.log(result);

//     return result;
//   } catch (error) {
//     console.error("Error updating event status:", error);
//   }
// };

// export { db, storage, getEvents, updateEventStatus };



import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBsBFpJv8SzYzKEf62dIwOp4qk8I",
  authDomain: "event-management-b5f16.firebaseapp.com",
  projectId: "event-management-b5f16",
  storageBucket: "event-management-b5f16.appspot.com",
  messagingSenderId: "777325040227",
  appId: "1:777325040227:web:78f0ca75bc03fa13661e56",
  measurementId: "G-WT6S7B0ZVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to fetch all events
const getEvents = async () => {
  try {
    console.log("Fetching events from Firestore...");
    
    const eventCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventCollection);

    if (eventSnapshot.empty) {
      console.log("No events found in Firestore.");
      return [];
    }

    const events = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched events:", events);
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// Function to update event status
const updateEventStatus = async (eventId, newStatus) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, { status: newStatus });
    console.log(`Event ${eventId} updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating event status:", error);
  }
};

// Approve event function
const approveEvent = async (eventId) => {
  await updateEventStatus(eventId, "approved");
};

// Reject event function
const rejectEvent = async (eventId) => {
  await updateEventStatus(eventId, "rejected");
};

// Delete event function
const deleteEvent = async (eventId) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await deleteDoc(eventRef);
    console.log(`Event ${eventId} deleted`);
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

export { db, storage, getEvents, updateEventStatus, approveEvent, rejectEvent, deleteEvent };
