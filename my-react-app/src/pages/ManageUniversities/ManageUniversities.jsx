import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import axios from "axios";

import {
  Search,
  Plus,
  Pencil,
  RefreshCw,
  Trash2,
  Save,
  CheckCircle,
  X,
} from 'lucide-react';

import './ManageUniversities.css';

const emptyForm = {
  name: '',
  country: '',
  ranking: '',
  tuition: '',
  programs: '',
  deadline: '',
  status: 'Active',
  flag: '',
  acceptance: '',
  type: 'Public',
  tag: 'Popular',
  website: '',
};

const ManageUniversities = () => {

  const [unis, setUnis] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // FETCH UNIVERSITIES
  const fetchUniversities = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/universities"
      );

      console.log("UNIVERSITIES:", res.data);

      setUnis(res.data);

    } catch (error) {

      console.log("FETCH ERROR:", error);

    }
  };

  // LOAD DATA
  useEffect(() => {
    fetchUniversities();
  }, []);

  // DYNAMIC COUNTRIES
  const countries = [
    'all',
    ...new Set(unis.map(u => u.country).filter(Boolean))
  ];

  // FILTER
  const filtered = unis.filter((u) => {

    const matchSearch =
      u.universityName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchCountry =
      country === 'all' || u.country === country;

    return matchSearch && matchCountry;

  });

  // VALIDATION
  const validate = () => {

    const e = {};

    if (!form.name) {
      e.name = 'Required';
    }

    if (!form.country) {
      e.country = 'Required';
    }

    if (!form.ranking) {
      e.ranking = 'Required';
    }

    return e;
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {

      const programsArray = form.programs
        .split(",")
        .map(p => p.trim())
        .filter(Boolean);

      const universityData = {
        universityName: form.name,
        country: form.country,
        qsRanking: Number(form.ranking),
        annualTuition: form.tuition,
        programs: programsArray,
        applicationDeadline: form.deadline,
        status: form.status,

        flag: form.flag,
acceptance: form.acceptance,
type: form.type,
tag: form.tag,
website: form.website,
      };

      console.log("SENDING:", universityData);

      // ADD
      if (!editItem) {


        axios.post(
  "http://localhost:5000/api/universities",
  universityData,
  {
    headers: {
      role: "admin"
    }
  }
);

      } else {

        // UPDATE
       await axios.put(
  `http://localhost:5000/api/universities/${editItem._id}`,
  universityData,
  {
    headers: {
      role: "admin"
    }
  }
);

      }

      // REFRESH
      fetchUniversities();

      // RESET
      setShowForm(false);
      setEditItem(null);
      setForm(emptyForm);
      setErrors({});

    } catch (error) {

      console.log("SUBMIT ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Error saving university"
      );

    }
  };

  // OPEN EDIT
  const openEdit = (uni) => {

    setEditItem(uni);

    setForm({
      name: uni.universityName || '',
      country: uni.country || '',
      ranking: String(uni.qsRanking || ''),
      tuition: uni.annualTuition || '',
      programs: Array.isArray(uni.programs)
        ? uni.programs.join(", ")
        : '',
      deadline: uni.applicationDeadline || '',
      status: uni.status || 'Active',
      flag: uni.flag || '',
acceptance: uni.acceptance || '',
type: uni.type || 'Public',
tag: uni.tag || 'Popular',
website: uni.website || '',

    });

    setShowForm(true);
  };

  // DELETE
  const deleteUni = async (id) => {

    try {

      await axios.delete(
  `http://localhost:5000/api/universities/${id}`,
  {
    headers: {
      role: "admin"
    }
  }
);

      fetchUniversities();

    } catch (error) {

      console.log("DELETE ERROR:", error);

    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (uni) => {

    try {

      const newStatus =
        uni.status === "Active"
          ? "Inactive"
          : "Active";

      await axios.put(
        `http://localhost:5000/api/universities/${uni._id}`,
        {
          ...uni,
          status: newStatus,
        }
      );

      fetchUniversities();

    } catch (error) {

      console.log("STATUS ERROR:", error);

    }
  };

  return (
    <div className="mu-root">

      <AdminSidebar />

      <div className="mu-content">

        <AdminNavbar title="— Manage Universities" />

        <main className="mu-main">

          {/* HEADER */}
          <div className="mu-header">

            <div>
              <h1 className="mu-header__title">
                Manage Universities
              </h1>

              <p className="mu-header__sub">
                Add, update, search and manage university listings
              </p>
            </div>

            <button
              className="mu-btn mu-btn--primary"
              onClick={() => {
                setShowForm(true);
                setEditItem(null);
                setForm(emptyForm);
              }}
            >
              <Plus size={16} />
              Add University
            </button>

          </div>

          {/* CONTROLS */}
          <div className="mu-controls">

            <div className="mu-search">

              <Search size={16} />

              <input
                placeholder="Search universities..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <select
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
            >

              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === 'all'
                    ? 'All Countries'
                    : c}
                </option>
              ))}

            </select>

          </div>

          {/* FORM */}
          {showForm && (

            <div className="mu-form-card">

              <h3>
                {editItem ? (
                  <>
                    <Pencil size={16} />
                    Edit University
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add New University
                  </>
                )}
              </h3>

              <form
                className="mu-form"
                onSubmit={handleSubmit}
              >

                <div className="mu-form__grid">

                  {[
                    {
                      key: 'name',
                      label: 'University Name *',
                      placeholder: 'e.g. Oxford University',
                    },
                    {
                      key: 'country',
                      label: 'Country *',
                      placeholder: 'e.g. UK',
                    },
                    {
                      key: 'ranking',
                      label: 'QS Ranking *',
                      placeholder: 'e.g. 3',
                    },
                    {
                      key: 'tuition',
                      label: 'Annual Tuition',
                      placeholder: 'e.g. $30000',
                    },
                    {
                      key: 'programs',
                      label: 'Program Departments',
                      placeholder: 'CS, Business',
                    },
                    {
                      key: 'deadline',
                      label: 'Application Deadline',
                      placeholder: 'e.g. Jan 2026',
                    },
                    {
  key: 'flag',
  label: 'Flag Emoji',
  placeholder: 'e.g. 🇬🇧',
},
{
  key: 'acceptance',
  label: 'Acceptance Rate',
  placeholder: 'e.g. 45%',
},
{
  key: 'website',
  label: 'University Website',
  placeholder: 'https://example.com',
},
                  ].map((f) => (

                    <div
                      key={f.key}
                      className="mu-form__field"
                    >

                      <label>{f.label}</label>

                      <input
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            [f.key]: e.target.value,
                          })
                        }
                        className={
                          errors[f.key]
                            ? 'mu-input mu-input--error'
                            : 'mu-input'
                        }
                      />

                      {errors[f.key] && (
                        <span className="mu-error">
                          {errors[f.key]}
                        </span>
                      )}

                    </div>

                  ))}

                 {/* STATUS */}
