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
// COMPONENTS
// ============================================================================

const ProgramBadge = ({ program }) => {
  const styles = {
    TRT: 'badge-trt',
    HRT: 'badge-hrt',
    GLP: 'badge-glp',
  };
  return <span className={`badge ${styles[program]}`}>{program}</span>;
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
  return <span className={`badge ${styles[pharmacy] || 'bg-gray-100 text-gray-700'}`}>{pharmacy}</span>;
};

const CarrierBadge = ({ carrier }) => {
  const styles = {
    FedEx: 'carrier-fedex',
    UPS: 'carrier-ups',
  };
  return <span className={`badge ${styles[carrier]}`}>{carrier}</span>;
};

const ApiStatus = ({ hasApi }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${hasApi ? 'text-emerald-600' : 'text-slate-400'}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${hasApi ? 'bg-emerald-500' : 'bg-slate-300'}`} />
    {hasApi ? 'Yes' : 'No'}
  </span>
);

const StatusIcon = ({ status }) => {
  if (status === true) return <span className="status-available font-semibold">Available</span>;
  if (status === false) return <span className="status-unavailable font-semibold">Unavailable</span>;
  if (status === 'limited') return <span className="status-limited font-semibold">Limited</span>;
  return <span className="text-slate-400">—</span>;
};

// ============================================================================
// TABS
// ============================================================================

const OverviewTab = () => {
  const programs = [
    { id: 'TRT', name: 'TRT', description: 'Testosterone Replacement Therapy', color: 'blue' },
    { id: 'HRT', name: 'HRT', description: 'Hormone Replacement Therapy', color: 'rose' },
    { id: 'GLP', name: 'GLP', description: 'GLP-1 Weight Management', color: 'teal' },
  ];
  
  const getPharmacies = (program) => [...new Set(pharmacyData.filter(d => d.program === program).map(d => d.pharmacy))];
  const getMedications = (program) => [...new Set(pharmacyData.filter(d => d.program === program).map(d => d.medication))];
  
  const stats = {
    pharmacies: [...new Set(pharmacyData.map(d => d.pharmacy))].length,
    medications: prescriptionData.length,
    states: Object.keys(statesData).length,
    apiCount: [...new Set(pharmacyData.filter(d => d.api).map(d => d.pharmacy))].length,
  };
  
  const colorMap = {
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', accent: 'text-blue-600' },
    rose: { border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-700', accent: 'text-rose-600' },
    teal: { border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-700', accent: 'text-teal-600' },
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-value">{stats.pharmacies}</div>
          <div className="stat-label">Pharmacies</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.medications}</div>
          <div className="stat-label">Medications</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.states}</div>
          <div className="stat-label">States Covered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.apiCount}</div>
          <div className="stat-label">API Integrated</div>
        </div>
      </div>

      {/* Program Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {programs.map((program) => {
          const pharmacies = getPharmacies(program.id);
          const medications = getMedications(program.id);
          const colors = colorMap[program.color];
          
          return (
            <div key={program.id} className={`card p-6 ${colors.border}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-xl font-bold ${colors.accent}`}>{program.name}</h3>
                <ProgramBadge program={program.id} />
              </div>
              <p className="text-sm text-slate-500 mb-5">{program.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className={`${colors.bg} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold font-mono ${colors.accent}`}>{pharmacies.length}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Pharmacies</div>
                </div>
                <div className={`${colors.bg} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold font-mono ${colors.accent}`}>{medications.length}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Medications</div>
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
  
  return (
    <div className="space-y-6 animate-in">
      {/* Filters */}
      <div className="card p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5">Search Medication</label>
            <input
              type="text"
              placeholder="Type medication name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5">Program</label>
            <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} className="select">
              <option value="All">All Programs</option>
              <option value="TRT">TRT</option>
              <option value="HRT">HRT</option>
              <option value="GLP">GLP</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5">Pharmacy</label>
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
      
      <p className="text-center text-sm text-slate-500">
        Showing <span className="font-mono text-blue-600">{filteredData.length}</span> of <span className="font-mono text-blue-600">{pharmacyData.length}</span> entries
      </p>
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

  return (
    <div className="animate-in">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptionData.map((med, idx) => (
          <div key={idx} className="card p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <ProgramBadge program={med.program} />
              {med.controlled && (
                <span className="badge bg-red-100 text-red-600 border border-red-200">Controlled</span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{med.medication}</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Form</span>
                <span className="text-blue-800 font-medium">{formLabels[med.form] || med.form}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Route</span>
                <span className="text-blue-800">{med.route}</span>
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
  
  const CoverageSection = ({ program, coverage, pharmacyList, color }) => {
    const colorMap = {
      blue: { border: 'border-blue-200', header: 'bg-blue-600 text-white' },
      rose: { border: 'border-rose-200', header: 'bg-rose-500 text-white' },
      teal: { border: 'border-teal-200', header: 'bg-teal-600 text-white' },
    };
    const c = colorMap[color];
    
    return (
      <div className={`card overflow-hidden ${c.border}`}>
        <div className={`px-4 py-3 ${c.header}`}>
          <h3 className="font-semibold">{program} Coverage</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pharmacyList.map(pharmacy => (
              <div key={pharmacy} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                <span className="text-sm text-slate-700">{pharmacy}</span>
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
        <label className="block text-xs font-mono uppercase tracking-wide text-blue-600 mb-1.5">Select State</label>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="select md:w-72">
          <option value="">Choose a state...</option>
          {states.map(state => <option key={state} value={state}>{state}</option>)}
        </select>
      </div>
      
      {selectedState && statesData[selectedState] ? (
        <div className="space-y-4">
          <CoverageSection program="TRT" coverage={statesData[selectedState].TRT} pharmacyList={['Empower', 'Curexa', 'TPH', 'Absolute', 'Belmar']} color="blue" />
          <CoverageSection program="HRT" coverage={statesData[selectedState].HRT} pharmacyList={['Belmar', 'Curexa']} color="rose" />
          <CoverageSection program="GLP" coverage={statesData[selectedState].GLP} pharmacyList={['Curexa', 'TPH', 'Absolute', 'RedRock']} color="teal" />
          
          <div className="card p-4">
            <h4 className="text-xs font-mono uppercase tracking-wide text-slate-500 mb-3">Legend</h4>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="status-available font-semibold">Available</span>
                <span className="text-slate-400">— Full service</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="status-unavailable font-semibold">Unavailable</span>
                <span className="text-slate-400">— Not offered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="status-limited font-semibold">Limited</span>
                <span className="text-slate-400">— Restrictions apply</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="text-blue-300 text-5xl mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
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
    { id: 'overview', label: 'Overview' },
    { id: 'lookup', label: 'Pharmacy Lookup' },
    { id: 'medications', label: 'Medications' },
    { id: 'states', label: 'State Coverage' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-bold text-blue-900">Pharmacy Matrix</h1>
              <p className="text-xs text-blue-500 font-mono -mt-0.5">Internal Reference</p>
            </div>
            
            <nav className="hidden md:flex items-center gap-1 bg-blue-50 p-1 rounded-lg">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
                >
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
                className={`tab whitespace-nowrap text-xs ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Warning */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Reminder:</span> CS is not allowed to provide medical advice or information about medications. Please direct these inquiries to the medical team.
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
          <p className="text-center text-sm text-slate-400">
            Pharmacy Matrix · Internal Use Only · Updated January 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
