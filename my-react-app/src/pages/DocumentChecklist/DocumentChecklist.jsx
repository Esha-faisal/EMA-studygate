import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Globe,
  CreditCard,
  DollarSign,
  PenLine,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  ArrowLeft,
  Upload,
  RefreshCw,
  Paperclip,
  X,
  CloudUpload,
  Check,
} from 'lucide-react';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './DocumentChecklist.css';

/* ── Document categories based on UC_11 ── */
const categories = [
  {
    id: 'academic',
    label: 'Academic Documents',
    icon: <GraduationCap size={18} />,
    color: 'blue',
    docs: [
      { id: 'transcript', name: 'Academic Transcripts', desc: 'Official transcripts from all institutions attended', required: true },
      { id: 'degree',     name: 'Degree Certificate',   desc: 'Bachelor\'s or Master\'s degree certificate',       required: true },
      { id: 'marksheet',  name: 'Mark Sheets',           desc: 'Semester/year wise mark sheets',                   required: true },
      { id: 'medium',     name: 'Medium of Instruction', desc: 'Certificate confirming language of instruction',   required: false },
    ],
  },
  {
    id: 'language',
    label: 'Language Proficiency',
    icon: <Globe size={18} />,
    color: 'green',
    docs: [
      { id: 'ielts',    name: 'IELTS Score Card',      desc: 'Minimum band score as required by university', required: true },
      { id: 'toefl',    name: 'TOEFL Certificate',     desc: 'Alternative to IELTS for some universities',   required: false },
      { id: 'duolingo', name: 'Duolingo English Test', desc: 'Accepted by select universities',              required: false },
    ],
  },
  {
    id: 'identity',
    label: 'Identity & Travel',
    icon: <CreditCard size={18} />,
    color: 'orange',
    docs: [
      { id: 'passport', name: 'Valid Passport',        desc: 'Must be valid for at least 6 months beyond study period', required: true },
      { id: 'cnic',     name: 'National ID (CNIC)',    desc: 'Government issued national identity card',                required: true },
      { id: 'photo',    name: 'Passport Size Photos',  desc: 'Recent photos with white background',                    required: true },
    ],
  },
  {
    id: 'financial',
    label: 'Financial Documents',
    icon: <DollarSign size={18} />,
    color: 'purple',
    docs: [
      { id: 'bank_stmt',   name: 'Bank Statement',           desc: 'Last 6 months bank statement showing sufficient funds', required: true },
      { id: 'sponsor',     name: 'Sponsorship Letter',       desc: 'If sponsored by employer or family member',             required: false },
      { id: 'scholarship', name: 'Scholarship Award Letter', desc: 'If applying with scholarship funding',                  required: false },
      { id: 'affidavit',   name: 'Financial Affidavit',      desc: 'Notarized statement of financial support',             required: false },
    ],
  },
  {
    id: 'sop',
    label: 'Application Essays',
    icon: <PenLine size={18} />,
    color: 'pink',
    docs: [
      { id: 'sop_doc', name: 'Statement of Purpose (SOP)',  desc: 'Personal essay explaining your goals and motivation', required: true },
      { id: 'lor1',    name: 'Letter of Recommendation 1',  desc: 'From academic professor or supervisor',               required: true },
      { id: 'lor2',    name: 'Letter of Recommendation 2',  desc: 'Second reference letter',                             required: true },
      { id: 'cv',      name: 'Updated CV / Resume',          desc: 'Academic and professional background',                required: true },
    ],
  },
  {
    id: 'visa',
    label: 'Visa Documents',
    icon: <ShieldCheck size={18} />,
    color: 'teal',
    docs: [
      { id: 'offer_letter', name: 'University Offer Letter',       desc: 'Conditional or unconditional offer from university', required: true },
      { id: 'visa_form',    name: 'Visa Application Form',         desc: 'Completed student visa application form',            required: true },
      { id: 'medical',      name: 'Medical Certificate',           desc: 'Health certificate from approved physician',         required: false },
      { id: 'police_cert',  name: 'Police Clearance Certificate',  desc: 'Background check from local authorities',           required: false },
    ],
  },
];

