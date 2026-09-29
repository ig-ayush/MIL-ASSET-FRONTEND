import { useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { getAuditLogs } from "../api/auditApi";
import { getApiError } from "../api/axios";
import { dateTime } from "../utils/formatters";
import PageHeader from "../components/common/PageHeader";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../components/common/State";
export default function AuditLogs() {
  const [rows, setRows] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [q, setQ] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await getAuditLogs();
      const d = r.data;
      setRows(
        Array.isArray(d)
          ? d
          : d?.content || d?.data || d?.items || d?.results || [],
      );
    } catch (e) {
      setError(getApiError(e));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const filtered = rows.filter((x) =>
    JSON.stringify(x).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Read-only record of system activity."
        action={
          <button className="btn-secondary" onClick={load}>
            <RefreshCw size={16} /> Refresh
          </button>
        }
      />
      <div className="card overflow-hidden">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="input pl-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search audit logs..."
            />
          </div>
        </div>
        {loading ? (
          <LoadingState text="Loading audit logs..." />
        ) : error ? (
          <ErrorState text={error} onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState text="No audit logs found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  {[
                    "Timestamp",
                    "Action",
                    "Entity",
                    "Entity ID",
                    "User",
                    "User Email",
                    "Base",
                    "Description",
                  ].map((x) => (
                    <th className="px-4 py-3" key={x}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((x, i) => (
                  <tr key={x.id || i} className="hover:bg-lime-50/30">
                    <td className="px-4 py-3.5">
                      {dateTime(x.timestamp || x.createdAt)}
                    </td>
                    <td className="px-4 py-3.5 font-semibold">
                      {x.action || "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      {x.entity || x.entityType || "—"}
                    </td>
                    <td className="px-4 py-3.5">{x.entityId ?? "—"}</td>
                    <td className="px-4 py-3.5">{x.userName || "—"}</td>
                    <td className="px-4 py-3.5">{x.userEmail || "—"}</td>
                    <td className="px-4 py-3.5">{x.baseName || "—"}</td>
                    <td className="px-4 py-3.5">{x.description || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
