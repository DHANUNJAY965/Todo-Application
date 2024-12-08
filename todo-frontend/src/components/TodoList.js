import React, { useState } from "react";

const TodoList = ({ todos, deleteTodo }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteTodo(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (!todos.length) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500 text-lg">No todos yet! Add some tasks to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="group bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 break-words">{todo.text}</p>
              {todo.createdAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Added {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <button
              onClick={() => handleDelete(todo._id)}
              disabled={deletingId === todo._id}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                transition-all duration-200 ease-in-out
                ${deletingId === todo._id
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white'
                }
                opacity-0 group-hover:opacity-100 focus:opacity-100
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
              `}
            >
              {deletingId === todo._id ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;