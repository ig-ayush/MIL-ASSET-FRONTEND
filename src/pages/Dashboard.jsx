import { useEffect, useState } from "react";
import {
  Boxes,
  ShoppingCart,
  ArrowDownToLine,
  ArrowUpFromLine,
  PackageCheck,
  UserRound,
  ReceiptText,
  Activity,
  RefreshCw,
} from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../components/common/State";
import { getDashboard } from "../api/dashboardApi";
import { getApiError } from "../api/axios";
import { number } from "../utils/formatters";
import { useAuth } from "../context/AuthContext";

const cards = [
  ["openingBalance", "Opening Balance", Boxes],
  ["totalPurchases", "Total Purchases", ShoppingCart],
  ["transferIn", "Transfer In", ArrowDownToLine],
  ["transferOut", "Transfer Out", ArrowUpFromLine],
  ["closingBalance", "Closing Balance", PackageCheck],
  ["totalAssigned", "Total Assigned", UserRound],
  ["totalExpended", "Total Expended", ReceiptText],
  ["netMovement", "Net Movement", Activity],
];
const pick = (o, ...keys) => {
  for (const k of keys) if (o?.[k] !== undefined) return o[k];
  return 0;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await getDashboard(
        user?.role === "ADMIN" ? {} : { baseId: user?.baseId },
      );
      setData(r.data);
    } catch (e) {
      setError(getApiError(e));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, [user?.baseId, user?.role]);
  if (loading)
    return (
      <>
        <PageHeader
          title="Dashboard"
          description="Live operational overview from the backend."
        />
        <LoadingState text="Loading dashboard..." />
      </>
    );
  if (error)
    return (
      <>
        <PageHeader
          title="Dashboard"
          description="Live operational overview from the backend."
        />
        <ErrorState text={error} onRetry={load} />
      </>
    );
  const summary = data?.summary || data?.statistics || data || {};
  const equipment =
    data?.equipmentSummary || data?.equipment || data?.items || [];
  return (
    <>
      <PageHeader
        title="Dashboard"
        description={
          user?.role === "ADMIN"
            ? "System-wide asset position across all bases."
            : `Operational position for ${user?.baseName || "your assigned base"}.`
        }
        action={
          <button className="btn-secondary" onClick={load}>
            <RefreshCw size={16} /> Refresh
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        {cards.map(([key, label, Icon], i) => (
          <div className="card p-4" key={key}>
            <div className="mb-3 flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-lime-50 text-[#3F6212]">
                <Icon size={17} />
              </div>
              <span className="text-[10px] font-bold text-slate-300">
                0{i + 1}
              </span>
            </div>
            <p className="text-xl font-bold text-slate-900">
              {number(
                pick(
                  summary,
                  key,
                  label
                    .replaceAll(" ", "")
                    .replace("Total", "total")
                    .replace("Opening", "opening")
                    .replace("Closing", "closing")
                    .replace("Net", "net"),
                ),
              )}
            </p>
            <p className="mt-1 text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="card mt-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-bold text-slate-900">Equipment Summary</h2>
          <p className="mt-1 text-xs text-slate-500">
            Current position supplied by the inventory backend.
          </p>
        </div>
        {equipment.length === 0 ? (
          <EmptyState text="No equipment summary records found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Equipment Type</th>
                  <th className="px-5 py-3">Unit</th>
                  <th className="px-5 py-3">Opening Balance</th>
                  <th className="px-5 py-3">Current Quantity</th>
                  <th className="px-5 py-3">Assigned</th>
                  <th className="px-5 py-3">Expended</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {equipment.map((x, i) => (
                  <tr
                    key={x.id || x.equipmentTypeId || i}
                    className="hover:bg-lime-50/30"
                  >
                    <td className="px-5 py-3.5 font-semibold">
                      {x.equipmentTypeName || x.equipmentName || x.name || "—"}
                    </td>
                    <td className="px-5 py-3.5">{x.unit || "—"}</td>
                    <td className="px-5 py-3.5">{number(x.openingBalance)}</td>
                    <td className="px-5 py-3.5 font-semibold">
                      {number(
                        x.currentQuantity ?? x.quantity ?? x.closingBalance,
                      )}
                    </td>
                    <td className="px-5 py-3.5">{number(x.assigned)}</td>
                    <td className="px-5 py-3.5">{number(x.expended)}</td>
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
