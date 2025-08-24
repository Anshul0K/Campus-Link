import React, { useState } from "react";
import { createOpportunity as createOpportunityService } from "../services/opportunityService";


const PostOpportunityModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");
  const [eligibility, setEligibility] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOpportunityService({ title, description, deadline, link, eligibility });
      alert("Opportunity posted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to post opportunity.");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
        {/* Close / Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Post Opportunity</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Opportunity Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Opportunity Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="flex flex-col">
            <label htmlFor="deadline" className="mb-1 font-medium">
              Deadline
            </label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Opportunity Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Eligibility"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostOpportunityModal;
