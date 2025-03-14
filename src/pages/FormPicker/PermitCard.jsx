import React from 'react';

function PermitCard({ worker }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Worker Details Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Worker Permit</h2>

        {/* Worker ID */}
        <div className="mt-4">
          <span className="font-bold">ID:</span>
          <span className="ml-2 text-gray-600">{worker.id}</span>
        </div>

        {/* Worker Name */}
        <div className="mt-2">
          <span className="font-bold">Name:</span>
          <span className="ml-2 text-gray-600">{worker.name}</span>
        </div>

        {/* Worker Phone */}
        <div className="mt-2">
          <span className="font-bold">Phone:</span>
          <span className="ml-2 text-gray-600">{worker.phone}</span>
        </div>

        {/* Date Range */}
        <div className="mt-2">
          <span className="font-bold">Date Range:</span>
          <span className="ml-2 text-gray-600">
            {worker.date1} - {worker.date2}
          </span>
        </div>

        {/* Approver Name */}
        <div className="mt-2">
          <span className="font-bold">Approver Name:</span>
          <span className="ml-2 text-gray-600">{worker.approverName}</span>
        </div>

        {/* Signature Section */}
        <div className="mt-6 border-t pt-4">
          <span className="font-bold">Signature:</span>
          <div className="mt-2">
            <div className="h-20 w-full border-dashed border-2 border-gray-400">
              {/* Placeholder for signature */}
              <p className="text-center text-gray-500">Signature Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PermitCard;
