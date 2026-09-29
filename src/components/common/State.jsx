import { AlertCircle, Inbox, LoaderCircle, RefreshCw } from "lucide-react";

export function LoadingState({ text = "Loading..." }) {
  return (
    <div className="card flex min-h-48 items-center justify-center gap-3 p-8 text-sm text-slate-500">
      <LoaderCircle className="animate-spin text-[#3F6212]" size={20} />
      {text}
    </div>
  );
}
export function EmptyState({ text = "No records found." }) {
  return (
    <div className="card flex min-h-48 flex-col items-center justify-center p-8 text-center">
      <Inbox className="mb-3 text-slate-300" size={34} />
      <p className="font-medium text-slate-700">{text}</p>
      <p className="mt-1 text-xs text-slate-400">
        Data will appear here when available from the backend.
      </p>
    </div>
  );
}
export function ErrorState({ text = "Unable to load data.", onRetry }) {
  return (
    <div className="card flex min-h-48 flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="mb-3 text-red-500" size={34} />
      <p className="font-medium text-slate-700">{text}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-4">
          <RefreshCw size={15} /> Retry
        </button>
      )}
    </div>
  );
}
