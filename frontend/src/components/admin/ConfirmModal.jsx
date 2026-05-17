const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-scaleIn">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-2xl">
        🗑️
      </div>
      <h3 className="text-center font-bold text-gray-800 mb-2">Are you sure?</h3>
      <p className="text-center text-sm text-gray-500 mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium
                     text-gray-600 hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold
                     hover:bg-red-600 transition-colors duration-200 shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)

export default ConfirmModal
