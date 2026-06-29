import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import axios from "axios";

import {
  Search,
  Plus,
  Trash2,
  CheckCircle,
  Pencil,
} from 'lucide-react';

import './ManageScholarships.css';

const emptyForm = {
  title: "",
  country: "",
  degreeLevel: "",
  minGpa: "",
  minIelts: "",
  description: "",
  type: "Government",
  deadline: "",
  amount: "",
  tag: ""
};

const ManageScholarships = () => {

  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  // EDIT STATE
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // FETCH SCHOLARSHIPS
  const fetchScholarships = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/scholarships"
      );

      if (Array.isArray(res.data)) {
        setScholarships(res.data);
      } else {
        setScholarships(res.data.scholarships);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ADD OR UPDATE SCHOLARSHIP
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const scholarshipData = {

        name: formData.title,

        country: formData.country,

        amount: formData.amount,

        deadline: formData.deadline,

        type: formData.type,

        level: formData.degreeLevel,

        degreeLevel: formData.degreeLevel,

        minGpa: formData.minGpa,

        minIelts: formData.minIelts,

        description: formData.description,

        eligibility: formData.description,

        tag: formData.tag,

        flag: "🌍",

        levels: {
          bachelor: formData.degreeLevel.includes("Bachelor"),
          master: formData.degreeLevel.includes("Master"),
          phd: formData.degreeLevel.includes("PhD"),
          postgrad: false,
        }

      };

      // UPDATE
      if (editId) {

        await axios.put(
          `http://localhost:5000/api/scholarships/${editId}`,
          scholarshipData
        );

        alert("Scholarship Updated Successfully");

      }

      // ADD
      else {

        await axios.post(
          "http://localhost:5000/api/scholarships",
          scholarshipData
        );

        alert("Scholarship Added Successfully");

      }

      // REFRESH DATA
      fetchScholarships();

      // RESET FORM
      setFormData(emptyForm);

      // CLOSE FORM
      setShowForm(false);

      // RESET EDIT
      setEditId(null);

    } catch (error) {

      console.log(error);

      alert("Error");

    }

  };

  // EDIT SCHOLARSHIP
  const editScholarship = (scholarship) => {

    setFormData({
      title: scholarship.name || "",
      country: scholarship.country || "",
      degreeLevel: scholarship.level || "",
      minGpa: scholarship.minGpa || "",
      minIelts: scholarship.minIelts || "",
      description: scholarship.description || "",
      type: scholarship.type || "Government",
      deadline: scholarship.deadline || "",
      amount: scholarship.amount || "",
      tag: scholarship.tag || ""
    });

    setEditId(scholarship._id);

    setShowForm(true);

  };

  // DELETE SCHOLARSHIP
  const deleteScholarship = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/scholarships/${id}`
      );

      alert("Scholarship Deleted");

      fetchScholarships();

    } catch (error) {

      console.log(error);
    }
  };

  // SEARCH FILTER
  const filtered = scholarships.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.country?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="msc-root">

      <AdminSidebar />

      <div className="msc-content">

        <AdminNavbar title="— Manage Scholarships" />

        <main className="msc-main">

          {/* HEADER */}
          <div className="msc-header">

            <div>
              <h1>Manage Scholarships</h1>
              <p>Add and manage scholarships from database</p>
            </div>

            <button
              className="adm-btn-primary"
              onClick={() => {
                setShowForm(true);
                setEditId(null);
                setFormData(emptyForm);
              }}
            >
              <Plus size={16} />
              Add Scholarship
            </button>

          </div>

          {/* SEARCH */}
          <div className="msc-search-wrap">

            <Search size={16} />

            <input
              placeholder="Search scholarships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* FORM */}
          {showForm && (

            <div className="msc-form-card">

              <h3>
                {editId ? "Edit Scholarship" : "Add Scholarship"}
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="msc-form-grid">

                  <div className="msc-field">
                    <label>Title</label>

                    <input
                      className="msc-input"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="msc-field">
                    <label>Country</label>

                    <input
                      className="msc-input"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="msc-field">
                    <label>Degree Level</label>

                    <input
                      className="msc-input"
                      name="degreeLevel"
                      value={formData.degreeLevel}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="msc-field">
                    <label>Minimum GPA</label>

                    <input
                      className="msc-input"
                      name="minGpa"
                      value={formData.minGpa}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="msc-field">
                    <label>Minimum IELTS</label>

                    <input
                      className="msc-input"
                      name="minIelts"
                      value={formData.minIelts}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="msc-field">
                    <label>Type</label>

                    <select
                      className="msc-input"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option>Government</option>
                      <option>University</option>
                      <option>Private</option>
                    </select>
                  </div>

                  <div className="msc-field">
                    <label>Deadline</label>

                    <input
                      className="msc-input"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="msc-field">
                    <label>Amount</label>

                    <input
                      className="msc-input"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="msc-field">
                    <label>Tag</label>

                    <input
                      className="msc-input"
                      name="tag"
                      value={formData.tag}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                {/* DESCRIPTION */}
                <div className="msc-field">

                  <label>Description</label>

                  <textarea
                    className="msc-input"
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />

                </div>

                {/* BUTTONS */}
                <div className="msc-form-actions">

                  <button
  type="button"
  className="adm-btn-outline"
  onClick={() => {
    setShowForm(false);
    setEditId(null);
    setFormData(emptyForm);
  }}
>
  Cancel
</button>

<button
  type="submit"
  className="adm-btn-primary"
>
  <CheckCircle size={16} />

  {editId
    ? "Update Scholarship"
    : "Add Scholarship"
  }

</button>

                </div>

              </form>

            </div>
          )}

          {/* TABLE */}
          <div className="msc-table-wrap">

            <table className="msc-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Country</th>
                  <th>Degree</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((s, i) => (

                  <tr key={s._id}>

                    <td>{i + 1}</td>

                    <td>{s.name}</td>

                    <td>{s.country}</td>

                    <td>{s.level}</td>

                    <td>{s.deadline}</td>

                    <td>

                      <div style={{ display: "flex", gap: "10px" }}>

                        <button
                          className="msc-act"
                          onClick={() => editScholarship(s)}
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          className="msc-act msc-act--del"
                          onClick={() => deleteScholarship(s._id)}
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

export default ManageScholarships;