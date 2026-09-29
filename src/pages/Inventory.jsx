import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../components/common/State";
import { getInventory } from "../api/inventoryApi";
import { getApiError } from "../api/axios";
import { number } from "../utils/formatters";
import { useAuth } from "../context/AuthContext";

export default function Inventory() {
  const { user, isAdmin } = useAuth();
  const [rows, setRows] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [q, setQ] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await getInventory(isAdmin ? {} : { baseId: user?.baseId });
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
  }, [user?.baseId, isAdmin]);
  const filtered = useMemo(
    () =>
      rows.filter((x) =>
        JSON.stringify(x).toLowerCase().includes(q.toLowerCase()),
      ),
    [rows, q],
  );
  return (
    <>
      <PageHeader
        title="Inventory"
        description="Monitor asset balances, assignments and expenditure."
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
              placeholder="Search inventory..."
            />
          </div>
        </div>
        {loading ? (
          <LoadingState text="Loading inventory..." />
        ) : error ? (
          <ErrorState text={error} onRetry={load} />
        ) : filtered.length === 0 ? (
          <EmptyState text="No inventory records found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Equipment</th>
                  <th className="px-4 py-3">Base</th>
                  <th className="px-4 py-3">Opening</th>
                  <th className="px-4 py-3">Current</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Expended</th>
                  <th className="px-4 py-3">Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((x, i) => (
                  <tr key={x.id || i} className="hover:bg-lime-50/30">
                    <td className="px-4 py-3.5 font-semibold">
                      {x.equipmentTypeName || x.equipmentName || x.name || "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      {x.baseName || x.base?.name || "—"}
                    </td>
                    <td className="px-4 py-3.5">{number(x.openingBalance)}</td>
                    <td className="px-4 py-3.5 font-semibold">
                      {number(
                        x.currentQuantity ?? x.quantity ?? x.closingBalance,
                      )}
                    </td>
                    <td className="px-4 py-3.5">{number(x.assigned)}</td>
                    <td className="px-4 py-3.5">{number(x.expended)}</td>
                    <td className="px-4 py-3.5">{x.unit || "—"}</td>
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
