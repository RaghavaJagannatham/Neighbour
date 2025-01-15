// components/QuickActions.js
const QuickActions = ({ title, description, onClick }) => {
    return (
      <div className="bg-white p-6 shadow-lg mt-4 rounded-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button onClick={onClick} className="text-blue-500 hover:text-blue-700">
          Go
        </button>
      </div>
    );
  };
  
  export default QuickActions;
  