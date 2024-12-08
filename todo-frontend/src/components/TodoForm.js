import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Trim the text to check for empty strings
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      setError("Please enter a valid todo item");
      return;
    }

    if (trimmedText.length > 100) {
      setError("Todo item must be less than 100 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      await addTodo(trimmedText);
      setText("");
      // Show success message
      const successMessage = document.getElementById("success-message");
      successMessage.classList.remove("hidden");
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 3000);
    } catch (error) {
      setError("Failed to add todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            maxLength={100}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {text.length > 0 && (
            <span className="absolute right-2 bottom-2 text-sm text-gray-500">
              {text.length}/100
            </span>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div id="success-message" className="hidden text-green-500 text-sm">
          Todo added successfully!
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            viewBox="0 0 24 24"
          >
            {isLoading ? (
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            ) : (
              <path
                fill="currentColor"
                d="M12 5V19M5 12H19"
              />
            )}
          </svg>
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;