'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Search, Pill, MapPin, Building2, Package, Map, Zap, Truck, Check, X,
  AlertTriangle, CircleDot, Syringe, Droplets, FlaskConical, TestTube, Activity, Heart, Scale,
  AlertCircle, Info, Download, FileSpreadsheet, Moon, Sun, Copy, CheckCircle, ChevronDown, ChevronUp,
  Clock, Printer, ArrowLeftRight, Phone, Globe, ExternalLink
} from 'lucide-react';

// ============================================================================
// DATA
// ============================================================================

const pharmacyData = [
  { program: "TRT", pharmacy: "Empower", api: false, medication: "T Cypionate", carrier: "UPS", note: "except for CA and AL patients", refills: "Every 4 or 12 weeks depending on the plan" },
  { program: "TRT", pharmacy: "Empower", api: false, medication: "Enclomiphene", carrier: "UPS", note: "for AL patients only", refills: "30 days or 3 months" },
  { program: "TRT", pharmacy: "TPH", api: false, medication: "T Cypionate", carrier: "UPS", note: "as needed", refills: "As needed" },
  { program: "TRT", pharmacy: "TPH", api: false, medication: "Enclomiphene", carrier: "UPS", note: "except for AL patients", refills: "30 days or 3 months" },
  { program: "TRT", pharmacy: "TPH", api: false, medication: "Finasteride (Hair growth)", carrier: "UPS", note: "", refills: "Every 8 weeks" },
  { program: "TRT", pharmacy: "Curexa", api: true, medication: "T cream", carrier: "FedEx", note: "", refills: "Monthly or 3 months" },
  { program: "TRT", pharmacy: "Curexa", api: true, medication: "T cypionate", carrier: "FedEx", note: "for patients in CA and AL. Cannot process T cyp orders in NC.", refills: "Every 10 weeks" },
  { program: "TRT", pharmacy: "Curexa", api: true, medication: "HCG", carrier: "FedEx", note: "", refills: "Every 60 days" },
  { program: "TRT", pharmacy: "Curexa", api: true, medication: "Tadalafil", carrier: "FedEx", note: "", refills: "Every 12 weeks" },
  { program: "TRT", pharmacy: "Curexa", api: true, medication: "Sildenafil", carrier: "FedEx", note: "", refills: "Every 4 or 12 weeks" },
  { program: "TRT", pharmacy: "Curexa", api: true, medication: "Anastrozole", carrier: "FedEx", note: "", refills: "Every 12 weeks" },
  { program: "TRT", pharmacy: "Curexa", api: true, medication: "Minoxidil/Dutasteride (Hair)", carrier: "FedEx", note: "", refills: "Every 8 weeks" },
  { program: "TRT", pharmacy: "Absolute", api: true, medication: "T Cypionate", carrier: "FedEx", note: "except for NY, PA, AL, IN patients", refills: "Every 70 days" },
  { program: "TRT", pharmacy: "Absolute", api: true, medication: "Enclomiphene", carrier: "FedEx", note: "except for NY, AL, IN patients", refills: "Monthly or 3 months" },
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Estradiol/Testosterone Cream", carrier: "UPS", note: "", refills: "Monthly or 3 months" },
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Progesterone Capsule", carrier: "UPS", note: "", refills: "Monthly or 3 months" },
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Spironolactone", carrier: "UPS", note: "add-on", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Desiccated thyroid", carrier: "UPS", note: "add-on", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Progesterone Troche", carrier: "FedEx", note: "", refills: "Every 4 or 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Blush Cream", carrier: "FedEx", note: "", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Face Cream", carrier: "FedEx", note: "", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Minoxidil/Dutasteride (Hair)", carrier: "FedEx", note: "", refills: "Every 8 weeks" },
  { program: "HRT", pharmacy: "TPH", api: false, medication: "Finasteride (Hair growth)", carrier: "UPS", note: "", refills: "Every 8 weeks" },
  { program: "GLP", pharmacy: "TPH", api: false, medication: "Semaglutide (Injections)", carrier: "UPS", note: "except for AL patients", refills: "Every 35 days / 5 weeks" },
  { program: "GLP", pharmacy: "TPH", api: false, medication: "Tirzepatide (Injections)", carrier: "UPS", note: "except for AL patients", refills: "Every 28 days / 4 weeks" },
  { program: "GLP", pharmacy: "Curexa", api: true, medication: "Sublingual semaglutide (oral)", carrier: "FedEx", note: "", refills: "5-week (first), then 4-week" },
  { program: "GLP", pharmacy: "Absolute", api: true, medication: "Semaglutide (Injections)", carrier: "FedEx", note: "except for VA and AL patients", refills: "10-week (first), then 6-week, then 4-week" },
  { program: "GLP", pharmacy: "Absolute", api: true, medication: "Tirzepatide (Injections)", carrier: "FedEx", note: "except for VA and AL patients", refills: "Every 4 weeks" },
  { program: "GLP", pharmacy: "Red Rock", api: false, medication: "Semaglutide (Injections)", carrier: "FedEx", note: "except for NC, MI and TN patients", refills: "Every 4 weeks" },
  { program: "GLP", pharmacy: "Red Rock", api: false, medication: "Tirzepatide (Injections)", carrier: "FedEx", note: "except for NC, MI and TN patients", refills: "Every 4 weeks" },
];

