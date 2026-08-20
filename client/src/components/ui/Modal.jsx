export default function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-[#102235] rounded-3xl w-full max-w-lg p-6 border border-slate-700">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}