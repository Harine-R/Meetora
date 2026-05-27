import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { getEvents } from "../api/auth";

const EventContext = createContext();

export const EventProvider = ({ children }) => {

  const [events, setEvents] = useState([]);

  // FETCH EVENTS
  const fetchEvents = async () => {

    try {

      const res = await getEvents();

      setEvents(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        fetchEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);