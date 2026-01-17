'use client';

import { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Pill, 
  MapPin,
  Building2,
  Package,
  Map,
  Zap,
  Truck,
  Check,
  X,
  AlertTriangle,
  CircleDot,
  Syringe,
  Droplets,
  FlaskConical,
  TestTube,
  Activity,
  Heart,
  Scale,
  ChevronDown,
  AlertCircle,
  Info,
  Download,
  FileSpreadsheet
} from 'lucide-react';

// ============================================================================
// DATA
// ============================================================================

const pharmacyData = [
  // TRT Program
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
  
  // HRT Program
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Estradiol/Testosterone Cream", carrier: "UPS", note: "", refills: "Monthly or 3 months" },
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Progesterone Capsule", carrier: "UPS", note: "", refills: "Monthly or 3 months" },
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Spironolactone", carrier: "UPS", note: "add-on", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Belmar", api: false, medication: "Desiccated thyroid", carrier: "UPS", note: "add-on", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Progesterone Troche", carrier: "FedEx", note: "", refills: "Every 4 or 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Blush Cream", carrier: "FedEx", note: "", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Face Cream", carrier: "FedEx", note: "", refills: "Every 12 weeks" },
  { program: "HRT", pharmacy: "Curexa", api: true, medication: "Minoxidil/Dutasteride (Hair)", carrier: "FedEx", note: "", refills: "Every 8 weeks" },
  { program: "HRT", pharmacy: "TPH", api: false, medication: "Finasteride (Hair growth)", carrier: "UPS", note: "", refills: "Every 8 weeks" },
  
  // GLP Program
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

// ============================================================================
// CSV EXPORT UTILITY
// ============================================================================

