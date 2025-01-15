import { format } from 'date-fns';

// Helper function to safely format dates
const safeFormatDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return ''; // Return an empty string or a default value if the date is invalid
  }
  return format(parsedDate, 'MMMM dd, yyyy, h:mm a'); // Format the date to the desired format
};

const IncidentPosts = ({ incidents = [] }) => {
  if (incidents.length === 0) {
    return <p>No incidents available.</p>;
  }

  return (
    <div className="space-y-8">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden"
        >
          {/* Incident Header: User Name & Date */}
          <div className="flex items-center space-x-4">
            <img
              src={incident.user?.avatar || '/default-avatar.jpg'}
              alt={incident.user?.name || 'Anonymous'}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {incident.user?.name || 'Anonymous'}
              </h3>
              <p className="text-sm text-gray-500">
                {safeFormatDate(incident.date)}
              </p>
            </div>
          </div>

          {/* Incident Title */}
          <h4 className="text-xl font-semibold">{incident.title}</h4>

          {/* Incident Description */}
          <p className="text-gray-600">{incident.description}</p>

          {/* Incident Image */}
          {incident.image && (
            <div className="mt-4">
              <img
                src={incident.image}
                alt={incident.title}
                className="object-cover w-full h-[400px] rounded-lg"
              />
            </div>
          )}

          {/* Incident Footer */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              {/* Flag Issue Button */}
              <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                <span>⚠️</span> <span>Flag Issue</span>
              </button>

              {/* Status Button */}
              <button className={`flex items-center space-x-1 hover:text-gray-700 transition-colors ${getStatusClass(incident.status)}`}>
                <span>{getStatusIcon(incident.status)}</span> 
                <span>{incident.status}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to return the correct icon for the status
const getStatusIcon = (status) => {
  switch (status) {
    case 'Pending':
      return '⏳';
    case 'Resolved':
      return '✅';
    case 'Informational':
      return 'ℹ️';
    default:
      return '⚠️';
  }
};

// Helper function to return the correct class for the status button
const getStatusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-600';
    case 'Resolved':
      return 'text-green-600';
    case 'Informational':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

export default IncidentPosts;
