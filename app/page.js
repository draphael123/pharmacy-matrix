'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { 
  LayoutDashboard, Search, Pill, MapPin, Building2, Package, Map, Zap, Truck, Check, X,
  AlertTriangle, CircleDot, Syringe, Droplets, FlaskConical, TestTube, Activity, Heart, Scale,
  AlertCircle, Info, Download, FileSpreadsheet, Moon, Sun, Command, ArrowUp, ArrowDown,
  Copy, CheckCircle, ChevronDown, ChevronUp, Clock, Printer, ArrowLeftRight, Phone, Globe, ExternalLink
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
  const headers = columns.map(col => col.label).join(',');
  const rows = data.map(item => columns.map(col => {
    let value = col.accessor(item);
    if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
      value = `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }).join(','));
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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
  const parts = text.split(regex);
  return parts.map((part, i) => 
    regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
  );
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// ============================================================================
// HOOKS
// ============================================================================

const useTheme = () => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);
  
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };
  
  return [theme, toggleTheme];
};

const useRecentSearches = () => {
  const [recent, setRecent] = useState([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecent(JSON.parse(saved));
  }, []);
  
  const addRecent = (item) => {
    setRecent(prev => {
      const filtered = prev.filter(r => r.id !== item.id);
      const updated = [item, ...filtered].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };
  
  return [recent, addRecent];
};

// ============================================================================
// COMPONENTS
// ============================================================================

const CopyButton = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async (e) => {
    e.stopPropagation();
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <button onClick={handleCopy} className={`copy-btn ${copied ? 'copied' : ''} ${className}`} title="Copy to clipboard">
      {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

const ProgramBadge = ({ program }) => {
  const config = { TRT: { class: 'badge-trt', icon: Activity }, HRT: { class: 'badge-hrt', icon: Heart }, GLP: { class: 'badge-glp', icon: Scale } };
  const { class: className, icon: Icon } = config[program];
  return <span className={`badge ${className}`}><Icon className="w-3 h-3 mr-1" />{program}</span>;
};

const PharmacyBadge = ({ pharmacy, showTooltip = false }) => {
  const styles = { Empower: 'pharmacy-empower', Curexa: 'pharmacy-curexa', TPH: 'pharmacy-tph', Absolute: 'pharmacy-absolute', Belmar: 'pharmacy-belmar', 'Red Rock': 'pharmacy-redrock' };
  const info = pharmacyInfo[pharmacy];
  
  const badge = (
    <span className={`badge ${styles[pharmacy] || 'bg-gray-100 text-gray-700'}`}>
      <Building2 className="w-3 h-3 mr-1" />{pharmacy}
    </span>
  );
  
  if (!showTooltip || !info) return badge;
  
  return (
    <span className="tooltip-container">
      {badge}
      <div className="tooltip">
        <div className="text-sm font-semibold mb-2">{pharmacy}</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{info.phone}</div>
          <div className="flex items-center gap-2"><Globe className="w-3 h-3" />{info.website}</div>
          <div className="flex items-center gap-2"><Clock className="w-3 h-3" />{info.processing}</div>
        </div>
      </div>
    </span>
  );
};

const CarrierBadge = ({ carrier }) => {
  const styles = { FedEx: 'carrier-fedex', UPS: 'carrier-ups' };
  return <span className={`badge ${styles[carrier]}`}><Truck className="w-3 h-3 mr-1" />{carrier}</span>;
};

const ApiStatus = ({ hasApi }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${hasApi ? 'text-emerald-600' : 'opacity-50'}`}>
    {hasApi ? <Zap className="w-3.5 h-3.5" /> : <CircleDot className="w-3.5 h-3.5" />}
    {hasApi ? 'Yes' : 'No'}
  </span>
);

const StatusIcon = ({ status }) => {
  if (status === true) return <span className="status-available font-medium inline-flex items-center gap-1"><Check className="w-4 h-4" />Available</span>;
  if (status === false) return <span className="status-unavailable font-medium inline-flex items-center gap-1"><X className="w-4 h-4" />Unavailable</span>;
  if (status === 'limited') return <span className="status-limited font-medium inline-flex items-center gap-1"><AlertTriangle className="w-4 h-4" />Limited</span>;
  return <span className="opacity-50">—</span>;
};

const FormIcon = ({ form }) => {
  const icons = { 'Injections': Syringe, 'Tablet': Pill, 'Capsule': Pill, 'Cream': Droplets, 'Topical solution': FlaskConical, 'Oral suspension': TestTube };
  const Icon = icons[form] || Pill;
  return <Icon className="w-5 h-5 text-blue-500" />;
};

const DownloadButton = ({ onClick, label = 'Download CSV', count }) => (
  <button onClick={onClick} className="btn btn-primary">
    <Download className="w-4 h-4" />{label}
    {count !== undefined && <span className="bg-blue-500 px-2 py-0.5 rounded-full text-xs font-mono">{count}</span>}
  </button>
);

// ============================================================================
// COMMAND PALETTE
// ============================================================================

const CommandPalette = ({ isOpen, onClose, onNavigate, addRecent }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const items = [];
    
    // Search medications
    pharmacyData.forEach(item => {
      if (item.medication.toLowerCase().includes(q)) {
        items.push({ type: 'medication', title: item.medication, subtitle: `${item.program} • ${item.pharmacy}`, data: item, icon: Pill });
      }
    });
    
    // Search pharmacies
    [...new Set(pharmacyData.map(d => d.pharmacy))].forEach(pharmacy => {
      if (pharmacy.toLowerCase().includes(q)) {
        items.push({ type: 'pharmacy', title: pharmacy, subtitle: 'Pharmacy', data: { pharmacy }, icon: Building2 });
      }
    });
    
    // Search states
    Object.keys(statesData).forEach(state => {
      if (state.toLowerCase().includes(q)) {
        items.push({ type: 'state', title: state, subtitle: 'State Coverage', data: { state }, icon: MapPin });
      }
    });
    
    return items.slice(0, 8);
  }, [query]);
  
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);
  
  useEffect(() => { setSelectedIndex(0); }, [query]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && results[selectedIndex]) { handleSelect(results[selectedIndex]); }
    else if (e.key === 'Escape') { onClose(); }
  };
  
  const handleSelect = (item) => {
    addRecent({ id: `${item.type}-${item.title}`, ...item });
    if (item.type === 'state') onNavigate('states', { state: item.data.state });
    else if (item.type === 'pharmacy') onNavigate('lookup', { pharmacy: item.data.pharmacy });
    else if (item.type === 'medication') onNavigate('lookup', { search: item.data.medication });
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 border-b border-[var(--border-primary)]">
          <Search className="w-5 h-5 opacity-50" />
          <input ref={inputRef} type="text" className="command-input" placeholder="Search medications, pharmacies, states..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <div className="command-results">
          {results.length === 0 && query && <div className="p-8 text-center opacity-50">No results found</div>}
          {results.map((item, idx) => (
            <div key={`${item.type}-${item.title}`} className={`command-result ${idx === selectedIndex ? 'selected' : ''}`} onClick={() => handleSelect(item)} onMouseEnter={() => setSelectedIndex(idx)}>
              <div className="command-result-icon"><item.icon className="w-4 h-4" /></div>
              <div className="command-result-content">
                <div className="command-result-title">{highlightText(item.title, query)}</div>
                <div className="command-result-subtitle">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="command-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TABS
// ============================================================================

const OverviewTab = () => {
  const programs = [
    { id: 'TRT', name: 'TRT', description: 'Testosterone Replacement Therapy', color: 'blue', icon: Activity },
    { id: 'HRT', name: 'HRT', description: 'Hormone Replacement Therapy', color: 'rose', icon: Heart },
    { id: 'GLP', name: 'GLP', description: 'GLP-1 Weight Management', color: 'teal', icon: Scale },
  ];
  
  const stats = [
    { label: 'Pharmacies', value: [...new Set(pharmacyData.map(d => d.pharmacy))].length, icon: Building2 },
    { label: 'Medications', value: prescriptionData.length, icon: Pill },
    { label: 'States Covered', value: Object.keys(statesData).length, icon: Map },
    { label: 'API Integrated', value: [...new Set(pharmacyData.filter(d => d.api).map(d => d.pharmacy))].length, icon: Zap },
  ];
  
  const colorMap = {
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', accent: 'text-blue-600', iconBg: 'bg-blue-100' },
    rose: { border: 'border-rose-200', bg: 'bg-rose-50', accent: 'text-rose-600', iconBg: 'bg-rose-100' },
    teal: { border: 'border-teal-200', bg: 'bg-teal-50', accent: 'text-teal-600', iconBg: 'bg-teal-100' },
  };

  const handleDownloadAll = () => {
    downloadCSV(pharmacyData, 'pharmacy-matrix-all-data', [
      { label: 'Program', accessor: d => d.program }, { label: 'Pharmacy', accessor: d => d.pharmacy },
      { label: 'Medication', accessor: d => d.medication }, { label: 'API', accessor: d => d.api ? 'Yes' : 'No' },
      { label: 'Carrier', accessor: d => d.carrier }, { label: 'Refills', accessor: d => d.refills }, { label: 'Notes', accessor: d => d.note || '' },
    ]);
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-start justify-between">
              <div><div className="stat-value">{stat.value}</div><div className="stat-label">{stat.label}</div></div>
              <div className="p-2 bg-blue-50 rounded-lg"><stat.icon className="w-5 h-5 text-blue-600" /></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button onClick={() => window.print()} className="btn btn-secondary no-print"><Printer className="w-4 h-4" />Print View</button>
        <DownloadButton onClick={handleDownloadAll} label="Export All Data" count={pharmacyData.length} />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {programs.map(program => {
          const pharmacies = [...new Set(pharmacyData.filter(d => d.program === program.id).map(d => d.pharmacy))];
          const medications = [...new Set(pharmacyData.filter(d => d.program === program.id).map(d => d.medication))];
          const colors = colorMap[program.color];
          const Icon = program.icon;
          return (
            <div key={program.id} className={`card p-6 ${colors.border}`}>
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-2 rounded-lg ${colors.iconBg}`}><Icon className={`w-5 h-5 ${colors.accent}`} /></div>
                <div><h3 className={`text-xl font-bold ${colors.accent}`}>{program.name}</h3><p className="text-xs opacity-60">{program.description}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className={`${colors.bg} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold font-mono ${colors.accent}`}>{pharmacies.length}</div>
                  <div className="text-xs opacity-60 uppercase tracking-wide flex items-center justify-center gap-1"><Building2 className="w-3 h-3" />Pharmacies</div>
                </div>
                <div className={`${colors.bg} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold font-mono ${colors.accent}`}>{medications.length}</div>
                  <div className="text-xs opacity-60 uppercase tracking-wide flex items-center justify-center gap-1"><Pill className="w-3 h-3" />Medications</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">{pharmacies.map(p => <PharmacyBadge key={p} pharmacy={p} showTooltip />)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PharmacyLookupTab = ({ initialFilters = {} }) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
  const [selectedProgram, setSelectedProgram] = useState('All');
  const [selectedPharmacy, setSelectedPharmacy] = useState(initialFilters.pharmacy || 'All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState(null);
  const [focusedRow, setFocusedRow] = useState(-1);
  const tableRef = useRef(null);
  
  const pharmacies = ['All', ...new Set(pharmacyData.map(d => d.pharmacy))];
  
  const filteredData = useMemo(() => {
    let data = pharmacyData.filter(item => {
      const matchesSearch = !searchTerm || item.medication.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProgram = selectedProgram === 'All' || item.program === selectedProgram;
      const matchesPharmacy = selectedPharmacy === 'All' || item.pharmacy === selectedPharmacy;
      return matchesSearch && matchesProgram && matchesPharmacy;
    });
    if (sortConfig.key) {
      data = [...data].sort((a, b) => {
        const aVal = a[sortConfig.key] ?? '';
        const bVal = b[sortConfig.key] ?? '';
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchTerm, selectedProgram, selectedPharmacy, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedRow(i => Math.min(i + 1, filteredData.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedRow(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && focusedRow >= 0) { setExpandedRow(expandedRow === focusedRow ? null : focusedRow); }
    else if (e.key === 'Escape') { setExpandedRow(null); setFocusedRow(-1); }
  };

  useEffect(() => {
    if (focusedRow >= 0) {
      const row = tableRef.current?.querySelector(`[data-row="${focusedRow}"]`);
      row?.scrollIntoView({ block: 'nearest' });
      row?.focus();
    }
  }, [focusedRow]);

  const handleDownload = () => {
    downloadCSV(filteredData, `pharmacy-lookup${selectedProgram !== 'All' ? '-' + selectedProgram : ''}${selectedPharmacy !== 'All' ? '-' + selectedPharmacy : ''}`, [
      { label: 'Program', accessor: d => d.program }, { label: 'Pharmacy', accessor: d => d.pharmacy },
      { label: 'Medication', accessor: d => d.medication }, { label: 'API', accessor: d => d.api ? 'Yes' : 'No' },
      { label: 'Carrier', accessor: d => d.carrier }, { label: 'Refills', accessor: d => d.refills }, { label: 'Notes', accessor: d => d.note || '' },
    ]);
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ChevronDown className="w-3 h-3 sort-icon" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3 sort-icon" /> : <ChevronDown className="w-3 h-3 sort-icon" />;
  };
  
  return (
    <div className="space-y-6 animate-in">
      <div className="card p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1"><Search className="w-3 h-3" />Search Medication</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input type="text" placeholder="Type medication name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input select pl-10" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1"><Activity className="w-3 h-3" />Program</label>
            <select value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)} className="input select">
              <option value="All">All Programs</option><option value="TRT">TRT</option><option value="HRT">HRT</option><option value="GLP">GLP</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1"><Building2 className="w-3 h-3" />Pharmacy</label>
            <select value={selectedPharmacy} onChange={e => setSelectedPharmacy(e.target.value)} className="input select">
              {pharmacies.map(p => <option key={p} value={p}>{p === 'All' ? 'All Pharmacies' : p}</option>)}
            </select>
          </div>
        </div>
      </div>
      
      <div className="card overflow-hidden" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
        <div className="overflow-x-auto max-h-[600px]">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('program')} className={sortConfig.key === 'program' ? 'sorted' : ''}>Program<SortIcon column="program" /></th>
                <th onClick={() => handleSort('pharmacy')} className={sortConfig.key === 'pharmacy' ? 'sorted' : ''}>Pharmacy<SortIcon column="pharmacy" /></th>
                <th onClick={() => handleSort('medication')} className={sortConfig.key === 'medication' ? 'sorted' : ''}>Medication<SortIcon column="medication" /></th>
                <th>API</th><th>Carrier</th><th>Refills</th><th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <>
                  <tr key={idx} data-row={idx} tabIndex={-1} className={expandedRow === idx ? 'expanded' : ''} onClick={() => setExpandedRow(expandedRow === idx ? null : idx)} onFocus={() => setFocusedRow(idx)}>
                    <td><ProgramBadge program={item.program} /></td>
                    <td><PharmacyBadge pharmacy={item.pharmacy} showTooltip /></td>
                    <td className="font-medium">
                      <div className="flex items-center gap-2">
                        {highlightText(item.medication, searchTerm)}
                        <CopyButton text={item.medication} />
                      </div>
                    </td>
                    <td><ApiStatus hasApi={item.api} /></td>
                    <td><CarrierBadge carrier={item.carrier} /></td>
                    <td className="text-xs opacity-70"><div className="flex items-center gap-2">{item.refills}<CopyButton text={item.refills} /></div></td>
                    <td className="text-xs opacity-50 max-w-[180px] truncate">{item.note || '—'}</td>
                  </tr>
                  {expandedRow === idx && (
                    <tr className="row-details">
                      <td colSpan={7}>
                        <div className="p-4 grid md:grid-cols-3 gap-4">
                          <div><div className="text-xs font-mono uppercase opacity-50 mb-1">Full Notes</div><div className="text-sm">{item.note || 'No additional notes'}</div></div>
                          <div><div className="text-xs font-mono uppercase opacity-50 mb-1">Refill Schedule</div><div className="text-sm flex items-center gap-2">{item.refills}<CopyButton text={item.refills} className="opacity-100" /></div></div>
                          <div><div className="text-xs font-mono uppercase opacity-50 mb-1">Pharmacy Contact</div>
                            {pharmacyInfo[item.pharmacy] && (
                              <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{pharmacyInfo[item.pharmacy].phone}<CopyButton text={pharmacyInfo[item.pharmacy].phone} className="opacity-100" /></div>
                                <div className="flex items-center gap-2"><Globe className="w-3 h-3" />{pharmacyInfo[item.pharmacy].website}</div>
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
      
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-60 flex items-center gap-2">
          <Info className="w-4 h-4" />Showing <span className="font-mono text-blue-600">{filteredData.length}</span> of <span className="font-mono text-blue-600">{pharmacyData.length}</span> • Click row to expand • <kbd className="px-1 py-0.5 bg-[var(--bg-tertiary)] rounded text-xs">↑↓</kbd> navigate
        </p>
        <DownloadButton onClick={handleDownload} label="Download Results" count={filteredData.length} />
      </div>
    </div>
  );
};

const MedicationsTab = () => {
  const formLabels = { 'Injections': 'Injectable', 'Tablet': 'Oral Tablet', 'Capsule': 'Oral Capsule', 'Cream': 'Topical Cream', 'Topical solution': 'Topical Solution', 'Oral suspension': 'Oral Suspension' };

  const handleDownload = () => {
    downloadCSV(prescriptionData, 'medications-list', [
      { label: 'Program', accessor: d => d.program }, { label: 'Medication', accessor: d => d.medication },
      { label: 'Controlled', accessor: d => d.controlled ? 'Yes' : 'No' }, { label: 'Form', accessor: d => formLabels[d.form] || d.form }, { label: 'Route', accessor: d => d.route },
    ]);
  };

  return (
    <div className="animate-in space-y-6">
      <div className="flex justify-end gap-2">
        <button onClick={() => window.print()} className="btn btn-secondary no-print"><Printer className="w-4 h-4" />Print</button>
        <DownloadButton onClick={handleDownload} label="Download Medications" count={prescriptionData.length} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptionData.map((med, idx) => (
          <div key={idx} className="card p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <ProgramBadge program={med.program} />
              {med.controlled && <span className="badge bg-red-100 text-red-600 border border-red-200"><AlertCircle className="w-3 h-3 mr-1" />Controlled</span>}
            </div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">{med.medication}<CopyButton text={med.medication} /></h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><FormIcon form={med.form} /></div>
                <div><div className="text-xs opacity-50 uppercase tracking-wide">Form</div><div className="font-medium">{formLabels[med.form] || med.form}</div></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><MapPin className="w-5 h-5 text-blue-500" /></div>
                <div><div className="text-xs opacity-50 uppercase tracking-wide">Route</div><div>{med.route}</div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StateCoverageTab = ({ initialState = '' }) => {
  const [selectedState, setSelectedState] = useState(initialState);
  const [compareState, setCompareState] = useState('');
  const [showCompare, setShowCompare] = useState(false);
  const states = Object.keys(statesData).sort();
  
  const getStatusText = (status) => status === true ? 'Available' : status === false ? 'Unavailable' : status === 'limited' ? 'Limited' : 'Unknown';

  const handleDownload = (state) => {
    if (!state || !statesData[state]) return;
    const coverage = statesData[state];
    const rows = [];
    ['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar'].forEach(p => rows.push({ state, program: 'TRT', pharmacy: p, status: getStatusText(coverage.TRT?.[p]) }));
    ['Belmar', 'Curexa'].forEach(p => rows.push({ state, program: 'HRT', pharmacy: p, status: getStatusText(coverage.HRT?.[p]) }));
    ['Curexa', 'TPH', 'Absolute', 'RedRock'].forEach(p => rows.push({ state, program: 'GLP', pharmacy: p, status: getStatusText(coverage.GLP?.[p]) }));
    downloadCSV(rows, `state-coverage-${state.replace(/\s+/g, '-')}`, [
      { label: 'State', accessor: d => d.state }, { label: 'Program', accessor: d => d.program }, { label: 'Pharmacy', accessor: d => d.pharmacy }, { label: 'Status', accessor: d => d.status },
    ]);
  };

  const handleDownloadAllStates = () => {
    const rows = [];
    Object.entries(statesData).forEach(([state, coverage]) => {
      ['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar'].forEach(p => rows.push({ state, program: 'TRT', pharmacy: p, status: getStatusText(coverage.TRT?.[p]) }));
      ['Belmar', 'Curexa'].forEach(p => rows.push({ state, program: 'HRT', pharmacy: p, status: getStatusText(coverage.HRT?.[p]) }));
      ['Curexa', 'TPH', 'Absolute', 'RedRock'].forEach(p => rows.push({ state, program: 'GLP', pharmacy: p, status: getStatusText(coverage.GLP?.[p]) }));
    });
    downloadCSV(rows, 'state-coverage-all-states', [
      { label: 'State', accessor: d => d.state }, { label: 'Program', accessor: d => d.program }, { label: 'Pharmacy', accessor: d => d.pharmacy }, { label: 'Status', accessor: d => d.status },
    ]);
  };
  
  const CoverageSection = ({ program, coverage, pharmacyList, color, icon: Icon }) => {
    const colorMap = { blue: { border: 'border-blue-200', header: 'bg-blue-600 text-white' }, rose: { border: 'border-rose-200', header: 'bg-rose-500 text-white' }, teal: { border: 'border-teal-200', header: 'bg-teal-600 text-white' } };
    const c = colorMap[color];
    return (
      <div className={`card overflow-hidden ${c.border}`}>
        <div className={`px-4 py-3 ${c.header} flex items-center gap-2`}><Icon className="w-4 h-4" /><h3 className="font-semibold">{program} Coverage</h3></div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pharmacyList.map(pharmacy => (
              <div key={pharmacy} className="flex items-center justify-between bg-[var(--bg-tertiary)] rounded-lg px-3 py-2">
                <span className="text-sm flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 opacity-40" />{pharmacy}</span>
                <StatusIcon status={coverage?.[pharmacy]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const StateCoverage = ({ state, showHeader = true }) => {
    if (!state || !statesData[state]) return null;
    return (
      <div className="space-y-4">
        {showHeader && <h3 className="text-lg font-semibold flex items-center gap-2"><MapPin className="w-5 h-5" />{state}</h3>}
        <CoverageSection program="TRT" coverage={statesData[state].TRT} pharmacyList={['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar']} color="blue" icon={Activity} />
        <CoverageSection program="HRT" coverage={statesData[state].HRT} pharmacyList={['Belmar', 'Curexa']} color="rose" icon={Heart} />
        <CoverageSection program="GLP" coverage={statesData[state].GLP} pharmacyList={['Curexa', 'TPH', 'Absolute', 'RedRock']} color="teal" icon={Scale} />
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1"><MapPin className="w-3 h-3" />Select State</label>
            <div className="relative">
              <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <select value={selectedState} onChange={e => { setSelectedState(e.target.value); setShowCompare(false); }} className="input select md:w-72 pl-10">
                <option value="">Choose a state...</option>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
          </div>
          {selectedState && (
            <div className="flex gap-2">
              <button onClick={() => setShowCompare(!showCompare)} className={`btn ${showCompare ? 'btn-primary' : 'btn-secondary'}`}><ArrowLeftRight className="w-4 h-4" />Compare</button>
              <DownloadButton onClick={() => handleDownload(selectedState)} label={`Download`} />
              <button onClick={handleDownloadAllStates} className="btn btn-secondary"><FileSpreadsheet className="w-4 h-4" />All States</button>
            </div>
          )}
        </div>
        {showCompare && selectedState && (
          <div className="mt-4 pt-4 border-t border-[var(--border-primary)]">
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1"><ArrowLeftRight className="w-3 h-3" />Compare with</label>
            <select value={compareState} onChange={e => setCompareState(e.target.value)} className="input select md:w-72">
              <option value="">Choose another state...</option>
              {states.filter(s => s !== selectedState).map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
        )}
      </div>
      
      {selectedState && statesData[selectedState] ? (
        showCompare && compareState ? (
          <div className="compare-grid">
            <StateCoverage state={selectedState} />
            <StateCoverage state={compareState} />
          </div>
        ) : (
          <>
            <StateCoverage state={selectedState} showHeader={false} />
            <div className="card p-4">
              <h4 className="text-xs font-mono uppercase tracking-wide opacity-50 mb-3 flex items-center gap-1"><Info className="w-3 h-3" />Legend</h4>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /><span className="opacity-70">Available — Full service</span></div>
                <div className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /><span className="opacity-70">Unavailable — Not offered</span></div>
                <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /><span className="opacity-70">Limited — Restrictions apply</span></div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="card p-12 text-center">
          <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4"><Map className="w-10 h-10 text-blue-400" /></div>
          <p className="opacity-50">Select a state to view pharmacy coverage</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN
// ============================================================================

export default function PharmacyMatrix() {
  const [activeTab, setActiveTab] = useState('overview');
  const [tabParams, setTabParams] = useState({});
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const [recentSearches, addRecentSearch] = useRecentSearches();
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'lookup', label: 'Pharmacy Lookup', icon: Search },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'states', label: 'State Coverage', icon: MapPin },
  ];

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCommandPaletteOpen(true); }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) { e.preventDefault(); setCommandPaletteOpen(true); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab, params = {}) => {
    setActiveTab(tab);
    setTabParams(params);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} onNavigate={handleNavigate} addRecent={addRecentSearch} />
      
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-sm border-b border-[var(--border-primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg"><Package className="w-5 h-5 text-white" /></div>
              <div><h1 className="text-xl font-bold">Pharmacy Matrix</h1><p className="text-xs font-mono opacity-50 -mt-0.5">Internal Reference</p></div>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => setCommandPaletteOpen(true)} className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-tertiary)] rounded-lg text-sm opacity-60 hover:opacity-100 transition-opacity">
                <Search className="w-4 h-4" /><span>Search...</span><kbd className="ml-2 px-1.5 py-0.5 bg-[var(--bg-secondary)] rounded text-xs">⌘K</kbd>
              </button>
              <button onClick={toggleTheme} className="btn btn-ghost p-2" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 pb-3">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setTabParams({}); }} className={`tab flex items-center gap-1.5 ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="md:hidden px-4 pb-3 overflow-x-auto">
          <div className="flex gap-1 w-fit">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setTabParams({}); }} className={`tab whitespace-nowrap text-xs flex items-center gap-1 ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}>
                <tab.icon className="w-3.5 h-3.5" />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <div className="bg-amber-50 border-b border-amber-200 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span><strong>Reminder:</strong> CS is not allowed to provide medical advice or information about medications. Please direct these inquiries to the medical team.</span>
          </p>
        </div>
      </div>
      
      {recentSearches.length > 0 && activeTab === 'overview' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 no-print">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wide opacity-50"><Clock className="w-3 h-3" />Recent</div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map(item => (
              <button key={item.id} onClick={() => handleNavigate(item.type === 'state' ? 'states' : 'lookup', item.type === 'state' ? { state: item.data.state } : item.type === 'pharmacy' ? { pharmacy: item.data.pharmacy } : { search: item.data.medication })} className="recent-item">
                <item.icon className="w-3.5 h-3.5" />{item.title}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'lookup' && <PharmacyLookupTab initialFilters={tabParams} />}
        {activeTab === 'medications' && <MedicationsTab />}
        {activeTab === 'states' && <StateCoverageTab initialState={tabParams.state} />}
      </main>
      
      <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-primary)] no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-center text-sm opacity-50 flex items-center justify-center gap-2">
            <Package className="w-4 h-4" />Pharmacy Matrix · Internal Use Only · Updated January 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
