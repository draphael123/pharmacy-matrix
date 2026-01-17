'use client';

import { useState, useMemo } from 'react';

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
// HELPER COMPONENTS
// ============================================================================

const ProgramBadge = ({ program, size = 'md' }) => {
  const styles = {
    TRT: 'bg-blue-900/30 text-blue-400 border-blue-500/30',
    HRT: 'bg-rose-900/30 text-rose-400 border-rose-500/30',
    GLP: 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-mono font-bold border ${styles[program]} ${sizes[size]}`}>
      {program}
    </span>
  );
};

const PharmacyBadge = ({ pharmacy, size = 'md' }) => {
  const styles = {
    Empower: 'bg-gradient-to-r from-indigo-600/20 to-indigo-500/20 text-indigo-300 border-indigo-500/30',
    Curexa: 'bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30',
    TPH: 'bg-gradient-to-r from-violet-600/20 to-violet-500/20 text-violet-300 border-violet-500/30',
    Absolute: 'bg-gradient-to-r from-amber-600/20 to-amber-500/20 text-amber-300 border-amber-500/30',
    Belmar: 'bg-gradient-to-r from-pink-600/20 to-pink-500/20 text-pink-300 border-pink-500/30',
    'Red Rock': 'bg-gradient-to-r from-red-600/20 to-red-500/20 text-red-300 border-red-500/30',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };
  
  return (
    <span className={`inline-flex items-center rounded-lg font-medium border ${styles[pharmacy] || 'bg-slate-700/50 text-slate-300 border-slate-600'} ${sizes[size]}`}>
      {pharmacy}
    </span>
  );
};

const CarrierBadge = ({ carrier }) => {
  const styles = {
    FedEx: 'bg-purple-900/30 text-purple-400',
    UPS: 'bg-amber-900/30 text-amber-400',
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono ${styles[carrier]}`}>
      {carrier}
    </span>
  );
};

const ApiIndicator = ({ hasApi }) => {
  if (hasApi) {
    return (
      <span className="inline-flex items-center gap-1.5 text-green-400">
        <span className="w-2 h-2 rounded-full bg-green-500 api-indicator"></span>
        <span className="text-xs font-mono">Yes</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-slate-500">
      <span className="w-2 h-2 rounded-full bg-slate-600"></span>
      <span className="text-xs font-mono">No</span>
    </span>
  );
};

const StatusIcon = ({ status }) => {
  if (status === true) {
    return <span className="text-green-400 text-lg">✓</span>;
  } else if (status === false) {
    return <span className="text-red-400 text-lg">✗</span>;
  } else if (status === 'limited') {
    return <span className="text-amber-400 text-lg">!</span>;
  }
  return <span className="text-slate-500">—</span>;
};

const StatCard = ({ label, value, icon, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/30',
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
  };
  
  const textColors = {
    blue: 'text-blue-400',
    rose: 'text-rose-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
  };
  
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-4 transition-smooth hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-3xl font-bold font-mono ${textColors[color]}`}>{value}</span>
      </div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
    </div>
  );
};

// ============================================================================
// TAB COMPONENTS
// ============================================================================

const OverviewTab = () => {
  const programs = ['TRT', 'HRT', 'GLP'];
  
  const programColors = {
    TRT: { bg: 'from-blue-900/40 to-blue-950/60', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'gradient-text-trt' },
    HRT: { bg: 'from-rose-900/40 to-rose-950/60', border: 'border-rose-500/30', text: 'text-rose-400', gradient: 'gradient-text-hrt' },
    GLP: { bg: 'from-emerald-900/40 to-emerald-950/60', border: 'border-emerald-500/30', text: 'text-emerald-400', gradient: 'gradient-text-glp' },
  };
  
  const getPharmaciesForProgram = (program) => {
    return [...new Set(pharmacyData.filter(d => d.program === program).map(d => d.pharmacy))];
  };
  
  const getMedicationsForProgram = (program) => {
    return [...new Set(pharmacyData.filter(d => d.program === program).map(d => d.medication))];
  };
  
  const totalPharmacies = [...new Set(pharmacyData.map(d => d.pharmacy))].length;
  const totalMedications = prescriptionData.length;
  const totalStates = Object.keys(statesData).length;
  const apiIntegrated = [...new Set(pharmacyData.filter(d => d.api).map(d => d.pharmacy))].length;
  
  return (
    <div className="animate-fade-in space-y-8">
      {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((program, idx) => {
          const pharmacies = getPharmaciesForProgram(program);
          const medications = getMedicationsForProgram(program);
          const colors = programColors[program];
          
          return (
            <div 
              key={program} 
              className={`bg-gradient-to-br ${colors.bg} ${colors.border} border rounded-2xl p-6 card-hover animate-slide-up`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-2xl font-bold ${colors.gradient}`}>{program}</h3>
                <ProgramBadge program={program} size="lg" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                  <p className={`text-2xl font-bold font-mono ${colors.text}`}>{pharmacies.length}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Pharmacies</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                  <p className={`text-2xl font-bold font-mono ${colors.text}`}>{medications.length}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Medications</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {pharmacies.map(pharmacy => (
                  <PharmacyBadge key={pharmacy} pharmacy={pharmacy} size="sm" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="🏥" label="Total Pharmacies" value={totalPharmacies} color="blue" />
        <StatCard icon="💊" label="Total Medications" value={totalMedications} color="rose" />
        <StatCard icon="🗺️" label="States Covered" value={totalStates} color="emerald" />
        <StatCard icon="🔌" label="API Integrated" value={apiIntegrated} color="amber" />
      </div>
    </div>
  );
};

const PharmacyLookupTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All');
  const [selectedPharmacy, setSelectedPharmacy] = useState('All');
  
  const pharmacies = ['All', ...new Set(pharmacyData.map(d => d.pharmacy))];
  const programs = ['All', 'TRT', 'HRT', 'GLP'];
  
  const filteredData = useMemo(() => {
    return pharmacyData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.medication.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProgram = selectedProgram === 'All' || item.program === selectedProgram;
      const matchesPharmacy = selectedPharmacy === 'All' || item.pharmacy === selectedPharmacy;
      return matchesSearch && matchesProgram && matchesPharmacy;
    });
  }, [searchTerm, selectedProgram, selectedPharmacy]);
  
  return (
    <div className="animate-fade-in space-y-6">
      {/* Filter Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">
              Search Medication
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
              <input
                type="text"
                placeholder="Search by medication name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">
              Program
            </label>
            <select 
              value={selectedProgram} 
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full"
            >
              {programs.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">
              Pharmacy
            </label>
            <select 
              value={selectedPharmacy} 
              onChange={(e) => setSelectedPharmacy(e.target.value)}
              className="w-full"
            >
              {pharmacies.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="table-container">
        <table>
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
              <tr key={idx} className="transition-colors">
                <td><ProgramBadge program={item.program} /></td>
                <td><PharmacyBadge pharmacy={item.pharmacy} /></td>
                <td className="font-medium text-slate-200">{item.medication}</td>
                <td><ApiIndicator hasApi={item.api} /></td>
                <td><CarrierBadge carrier={item.carrier} /></td>
                <td className="text-slate-400 text-xs">{item.refills}</td>
                <td className="text-slate-500 text-xs max-w-[200px]">{item.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Results Count */}
      <div className="text-center text-slate-500 text-sm">
        Showing <span className="text-slate-300 font-mono">{filteredData.length}</span> of <span className="text-slate-300 font-mono">{pharmacyData.length}</span> results
      </div>
    </div>
  );
};

