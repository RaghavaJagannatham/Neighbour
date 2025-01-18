const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab.toLowerCase()
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-blue-500'
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default Tabs;
  