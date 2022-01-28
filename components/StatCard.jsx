import React from "react";

const EmptyState = () => {
  return (
    <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      <div className="flex flex-col space-y-5 h-16">
        <div className="w-36 bg-gray-300 h-4 rounded-md "></div>
        <div className="w-48 bg-gray-300 h-8 rounded-md "></div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, children }) => {
  return (
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:my-8">
      <div className="bg-white p-5">
        <div className="sm:flex sm:items-start">
          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
            {!value ? (
              <EmptyState />
            ) : (
              <>
                <h3 className="text-sm leading-6 uppercase font-medium text-primary">
                  {title}
                </h3>
                {children ? (
                  children
                ) : (
                  <p className="text-3xl font-bold text-black">{value}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
