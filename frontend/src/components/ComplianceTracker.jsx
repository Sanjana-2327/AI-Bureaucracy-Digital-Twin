import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const INITIAL_TASKS = [
    {
        id: 1,
        task: "FSSAI License Renewal",
        authority: "Food Safety & Standards Authority",
        category: "License",
        status: "Completed",
        deadline: "2024-01-15",
        completedOn: "2024-01-10",
        priority: "High",
        notes: "Annual renewal filed via FoSCoS portal",
    },
    {
        id: 2,
        task: "GST Monthly Return (GSTR-3B)",
        authority: "Central Board of Indirect Taxes",
        category: "Tax",
        status: "Completed",
        deadline: "2024-04-20",
        completedOn: "2024-04-18",
        priority: "High",
        notes: "Filed for March 2024",
    },
    {
        id: 3,
        task: "EPF Monthly Contribution",
        authority: "EPFO",
        category: "Compliance",
        status: "Overdue",
        deadline: "2024-04-15",
        completedOn: null,
        priority: "High",
        notes: "April contribution pending",
    },
    {
        id: 4,
        task: "Trade License Renewal",
        authority: "BBMP Bengaluru",
        category: "License",
        status: "Pending",
        deadline: "2024-06-30",
        completedOn: null,
        priority: "Medium",
        notes: "Annual trade license renewal",
    },
    {
        id: 5,
        task: "Professional Tax Payment",
        authority: "Karnataka Tax Department",
        category: "Tax",
        status: "Pending",
        deadline: "2024-05-31",
        completedOn: null,
        priority: "Medium",
        notes: "",
    },
    {
        id: 6,
        task: "ESI Contribution Filing",
        authority: "ESIC",
        category: "Compliance",
        status: "Overdue",
        deadline: "2024-04-15",
        completedOn: null,
        priority: "High",
        notes: "April half-year contribution overdue",
    },
    {
        id: 7,
        task: "KSPCB Consent Renewal",
        authority: "Karnataka State Pollution Control Board",
        category: "Permit",
        status: "Pending",
        deadline: "2024-08-01",
        completedOn: null,
        priority: "Low",
        notes: "Consent to operate renewal",
    },
    {
        id: 8,
        task: "Income Tax Advance Payment Q1",
        authority: "Income Tax Department",
        category: "Tax",
        status: "Completed",
        deadline: "2024-06-15",
        completedOn: "2024-06-10",
        priority: "High",
        notes: "Q1 advance tax deposited",
    },
    {
        id: 9,
        task: "Fire Safety NOC Renewal",
        authority: "Karnataka Fire & Emergency Services",
        category: "Permit",
        status: "Pending",
        deadline: "2024-07-15",
        completedOn: null,
        priority: "Medium",
        notes: "",
    },
    {
        id: 10,
        task: "Annual ROC Filing (Form AOC-4)",
        authority: "Ministry of Corporate Affairs",
        category: "Compliance",
        status: "Pending",
        deadline: "2024-09-30",
        completedOn: null,
        priority: "High",
        notes: "Annual accounts to be filed",
    },
    {
        id: 11,
        task: "TDS Quarterly Return (Form 26Q)",
        authority: "Income Tax Department",
        category: "Tax",
        status: "Completed",
        deadline: "2024-04-30",
        completedOn: "2024-04-25",
        priority: "High",
        notes: "Q4 FY24 TDS return filed",
    },
    {
        id: 12,
        task: "Shop Establishment License Renewal",
        authority: "Dept. of Labour, Karnataka",
        category: "License",
        status: "Pending",
        deadline: "2024-12-31",
        completedOn: null,
        priority: "Low",
        notes: "",
    },
];

const STATUS_STYLES = {
    Completed: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", text: "#4ade80", dot: "#22c55e" },
    Pending: { bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.3)", text: "#fde047", dot: "#eab308" },
    Overdue: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#f87171", dot: "#ef4444" },
};

const PRIORITY_STYLES = {
    High: { color: "#f87171", dot: "#ef4444" },
    Medium: { color: "#fcd34d", dot: "#eab308" },
    Low: { color: "#6ee7b7", dot: "#10b981" },
};

