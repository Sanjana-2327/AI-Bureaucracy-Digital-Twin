import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATES = [
    {
        code: "KA", name: "Karnataka", capital: "Bengaluru", flag: "🌿",
        portals: {
            stateGovt: { label: "Karnataka.gov.in", url: "https://www.karnataka.gov.in" },
            industries: { label: "Invest Karnataka", url: "https://investkarnataka.co.in" },
            foodSafety: { label: "FSSAI Karnataka Office", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "BBMP Bengaluru", url: "https://bbmp.gov.in" },
        },
        departments: ["Dept. of Industries & Commerce", "KSPCB", "Dept. of Health & Family Welfare", "Revenue Department"],
        color: "#22c55e",
    },
    {
        code: "MH", name: "Maharashtra", capital: "Mumbai", flag: "🟧",
        portals: {
            stateGovt: { label: "Maharashtra.gov.in", url: "https://www.maharashtra.gov.in" },
            industries: { label: "Invest Maharashtra", url: "https://invest.maharashtra.gov.in" },
            foodSafety: { label: "FSSAI MH State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "BMC Mumbai", url: "https://mcgm.gov.in" },
        },
        departments: ["MIDC", "Maha-RERA", "Dept. of Labour", "Industries, Energy & Labour"],
        color: "#f97316",
    },
    {
        code: "DL", name: "Delhi", capital: "New Delhi", flag: "🏛️",
        portals: {
            stateGovt: { label: "Delhi.gov.in", url: "https://delhi.gov.in" },
            industries: { label: "DSIIDC", url: "https://dsiidc.org" },
            foodSafety: { label: "FSSAI Delhi", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "MCD Delhi", url: "https://mcdonline.nic.in" },
        },
        departments: ["Dept. of Industries", "Dept. of Labour", "Delhi Pollution Control", "DDA"],
        color: "#3b82f6",
    },
    {
        code: "TN", name: "Tamil Nadu", capital: "Chennai", flag: "🌊",
        portals: {
            stateGovt: { label: "TN.gov.in", url: "https://www.tn.gov.in" },
            industries: { label: "TIDCO", url: "https://www.tidco.com" },
            foodSafety: { label: "FSSAI TN State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "GCC Chennai", url: "https://www.chennaicorporation.gov.in" },
        },
        departments: ["SIPCOT", "TNPCB", "Labour & Employment", "Registrar of Firms"],
        color: "#a855f7",
    },
    {
        code: "GJ", name: "Gujarat", capital: "Gandhinagar", flag: "🦁",
        portals: {
            stateGovt: { label: "Gujarat.gov.in", url: "https://gujaratindia.gov.in" },
            industries: { label: "iNDEXTb Gujarat", url: "https://www.indextb.com" },
            foodSafety: { label: "FSSAI GJ State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "AMC Ahmedabad", url: "https://ahmedabadcity.gov.in" },
        },
        departments: ["GIDC", "GPCB", "Industries & Mines Dept.", "Registrar of Societies"],
        color: "#eab308",
    },
    {
        code: "UP", name: "Uttar Pradesh", capital: "Lucknow", flag: "🕌",
        portals: {
            stateGovt: { label: "UP.gov.in", url: "https://up.gov.in" },
            industries: { label: "Invest UP", url: "https://www.investup.com" },
            foodSafety: { label: "FSSAI UP State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "LMC Lucknow", url: "https://www.lmc.up.nic.in" },
        },
        departments: ["UPSIDA", "UPPCB", "Dept. of Labour", "Revenue Dept."],
        color: "#06b6d4",
    },
    {
        code: "RJ", name: "Rajasthan", capital: "Jaipur", flag: "🏜️",
        portals: {
            stateGovt: { label: "Rajasthan.gov.in", url: "https://www.rajasthan.gov.in" },
            industries: { label: "RIICO", url: "https://riico.co.in" },
            foodSafety: { label: "FSSAI RJ State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "JMC Jaipur", url: "https://jaipurmc.org" },
        },
        departments: ["RIICO", "RSPCB", "Labour Department", "Mines & Geology"],
        color: "#f59e0b",
    },
    {
        code: "WB", name: "West Bengal", capital: "Kolkata", flag: "🎨",
        portals: {
            stateGovt: { label: "WB.gov.in", url: "https://wb.gov.in" },
            industries: { label: "West Bengal MSME", url: "https://wbmsme.gov.in" },
            foodSafety: { label: "FSSAI WB State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "KMC Kolkata", url: "https://www.kmcgov.in" },
        },
        departments: ["WBIDC", "WBPCB", "Labour Dept.", "Municipal Affairs"],
        color: "#ec4899",
    },
    {
        code: "TS", name: "Telangana", capital: "Hyderabad", flag: "💎",
        portals: {
            stateGovt: { label: "Telangana.gov.in", url: "https://www.telangana.gov.in" },
            industries: { label: "TSIIC", url: "https://tsiic.telangana.gov.in" },
            foodSafety: { label: "FSSAI TS State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "GHMC Hyderabad", url: "https://ghmc.gov.in" },
        },
        departments: ["TSIIC", "TSPCB", "Labour Dept.", "Revenue Dept."],
        color: "#14b8a6",
    },
    {
        code: "KL", name: "Kerala", capital: "Thiruvananthapuram", flag: "🌴",
        portals: {
            stateGovt: { label: "Kerala.gov.in", url: "https://www.kerala.gov.in" },
            industries: { label: "Invest Kerala", url: "https://investkerala.org" },
            foodSafety: { label: "FSSAI KL State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "TVM Corporation", url: "https://www.corporationoftrivandrum.in" },
        },
        departments: ["KINFRA", "KSPCB", "Labour Dept.", "Local Self Govt."],
        color: "#84cc16",
    },
    {
        code: "MP", name: "Madhya Pradesh", capital: "Bhopal", flag: "🌾",
        portals: {
            stateGovt: { label: "MP.gov.in", url: "https://www.mp.gov.in" },
            industries: { label: "Invest MP", url: "https://www.investmp.com" },
            foodSafety: { label: "FSSAI MP State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "BMC Bhopal", url: "https://www.bhopalmunicipal.com" },
        },
        departments: ["MPIDC", "MPPCB", "Labour Dept.", "Revenue & Forest"],
        color: "#fb923c",
    },
    {
        code: "AP", name: "Andhra Pradesh", capital: "Amaravati", flag: "⚡",
        portals: {
            stateGovt: { label: "AP.gov.in", url: "https://www.ap.gov.in" },
            industries: { label: "APIIC", url: "https://apiic.in" },
            foodSafety: { label: "FSSAI AP State", url: "https://foscos.fssai.gov.in" },
            municipality: { label: "VMC Vijayawada", url: "https://vmcvijayawada.in" },
        },
        departments: ["APIIC", "APPCB", "Labour Dept.", "Industries & Commerce"],
        color: "#6366f1",
    },
];

const PORTAL_META = {
    stateGovt: { label: "State Portal", icon: "🏛️", color: "#60a5fa" },
    industries: { label: "Industries Dept.", icon: "🏭", color: "#34d399" },
    foodSafety: { label: "Food Safety", icon: "🍽️", color: "#fbbf24" },
    municipality: { label: "Municipality", icon: "🏙️", color: "#f472b6" },
};

// ─── State Card ────────────────────────────────────────────────────────────────
function StateCard({ state, isSelected, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: isSelected ? `${state.color}12` : hovered ? "#0d2137" : "#0a1929",
                border: `1.5px solid ${isSelected ? state.color : hovered ? "#1a3a52" : "#0d2137"}`,
                borderRadius: 12,
                padding: "14px 16px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.18s",
                transform: hovered && !isSelected ? "translateY(-2px)" : "none",
                boxShadow: isSelected ? `0 0 20px ${state.color}22` : "none",
                width: "100%",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                    width: 36, height: 36, borderRadius: 8, fontSize: 18,
                    background: isSelected ? `${state.color}20` : "#0d2137",
                    border: `1px solid ${isSelected ? `${state.color}40` : "#1a3a52"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.18s",
                }}>{state.flag}</span>
                <div>
                    <div style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
                        color: isSelected ? state.color : "#d9e2ec", lineHeight: 1.2,
                    }}>{state.name}</div>
                    <div style={{ fontSize: 11, fontFamily: "monospace", color: "#334e68", marginTop: 2 }}>
                        {state.capital}
                    </div>
                </div>
                {isSelected && (
                    <div style={{
                        marginLeft: "auto", width: 8, height: 8, borderRadius: "50%",
                        background: state.color, boxShadow: `0 0 8px ${state.color}`,
                    }} />
                )}
            </div>
        </button>
    );
}

// ─── Portal Detail Panel ───────────────────────────────────────────────────────
function StateDetail({ state }) {
    return (
        <div style={{ animation: "slideIn 0.3s ease-out" }}>
            <style>{`@keyframes slideIn { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }`}</style>

            {/* State Header */}
            <div style={{
                background: `linear-gradient(135deg, ${state.color}10, transparent)`,
                border: `1px solid ${state.color}30`,
                borderRadius: 14, padding: "22px 24px", marginBottom: 20,
                display: "flex", alignItems: "center", gap: 16,
            }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 14, fontSize: 28,
                    background: `${state.color}15`, border: `2px solid ${state.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>{state.flag}</div>
                <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "white", marginBottom: 4 }}>
                        {state.name}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#627d98" }}>
                        Capital: {state.capital} · Code: {state.code}
                    </div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                    <span style={{
                        background: `${state.color}15`, border: `1px solid ${state.color}35`,
                        color: state.color, borderRadius: 20, padding: "5px 14px",
                        fontSize: 12, fontFamily: "monospace", fontWeight: 600,
                    }}>{state.departments.length} Departments</span>
                </div>
            </div>

            {/* Portal Links */}
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#334e68", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                    Official Portals
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {Object.entries(state.portals).map(([key, portal]) => {
                        const meta = PORTAL_META[key];
                        return (
                            <a
                                key={key}
                                href={portal.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: "#0a1929", border: "1px solid #0d2137",
                                    borderRadius: 10, padding: "14px 16px",
                                    textDecoration: "none", transition: "all 0.15s", display: "block",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `${meta.color}40`;
                                    e.currentTarget.style.background = `${meta.color}08`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = "#0d2137";
                                    e.currentTarget.style.background = "#0a1929";
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                                    <span style={{
                                        width: 30, height: 30, borderRadius: 7,
                                        background: `${meta.color}15`, border: `1px solid ${meta.color}25`,
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                                    }}>{meta.icon}</span>
                                    <span style={{ fontSize: 11, fontFamily: "monospace", color: meta.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                        {meta.label}
                                    </span>
                                    <span style={{ marginLeft: "auto", fontSize: 14, color: "#334e68" }}>↗</span>
                                </div>
                                <div style={{ fontSize: 12, color: "#829ab1", paddingLeft: 40 }}>{portal.label}</div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Key Departments */}
            <div>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#334e68", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                    Key Regulatory Departments
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {state.departments.map((dept, i) => (
                        <div key={i} style={{
                            background: "#0a1929", border: "1px solid #0d2137", borderRadius: 8,
                            padding: "10px 14px", display: "flex", alignItems: "center", gap: 8,
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: state.color, flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: "#9fb3c8" }}>{dept}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function StateNavigator() {
    const [selected, setSelected] = useState(STATES[0]);
    const [search, setSearch] = useState("");

    const filteredStates = STATES.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.capital.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#d9e2ec" }}>
            <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }`}</style>

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "white", margin: 0, marginBottom: 5 }}>
                    State Navigator
                </h2>
                <p style={{ fontSize: 13, color: "#486581", margin: 0 }}>
                    Select a state to explore its regulatory portals and key departments
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, alignItems: "start" }}>
                {/* Left: State List */}
                <div style={{ background: "#08151f", border: "1px solid #0d2137", borderRadius: 14, overflow: "hidden" }}>
                    {/* Search states */}
                    <div style={{ padding: "12px", borderBottom: "1px solid #0d2137" }}>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#334e68", fontSize: 13 }}>🔍</span>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search states..."
                                style={{
                                    width: "100%", background: "#0a1929", border: "1px solid #1a3a52",
                                    borderRadius: 8, padding: "8px 10px 8px 32px", fontSize: 12,
                                    color: "#d9e2ec", outline: "none", fontFamily: "'IBM Plex Sans', sans-serif",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>

                    {/* State list */}
                    <div style={{ padding: "8px", maxHeight: 520, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
                        {filteredStates.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "30px 10px", color: "#334e68", fontSize: 13 }}>No states found</div>
                        ) : (
                            filteredStates.map(s => (
                                <StateCard
                                    key={s.code}
                                    state={s}
                                    isSelected={selected?.code === s.code}
                                    onClick={() => setSelected(s)}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Right: State Detail */}
                <div>
                    {selected ? (
                        <StateDetail key={selected.code} state={selected} />
                    ) : (
                        <div style={{ textAlign: "center", padding: "80px 20px", color: "#334e68" }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#486581" }}>Select a state to view details</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
