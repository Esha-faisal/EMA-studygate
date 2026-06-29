// ManageVisa.jsx
import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar  from '../../components/AdminNavbar/AdminNavbar';
import './ManageVisa.css';
import { 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaExchangeAlt, 
  FaMoneyBill, 
  FaClock, 
  FaCalendarAlt, 
  FaPlus, 
  FaSave, 
  FaCheck 
} from "react-icons/fa";

const mockVisaGuides = [
  { id:1, country:'Canada',      flag:'🇨🇦', visaType:'Study Permit',        fee:'CAD 150',  processing:'8–12 weeks', status:'active', lastUpdated:'Apr 1, 2026' },
  { id:2, country:'UK',          flag:'🇬🇧', visaType:'Student Visa (Tier 4)', fee:'£490',    processing:'3–4 weeks',  status:'active', lastUpdated:'Mar 28, 2026' },
  { id:3, country:'Australia',   flag:'🇦🇺', visaType:'Subclass 500',         fee:'AUD 650', processing:'4–6 weeks',  status:'active', lastUpdated:'Mar 20, 2026' },
  { id:4, country:'Germany',     flag:'🇩🇪', visaType:'National Visa (Study)', fee:'€75',    processing:'6–12 weeks', status:'active', lastUpdated:'Mar 15, 2026' },
  { id:5, country:'Netherlands', flag:'🇳🇱', visaType:'MVV Study Visa',        fee:'€192',   processing:'3–4 weeks',  status:'inactive', lastUpdated:'Feb 10, 2026' },
];

const emptyVisa = { country:'', flag:'', visaType:'', fee:'', processing:'', status:'active' };

const ManageVisa = () => {
  const [guides, setGuides] = useState(mockVisaGuides);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm]     = useState(emptyVisa);
  const [search, setSearch] = useState('');

  const filtered = guides.filter(g => g.country.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.country) return;
    if (editItem) {
      setGuides(prev => prev.map(g => g.id === editItem.id ? {...form, id: editItem.id, lastUpdated: 'Today'} : g));
    } else {
      setGuides(prev => [...prev, {...form, id: Date.now(), lastUpdated: 'Today'}]);
    }
    setShowForm(false); setEditItem(null); setForm(emptyVisa);
  };

  const openEdit = (g) => { setEditItem(g); setForm({...g}); setShowForm(true); };
  const del    = (id) => setGuides(prev => prev.filter(g => g.id !== id));
  const toggle = (id) => setGuides(prev => prev.map(g => g.id === id ? {...g, status: g.status === 'active' ? 'inactive' : 'active'} : g));

  return (
    <div className="mv-root">
      <AdminSidebar />
      <div className="mv-content">
        <AdminNavbar title="— Manage Visa Guidance" />
        <main className="mv-main">
          <div className="mv-header">
            <div>
              <h1>Manage Visa Guidance</h1>
              <p>Add and update country-specific visa requirements for students</p>
            </div>
            <button className="mv-btn mv-btn--primary" onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyVisa); }}>+ Add Country Guide</button>
          </div>

          <div className="mv-search-wrap">
            <span><FaSearch /></span>
            <input placeholder="Search countries..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {showForm && (
            <div className="mv-form-card">
              <h3>{editItem ? <><FaEdit /> Edit Visa Guide</> : <><FaPlus /> Add New Country</>}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mv-form-grid">
                  {[
                    { key:'country',    label:'Country Name *', ph:'e.g. Canada' },
                    { key:'flag',       label:'Flag Emoji',     ph:'e.g. 🇨🇦' },
                    { key:'visaType',   label:'Visa Type',      ph:'e.g. Study Permit' },
                    { key:'fee',        label:'Visa Fee',       ph:'e.g. CAD 150' },
                    { key:'processing', label:'Processing Time', ph:'e.g. 8–12 weeks' },
                  ].map(f => (
                    <div key={f.key} className="mv-field">
                      <label>{f.label}</label>
                      <input className="mv-input" placeholder={f.ph} value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} />
                    </div>
                  ))}
                  <div className="mv-field">
                    <label>Status</label>
                    <select className="mv-input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="mv-form-actions">
                  <button type="button" className="mv-btn mv-btn--outline" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="mv-btn mv-btn--primary">
                    {editItem ? <><FaSave style={{ marginRight: 5 }} />Update</> : <><FaCheck style={{ marginRight: 5 }} />
Add</>}</button>
                </div>
              </form>
            </div>
          )}

          <div className="mv-cards-grid">
            {filtered.map(g => (
              <div key={g.id} className="mv-guide-card">
                <div className="mv-guide-card__header">
                  <span className="mv-guide-card__flag">{g.flag}</span>
                  <div className="mv-guide-card__info">
                    <h3>{g.country}</h3>
                    <p>{g.visaType}</p>
                  </div>
                  <span className={`mv-status mv-status--${g.status}`}>{g.status}</span>
                </div>
                <div className="mv-guide-card__stats">
                  <div><span><FaMoneyBill /></span> {g.fee}</div>
                  <div><span><FaClock /></span> {g.processing}</div>
                  <div><span><FaCalendarAlt /></span> Updated: {g.lastUpdated}</div>
                </div>
                <div className="mv-guide-card__actions">
                  <button className="mv-btn mv-btn--outline mv-btn--sm" onClick={() => openEdit(g)}><FaEdit style={{ marginRight: 5 }} /> Edit</button>
                  <button className="mv-btn mv-btn--outline mv-btn--sm" onClick={() => toggle(g.id)}><FaExchangeAlt style={{ marginRight: 5 }} /> Toggle</button>
                  <button className="mv-btn mv-btn--danger mv-btn--sm" onClick={() => del(g.id)}><FaTrash style={{ marginRight: 5 }} />Delete</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageVisa;