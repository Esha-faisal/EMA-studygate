import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar  from '../../components/AdminNavbar/AdminNavbar';
import {
  FiUsers,
  FiSearch,
  FiEye,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
  FiSlash,
  FiTrash2,
  FiSave,
  FiFileText,
  FiX
} from 'react-icons/fi';
import './ManageStudents.css';

const mockStudents = [
  { id:1,  name:'Ahmed Khan',      email:'ahmed@gmail.com',    country:'Pakistan', status:'active',  docs:'verified',  date:'Apr 1, 2026',  gpa:'3.6', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Ahmed' },
  { id:2,  name:'Sara Malik',      email:'sara@gmail.com',     country:'Pakistan', status:'pending', docs:'pending',   date:'Apr 2, 2026',  gpa:'3.8', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Sara' },
  { id:3,  name:'Bilal Hussain',   email:'bilal@gmail.com',    country:'Pakistan', status:'active',  docs:'verified',  date:'Mar 28, 2026', gpa:'3.2', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Bilal' },
  { id:4,  name:'Hina Waqar',      email:'hina@gmail.com',     country:'India',    status:'pending', docs:'rejected',  date:'Apr 3, 2026',  gpa:'3.5', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Hina' },
  { id:5,  name:'Fatima Zahra',    email:'fatima@gmail.com',   country:'Pakistan', status:'active',  docs:'pending',   date:'Apr 4, 2026',  gpa:'3.9', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Fatima' },
  { id:6,  name:'Omar Abdullah',   email:'omar@gmail.com',     country:'Nigeria',  status:'banned',  docs:'rejected',  date:'Mar 20, 2026', gpa:'2.8', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Omar' },
  { id:7,  name:'Nadia Siddiqui',  email:'nadia@gmail.com',    country:'Pakistan', status:'active',  docs:'verified',  date:'Mar 25, 2026', gpa:'3.7', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Nadia' },
  { id:8,  name:'Hassan Raza',     email:'hassan@gmail.com',   country:'Bangladesh', status:'pending', docs:'pending', date:'Apr 5, 2026', gpa:'3.4', avatar:'https://api.dicebear.com/7.x/thumbs/svg?seed=Hassan' },
];

const ManageStudents = () => {
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all');
  const [docFilter, setDocFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editModal, setEditModal] = useState(null);

  /* ── Filtered ── */
  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === 'all' || s.status === filter;
    const matchDoc    = docFilter === 'all' || s.docs === docFilter;
    return matchSearch && matchStatus && matchDoc;
  });

  const updateStatus = (id, status) =>
    setStudents(prev => prev.map(s => s.id === id ? {...s, status} : s));

  const updateDocs = (id, docs) =>
    setStudents(prev => prev.map(s => s.id === id ? {...s, docs} : s));

  const deleteStudent = (id) =>
    setStudents(prev => prev.filter(s => s.id !== id));

  const statusColors = {
    active:  { bg:'#e8f8ef', color:'#1a7a3a' },
    pending: { bg:'#fff4e6', color:'#a04000' },
    banned:  { bg:'#fdecea', color:'#c0392b' },
  };

  const docColors = {
    verified: { bg:'#e8f8ef', color:'#1a7a3a' },
    pending:  { bg:'#fff4e6', color:'#a04000' },
    rejected: { bg:'#fdecea', color:'#c0392b' },
  };

  return (
    <div className="ms-root">
      <AdminSidebar />
      <div className="ms-content">
        <AdminNavbar title="— Manage Students" />

        <main className="ms-main">

          {/* Header */}
          <div className="ms-header">
            <div>
              <h1 className="ms-header__title">Manage Students</h1>
              <p className="ms-header__sub">View, search, update, verify documents and manage student accounts</p>
            </div>
            <div className="ms-header__stats">
              <span className="ms-mini-stat ms-mini-stat--blue"><FiUsers style={{ marginRight: 6 }} /> {students.length} Total</span>
              <span className="ms-mini-stat ms-mini-stat--green">{students.filter(s=>s.status==='active').length} Active</span>
              <span className="ms-mini-stat ms-mini-stat--orange">{students.filter(s=>s.status==='pending').length} Pending</span>
              <span className="ms-mini-stat ms-mini-stat--red">{students.filter(s=>s.docs==='pending').length} Docs Pending</span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="ms-controls">
            <div className="ms-search">
              <span><FiSearch size={16} /></span>
              <input
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="ms-filters">
              <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
              <select value={docFilter} onChange={e => setDocFilter(e.target.value)}>
                <option value="all">All Documents</option>
                <option value="verified">Verified</option>
                <option value="pending">Doc Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="ms-table-wrap">
            <table className="ms-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>GPA</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Documents</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="8" className="ms-table__empty">No students found</td></tr>
                ) : (
                  filtered.map(s => (
                    <tr key={s.id}>
                      <td>
                        <div className="ms-student-cell">
                          <img src={s.avatar} alt={s.name} className="ms-avatar" />
                          <span className="ms-student-name">{s.name}</span>
                        </div>
                      </td>
                      <td className="ms-email">{s.email}</td>
                      <td>{s.country}</td>
                      <td className="ms-gpa">{s.gpa}</td>
                      <td className="ms-date">{s.date}</td>
                      <td>
                        <span className="ms-badge" style={statusColors[s.status]}>
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className="ms-badge" style={docColors[s.docs]}>
                          {s.docs.charAt(0).toUpperCase() + s.docs.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="ms-actions">
                          <button
                            className="ms-action-btn ms-action-btn--view"
                            onClick={() => setSelectedStudent(s)}
                            title="View"
                          ><FiEye size={16} /></button>
                          <button
                            className="ms-action-btn ms-action-btn--edit"
                            onClick={() => setEditModal({...s})}
                            title="Edit"
                          ><FiEdit size={16} /></button>
                          {s.docs === 'pending' && (
                            <button
                              className="ms-action-btn ms-action-btn--verify"
                              onClick={() => updateDocs(s.id, 'verified')}
                              title="Verify Docs"
                            ><FiCheckCircle size={16} /></button>
                          )}
                          {s.status !== 'banned' ? (
                            <button
                              className="ms-action-btn ms-action-btn--ban"
                              onClick={() => updateStatus(s.id, 'banned')}
                              title="Ban"
                            ><FiSlash size={16} /></button>
                          ) : (
                            <button
                              className="ms-action-btn ms-action-btn--unban"
                              onClick={() => updateStatus(s.id, 'active')}
                              title="Unban"
                            ><FiCheckCircle size={16} /></button>
                          )}
                          <button
                            className="ms-action-btn ms-action-btn--delete"
                            onClick={() => deleteStudent(s.id)}
                            title="Delete"
                          ><FiTrash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </main>
      </div>

      {/* ── View Student Modal ── */}
      {selectedStudent && (
        <div className="ms-modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="ms-modal" onClick={e => e.stopPropagation()}>
            <div className="ms-modal__header">
              <h3>Student Profile</h3>
              <button className="ms-modal__close" onClick={() => setSelectedStudent(null)}><FiX size={18} /></button>
            </div>
            <div className="ms-modal__body">
              <div className="ms-modal__profile">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="ms-modal__avatar" />
                <div>
                  <h4>{selectedStudent.name}</h4>
                  <p>{selectedStudent.email}</p>
                </div>
              </div>
              <div className="ms-modal__grid">
                {[
                  { label:'Country',    val: selectedStudent.country },
                  { label:'GPA',        val: selectedStudent.gpa },
                  { label:'Joined',     val: selectedStudent.date },
                  { label:'Status',     val: selectedStudent.status },
                  { label:'Documents',  val: selectedStudent.docs },
                ].map(r => (
                  <div key={r.label} className="ms-modal__row">
                    <span className="ms-modal__row-label">{r.label}</span>
                    <span className="ms-modal__row-val">{r.val}</span>
                  </div>
                ))}
              </div>
              {selectedStudent.docs === 'pending' && (
                <div className="ms-modal__doc-actions">
                  <p className="ms-modal__doc-title"><FiFileText style={{ marginRight: 6 }} /> Document Verification </p>
                  <div className="ms-modal__doc-btns">
                    <button
                      className="ms-btn ms-btn--approve"
                      onClick={() => { updateDocs(selectedStudent.id, 'verified'); setSelectedStudent(null); }}
                    > <FiCheckCircle style={{ marginRight: 6 }} /> Approve Documents</button>
                    <button
                      className="ms-btn ms-btn--reject"
                      onClick={() => { updateDocs(selectedStudent.id, 'rejected'); setSelectedStudent(null); }}
                    > <FiXCircle style={{ marginRight: 6 }} /> Reject — Request Re-upload</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Student Modal ── */}
      {editModal && (
        <div className="ms-modal-overlay" onClick={() => setEditModal(null)}>
          <div className="ms-modal" onClick={e => e.stopPropagation()}>
            <div className="ms-modal__header">
              <h3>Edit Student</h3>
              <button className="ms-modal__close" onClick={() => setEditModal(null)}>✕</button>
            </div>
            <div className="ms-modal__body">
              <div className="ms-edit-form">
                {['name','email','country','gpa'].map(field => (
                  <div key={field} className="ms-edit-field">
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      value={editModal[field]}
                      onChange={e => setEditModal({...editModal, [field]: e.target.value})}
                    />
                  </div>
                ))}
                <div className="ms-edit-field">
                  <label>Status</label>
                  <select value={editModal.status} onChange={e => setEditModal({...editModal, status: e.target.value})}>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>
              </div>
              <div className="ms-modal__footer">
                <button className="ms-btn ms-btn--outline" onClick={() => setEditModal(null)}>Cancel</button>
                <button
                  className="ms-btn ms-btn--primary"
                  onClick={() => {
                    setStudents(prev => prev.map(s => s.id === editModal.id ? editModal : s));
                    setEditModal(null);
                  }}
                > <FiSave style={{ marginRight: 6 }} /> Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;