const prescriptionData = [
  { program: "TRT", medication: "T Cypionate", controlled: true, form: "Injections", route: "Inject subcutaneously" },
  { program: "TRT", medication: "HCG", controlled: true, form: "Injections", route: "Inject subcutaneously" },
  { program: "TRT", medication: "Enclomiphene", controlled: false, form: "Tablet", route: "Taken orally" },
  { program: "TRT", medication: "T Cream", controlled: true, form: "Cream", route: "Applied under the arms" },
  { program: "TRT", medication: "Tadalafil", controlled: false, form: "Tablet", route: "Taken orally" },
  { program: "TRT", medication: "Sildenafil", controlled: false, form: "Tablet", route: "Taken orally" },
  { program: "TRT", medication: "Anastrozole", controlled: false, form: "Tablet", route: "Taken orally" },
  { program: "TRT", medication: "Finasteride (Hair)", controlled: false, form: "Topical solution", route: "Applied to the scalp" },
  { program: "TRT", medication: "Minoxidil/Dutasteride (Hair)", controlled: false, form: "Topical solution", route: "Applied to the scalp" },
  { program: "HRT", medication: "Estradiol/Testosterone", controlled: true, form: "Cream", route: "Applied to inner labia" },
  { program: "HRT", medication: "Progesterone", controlled: false, form: "Capsule", route: "Taken orally" },
  { program: "HRT", medication: "Spironolactone", controlled: false, form: "Capsule", route: "Taken orally" },
  { program: "HRT", medication: "Desiccated thyroid", controlled: false, form: "Capsule", route: "Taken orally" },
  { program: "HRT", medication: "Progesterone Troche", controlled: false, form: "Tablet", route: "Taken orally" },
  { program: "HRT", medication: "Blush Cream", controlled: false, form: "Cream", route: "Applied to clitoris/labia" },
  { program: "HRT", medication: "Face Cream", controlled: false, form: "Cream", route: "Applied to the face" },
  { program: "GLP", medication: "Semaglutide", controlled: false, form: "Injections", route: "Inject subcutaneously" },
  { program: "GLP", medication: "Tirzepatide", controlled: false, form: "Injections", route: "Inject subcutaneously" },
  { program: "GLP", medication: "Sublingual semaglutide", controlled: false, form: "Oral suspension", route: "Placed under tongue" },
];

const statesData = {
  "Alabama": { TRT: { Empower: true, Curexa: true, TPH: false, Absolute: false, Belmar: false }, HRT: { Belmar: false, Curexa: false }, GLP: { Curexa: false, TPH: false, Absolute: false, RedRock: false } },
  "Arizona": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "California": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Colorado": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Connecticut": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Florida": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Georgia": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Idaho": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Illinois": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Indiana": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Iowa": { TRT: { Empower: false, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Kentucky": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: "limited" } },
  "Maryland": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Michigan": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Minnesota": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: false, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: false, RedRock: true } },
  "Missouri": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Montana": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Nebraska": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "New Hampshire": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "New Jersey": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: false } },
  "New Mexico": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "New York": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "North Carolina": { TRT: { Empower: true, Curexa: "limited", TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: "limited" } },
  "Ohio": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Oregon": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Pennsylvania": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "South Carolina": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Tennessee": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Texas": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Virginia": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: false, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: false, RedRock: true } },
  "Washington": { TRT: { Empower: true, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: true, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
  "Wisconsin": { TRT: { Empower: false, Curexa: true, TPH: true, Absolute: true, Belmar: true }, HRT: { Belmar: false, Curexa: true }, GLP: { Curexa: true, TPH: true, Absolute: true, RedRock: true } },
};

const pharmacyInfo = {
  Empower: { phone: "(855) 503-6767", website: "empowerpharmacy.com", processing: "2-3 business days" },
  Curexa: { phone: "(855) 927-3992", website: "curexapharmacy.com", processing: "1-2 business days" },
  TPH: { phone: "(800) 404-8747", website: "tpharmacy.com", processing: "2-3 business days" },
  Absolute: { phone: "(844) 722-7658", website: "absolutepharmacy.com", processing: "1-2 business days" },
  Belmar: { phone: "(800) 525-9473", website: "belmarpharmacy.com", processing: "2-3 business days" },
  "Red Rock": { phone: "(480) 899-4455", website: "redrockcompounding.com", processing: "2-3 business days" },
};

// ============================================================================
// UTILITIES
// ============================================================================

const downloadCSV = (data, filename, columns) => {
  const headers = columns.map(c => c.label).join(',');
  const rows = data.map(item => columns.map(c => {
    let v = c.accessor(item);
    if (typeof v === 'string' && (v.includes(',') || v.includes('"'))) v = `"${v.replace(/"/g, '""')}"`;
    return v;
  }).join(','));
  const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const highlightText = (text, query) => {
  if (!query || !text) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) => 
    regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
  );
};

const copyToClipboard = async (text) => {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
};

// ============================================================================
// HOOKS
// ============================================================================

const useTheme = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };
  return [theme, toggle];
};

const useRecentSearches = () => {
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecent(JSON.parse(saved));
  }, []);
  const add = (item) => {
    setRecent(prev => {
      const updated = [item, ...prev.filter(r => r.id !== item.id)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };
  return [recent, add];
};

// ============================================================================
// COMPONENTS
// ============================================================================

const CopyButton = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e) => {
    e.stopPropagation();
    if (await copyToClipboard(text)) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };
  return (
    <button onClick={handleCopy} className={`copy-btn ${copied ? 'copied' : ''} ${className}`} title="Copy">
      {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

const ProgramBadge = ({ program }) => {
  const cfg = { TRT: { icon: Activity, cls: 'badge-trt' }, HRT: { icon: Heart, cls: 'badge-hrt' }, GLP: { icon: Scale, cls: 'badge-glp' } };
  const { icon: Icon, cls } = cfg[program];
  return <span className={`badge ${cls}`}><Icon className="w-3 h-3" />{program}</span>;
};

const PharmacyBadge = ({ pharmacy, showTooltip = false }) => {
  const clsMap = { Empower: 'badge-empower', Curexa: 'badge-curexa', TPH: 'badge-tph', Absolute: 'badge-absolute', Belmar: 'badge-belmar', 'Red Rock': 'badge-redrock' };
  const info = pharmacyInfo[pharmacy];
  const badge = <span className={`badge ${clsMap[pharmacy] || 'badge-pharmacy'}`}><Building2 className="w-3 h-3" />{pharmacy}</span>;
  if (!showTooltip || !info) return badge;
  return (
    <span className="tooltip-trigger">
      {badge}
      <div className="tooltip-content">
        <div className="font-semibold mb-2">{pharmacy}</div>
        <div className="space-y-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{info.phone}</div>
          <div className="flex items-center gap-2"><Globe className="w-3 h-3" />{info.website}</div>
          <div className="flex items-center gap-2"><Clock className="w-3 h-3" />{info.processing}</div>
        </div>
      </div>
    </span>
  );
};

const CarrierBadge = ({ carrier }) => (
  <span className={`badge ${carrier === 'FedEx' ? 'badge-fedex' : 'badge-ups'}`}><Truck className="w-3 h-3" />{carrier}</span>
);

const ApiStatus = ({ hasApi }) => (
  <span className={`api-indicator ${hasApi ? 'active' : 'inactive'}`}>
    {hasApi ? <Zap className="w-3.5 h-3.5" /> : <CircleDot className="w-3.5 h-3.5" />}{hasApi ? 'Yes' : 'No'}
  </span>
);

const StatusIndicator = ({ status }) => {
  if (status === true) return <span className="status status-available"><Check className="w-4 h-4" />Available</span>;
  if (status === false) return <span className="status status-unavailable"><X className="w-4 h-4" />Unavailable</span>;
  if (status === 'limited') return <span className="status status-limited"><AlertTriangle className="w-4 h-4" />Limited</span>;
  return <span style={{ color: 'var(--text-faint)' }}>—</span>;
};

const FormIcon = ({ form }) => {
  const icons = { 'Injections': Syringe, 'Tablet': Pill, 'Capsule': Pill, 'Cream': Droplets, 'Topical solution': FlaskConical, 'Oral suspension': TestTube };
  const Icon = icons[form] || Pill;
  return <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />;
};

// ============================================================================
// COMMAND PALETTE
// ============================================================================

const CommandPalette = ({ isOpen, onClose, onNavigate, addRecent }) => {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const items = [];
    pharmacyData.forEach(item => {
      if (item.medication.toLowerCase().includes(q)) items.push({ type: 'medication', title: item.medication, subtitle: `${item.program} • ${item.pharmacy}`, data: item, icon: Pill });
    });
    [...new Set(pharmacyData.map(d => d.pharmacy))].forEach(p => {
      if (p.toLowerCase().includes(q)) items.push({ type: 'pharmacy', title: p, subtitle: 'Pharmacy', data: { pharmacy: p }, icon: Building2 });
    });
    Object.keys(statesData).forEach(s => {
      if (s.toLowerCase().includes(q)) items.push({ type: 'state', title: s, subtitle: 'State Coverage', data: { state: s }, icon: MapPin });
    });
    return items.slice(0, 8);
  }, [query]);

  useEffect(() => { if (isOpen) { inputRef.current?.focus(); setQuery(''); setSelectedIdx(0); } }, [isOpen]);
  useEffect(() => { setSelectedIdx(0); }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && results[selectedIdx]) handleSelect(results[selectedIdx]);
    else if (e.key === 'Escape') onClose();
  };

  const handleSelect = (item) => {
    addRecent({ id: `${item.type}-${item.title}`, ...item });
    if (item.type === 'state') onNavigate('states', { state: item.data.state });
    else if (item.type === 'pharmacy') onNavigate('lookup', { pharmacy: item.data.pharmacy });
    else onNavigate('lookup', { search: item.data.medication });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="command-overlay" onClick={onClose}>
      <div className="command-modal" onClick={e => e.stopPropagation()}>
        <div className="command-header">
          <Search className="w-5 h-5" />
          <input ref={inputRef} className="command-input" placeholder="Search medications, pharmacies, states..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <div className="command-results">
          {results.length === 0 && query && <div className="empty-state" style={{ padding: '2rem' }}><p style={{ color: 'var(--text-muted)' }}>No results found for "{query}"</p></div>}
          {results.map((item, idx) => (
            <div key={`${item.type}-${item.title}`} className={`command-result ${idx === selectedIdx ? 'selected' : ''}`} onClick={() => handleSelect(item)} onMouseEnter={() => setSelectedIdx(idx)}>
              <div className="command-result-icon"><item.icon className="w-4 h-4" /></div>
              <div><div className="command-result-title">{highlightText(item.title, query)}</div><div className="command-result-subtitle">{item.subtitle}</div></div>
            </div>
          ))}
        </div>
        <div className="command-footer">
          <span><kbd>↑↓</kbd>Navigate</span><span><kbd>↵</kbd>Select</span><span><kbd>esc</kbd>Close</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TABS
// ============================================================================

const OverviewTab = () => {
  const stats = [
    { label: 'Pharmacies', value: [...new Set(pharmacyData.map(d => d.pharmacy))].length, icon: Building2 },
    { label: 'Medications', value: prescriptionData.length, icon: Pill },
    { label: 'States Covered', value: Object.keys(statesData).length, icon: Map },
    { label: 'API Integrated', value: [...new Set(pharmacyData.filter(d => d.api).map(d => d.pharmacy))].length, icon: Zap },
  ];

  const programs = [
    { id: 'TRT', name: 'TRT', desc: 'Testosterone Replacement Therapy', icon: Activity },
    { id: 'HRT', name: 'HRT', desc: 'Hormone Replacement Therapy', icon: Heart },
    { id: 'GLP', name: 'GLP', desc: 'GLP-1 Weight Management', icon: Scale },
  ];

  const handleExport = () => {
    downloadCSV(pharmacyData, 'pharmacy-matrix-export', [
      { label: 'Program', accessor: d => d.program }, { label: 'Pharmacy', accessor: d => d.pharmacy },
      { label: 'Medication', accessor: d => d.medication }, { label: 'API', accessor: d => d.api ? 'Yes' : 'No' },
      { label: 'Carrier', accessor: d => d.carrier }, { label: 'Refills', accessor: d => d.refills }, { label: 'Notes', accessor: d => d.note || '' },
    ]);
  };

  return (
    <div className="animate-in space-y-8">
      {/* Stats */}
      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
            <div className="stat-icon"><s.icon className="w-6 h-6" /></div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="section-header">
        <div className="section-title"><Activity className="w-4 h-4" />Programs Overview</div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn btn-secondary no-print"><Printer className="w-4 h-4" />Print</button>
          <button onClick={handleExport} className="btn btn-primary"><Download className="w-4 h-4" />Export All</button>
        </div>
      </div>

      {/* Program Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {programs.map(p => {
          const pharmacies = [...new Set(pharmacyData.filter(d => d.program === p.id).map(d => d.pharmacy))];
          const meds = [...new Set(pharmacyData.filter(d => d.program === p.id).map(d => d.medication))];
          const Icon = p.icon;
          return (
            <div key={p.id} className={`card program-card ${p.id.toLowerCase()}`}>
              <div className="card-body">
                <div className="flex items-start gap-4 mb-6">
                  <div className="stat-icon" style={{ background: `var(--${p.id.toLowerCase()}-bg)`, color: `var(--${p.id.toLowerCase()})` }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: `var(--${p.id.toLowerCase()})` }}>{p.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
                    <div className="text-2xl font-bold font-mono" style={{ color: `var(--${p.id.toLowerCase()})` }}>{pharmacies.length}</div>
                    <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Pharmacies</div>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
                    <div className="text-2xl font-bold font-mono" style={{ color: `var(--${p.id.toLowerCase()})` }}>{meds.length}</div>
                    <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Medications</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pharmacies.map(ph => <PharmacyBadge key={ph} pharmacy={ph} showTooltip />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PharmacyLookupTab = ({ initialFilters = {} }) => {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [program, setProgram] = useState('All');
  const [pharmacy, setPharmacy] = useState(initialFilters.pharmacy || 'All');
  const [sort, setSort] = useState({ key: null, dir: 'asc' });
  const [expanded, setExpanded] = useState(null);
  const pharmacies = ['All', ...new Set(pharmacyData.map(d => d.pharmacy))];

  const filtered = useMemo(() => {
    let data = pharmacyData.filter(item => {
      const matchSearch = !search || item.medication.toLowerCase().includes(search.toLowerCase());
      const matchProgram = program === 'All' || item.program === program;
      const matchPharmacy = pharmacy === 'All' || item.pharmacy === pharmacy;
      return matchSearch && matchProgram && matchPharmacy;
    });
    if (sort.key) {
      data = [...data].sort((a, b) => {
        if (a[sort.key] < b[sort.key]) return sort.dir === 'asc' ? -1 : 1;
        if (a[sort.key] > b[sort.key]) return sort.dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [search, program, pharmacy, sort]);

  const handleSort = (key) => setSort(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
  const SortIcon = ({ col }) => sort.key !== col ? <ChevronDown className="w-3 h-3 opacity-30" /> : sort.dir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;

  const handleExport = () => {
    downloadCSV(filtered, `pharmacy-lookup${program !== 'All' ? `-${program}` : ''}${pharmacy !== 'All' ? `-${pharmacy}` : ''}`, [
      { label: 'Program', accessor: d => d.program }, { label: 'Pharmacy', accessor: d => d.pharmacy },
      { label: 'Medication', accessor: d => d.medication }, { label: 'API', accessor: d => d.api ? 'Yes' : 'No' },
      { label: 'Carrier', accessor: d => d.carrier }, { label: 'Refills', accessor: d => d.refills }, { label: 'Notes', accessor: d => d.note || '' },
    ]);
  };

  return (
    <div className="animate-in space-y-6">
      {/* Filters */}
      <div className="card card-body">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="form-label"><Search className="w-3 h-3" />Search Medication</label>
            <div className="input-icon">
              <Search className="icon w-4 h-4" />
              <input type="text" className="form-input form-select" placeholder="Type medication name..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="form-label"><Activity className="w-3 h-3" />Program</label>
            <select className="form-input form-select" value={program} onChange={e => setProgram(e.target.value)}>
              <option value="All">All Programs</option>
              <option value="TRT">TRT</option>
              <option value="HRT">HRT</option>
              <option value="GLP">GLP</option>
            </select>
          </div>
          <div>
            <label className="form-label"><Building2 className="w-3 h-3" />Pharmacy</label>
            <select className="form-input form-select" value={pharmacy} onChange={e => setPharmacy(e.target.value)}>
              {pharmacies.map(p => <option key={p} value={p}>{p === 'All' ? 'All Pharmacies' : p}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('program')} className={sort.key === 'program' ? 'sorted' : ''}>Program <SortIcon col="program" /></th>
                <th onClick={() => handleSort('pharmacy')} className={sort.key === 'pharmacy' ? 'sorted' : ''}>Pharmacy <SortIcon col="pharmacy" /></th>
                <th onClick={() => handleSort('medication')} className={sort.key === 'medication' ? 'sorted' : ''}>Medication <SortIcon col="medication" /></th>
                <th>API</th>
                <th>Carrier</th>
                <th>Refills</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <>
                  <tr key={idx} className={expanded === idx ? 'expanded' : ''} onClick={() => setExpanded(expanded === idx ? null : idx)}>
                    <td><ProgramBadge program={item.program} /></td>
                    <td><PharmacyBadge pharmacy={item.pharmacy} showTooltip /></td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                      <div className="flex items-center gap-2">{highlightText(item.medication, search)}<CopyButton text={item.medication} /></div>
                    </td>
                    <td><ApiStatus hasApi={item.api} /></td>
                    <td><CarrierBadge carrier={item.carrier} /></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{item.refills}</td>
                    <td style={{ color: 'var(--text-faint)', fontSize: '0.8125rem', maxWidth: '200px' }} className="truncate">{item.note || '—'}</td>
                  </tr>
                  {expanded === idx && (
                    <tr className="row-details">
                      <td colSpan={7}>
                        <div className="p-6 grid md:grid-cols-3 gap-6">
                          <div>
                            <div className="form-label" style={{ marginBottom: '0.5rem' }}>Full Notes</div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{item.note || 'No additional notes'}</p>
                          </div>
                          <div>
                            <div className="form-label" style={{ marginBottom: '0.5rem' }}>Refill Schedule</div>
                            <p className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{item.refills}<CopyButton text={item.refills} className="opacity-100" /></p>
                          </div>
                          <div>
                            <div className="form-label" style={{ marginBottom: '0.5rem' }}>Pharmacy Contact</div>
                            {pharmacyInfo[item.pharmacy] && (
                              <div className="space-y-2" style={{ fontSize: '0.875rem' }}>
                                <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}><Phone className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />{pharmacyInfo[item.pharmacy].phone}<CopyButton text={pharmacyInfo[item.pharmacy].phone} className="opacity-100" /></div>
                                <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}><Globe className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />{pharmacyInfo[item.pharmacy].website}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }} className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          Showing <span className="font-mono" style={{ color: 'var(--accent)' }}>{filtered.length}</span> of <span className="font-mono" style={{ color: 'var(--accent)' }}>{pharmacyData.length}</span> results
          <span style={{ color: 'var(--text-faint)' }}>• Click row to expand</span>
        </p>
        <button onClick={handleExport} className="btn btn-primary"><Download className="w-4 h-4" />Download<span className="badge" style={{ background: 'rgba(255,255,255,0.2)', marginLeft: '0.5rem' }}>{filtered.length}</span></button>
      </div>
    </div>
  );
};

const MedicationsTab = () => {
  const formLabels = { 'Injections': 'Injectable', 'Tablet': 'Oral Tablet', 'Capsule': 'Oral Capsule', 'Cream': 'Topical Cream', 'Topical solution': 'Topical Solution', 'Oral suspension': 'Oral Suspension' };

  const handleExport = () => {
    downloadCSV(prescriptionData, 'medications-list', [
      { label: 'Program', accessor: d => d.program }, { label: 'Medication', accessor: d => d.medication },
      { label: 'Controlled', accessor: d => d.controlled ? 'Yes' : 'No' }, { label: 'Form', accessor: d => formLabels[d.form] || d.form }, { label: 'Route', accessor: d => d.route },
    ]);
  };

  return (
    <div className="animate-in space-y-6">
      <div className="section-header">
        <div className="section-title"><Pill className="w-4 h-4" />All Medications</div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn btn-secondary no-print"><Printer className="w-4 h-4" />Print</button>
          <button onClick={handleExport} className="btn btn-primary"><Download className="w-4 h-4" />Download<span className="badge" style={{ background: 'rgba(255,255,255,0.2)', marginLeft: '0.5rem' }}>{prescriptionData.length}</span></button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptionData.map((med, idx) => (
          <div key={idx} className="card card-body">
            <div className="flex items-start justify-between gap-3 mb-4">
              <ProgramBadge program={med.program} />
              {med.controlled && <span className="badge badge-controlled"><AlertCircle className="w-3 h-3" />Controlled</span>}
            </div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>{med.medication}<CopyButton text={med.medication} /></h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="stat-icon" style={{ width: '44px', height: '44px' }}><FormIcon form={med.form} /></div>
                <div>
                  <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Form</div>
                  <div style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{formLabels[med.form] || med.form}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="stat-icon" style={{ width: '44px', height: '44px' }}><MapPin className="w-5 h-5" style={{ color: 'var(--accent)' }} /></div>
                <div>
                  <div className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Route</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{med.route}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StateCoverageTab = ({ initialState = '' }) => {
  const [state, setState] = useState(initialState);
  const [compareState, setCompareState] = useState('');
  const [comparing, setComparing] = useState(false);
  const states = Object.keys(statesData).sort();

  const getStatusText = (s) => s === true ? 'Available' : s === false ? 'Unavailable' : s === 'limited' ? 'Limited' : 'Unknown';

  const handleExport = (st) => {
    if (!st) return;
    const rows = [];
    const c = statesData[st];
    ['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar'].forEach(p => rows.push({ state: st, program: 'TRT', pharmacy: p, status: getStatusText(c.TRT?.[p]) }));
    ['Belmar', 'Curexa'].forEach(p => rows.push({ state: st, program: 'HRT', pharmacy: p, status: getStatusText(c.HRT?.[p]) }));
    ['Curexa', 'TPH', 'Absolute', 'RedRock'].forEach(p => rows.push({ state: st, program: 'GLP', pharmacy: p, status: getStatusText(c.GLP?.[p]) }));
    downloadCSV(rows, `coverage-${st.replace(/\s+/g, '-')}`, [
      { label: 'State', accessor: d => d.state }, { label: 'Program', accessor: d => d.program },
      { label: 'Pharmacy', accessor: d => d.pharmacy }, { label: 'Status', accessor: d => d.status },
    ]);
  };

  const handleExportAll = () => {
    const rows = [];
    Object.entries(statesData).forEach(([st, c]) => {
      ['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar'].forEach(p => rows.push({ state: st, program: 'TRT', pharmacy: p, status: getStatusText(c.TRT?.[p]) }));
      ['Belmar', 'Curexa'].forEach(p => rows.push({ state: st, program: 'HRT', pharmacy: p, status: getStatusText(c.HRT?.[p]) }));
      ['Curexa', 'TPH', 'Absolute', 'RedRock'].forEach(p => rows.push({ state: st, program: 'GLP', pharmacy: p, status: getStatusText(c.GLP?.[p]) }));
    });
    downloadCSV(rows, 'coverage-all-states', [
      { label: 'State', accessor: d => d.state }, { label: 'Program', accessor: d => d.program },
      { label: 'Pharmacy', accessor: d => d.pharmacy }, { label: 'Status', accessor: d => d.status },
    ]);
  };

  const CoverageSection = ({ prog, coverage, list, type }) => (
    <div className="coverage-card">
      <div className={`coverage-header ${type}`}>
        {type === 'trt' && <Activity className="w-4 h-4" />}
        {type === 'hrt' && <Heart className="w-4 h-4" />}
        {type === 'glp' && <Scale className="w-4 h-4" />}
        {prog} Coverage
      </div>
      <div className="coverage-body">
        <div className="coverage-grid">
          {list.map(p => (
            <div key={p} className="coverage-item">
              <span className="coverage-item-name"><Building2 className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} />{p}</span>
              <StatusIndicator status={coverage?.[p]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const StateCoverage = ({ st, showTitle = true }) => {
    if (!st || !statesData[st]) return null;
    const c = statesData[st];
    return (
      <div className="space-y-4">
        {showTitle && <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><MapPin className="w-5 h-5" style={{ color: 'var(--accent)' }} />{st}</h3>}
        <CoverageSection prog="TRT" coverage={c.TRT} list={['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar']} type="trt" />
        <CoverageSection prog="HRT" coverage={c.HRT} list={['Belmar', 'Curexa']} type="hrt" />
        <CoverageSection prog="GLP" coverage={c.GLP} list={['Curexa', 'TPH', 'Absolute', 'RedRock']} type="glp" />
      </div>
    );
  };

  return (
    <div className="animate-in space-y-6">
      {/* Selector */}
      <div className="card card-body">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="form-label"><MapPin className="w-3 h-3" />Select State</label>
            <div className="input-icon">
              <Map className="icon w-4 h-4" />
              <select className="form-input form-select md:w-80" style={{ paddingLeft: '2.75rem' }} value={state} onChange={e => { setState(e.target.value); setComparing(false); }}>
                <option value="">Choose a state...</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {state && (
            <div className="flex gap-2">
              <button onClick={() => setComparing(!comparing)} className={`btn ${comparing ? 'btn-primary' : 'btn-secondary'}`}><ArrowLeftRight className="w-4 h-4" />Compare</button>
              <button onClick={() => handleExport(state)} className="btn btn-primary"><Download className="w-4 h-4" />{state}</button>
              <button onClick={handleExportAll} className="btn btn-secondary"><FileSpreadsheet className="w-4 h-4" />All States</button>
            </div>
          )}
        </div>
        {comparing && state && (
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-muted)' }}>
            <label className="form-label"><ArrowLeftRight className="w-3 h-3" />Compare with</label>
            <select className="form-input form-select md:w-80" value={compareState} onChange={e => setCompareState(e.target.value)}>
              <option value="">Select another state...</option>
              {states.filter(s => s !== state).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Coverage */}
      {state && statesData[state] ? (
        comparing && compareState ? (
          <div className="compare-grid">
            <StateCoverage st={state} />
            <StateCoverage st={compareState} />
          </div>
        ) : (
          <>
            <StateCoverage st={state} showTitle={false} />
            <div className="card card-body">
              <div className="section-title" style={{ marginBottom: '1rem' }}><Info className="w-4 h-4" />Legend</div>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2"><Check className="w-5 h-5" style={{ color: 'var(--success)' }} /><span style={{ color: 'var(--text-muted)' }}>Available — Full service</span></div>
                <div className="flex items-center gap-2"><X className="w-5 h-5" style={{ color: 'var(--danger)' }} /><span style={{ color: 'var(--text-muted)' }}>Unavailable — Not offered</span></div>
                <div className="flex items-center gap-2"><AlertTriangle className="w-5 h-5" style={{ color: 'var(--warning)' }} /><span style={{ color: 'var(--text-muted)' }}>Limited — Restrictions apply</span></div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><Map className="w-10 h-10" /></div>
            <div className="empty-state-title">Select a State</div>
            <p className="empty-state-text">Choose a state from the dropdown above to view pharmacy coverage information.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN
// ============================================================================

export default function PharmacyMatrix() {
  const [tab, setTab] = useState('overview');
  const [tabParams, setTabParams] = useState({});
  const [cmdOpen, setCmdOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const [recent, addRecent] = useRecentSearches();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'lookup', label: 'Pharmacy Lookup', icon: Search },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'states', label: 'State Coverage', icon: MapPin },
  ];

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(true); }
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) { e.preventDefault(); setCmdOpen(true); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigate = (t, params = {}) => { setTab(t); setTabParams(params); };

  return (
    <div className="min-h-screen flex flex-col">
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={navigate} addRecent={addRecent} />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="stat-icon" style={{ width: '40px', height: '40px', background: 'var(--accent)', color: 'white', borderRadius: '10px' }}>
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Pharmacy Matrix</h1>
                <p className="text-xs font-mono" style={{ color: 'var(--text-faint)', marginTop: '-2px' }}>Internal Reference</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setCmdOpen(true)} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors" style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
                <Search className="w-4 h-4" /><span>Search</span><kbd className="ml-2 px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg-subtle)', color: 'var(--text-faint)' }}>⌘K</kbd>
              </button>
              <button onClick={toggleTheme} className="btn btn-icon btn-ghost" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="pb-4 -mb-px overflow-x-auto no-print">
            <div className="tab-list inline-flex">
              {tabs.map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); setTabParams({}); }} className={`tab ${tab === t.id ? 'tab-active' : 'tab-inactive'}`}>
                  <t.icon className="w-4 h-4" /><span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Warning */}
      <div className="no-print" style={{ background: '#fef3c7', borderBottom: '1px solid #fde68a' }}>
        <div className="container py-3">
          <p className="text-sm flex items-start gap-2" style={{ color: '#92400e' }}>
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span><strong>Reminder:</strong> CS is not allowed to provide medical advice or information about medications. Please direct these inquiries to the medical team.</span>
          </p>
        </div>
      </div>

      {/* Recent */}
      {recent.length > 0 && tab === 'overview' && (
        <div className="container pt-6 no-print">
          <div className="section-title" style={{ marginBottom: '0.75rem' }}><Clock className="w-4 h-4" />Recent Searches</div>
          <div className="recent-list">
            {recent.map(r => (
              <button key={r.id} onClick={() => navigate(r.type === 'state' ? 'states' : 'lookup', r.type === 'state' ? { state: r.data.state } : r.type === 'pharmacy' ? { pharmacy: r.data.pharmacy } : { search: r.data.medication })} className="recent-item">
                <r.icon className="w-4 h-4" />{r.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main */}
      <main className="container flex-1 py-8">
        {tab === 'overview' && <OverviewTab />}
        {tab === 'lookup' && <PharmacyLookupTab initialFilters={tabParams} />}
        {tab === 'medications' && <MedicationsTab />}
        {tab === 'states' && <StateCoverageTab initialState={tabParams.state} />}
      </main>

      {/* Footer */}
      <footer className="border-t no-print" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
        <div className="container py-4">
          <p className="text-center text-sm flex items-center justify-center gap-2" style={{ color: 'var(--text-faint)' }}>
            <Package className="w-4 h-4" />Pharmacy Matrix · Internal Use Only · Updated January 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