const CATEGORY_COLORS = {
    License: "#a5b4fc",
    Tax: "#fcd34d",
    Compliance: "#67e8f9",
    Permit: "#fca5a5",
};

function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function daysUntil(dateStr) {
    const now = new Date();
    const target = new Date(dateStr);
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff;
}

// ─── Add Task Modal ────────────────────────────────────────────────────────────
function AddTaskModal({ onClose, onAdd }) {
    const [form, setForm] = useState({
        task: "", authority: "", category: "Compliance",
        status: "Pending", deadline: "", priority: "Medium", notes: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.task.trim() || !form.deadline) return;
        onAdd({ ...form, id: Date.now(), completedOn: null });
        onClose();
    };

    const inputStyle = {
        width: "100%", background: "#0a1929", border: "1px solid #1a3a52",
        borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#d9e2ec",
        outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", boxSizing: "border-box",
    };
    const labelStyle = {
        fontSize: 11, fontFamily: "monospace", color: "#486581",
        textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 5,
    };

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 200, animation: "fadeUp 0.2s ease-out",
        }}>
            <div style={{
                background: "#0a1929", border: "1px solid #1a3a52", borderRadius: 16,
                padding: 28, width: 480, maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto",
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "white", margin: 0 }}>
                        Add Compliance Task
                    </h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", color: "#486581", cursor: "pointer", fontSize: 20 }}>✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label style={labelStyle}>Task Name *</label>
                            <input required style={inputStyle} value={form.task}
                                onChange={e => setForm({ ...form, task: e.target.value })}
                                placeholder="e.g. GST Monthly Return" />
                        </div>
                        <div>
                            <label style={labelStyle}>Issuing Authority</label>
                            <input style={inputStyle} value={form.authority}
                                onChange={e => setForm({ ...form, authority: e.target.value })}
                                placeholder="e.g. Income Tax Department" />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Category</label>
                                <select value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                    style={{ ...inputStyle, cursor: "pointer" }}>
                                    {["License", "Tax", "Compliance", "Permit"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Priority</label>
                                <select value={form.priority}
                                    onChange={e => setForm({ ...form, priority: e.target.value })}
                                    style={{ ...inputStyle, cursor: "pointer" }}>
                                    {["High", "Medium", "Low"].map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Deadline *</label>
                            <input required type="date"
                                style={{ ...inputStyle, colorScheme: "dark" }}
                                value={form.deadline}
                                onChange={e => setForm({ ...form, deadline: e.target.value })} />
                        </div>
                        <div>
                            <label style={labelStyle}>Notes</label>
                            <textarea
                                style={{ ...inputStyle, resize: "vertical", minHeight: 70 }}
                                value={form.notes}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                placeholder="Optional notes..." />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                        <button type="button" onClick={onClose} style={{
                            flex: 1, background: "none", border: "1px solid #1a3a52", color: "#627d98",
                            borderRadius: 8, padding: "10px", fontSize: 13, cursor: "pointer",
                        }}>Cancel</button>
                        <button type="submit" style={{
                            flex: 2, background: "#ff7d0f", border: "none", color: "white",
                            borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        }}>Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ComplianceTracker() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [showModal, setShowModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("deadline");

    const completed = tasks.filter(t => t.status === "Completed").length;
    const overdue = tasks.filter(t => t.status === "Overdue").length;
    const pending = tasks.filter(t => t.status === "Pending").length;
    const progress = Math.round((completed / tasks.length) * 100);

    const filtered = tasks
        .filter(t => statusFilter === "All" || t.status === statusFilter)
        .sort((a, b) => {
            if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
            if (sortBy === "priority") {
                const order = { High: 0, Medium: 1, Low: 2 };
                return order[a.priority] - order[b.priority];
            }
            return 0;
        });

    const toggleStatus = (id) => {
        setTasks(prev => prev.map(t => {
            if (t.id !== id) return t;
            const next = t.status === "Completed" ? "Pending" : "Completed";
            return { ...t, status: next, completedOn: next === "Completed" ? new Date().toISOString().split("T")[0] : null };
        }));
    };

    const handleAdd = (task) => setTasks(prev => [...prev, task]);

    return (
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#d9e2ec" }}>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        select option { background: #0a1929; }
      `}</style>

            {showModal && <AddTaskModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "white", margin: 0, marginBottom: 5 }}>
                        Compliance Tracker
                    </h2>
                    <p style={{ fontSize: 13, color: "#486581", margin: 0 }}>
                        Track your regulatory obligations, deadlines and filings
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        display: "flex", alignItems: "center", gap: 7,
                        background: "#ff7d0f", border: "none", color: "white",
                        borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#ff9d36"}
                    onMouseLeave={e => e.currentTarget.style.background = "#ff7d0f"}
                >
                    <span style={{ fontSize: 16 }}>+</span> Add Task
                </button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
                {[
                    { label: "Total Tasks", value: tasks.length, color: "#93c5fd", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
                    { label: "Completed", value: completed, color: "#4ade80", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
                    { label: "Pending", value: pending, color: "#fde047", bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.2)" },
                    { label: "Overdue", value: overdue, color: "#f87171", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" },
                ].map(card => (
                    <div key={card.label} style={{
                        background: card.bg, border: `1px solid ${card.border}`,
                        borderRadius: 12, padding: "16px 18px",
                    }}>
                        <div style={{ fontSize: 28, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: card.color, lineHeight: 1, marginBottom: 4 }}>
                            {card.value}
                        </div>
                        <div style={{ fontSize: 12, fontFamily: "monospace", color: "#627d98", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {card.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Bar */}
            <div style={{ background: "#0a1929", border: "1px solid #0d2137", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#d9e2ec" }}>Overall Compliance Progress</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#4ade80" }}>{progress}%</span>
                        <span style={{ fontFamily: "monospace", fontSize: 12, color: "#486581" }}>{completed}/{tasks.length} completed</span>
                    </div>
                </div>
                <div style={{ background: "#0d2137", borderRadius: 99, height: 8, overflow: "hidden" }}>
                    <div style={{
                        height: "100%", borderRadius: 99, width: `${progress}%`,
                        background: "linear-gradient(90deg, #22c55e, #4ade80)",
                        transition: "width 0.6s ease",
                    }} />
                </div>
                {overdue > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                        <span style={{ color: "#f87171", fontSize: 13 }}>⚠</span>
                        <span style={{ fontSize: 12, color: "#fca5a5" }}>
                            {overdue} task{overdue > 1 ? "s are" : " is"} overdue — action required
                        </span>
                    </div>
                )}
            </div>

            {/* Filters + Sort */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 6 }}>
                    {["All", "Pending", "Completed", "Overdue"].map(s => {
                        const isActive = statusFilter === s;
                        const style = s !== "All" ? STATUS_STYLES[s] : null;
                        return (
                            <button key={s} onClick={() => setStatusFilter(s)} style={{
                                padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                                border: `1px solid ${isActive && style ? style.border : isActive ? "rgba(255,125,15,0.4)" : "#1a3a52"}`,
                                background: isActive && style ? style.bg : isActive ? "rgba(255,125,15,0.1)" : "#0a1929",
                                color: isActive && style ? style.text : isActive ? "#ffb86c" : "#486581",
                                cursor: "pointer", transition: "all 0.15s", fontFamily: "monospace",
                            }}>
                                {s !== "All" && (
                                    <span style={{ marginRight: 5 }}>
                                        {s === "Completed" ? "✓" : s === "Overdue" ? "⚠" : "○"}
                                    </span>
                                )}
                                {s}
                            </button>
                        );
                    })}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: "#334e68" }}>Sort:</span>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                        background: "#0a1929", border: "1px solid #1a3a52", borderRadius: 7,
                        padding: "6px 10px", fontSize: 12, color: "#9fb3c8", outline: "none",
                        cursor: "pointer", fontFamily: "monospace",
                    }}>
                        <option value="deadline">By Deadline</option>
                        <option value="priority">By Priority</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#08151f", border: "1px solid #0d2137", borderRadius: 14, overflow: "hidden" }}>
                {/* Table header */}
                <div style={{
                    display: "grid", gridTemplateColumns: "2fr 1.4fr 100px 90px 110px 110px 80px",
                    padding: "12px 20px", borderBottom: "1px solid #0d2137", background: "#0a1929",
                }}>
                    {["Task", "Authority", "Category", "Priority", "Deadline", "Status", "Action"].map(h => (
                        <div key={h} style={{ fontSize: 11, fontFamily: "monospace", color: "#334e68", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {h}
                        </div>
                    ))}
                </div>

                {/* Rows */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "50px 20px", color: "#334e68" }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#486581" }}>No tasks found</div>
                    </div>
                ) : (
                    filtered.map((task, idx) => {
                        const st = STATUS_STYLES[task.status];
                        const pr = PRIORITY_STYLES[task.priority];
                        const days = daysUntil(task.deadline);
                        const catColor = CATEGORY_COLORS[task.category] || "#9fb3c8";

                        return (
                            <div
                                key={task.id}
                                style={{
                                    display: "grid", gridTemplateColumns: "2fr 1.4fr 100px 90px 110px 110px 80px",
                                    padding: "14px 20px", borderBottom: "1px solid #0a1929",
                                    background: idx % 2 === 0 ? "#08151f" : "#060f1a",
                                    transition: "background 0.15s", alignItems: "center",
                                    animation: `fadeUp 0.3s ease-out ${idx * 30}ms both`,
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "#0d2137"}
                                onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "#08151f" : "#060f1a"}
                            >
                                {/* Task name */}
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#d9e2ec", marginBottom: 3, lineHeight: 1.3 }}>{task.task}</div>
                                    {task.notes && <div style={{ fontSize: 11, color: "#334e68", fontFamily: "monospace" }}>{task.notes}</div>}
                                </div>

                                {/* Authority */}
                                <div style={{ fontSize: 12, color: "#627d98", lineHeight: 1.4 }}>{task.authority || "—"}</div>

                                {/* Category */}
                                <div>
                                    <span style={{
                                        fontSize: 11, fontFamily: "monospace", color: catColor,
                                        background: `${catColor}12`, border: `1px solid ${catColor}30`,
                                        borderRadius: 6, padding: "2px 8px",
                                    }}>{task.category}</span>
                                </div>

                                {/* Priority */}
                                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: pr.dot, flexShrink: 0 }} />
                                    <span style={{ fontSize: 12, color: pr.color, fontFamily: "monospace" }}>{task.priority}</span>
                                </div>

                                {/* Deadline */}
                                <div>
                                    <div style={{ fontSize: 12, color: "#9fb3c8", fontFamily: "monospace" }}>{formatDate(task.deadline)}</div>
                                    {task.status !== "Completed" && (
                                        <div style={{
                                            fontSize: 11, fontFamily: "monospace", marginTop: 2,
                                            color: days < 0 ? "#f87171" : days <= 7 ? "#fcd34d" : "#486581",
                                        }}>
                                            {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "Today" : `${days}d left`}
                                        </div>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <span style={{
                                        background: st.bg, border: `1px solid ${st.border}`, color: st.text,
                                        borderRadius: 20, padding: "3px 10px", fontSize: 11, fontFamily: "monospace",
                                        fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5,
                                    }}>
                                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot }} />
                                        {task.status}
                                    </span>
                                </div>

                                {/* Action */}
                                <div>
                                    <button
                                        onClick={() => toggleStatus(task.id)}
                                        title={task.status === "Completed" ? "Mark as Pending" : "Mark as Completed"}
                                        style={{
                                            background: task.status === "Completed" ? "rgba(34,197,94,0.08)" : "rgba(255,125,15,0.08)",
                                            border: `1px solid ${task.status === "Completed" ? "rgba(34,197,94,0.25)" : "rgba(255,125,15,0.25)"}`,
                                            color: task.status === "Completed" ? "#4ade80" : "#ffb86c",
                                            borderRadius: 7, padding: "5px 10px", fontSize: 13, cursor: "pointer",
                                            transition: "all 0.15s",
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                    >
                                        {task.status === "Completed" ? "↩" : "✓"}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div style={{ marginTop: 14, textAlign: "right", fontSize: 11, fontFamily: "monospace", color: "#1a3a52" }}>
                Click ✓ to mark complete · Click ↩ to revert · Showing {filtered.length} tasks
            </div>
        </div>
    );
}
