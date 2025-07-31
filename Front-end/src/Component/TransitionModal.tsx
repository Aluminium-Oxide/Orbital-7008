import React from 'react';

interface TransitionModalProps {
  isVisible: boolean;
  fromBuilding: string;
  fromLevel: string;
  toBuilding: string;
  toLevel: string;
}

const TransitionModal: React.FC<TransitionModalProps> = ({
  isVisible,
  fromBuilding,
  fromLevel,
  toBuilding,
  toLevel
}) => {
  if (!isVisible) return null;

  const isBuildingChange = fromBuilding !== toBuilding;
  const isLevelChange = fromLevel !== toLevel;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 pointer-events-auto">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {isBuildingChange ? 'Pass through linkway' : 'Take lift'}
          </h2>
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1"> From </div>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-lg font-semibold">
                  {fromBuilding}-L{fromLevel}
                </div>
              </div>
              <div className="text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1"> To </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-semibold">
                  {toBuilding}-L{toLevel}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {isBuildingChange && (
                <p> You are now moving to another building </p>
              )}
              {!isBuildingChange && isLevelChange && (
                <p> You are now moving to another level </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransitionModal; 