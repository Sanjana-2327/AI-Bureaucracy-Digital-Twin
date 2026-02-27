import { useState, useMemo } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DOCUMENTS = [
    {
        id: 1,
        name: "FSSAI Basic Registration Form",
        authority: "Food Safety & Standards Authority of India",
        state: "All India",
        category: "Registration",
        fileType: "PDF",
        fileSize: "245 KB",
        updatedAt: "Jan 2024",
        url: "https://foscos.fssai.gov.in",
        description: "Mandatory form for food businesses with turnover below ₹12 lakhs/year.",
    },
    {
        id: 2,
        name: "Udyam Registration Certificate",
        authority: "Ministry of MSME",
        state: "All India",
        category: "Registration",
        fileType: "PDF",
        fileSize: "120 KB",
        updatedAt: "Mar 2024",
        url: "https://udyamregistration.gov.in",
        description: "MSME registration for micro, small and medium enterprises.",
    },
    {
        id: 3,
        name: "BBMP Trade License Application",
        authority: "Bruhat Bengaluru Mahanagara Palike",
        state: "Karnataka",
        category: "License",
        fileType: "PDF",
        fileSize: "310 KB",
        updatedAt: "Feb 2024",
        url: "https://bbmp.gov.in",
        description: "Trade license application for businesses operating in Bengaluru.",
    },
    {
        id: 4,
        name: "GST New Registration Form",
        authority: "Central Board of Indirect Taxes",
        state: "All India",
        category: "Registration",
        fileType: "Online",
        fileSize: "—",
        updatedAt: "Apr 2024",
        url: "https://gst.gov.in",
        description: "GST registration for businesses exceeding ₹20 lakh threshold.",
    },
    {
        id: 5,
        name: "Maharashtra Shop & Establishment",
        authority: "Labour Department, Maharashtra",
        state: "Maharashtra",
        category: "License",
        fileType: "PDF",
        fileSize: "190 KB",
        updatedAt: "Jan 2024",
        url: "https://aaplesarkar.mahaonline.gov.in",
        description: "License for shops and commercial establishments in Maharashtra.",
    },
    {
        id: 6,
        name: "Delhi Factory License Form",
        authority: "Directorate of Factories, Delhi",
        state: "Delhi",
        category: "License",
        fileType: "PDF",
        fileSize: "275 KB",
        updatedAt: "Dec 2023",
        url: "https://labour.delhi.gov.in",
        description: "Factory license application under the Factories Act, 1948.",
    },
    {
        id: 7,
        name: "Environmental Clearance NOC",
        authority: "Ministry of Environment & Forest",
        state: "All India",
        category: "Permit",
        fileType: "PDF",
        fileSize: "415 KB",
        updatedAt: "Nov 2023",
        url: "https://parivesh.nic.in",
        description: "Environmental clearance for industries, mining and infrastructure projects.",
    },
    {
        id: 8,
        name: "Building Construction Permit",
        authority: "Municipal Corporation of Delhi",
        state: "Delhi",
        category: "Permit",
        fileType: "PDF",
        fileSize: "230 KB",
        updatedAt: "Feb 2024",
        url: "https://mcdonline.nic.in",
        description: "Sanction plan and construction permit for residential/commercial buildings.",
    },
    {
        id: 9,
        name: "TN Pharmacy Establishment License",
        authority: "Tamil Nadu Medical Services",
        state: "Tamil Nadu",
        category: "License",
        fileType: "PDF",
        fileSize: "155 KB",
        updatedAt: "Mar 2024",
        url: "https://www.tnpharmacy.com",
        description: "License to operate a pharmacy or drug store in Tamil Nadu.",
    },
    {
        id: 10,
        name: "Annual Compliance Return (PF/ESI)",
        authority: "EPFO / ESIC",
        state: "All India",
        category: "Compliance",
        fileType: "Online",
        fileSize: "—",
        updatedAt: "Apr 2024",
        url: "https://unifiedportal-emp.epfindia.gov.in",
        description: "Mandatory annual return filing for Provident Fund and ESI contributions.",
    },
    {
        id: 11,
        name: "Gujarat Industries Establishment NOC",
        authority: "Gujarat Industries Commissioner",
        state: "Gujarat",
        category: "Permit",
        fileType: "PDF",
        fileSize: "200 KB",
        updatedAt: "Jan 2024",
        url: "https://ic.gujarat.gov.in",
        description: "NOC required before establishing a new industry in Gujarat.",
    },
    {
        id: 12,
        name: "Karnataka KSPCB Consent to Establish",
        authority: "Karnataka State Pollution Control Board",
        state: "Karnataka",
        category: "Compliance",
        fileType: "PDF",
        fileSize: "340 KB",
        updatedAt: "Feb 2024",
        url: "https://kspcb.karnataka.gov.in",
        description: "Mandatory pollution control consent for new industries in Karnataka.",
    },
];

const STATES = ["All India", "Karnataka", "Maharashtra", "Delhi", "Tamil Nadu", "Gujarat"];
const CATEGORIES = ["All", "License", "Registration", "Permit", "Compliance"];

const CATEGORY_STYLES = {
    License: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.35)", text: "#a5b4fc" },
    Registration: { bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)", text: "#5eead4" },
    Permit: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: "#fcd34d" },
    Compliance: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", text: "#fca5a5" },
};

const FILE_ICONS = {
    PDF: { icon: "⬇", color: "#f87171" },
    Online: { icon: "↗", color: "#60a5fa" },
};

// ─── Document Card ─────────────────────────────────────────────────────────────
function DocumentCard({ doc, index }) {
    const cat = CATEGORY_STYLES[doc.category] || CATEGORY_STYLES.License;
    const fileInfo = FILE_ICONS[doc.fileType] || FILE_ICONS.PDF;

    return (
        <div
            className="doc-card"
            style={{
                background: "#0a1929",
                border: "1px solid #0d2137",
                borderRadius: 14,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                animationDelay: `${index * 40}ms`,
                animation: "fadeUp 0.35s ease-out both",
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,125,15,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#0d2137";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                        color: "#e2ecf5", lineHeight: 1.4, marginBottom: 6,
                    }}>{doc.name}</div>
                    <div style={{ fontSize: 11, fontFamily: "monospace", color: "#486581" }}>
                        {doc.authority}
                    </div>
                </div>
                {/* Category badge */}
                <span style={{
                    background: cat.bg, border: `1px solid ${cat.border}`, color: cat.text,
                    borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600,
                    fontFamily: "monospace", whiteSpace: "nowrap", flexShrink: 0,
                }}>{doc.category}</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: 12, color: "#627d98", lineHeight: 1.65, margin: 0 }}>
                {doc.description}
            </p>

            {/* Meta row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{
                    background: "#0d2137", border: "1px solid #1a3a52", borderRadius: 6,
                    padding: "3px 9px", fontSize: 11, fontFamily: "monospace", color: "#829ab1",
                    display: "flex", alignItems: "center", gap: 5,
                }}>
                    🗺 {doc.state}
                </span>
                {doc.fileSize !== "—" && (
                    <span style={{
                        background: "#0d2137", border: "1px solid #1a3a52", borderRadius: 6,
                        padding: "3px 9px", fontSize: 11, fontFamily: "monospace", color: "#627d98",
                    }}>{doc.fileType} · {doc.fileSize}</span>
                )}
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#334e68", marginLeft: "auto" }}>
                    Updated {doc.updatedAt}
                </span>
            </div>

            {/* Download button */}
            <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    background: "rgba(255,125,15,0.08)", border: "1px solid rgba(255,125,15,0.25)",
                    color: "#ffb86c", borderRadius: 8, padding: "9px 0", fontSize: 13, fontWeight: 600,
                    textDecoration: "none", transition: "all 0.15s", marginTop: 4,
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,125,15,0.15)";
                    e.currentTarget.style.borderColor = "rgba(255,125,15,0.45)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,125,15,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,125,15,0.25)";
                }}
            >
                <span style={{ fontSize: 15 }}>{fileInfo.icon}</span>
                {doc.fileType === "Online" ? "Open Portal" : "Download"}
            </a>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function DocumentLibrary() {
    const [search, setSearch] = useState("");
    const [stateFilter, setStateFilter] = useState("All India");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const filtered = useMemo(() => {
        return DOCUMENTS.filter(doc => {
            const matchSearch =
                search === "" ||
                doc.name.toLowerCase().includes(search.toLowerCase()) ||
                doc.authority.toLowerCase().includes(search.toLowerCase());
            const matchState =
                stateFilter === "All India" ||
                doc.state === stateFilter ||
                doc.state === "All India";
            const matchCategory =
                categoryFilter === "All" || doc.category === categoryFilter;
            return matchSearch && matchState && matchCategory;
        });
    }, [search, stateFilter, categoryFilter]);

    const counts = useMemo(() =>
        CATEGORIES.slice(1).reduce((acc, cat) => {
            acc[cat] = DOCUMENTS.filter(d => d.category === cat).length;
            return acc;
        }, {}), []);

    return (
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#d9e2ec", minHeight: "100%" }}>
            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        select option { background: #0a1929; color: #d9e2ec; }
      `}</style>

            {/* Header */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
                    <div>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "white", margin: 0, marginBottom: 5 }}>
                            Document Library
                        </h2>
                        <p style={{ fontSize: 13, color: "#486581", margin: 0 }}>
                            {DOCUMENTS.length} government forms, registrations & permits — ready to access
                        </p>
                    </div>
                    {/* Stats pills */}
                    <div style={{ display: "flex", gap: 8 }}>
                        {Object.entries(counts).map(([cat, count]) => {
                            const s = CATEGORY_STYLES[cat];
                            return (
                                <span key={cat} style={{
                                    background: s.bg, border: `1px solid ${s.border}`, color: s.text,
                                    borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "monospace",
                                }}>{count} {cat}</span>
                            );
                        })}
                    </div>
                </div>

                {/* Search + Filters */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {/* Search */}
                    <div style={{ position: "relative", flex: 1 }}>
                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#334e68", fontSize: 15 }}>🔍</span>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search documents, authorities..."
                            style={{
                                width: "100%", background: "#0a1929", border: "1px solid #1a3a52",
                                borderRadius: 10, padding: "11px 14px 11px 40px", fontSize: 13,
                                color: "#d9e2ec", outline: "none", fontFamily: "'IBM Plex Sans', sans-serif",
                                boxSizing: "border-box", transition: "border-color 0.2s",
                            }}
                            onFocus={e => e.target.style.borderColor = "rgba(255,125,15,0.5)"}
                            onBlur={e => e.target.style.borderColor = "#1a3a52"}
                        />
                    </div>

                    {/* State filter */}
                    <select
                        value={stateFilter}
                        onChange={e => setStateFilter(e.target.value)}
                        style={{
                            background: "#0a1929", border: "1px solid #1a3a52", borderRadius: 10,
                            padding: "11px 14px", fontSize: 13, color: "#9fb3c8", outline: "none",
                            cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", minWidth: 150,
                        }}
                    >
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    {/* Category filter */}
                    <div style={{ display: "flex", gap: 6 }}>
                        {CATEGORIES.map(cat => {
                            const isActive = categoryFilter === cat;
                            const s = cat === "All" ? null : CATEGORY_STYLES[cat];
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    style={{
                                        padding: "9px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                                        border: isActive
                                            ? `1px solid ${s ? s.border : "rgba(255,125,15,0.4)"}`
                                            : "1px solid #1a3a52",
                                        background: isActive
                                            ? (s ? s.bg : "rgba(255,125,15,0.1)")
                                            : "#0a1929",
                                        color: isActive
                                            ? (s ? s.text : "#ffb86c")
                                            : "#486581",
                                        cursor: "pointer", transition: "all 0.15s",
                                        fontFamily: "monospace",
                                    }}
                                >{cat}</button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Results count */}
            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#334e68" }}>
                    Showing {filtered.length} of {DOCUMENTS.length} documents
                </span>
                {(search || categoryFilter !== "All" || stateFilter !== "All India") && (
                    <button
                        onClick={() => { setSearch(""); setStateFilter("All India"); setCategoryFilter("All"); }}
                        style={{
                            background: "none", border: "1px solid #1a3a52", color: "#486581",
                            borderRadius: 6, padding: "2px 10px", fontSize: 11, cursor: "pointer",
                            fontFamily: "monospace", transition: "all 0.15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#486581"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "#1a3a52"}
                    >✕ Clear filters</button>
                )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#334e68" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#486581", marginBottom: 6 }}>No documents found</div>
                    <div style={{ fontSize: 13 }}>Try adjusting your search or filters</div>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 16,
                }}>
                    {filtered.map((doc, i) => (
                        <DocumentCard key={doc.id} doc={doc} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
