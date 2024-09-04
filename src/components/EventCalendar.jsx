import PropTypes from "prop-types";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, onSelectEvent }) => {
  return (
    <div className="event-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        style={{ height: 500 }}
      />
    </div>
  );
};

EventCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectEvent: PropTypes.func.isRequired,
};

export default EventCalendar;