const MedicationsTab = () => {
  const formIcons = {
    'Injections': '💉',
    'Tablet': '💊',
    'Capsule': '💊',
    'Cream': '🧴',
    'Topical solution': '💧',
    'Oral suspension': '🧪',
  };
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptionData.map((med, idx) => (
          <div 
            key={idx} 
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 card-hover animate-slide-up"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <ProgramBadge program={med.program} />
              {med.controlled && (
                <span className="bg-red-900/30 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full text-xs font-mono">
                  CONTROLLED
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-slate-100 mb-4">{med.medication}</h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">{formIcons[med.form] || '💊'}</span>
                <span className="text-slate-400">Form:</span>
                <span className="text-slate-200">{med.form}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-lg">📍</span>
                <span className="text-slate-400">Route:</span>
                <span className="text-slate-200">{med.route}</span>
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
  
  const renderCoverageSection = (program, coverage, pharmacyList) => {
    const colors = {
      TRT: { bg: 'from-blue-900/30 to-blue-950/50', border: 'border-blue-500/30', text: 'text-blue-400' },
      HRT: { bg: 'from-rose-900/30 to-rose-950/50', border: 'border-rose-500/30', text: 'text-rose-400' },
      GLP: { bg: 'from-emerald-900/30 to-emerald-950/50', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    };
    
    const c = colors[program];
    
    return (
      <div className={`bg-gradient-to-br ${c.bg} ${c.border} border rounded-xl p-5`}>
        <div className="flex items-center gap-3 mb-4">
          <ProgramBadge program={program} size="lg" />
          <h3 className={`text-lg font-semibold ${c.text}`}>{program} Coverage</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {pharmacyList.map(pharmacy => {
            const status = coverage?.[pharmacy];
            return (
              <div 
                key={pharmacy} 
                className="bg-slate-900/50 rounded-lg p-3 flex items-center justify-between"
              >
                <span className="text-sm text-slate-300">{pharmacy}</span>
                <StatusIcon status={status} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      {/* State Selector */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
        <label className="block text-xs font-mono uppercase tracking-wide text-slate-400 mb-2">
          Select State
        </label>
        <select 
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full md:w-1/3"
        >
          <option value="">Choose a state...</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      
      {/* Coverage Display */}
      {selectedState && statesData[selectedState] && (
        <div className="space-y-4 animate-slide-up">
          {renderCoverageSection('TRT', statesData[selectedState].TRT, ['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar'])}
          {renderCoverageSection('HRT', statesData[selectedState].HRT, ['Belmar', 'Curexa'])}
          {renderCoverageSection('GLP', statesData[selectedState].GLP, ['Curexa', 'TPH', 'Absolute', 'RedRock'])}
          
          {/* Legend */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 mt-6">
            <h4 className="text-sm font-mono uppercase tracking-wide text-slate-400 mb-3">Legend</h4>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300 text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">✗</span>
                <span className="text-slate-300 text-sm">Not Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">!</span>
                <span className="text-slate-300 text-sm">Limited Availability</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!selectedState && (
        <div className="text-center py-16 text-slate-500">
          <span className="text-4xl mb-4 block">🗺️</span>
          <p>Select a state to view pharmacy coverage</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PharmacyMatrix() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'lookup', label: 'Pharmacy Lookup', icon: '🔍' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'states', label: 'State Coverage', icon: '🗺️' },
  ];
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-custom bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💊</span>
              <div>
                <h1 className="text-xl font-bold text-slate-100">Pharmacy Matrix</h1>
                <p className="text-xs text-slate-500 font-mono">Internal Reference Tool</p>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Mobile Tab Navigation */}
        <div className="md:hidden border-t border-slate-800 px-4 py-2 overflow-x-auto">
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 bg-slate-800/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Warning Banner */}
      <div className="bg-amber-900/30 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 text-amber-200">
            <span className="text-lg">⚠️</span>
            <p className="text-sm">
              <span className="font-semibold">Reminder:</span> CS is not allowed to provide medical advice or information about medications. Please direct these inquiries to the medical team.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'lookup' && <PharmacyLookupTab />}
        {activeTab === 'medications' && <MedicationsTab />}
        {activeTab === 'states' && <StateCoverageTab />}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            Pharmacy Matrix • Internal Use Only • Last Updated: January 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

