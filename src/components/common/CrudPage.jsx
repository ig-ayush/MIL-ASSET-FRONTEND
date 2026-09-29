import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw, Search } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "./PageHeader";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { EmptyState, ErrorState, LoadingState } from "./State";
import { getApiError } from "../../api/axios";

export default function CrudPage({ title, description, fetcher, creator, columns, form, createLabel = "Add New", emptyText, searchKeys = [] }) {
  const [rows,setRows]=useState([]), [loading,setLoading]=useState(true), [error,setError]=useState(""), [query,setQuery]=useState(""), [open,setOpen]=useState(false), [saving,setSaving]=useState(false);
  const load=async()=>{setLoading(true);setError("");try{const r=await fetcher();const d=r.data;setRows(Array.isArray(d)?d:(d?.content||d?.data||d?.items||d?.results||[]));}catch(e){setError(getApiError(e));}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);
  const filtered=useMemo(()=>{const q=query.toLowerCase().trim();if(!q)return rows;return rows.filter(x=>searchKeys.some(k=>String(x?.[k]??"").toLowerCase().includes(q)));},[rows,query,searchKeys]);
  const submit=async(payload)=>{setSaving(true);try{await creator(payload);toast.success(`${title.replace(/s$/,"")} created successfully.`);setOpen(false);await load();}catch(e){toast.error(getApiError(e,`Unable to create ${title.toLowerCase()}.`));}finally{setSaving(false);}};
  return <><PageHeader title={title} description={description} action={<button className="btn-primary" onClick={()=>setOpen(true)}><Plus size={17}/>{createLabel}</button>}/>
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative max-w-md flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} className="input pl-9" placeholder="Search records..."/></div><button className="btn-secondary" onClick={load}><RefreshCw size={16} className={loading?"animate-spin":""}/>Refresh</button></div>
      {loading?<LoadingState text={`Loading ${title.toLowerCase()}...`}/>:error?<ErrorState text={error} onRetry={load}/>:filtered.length===0?<EmptyState text={emptyText||`No ${title.toLowerCase()} found.`}/>:<DataTable columns={columns} rows={filtered}/>}
    </div>
    <Modal open={open} onClose={()=>!saving&&setOpen(false)} title={createLabel}><form onSubmit={e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const payload=Object.fromEntries(fd.entries());Object.keys(payload).forEach(k=>{if(payload[k]==="")delete payload[k];});submit(payload);}} className="space-y-4">{form}<div className="flex justify-end gap-3 pt-2"><button type="button" className="btn-secondary" onClick={()=>setOpen(false)} disabled={saving}>Cancel</button><button className="btn-primary" disabled={saving}>{saving?"Saving...":"Save"}</button></div></form></Modal>
  </>;
}