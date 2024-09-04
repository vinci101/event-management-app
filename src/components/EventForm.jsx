import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SketchPicker } from "react-color";

const EventForm = ({ event, onSave, onCancel }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(
    event ? event.description : ""
  );
  const [date, setDate] = useState(
    event ? new Date(event.date).toISOString().split("T")[0] : ""
  );
  const [color, setColor] = useState(event ? event.color : "#ffffff");
  const [location, setLocation] = useState(event ? event.location : "");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(new Date(event.date).toISOString().split("T")[0]);
      setColor(event.color);
      setLocation(event.location);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, date, color, location });
  };

  return (
    <div className="event-form">
      <h2>{event ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <SketchPicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
        <GooglePlacesAutocomplete
          selectProps={{
            value: location,
            onChange: (value) => setLocation(value),
          }}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

EventForm.propTypes = {
  event: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EventForm;
