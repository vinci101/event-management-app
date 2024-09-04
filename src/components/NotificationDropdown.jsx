import PropTypes from "prop-types";
import { format } from "date-fns";
import "../styles/NotificationIcon.scss";
import { useState } from "react";

const NotificationDropdown = ({ events }) => {
  const [showAlert, setShowAlert] = useState(true);
  const upcomingEvents = events
    .filter((event) => new Date(event.date) > new Date())
    .slice(0, 7);

  const handleIconClick = () => {
    setShowAlert(!showAlert); // Toggle alert visibility on click
  };

  return (
    <div className="notification-container" onClick={handleIconClick}>
      <div className="notification-icon">
        {/* <i className="fas fa-bell"></i> */}

        {upcomingEvents.length > 0 && (
          <span className="notification-count">{upcomingEvents.length}</span>
        )}
      </div>
      <div className="notification-list">
        {upcomingEvents.map(
          (event) =>
            showAlert && (
              <div key={event.id} className="notification-item">
                <span>{event.title}</span>
                <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

NotificationDropdown.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NotificationDropdown;