const DocumentChecklist = () => {
  const navigate = useNavigate();

  const [uploads, setUploads]               = useState({});
  const [checked, setChecked]               = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch]                 = useState('');
  const [modal, setModal]                   = useState(null);
  const [selectedFile, setSelectedFile]     = useState(null);

  /* ── Computed stats ── */
  const allDocs      = categories.flatMap(c => c.docs);
  const requiredDocs = allDocs.filter(d => d.required);
  const completedAll = allDocs.filter(d => checked[d.id]).length;
  const completedReq = requiredDocs.filter(d => checked[d.id]).length;
  const overallPct   = Math.round((completedAll / allDocs.length) * 100);
  const requiredPct  = Math.round((completedReq / requiredDocs.length) * 100);

  /* ── Handlers ── */
  const toggleCheck = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const openModal  = (doc) => { setModal(doc); setSelectedFile(null); };
  const closeModal = ()    => { setModal(null); setSelectedFile(null); };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(file.type)) { alert('Invalid file format! Only PDF, JPG, and PNG are allowed.'); return; }
    if (file.size > 5 * 1024 * 1024)  { alert('File size exceeds 5MB limit!'); return; }
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile || !modal) return;
    setUploads(prev => ({
      ...prev,
      [modal.id]: { name: selectedFile.name, size: (selectedFile.size / 1024).toFixed(1) + ' KB', date: new Date().toLocaleDateString() },
    }));
    setChecked(prev => ({ ...prev, [modal.id]: true }));
    closeModal();
  };

  const removeUpload = (id) => {
    setUploads(prev => { const n = { ...prev }; delete n[id]; return n; });
    setChecked(prev => ({ ...prev, [id]: false }));
  };

  /* ── Filtered docs ── */
  const filteredCategories = categories
    .filter(c => activeCategory === 'all' || c.id === activeCategory)
    .map(c => ({
      ...c,
      docs: c.docs.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(c => c.docs.length > 0);

  return (
    <div className="dc-root">
      <NavbarDashboard />
      <div className="dc-body">
        <Sidebar />

        <main className="dc-main">
          {/* ── Header ── */}
          <div className="dc-header">
            <div>
              <h1 className="dc-header__title">Document Checklist</h1>
              <p className="dc-header__sub">Track and upload all required documents for your study abroad application</p>
            </div>
            <button className="dc-btn dc-btn--outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          </div>

          {/* ── Stats Row ── */}
          <div className="dc-stats">
            <div className="dc-stat-card dc-stat-card--blue">
              <div className="dc-stat-card__icon"><FileText size={22} /></div>
              <div className="dc-stat-card__info">
                <p className="dc-stat-card__num">{completedAll} / {allDocs.length}</p>
                <p className="dc-stat-card__label">Total Documents</p>
              </div>
              <div className="dc-stat-card__bar-wrap">
                <div className="dc-stat-card__bar-fill" style={{ width: `${overallPct}%` }} />
              </div>
              <span className="dc-stat-card__pct">{overallPct}%</span>
            </div>

            <div className="dc-stat-card dc-stat-card--red">
              <div className="dc-stat-card__icon"><AlertTriangle size={22} /></div>
              <div className="dc-stat-card__info">
                <p className="dc-stat-card__num">{completedReq} / {requiredDocs.length}</p>
                <p className="dc-stat-card__label">Required Documents</p>
              </div>
              <div className="dc-stat-card__bar-wrap">
                <div className="dc-stat-card__bar-fill dc-stat-card__bar-fill--red" style={{ width: `${requiredPct}%` }} />
              </div>
              <span className="dc-stat-card__pct">{requiredPct}%</span>
            </div>

            <div className="dc-stat-card dc-stat-card--green">
              <div className="dc-stat-card__icon"><CheckCircle size={22} /></div>
              <div className="dc-stat-card__info">
                <p className="dc-stat-card__num">{Object.keys(uploads).length}</p>
                <p className="dc-stat-card__label">Files Uploaded</p>
              </div>
            </div>

            <div className="dc-stat-card dc-stat-card--orange">
              <div className="dc-stat-card__icon"><Clock size={22} /></div>
              <div className="dc-stat-card__info">
                <p className="dc-stat-card__num">{allDocs.length - completedAll}</p>
                <p className="dc-stat-card__label">Remaining</p>
              </div>
            </div>
          </div>

          {/* ── Search & Filter ── */}
          <div className="dc-controls">
            <div className="dc-search">
              <span className="dc-search__icon"><Search size={16} /></span>
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="dc-search__input"
              />
            </div>
            <div className="dc-filters">
              <button
                className={`dc-filter-btn${activeCategory === 'all' ? ' dc-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={`dc-filter-btn${activeCategory === c.id ? ' dc-filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Document Categories ── */}
          {filteredCategories.map(cat => (
            <div key={cat.id} className="dc-category">
              <div className="dc-category__header">
                <span className="dc-category__icon">{cat.icon}</span>
                <h2 className="dc-category__title">{cat.label}</h2>
                <span className="dc-category__count">
                  {cat.docs.filter(d => checked[d.id]).length} / {cat.docs.length} complete
                </span>
              </div>

              <div className="dc-doc-list">
                {cat.docs.map(doc => (
                  <div
                    key={doc.id}
                    className={`dc-doc-card${checked[doc.id] ? ' dc-doc-card--done' : ''}`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`dc-checkbox${checked[doc.id] ? ' dc-checkbox--checked' : ''}`}
                      onClick={() => toggleCheck(doc.id)}
                    >
                      {checked[doc.id] && <Check size={14} />}
                    </div>

                    {/* Info */}
                    <div className="dc-doc-card__info">
                      <div className="dc-doc-card__top">
                        <p className="dc-doc-card__name">{doc.name}</p>
                        {doc.required
                          ? <span className="dc-tag dc-tag--required">Required</span>
                          : <span className="dc-tag dc-tag--optional">Optional</span>
                        }
                      </div>
                      <p className="dc-doc-card__desc">{doc.desc}</p>

                      {uploads[doc.id] && (
                        <div className="dc-uploaded-file">
                          <Paperclip size={14} /> {uploads[doc.id].name}
                          <span className="dc-uploaded-file__meta">{uploads[doc.id].size} · {uploads[doc.id].date}</span>
                          <button className="dc-remove-btn" onClick={() => removeUpload(doc.id)}>
                            <X size={12} /> Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="dc-doc-card__actions">
                      {uploads[doc.id] ? (
                        <button className="dc-btn dc-btn--uploaded" onClick={() => openModal(doc)}>
                          <RefreshCw size={14} /> Replace
                        </button>
                      ) : (
                        <button className="dc-btn dc-btn--upload" onClick={() => openModal(doc)}>
                          <Upload size={14} /> Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="dc-empty">
              <Search size={32} />
              <p>No documents found matching "<strong>{search}</strong>"</p>
            </div>
          )}
        </main>
      </div>

      {/* ── Upload Modal ── */}
      {modal && (
        <div className="dc-modal-overlay" onClick={closeModal}>
          <div className="dc-modal" onClick={e => e.stopPropagation()}>
            <div className="dc-modal__header">
              <h3>Upload Document</h3>
              <button className="dc-modal__close" onClick={closeModal}><X size={16} /></button>
            </div>
            <div className="dc-modal__body">
              <p className="dc-modal__doc-name">{modal.name}</p>
              <p className="dc-modal__doc-desc">{modal.desc}</p>

              <div className="dc-upload-zone">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="dc-upload-zone__label">
                  {selectedFile ? (
                    <>
                      <span className="dc-upload-zone__file-icon"><FileText size={32} /></span>
                      <p className="dc-upload-zone__filename">{selectedFile.name}</p>
                      <p className="dc-upload-zone__filesize">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </>
                  ) : (
                    <>
                      <span className="dc-upload-zone__icon"><CloudUpload size={32} /></span>
                      <p className="dc-upload-zone__text">Click to browse or drag & drop</p>
                      <p className="dc-upload-zone__hint">Accepted: PDF, JPG, PNG · Max size: 5MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>
            <div className="dc-modal__footer">
              <button className="dc-btn dc-btn--outline" onClick={closeModal}>Cancel</button>
              <button
                className="dc-btn dc-btn--primary"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                <Upload size={14} /> Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentChecklist;