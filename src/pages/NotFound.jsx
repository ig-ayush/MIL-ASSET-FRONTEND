import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="grid min-h-[65vh] place-items-center text-center">
      <div>
        <p className="text-7xl font-black text-[#3F6212]">404</p>
        <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The requested page does not exist.
        </p>
        <Link className="btn-primary mt-6" to="/dashboard">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
