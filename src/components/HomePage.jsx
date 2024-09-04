import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  // deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import EventForm from "./EventForm";
import EventCalendar from "./EventCalendar";
import NotificationDropdown from "./NotificationDropdown";
import { Link } from "react-router-dom";
import "../styles/HomePage.scss";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchEvents(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const fetchEvents = async (userId) => {
    const q = query(collection(db, "events"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const eventsData = [];
    querySnapshot.forEach((doc) => {
      eventsData.push({ id: doc.id, ...doc.data() });
    });
    setEvents(eventsData);
  };

  const handleSaveEvent = async (eventData) => {
    if (selectedEvent) {
      const eventDoc = doc(db, "events", selectedEvent.id);
      await updateDoc(eventDoc, eventData);
    } else {
      await addDoc(collection(db, "events"), {
        ...eventData,
        userId: user.uid,
      });
    }
    setShowForm(false);
    fetchEvents(user.uid);
  };

  // const handleDeleteEvent = async (eventId) => {
  //   await deleteDoc(doc(db, "events", eventId));
  //   fetchEvents(user.uid);
  // };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="homepage">
      <header>
        <h1>Event Management System</h1>

        {!isAuthenticated ? (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login-button">
              Login
            </Link>
            <Link to="/register" className="auth-button register-button">
              Register
            </Link>
          </div>
        ) : (
          <div>
            {" "}
            {user && (
              <div className="homepage-container">
                <div className="header">
                  <div className="welcome">Welcome, {user.email}</div>
                  <button className="sign-out-button" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      <NotificationDropdown events={events} />

      <button onClick={() => setShowForm(true)}>Create New Event</button>

      {showForm && (
        <EventForm
          event={selectedEvent}
          onSave={(eventData) => handleSaveEvent(eventData)}
          onCancel={() => setShowForm(false)}
        />
      )}

      <EventCalendar
        events={events.map((event) => ({
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
          allDay: true,
          id: event.id,
        }))}
        onSelectEvent={(event) => handleSelectEvent(event)}
      />
    </div>
  );
};

export default HomePage;
