import React from "react";

const OpportunityCard = ({
  opportunity,
  showStatus = false,
  showApplied = false,
  applied = false, // tracks if user has applied
  showDelete = false,
  showPostedBy = false,
  showAcceptReject = false,
  onApply,
  onDelete,
  onAccept,
  onReject,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition">

      {/* Title */}
      <h2 className="text-xl font-bold text-blue-700 mb-2">
        {opportunity.title}
      </h2>

      {/* Description */}
      <p className="text-gray-700 mb-3">{opportunity.description}</p>

      {/* Eligibility */}
      {opportunity.eligibility && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Eligibility:</span> {opportunity.eligibility}
        </p>
      )}

      {/* Deadline */}
      {opportunity.deadline && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Deadline:</span>{" "}
          {new Date(opportunity.deadline).toLocaleDateString()}
        </p>
      )}

      {/* Link */}
      {opportunity.link && (
        <a
          href={opportunity.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm block mb-2"
        >
          View Details
        </a>
      )}

      {/* Posted By */}
      {showPostedBy && (
        <p className="text-xs text-gray-500 mb-2">
          <span className="font-semibold">Posted By:</span> {opportunity.postedBy}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {/* Status */}
        {showStatus && (
          <span
            className={`px-3 py-1 text-xs rounded-full border ${
              opportunity.status === "approved"
                ? "bg-green-100 text-green-700 border-green-300"
                : opportunity.status === "pending"
                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                : "bg-red-100 text-red-700 border-red-300"
            }`}
          >
            Status: {opportunity.status || "N/A"}
          </span>
        )}

        {/* Apply / Applied */}
        {showApplied && (
          applied ? (
            <span className="px-4 py-1 text-sm bg-gray-400 text-white rounded-lg">
              Applied
            </span>
          ) : (
            <button
              onClick={() => onApply && onApply(opportunity._id)}
              className="px-4 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Apply
            </button>
          )
        )}

        {/* Delete */}
        {showDelete && (
          <button
            onClick={() => onDelete && onDelete(opportunity._id)}
            className="px-4 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}

        {/* Accept / Reject for admin */}
        {showAcceptReject && opportunity.status === "pending" && (
          <>
            <button
              onClick={() => onAccept && onAccept(opportunity._id)}
              className="px-4 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Accept
            </button>
            <button
              onClick={() => onReject && onReject(opportunity._id)}
              className="px-4 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OpportunityCard;