<div className="mu-form__field">

  <label>Status</label>

  <select
    className="mu-input"
    value={form.status}
    onChange={(e) =>
      setForm({
        ...form,
        status: e.target.value,
      })
    }
  >

    <option value="Active">
      Active
    </option>

    <option value="Inactive">
      Inactive
    </option>

  </select>

</div>

{/* UNIVERSITY TYPE */}
<div className="mu-form__field">

  <label>University Type</label>

  <select
    className="mu-input"
    value={form.type}
    onChange={(e) =>
      setForm({
        ...form,
        type: e.target.value,
      })
    }
  >

    <option value="Public">
      Public
    </option>

    <option value="Private">
      Private
    </option>

  </select>

</div>

{/* TAG */}
<div className="mu-form__field">

  <label>Tag</label>

  <select
    className="mu-input"
    value={form.tag}
    onChange={(e) =>
      setForm({
        ...form,
        tag: e.target.value,
      })
    }
  >

    <option value="Popular">
      Popular
    </option>

    <option value="Top Ranked">
      Top Ranked
    </option>

    <option value="Recommended">
      Recommended
    </option>

    <option value="Affordable">
      Affordable
    </option>

    <option value="Growing">
      Growing
    </option>

    <option value="Tech Hub">
      Tech Hub
    </option>

    <option value="Unique">
      Unique
    </option>

  </select>
</div>
</div>
                {/* ACTIONS */}
                <div className="mu-form__actions">

                  <button
                    type="button"
                    className="mu-btn mu-btn--outline"
                    onClick={() => {
                      setShowForm(false);
                      setErrors({});
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="mu-btn mu-btn--primary"
                  >

                    {editItem ? (
                      <>
                        <Save size={16} />
                        Update
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Add University
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          )}

          {/* TABLE */}
          <div className="mu-table-wrap">

            <table className="mu-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>University</th>
                  <th>Country</th>
                  <th>Ranking</th>
                  <th>Tuition</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filtered.map((u, i) => (

                  <tr key={u._id}>

                    <td className="mu-num">
                      {i + 1}
                    </td>

                    <td>

                      <p className="mu-uni-name">
                        {u.universityName}
                      </p>

                      <p className="mu-uni-programs">

                        {Array.isArray(u.programs)
                          ? u.programs.join(", ")
                          : ''}

                      </p>

                    </td>

                    <td>{u.country}</td>

                    <td>
                      <span className="mu-rank">
                        #{u.qsRanking}
                      </span>
                    </td>

                    <td className="mu-tuition">
                      {u.annualTuition}
                    </td>

                    <td className="mu-deadline">
                      {u.applicationDeadline}
                    </td>

                    <td>

                      <span
                        className={`mu-status mu-status--${u.status?.toLowerCase()}`}
                      >
                        {u.status}
                      </span>

                    </td>

                    <td>

                      <div className="mu-actions">

                        <button
                          className="mu-action-btn"
                          onClick={() => openEdit(u)}
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          className="mu-action-btn"
                          onClick={() => toggleStatus(u)}
                          title="Toggle Status"
                        >
                          <RefreshCw size={15} />
                        </button>

                        <button
                          className="mu-action-btn mu-action-btn--del"
                          onClick={() => deleteUni(u._id)}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
};

export default ManageUniversities;