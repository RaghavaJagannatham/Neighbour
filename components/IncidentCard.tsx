// components/IncidentCard.js
const IncidentCard = ({ incident }) => {
    const { title, description, date, status } = incident;
    const formattedDate = new Date(date).toLocaleString();
  
    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        <p>{description}</p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <span className={`badge ${status === 'Pending' ? 'bg-yellow-400' : 'bg-green-400'}`}>{status}</span>
        <div className="mt-4">
          <button className="mr-2">Comment</button>
          <button>Upvote</button>
        </div>
      </div>
    );
  };
  
  export default IncidentCard;
  