const downloadCSV = (data, filename, columns) => {
  // Build header row
  const headers = columns.map(col => col.label).join(',');
  
  // Build data rows
  const rows = data.map(item => {
    return columns.map(col => {
      let value = col.accessor(item);
      // Escape quotes and wrap in quotes if contains comma or quote
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',');
  });
  
  const csv = [headers, ...rows].join('\n');
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ============================================================================
// COMPONENTS
// ============================================================================

const DownloadButton = ({ onClick, label = 'Download CSV', count }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
  >
    <Download className="w-4 h-4" />
    {label}
    {count !== undefined && (
      <span className="bg-blue-500 px-2 py-0.5 rounded-full text-xs font-mono">{count}</span>
    )}
  </button>
);

const ProgramBadge = ({ program }) => {
  const config = {
    TRT: { class: 'badge-trt', icon: Activity },
    HRT: { class: 'badge-hrt', icon: Heart },
    GLP: { class: 'badge-glp', icon: Scale },
  };
  const { class: className, icon: Icon } = config[program];
  return (
    <span className={`badge ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {program}
    </span>
  );
};

const PharmacyBadge = ({ pharmacy }) => {
  const styles = {
    Empower: 'pharmacy-empower',
    Curexa: 'pharmacy-curexa',
    TPH: 'pharmacy-tph',
    Absolute: 'pharmacy-absolute',
    Belmar: 'pharmacy-belmar',
    'Red Rock': 'pharmacy-redrock',
  };
  return (
    <span className={`badge ${styles[pharmacy] || 'bg-gray-100 text-gray-700'}`}>
      <Building2 className="w-3 h-3 mr-1" />
      {pharmacy}
    </span>
  );
};

const CarrierBadge = ({ carrier }) => {
  const styles = {
    FedEx: 'carrier-fedex',
    UPS: 'carrier-ups',
  };
  return (
    <span className={`badge ${styles[carrier]}`}>
      <Truck className="w-3 h-3 mr-1" />
      {carrier}
    </span>
  );
};

const ApiStatus = ({ hasApi }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${hasApi ? 'text-emerald-600' : 'text-slate-400'}`}>
    {hasApi ? <Zap className="w-3.5 h-3.5" /> : <CircleDot className="w-3.5 h-3.5" />}
    {hasApi ? 'Yes' : 'No'}
  </span>
);

const StatusIcon = ({ status }) => {
  if (status === true) {
    return (
      <span className="status-available font-medium inline-flex items-center gap-1">
        <Check className="w-4 h-4" />
        Available
      </span>
    );
  }
  if (status === false) {
    return (
      <span className="status-unavailable font-medium inline-flex items-center gap-1">
        <X className="w-4 h-4" />
        Unavailable
      </span>
    );
  }
  if (status === 'limited') {
    return (
      <span className="status-limited font-medium inline-flex items-center gap-1">
        <AlertTriangle className="w-4 h-4" />
        Limited
      </span>
    );
  }
  return <span className="text-slate-400">—</span>;
};

const FormIcon = ({ form }) => {
  const icons = {
    'Injections': Syringe,
    'Tablet': Pill,
    'Capsule': Pill,
    'Cream': Droplets,
    'Topical solution': FlaskConical,
    'Oral suspension': TestTube,
  };
  const Icon = icons[form] || Pill;
  return <Icon className="w-5 h-5 text-blue-500" />;
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
  
  const getPharmacies = (program) => [...new Set(pharmacyData.filter(d => d.program === program).map(d => d.pharmacy))];
  const getMedications = (program) => [...new Set(pharmacyData.filter(d => d.program === program).map(d => d.medication))];
  
  const stats = [
    { label: 'Pharmacies', value: [...new Set(pharmacyData.map(d => d.pharmacy))].length, icon: Building2 },
    { label: 'Medications', value: prescriptionData.length, icon: Pill },
    { label: 'States Covered', value: Object.keys(statesData).length, icon: Map },
    { label: 'API Integrated', value: [...new Set(pharmacyData.filter(d => d.api).map(d => d.pharmacy))].length, icon: Zap },
  ];
  
  const colorMap = {
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', accent: 'text-blue-600', iconBg: 'bg-blue-100' },
    rose: { border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-700', accent: 'text-rose-600', iconBg: 'bg-rose-100' },
    teal: { border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-700', accent: 'text-teal-600', iconBg: 'bg-teal-100' },
  };

  const handleDownloadAll = () => {
    downloadCSV(pharmacyData, 'pharmacy-matrix-all-data', [
      { label: 'Program', accessor: (d) => d.program },
      { label: 'Pharmacy', accessor: (d) => d.pharmacy },
      { label: 'Medication', accessor: (d) => d.medication },
      { label: 'API Integration', accessor: (d) => d.api ? 'Yes' : 'No' },
      { label: 'Carrier', accessor: (d) => d.carrier },
      { label: 'Refills', accessor: (d) => d.refills },
      { label: 'Notes', accessor: (d) => d.note || '' },
    ]);
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download All Button */}
      <div className="flex justify-end">
        <DownloadButton onClick={handleDownloadAll} label="Export All Data" count={pharmacyData.length} />
      </div>

      {/* Program Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {programs.map((program) => {
          const pharmacies = getPharmacies(program.id);
          const medications = getMedications(program.id);
          const colors = colorMap[program.color];
          const Icon = program.icon;
          
          return (
            <div key={program.id} className={`card p-6 ${colors.border}`}>
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                  <Icon className={`w-5 h-5 ${colors.accent}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${colors.accent}`}>{program.name}</h3>
                  <p className="text-xs text-slate-500">{program.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className={`${colors.bg} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold font-mono ${colors.accent}`}>{pharmacies.length}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Building2 className="w-3 h-3" /> Pharmacies
                  </div>
                </div>
                <div className={`${colors.bg} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold font-mono ${colors.accent}`}>{medications.length}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Pill className="w-3 h-3" /> Medications
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {pharmacies.map(pharmacy => (
                  <PharmacyBadge key={pharmacy} pharmacy={pharmacy} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PharmacyLookupTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All');
  const [selectedPharmacy, setSelectedPharmacy] = useState('All');
  
  const pharmacies = ['All', ...new Set(pharmacyData.map(d => d.pharmacy))];
  
  const filteredData = useMemo(() => {
    return pharmacyData.filter(item => {
      const matchesSearch = !searchTerm || item.medication.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProgram = selectedProgram === 'All' || item.program === selectedProgram;
      const matchesPharmacy = selectedPharmacy === 'All' || item.pharmacy === selectedPharmacy;
      return matchesSearch && matchesProgram && matchesPharmacy;
    });
  }, [searchTerm, selectedProgram, selectedPharmacy]);

  const handleDownload = () => {
    const filterSuffix = [
      selectedProgram !== 'All' ? selectedProgram : '',
      selectedPharmacy !== 'All' ? selectedPharmacy : '',
      searchTerm ? searchTerm.replace(/\s+/g, '-') : '',
    ].filter(Boolean).join('-');
    
    const filename = `pharmacy-lookup${filterSuffix ? '-' + filterSuffix : ''}`;
    
    downloadCSV(filteredData, filename, [
      { label: 'Program', accessor: (d) => d.program },
      { label: 'Pharmacy', accessor: (d) => d.pharmacy },
      { label: 'Medication', accessor: (d) => d.medication },
      { label: 'API Integration', accessor: (d) => d.api ? 'Yes' : 'No' },
      { label: 'Carrier', accessor: (d) => d.carrier },
      { label: 'Refills', accessor: (d) => d.refills },
      { label: 'Notes', accessor: (d) => d.note || '' },
    ]);
  };
  
  return (
    <div className="space-y-6 animate-in">
      {/* Filters */}
      <div className="card p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1">
              <Search className="w-3 h-3" /> Search Medication
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              <input
                type="text"
                placeholder="Type medication name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1">
              <Activity className="w-3 h-3" /> Program
            </label>
            <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} className="select">
              <option value="All">All Programs</option>
              <option value="TRT">TRT</option>
              <option value="HRT">HRT</option>
              <option value="GLP">GLP</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1">
              <Building2 className="w-3 h-3" /> Pharmacy
            </label>
            <select value={selectedPharmacy} onChange={(e) => setSelectedPharmacy(e.target.value)} className="select">
              {pharmacies.map(p => <option key={p} value={p}>{p === 'All' ? 'All Pharmacies' : p}</option>)}
            </select>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Pharmacy</th>
                <th>Medication</th>
                <th>API</th>
                <th>Carrier</th>
                <th>Refills</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx}>
                  <td><ProgramBadge program={item.program} /></td>
                  <td><PharmacyBadge pharmacy={item.pharmacy} /></td>
                  <td className="font-medium text-blue-900">{item.medication}</td>
                  <td><ApiStatus hasApi={item.api} /></td>
                  <td><CarrierBadge carrier={item.carrier} /></td>
                  <td className="text-slate-500 text-xs">{item.refills}</td>
                  <td className="text-slate-400 text-xs max-w-[180px] truncate">{item.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Showing <span className="font-mono text-blue-600">{filteredData.length}</span> of <span className="font-mono text-blue-600">{pharmacyData.length}</span> entries
        </p>
        <DownloadButton onClick={handleDownload} label="Download Results" count={filteredData.length} />
      </div>
    </div>
  );
};

const MedicationsTab = () => {
  const formLabels = {
    'Injections': 'Injectable',
    'Tablet': 'Oral Tablet',
    'Capsule': 'Oral Capsule',
    'Cream': 'Topical Cream',
    'Topical solution': 'Topical Solution',
    'Oral suspension': 'Oral Suspension',
  };

  const handleDownload = () => {
    downloadCSV(prescriptionData, 'medications-list', [
      { label: 'Program', accessor: (d) => d.program },
      { label: 'Medication', accessor: (d) => d.medication },
      { label: 'Controlled Substance', accessor: (d) => d.controlled ? 'Yes' : 'No' },
      { label: 'Form', accessor: (d) => formLabels[d.form] || d.form },
      { label: 'Route of Administration', accessor: (d) => d.route },
    ]);
  };

  return (
    <div className="animate-in space-y-6">
      <div className="flex justify-end">
        <DownloadButton onClick={handleDownload} label="Download Medications" count={prescriptionData.length} />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptionData.map((med, idx) => (
          <div key={idx} className="card p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <ProgramBadge program={med.program} />
              {med.controlled && (
                <span className="badge bg-red-100 text-red-600 border border-red-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Controlled
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{med.medication}</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FormIcon form={med.form} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Form</div>
                  <div className="text-blue-800 font-medium">{formLabels[med.form] || med.form}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Route</div>
                  <div className="text-blue-800">{med.route}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StateCoverageTab = () => {
  const [selectedState, setSelectedState] = useState('');
  const states = Object.keys(statesData).sort();
  
  const getStatusText = (status) => {
    if (status === true) return 'Available';
    if (status === false) return 'Unavailable';
    if (status === 'limited') return 'Limited';
    return 'Unknown';
  };

  const handleDownload = () => {
    if (!selectedState || !statesData[selectedState]) return;
    
    const coverage = statesData[selectedState];
    const rows = [];
    
    // TRT pharmacies
    ['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar'].forEach(pharmacy => {
      rows.push({
        state: selectedState,
        program: 'TRT',
        pharmacy,
        status: getStatusText(coverage.TRT?.[pharmacy])
      });
    });
    
    // HRT pharmacies
    ['Belmar', 'Curexa'].forEach(pharmacy => {
      rows.push({
        state: selectedState,
        program: 'HRT',
        pharmacy,
        status: getStatusText(coverage.HRT?.[pharmacy])
      });
    });
    
    // GLP pharmacies
    ['Curexa', 'TPH', 'Absolute', 'RedRock'].forEach(pharmacy => {
      rows.push({
        state: selectedState,
        program: 'GLP',
        pharmacy,
        status: getStatusText(coverage.GLP?.[pharmacy])
      });
    });
    
    downloadCSV(rows, `state-coverage-${selectedState.replace(/\s+/g, '-')}`, [
      { label: 'State', accessor: (d) => d.state },
      { label: 'Program', accessor: (d) => d.program },
      { label: 'Pharmacy', accessor: (d) => d.pharmacy },
      { label: 'Status', accessor: (d) => d.status },
    ]);
  };

  const handleDownloadAllStates = () => {
    const rows = [];
    
    Object.entries(statesData).forEach(([state, coverage]) => {
      // TRT
      ['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar'].forEach(pharmacy => {
        rows.push({
          state,
          program: 'TRT',
          pharmacy,
          status: getStatusText(coverage.TRT?.[pharmacy])
        });
      });
      
      // HRT
      ['Belmar', 'Curexa'].forEach(pharmacy => {
        rows.push({
          state,
          program: 'HRT',
          pharmacy,
          status: getStatusText(coverage.HRT?.[pharmacy])
        });
      });
      
      // GLP
      ['Curexa', 'TPH', 'Absolute', 'RedRock'].forEach(pharmacy => {
        rows.push({
          state,
          program: 'GLP',
          pharmacy,
          status: getStatusText(coverage.GLP?.[pharmacy])
        });
      });
    });
    
    downloadCSV(rows, 'state-coverage-all-states', [
      { label: 'State', accessor: (d) => d.state },
      { label: 'Program', accessor: (d) => d.program },
      { label: 'Pharmacy', accessor: (d) => d.pharmacy },
      { label: 'Status', accessor: (d) => d.status },
    ]);
  };
  
  const CoverageSection = ({ program, coverage, pharmacyList, color, icon: Icon }) => {
    const colorMap = {
      blue: { border: 'border-blue-200', header: 'bg-blue-600 text-white' },
      rose: { border: 'border-rose-200', header: 'bg-rose-500 text-white' },
      teal: { border: 'border-teal-200', header: 'bg-teal-600 text-white' },
    };
    const c = colorMap[color];
    
    return (
      <div className={`card overflow-hidden ${c.border}`}>
        <div className={`px-4 py-3 ${c.header} flex items-center gap-2`}>
          <Icon className="w-4 h-4" />
          <h3 className="font-semibold">{program} Coverage</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pharmacyList.map(pharmacy => (
              <div key={pharmacy} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                <span className="text-sm text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {pharmacy}
                </span>
                <StatusIcon status={coverage?.[pharmacy]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Select State
            </label>
            <div className="relative">
              <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="select md:w-72 pl-10">
                <option value="">Choose a state...</option>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            {selectedState && (
              <DownloadButton onClick={handleDownload} label={`Download ${selectedState}`} />
            )}
            <button
              onClick={handleDownloadAllStates}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              All States
            </button>
          </div>
        </div>
      </div>
      
      {selectedState && statesData[selectedState] ? (
        <div className="space-y-4">
          <CoverageSection program="TRT" coverage={statesData[selectedState].TRT} pharmacyList={['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar']} color="blue" icon={Activity} />
          <CoverageSection program="HRT" coverage={statesData[selectedState].HRT} pharmacyList={['Belmar', 'Curexa']} color="rose" icon={Heart} />
          <CoverageSection program="GLP" coverage={statesData[selectedState].GLP} pharmacyList={['Curexa', 'TPH', 'Absolute', 'RedRock']} color="teal" icon={Scale} />
          
          <div className="card p-4">
            <h4 className="text-xs font-mono uppercase tracking-wide text-slate-500 mb-3 flex items-center gap-1">
              <Info className="w-3 h-3" /> Legend
            </h4>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-600">Available — Full service</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                <span className="text-slate-600">Unavailable — Not offered</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-slate-600">Limited — Restrictions apply</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4">
            <Map className="w-10 h-10 text-blue-400" />
          </div>
          <p className="text-slate-500">Select a state to view pharmacy coverage</p>
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
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'lookup', label: 'Pharmacy Lookup', icon: Search },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'states', label: 'State Coverage', icon: MapPin },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">Pharmacy Matrix</h1>
                <p className="text-xs text-blue-500 font-mono -mt-0.5">Internal Reference</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-1 bg-blue-50 p-1 rounded-lg">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab flex items-center gap-1.5 ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden px-4 pb-3 overflow-x-auto">
          <div className="flex gap-1 bg-blue-50 p-1 rounded-lg w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab whitespace-nowrap text-xs flex items-center gap-1 ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Warning */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span><span className="font-semibold">Reminder:</span> CS is not allowed to provide medical advice or information about medications. Please direct these inquiries to the medical team.</span>
          </p>
        </div>
      </div>
      
      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'lookup' && <PharmacyLookupTab />}
        {activeTab === 'medications' && <MedicationsTab />}
        {activeTab === 'states' && <StateCoverageTab />}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-center text-sm text-slate-400 flex items-center justify-center gap-2">
            <Package className="w-4 h-4" />
            Pharmacy Matrix · Internal Use Only · Updated January 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
