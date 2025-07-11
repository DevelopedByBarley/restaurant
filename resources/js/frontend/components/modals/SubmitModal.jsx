import React from 'react';

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  children,
  submitLabel = 'Submit',
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-300/80 bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {description && (
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">{children}</div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
