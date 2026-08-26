import {
  Plus,
  MapPin,
  Users,
  Edit,
  Trash2,
  X,
  Phone,
  User,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Branches() {
  const API_URL = "http://localhost:5001";

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  const [formData, setFormData] = useState({
    branch_name: "",
    branch_code: "",
    manager: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    google_map: "",
    working_hours: "",
    status: "ACTIVE",
  });

  // ================= TOKEN =================

  const getToken = () => {
    const token = localStorage.getItem("token");

    console.log(
      "TOKEN:",
      token ? "Token exists" : "Token not found"
    );

    return token;
  };

  // ================= GET BRANCHES =================

  const fetchBranches = async () => {
    try {
      const token = getToken();

      if (!token) {
        toast.error("Please login as Super Admin");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/branches`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("GET BRANCHES:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch branches"
        );
      }

      setBranches(data.data || []);
    } catch (error) {
      console.error(
        "FETCH BRANCHES ERROR:",
        error
      );

      toast.error(
        error.message || "Unable to load branches"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD ON PAGE =================

  useEffect(() => {
    fetchBranches();
  }, []);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ================= RESET FORM =================

  const resetForm = () => {
    setFormData({
      branch_name: "",
      branch_code: "",
      manager: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      google_map: "",
      working_hours: "",
      status: "ACTIVE",
    });

    setEditingBranch(null);
  };

  // ================= ADD MODAL =================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // ================= EDIT MODAL =================

  const openEditModal = (branch) => {
    setEditingBranch(branch);

    setFormData({
      branch_name: branch.branch_name || "",
      branch_code: branch.branch_code || "",
      manager: branch.manager || "",
      phone: branch.phone || "",
      email: branch.email || "",
      address: branch.address || "",
      city: branch.city || "",
      state: branch.state || "",
      country: branch.country || "",
      google_map: branch.google_map || "",
      working_hours: branch.working_hours || "",
      status: branch.status || "ACTIVE",
    });

    setShowModal(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };

  // ================= VALIDATION =================

  const validateForm = () => {
    if (!formData.branch_name.trim()) {
      toast.error("Branch name is required");
      return false;
    }

    if (!formData.branch_code.trim()) {
      toast.error("Branch code is required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }

    if (!formData.city.trim()) {
      toast.error("City is required");
      return false;
    }

    if (!formData.state.trim()) {
      toast.error("State is required");
      return false;
    }

    if (!formData.country.trim()) {
      toast.error("Country is required");
      return false;
    }

    return true;
  };

  // ================= CREATE / UPDATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = getToken();

    if (!token) {
      toast.error("Please login as Super Admin");
      return;
    }

    try {
      setSaving(true);

      let url;
      let method;

      if (!editingBranch) {
        url = `${API_URL}/api/admin/branches`;
        method = "POST";
      } else {
        url = `${API_URL}/api/admin/branches/${editingBranch.id}`;
        method = "PUT";
      }

      const body = {
        branch_name: formData.branch_name.trim(),
        branch_code: formData.branch_code.trim(),
        manager: formData.manager.trim() || null,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        country: formData.country.trim(),
        google_map:
          formData.google_map.trim() || null,
        working_hours:
          formData.working_hours.trim() || null,
        status: formData.status,
      };

      console.log("BRANCH API REQUEST");
      console.log("URL:", url);
      console.log("METHOD:", method);
      console.log("BODY:", body);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      console.log(
        "BRANCH API RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Request failed with status ${response.status}`
        );
      }

      toast.success(
        editingBranch
          ? "Branch updated successfully"
          : "Branch created successfully"
      );

      setShowModal(false);
      resetForm();

      // Reload data from MySQL
      await fetchBranches();

    } catch (error) {
      console.error(
        "CREATE/UPDATE BRANCH ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Unable to save branch"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (branch) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${branch.branch_name}?`
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      toast.error("Please login as Super Admin");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/admin/branches/${branch.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(
        "DELETE BRANCH RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete branch"
        );
      }

      toast.success(
        "Branch deleted successfully"
      );

      await fetchBranches();

    } catch (error) {
      console.error(
        "DELETE BRANCH ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Unable to delete branch"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#07131f]
          flex
          items-center
          justify-center
          text-white
        "
      >
        <div className="text-center">

          <div
            className="
              w-12
              h-12
              border-4
              border-teal-400
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-4 text-slate-400">
            Loading branches...
          </p>

        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div
      className="
        min-h-screen
        bg-[#07131f]
        p-5
        sm:p-8
        lg:p-10
        text-white
      "
    >

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          flex
          flex-col
          sm:flex-row
          justify-between
          gap-5
        "
      >

        <div>

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-black
            "
          >
            Branch Management
          </h1>

          <p
            className="
              text-slate-400
              mt-2
            "
          >
            Manage academy branches and branch administrators.
          </p>

        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="
            bg-teal-500
            hover:bg-teal-600
            px-6
            py-3
            rounded-xl
            font-bold
            flex
            items-center
            justify-center
            gap-2
            transition
          "
        >

          <Plus size={20} />

          Add Branch

        </button>

      </motion.div>

      {/* BRANCH CARDS */}

      {branches.length === 0 ? (

        <div
          className="
            mt-10
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-10
            text-center
          "
        >

          <MapPin
            size={50}
            className="
              mx-auto
              text-slate-500
            "
          />

          <h2
            className="
              text-xl
              font-bold
              mt-4
            "
          >
            No Branches Found
          </h2>

          <p
            className="
              text-slate-400
              mt-2
            "
          >
            Click "Add Branch" to create your first branch.
          </p>

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            mt-10
          "
        >

          {branches.map((branch) => (

            <motion.div
              key={branch.id}
              whileHover={{
                y: -8,
              }}
              className="
                bg-[#102235]
                border
                border-slate-700
                rounded-3xl
                p-6
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-start
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-teal-500/20
                    flex
                    items-center
                    justify-center
                  "
                >

                  <MapPin
                    className="text-teal-400"
                    size={27}
                  />

                </div>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(branch)
                    }
                    className="
                      p-3
                      bg-blue-500/20
                      text-blue-400
                      rounded-lg
                      hover:bg-blue-500/30
                    "
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(branch)
                    }
                    className="
                      p-3
                      bg-red-500/20
                      text-red-400
                      rounded-lg
                      hover:bg-red-500/30
                    "
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

              <h2
                className="
                  text-xl
                  font-bold
                  mt-5
                "
              >
                {branch.branch_name}
              </h2>

              <p
                className="
                  text-slate-400
                  mt-2
                "
              >
                {branch.city}, {branch.state}
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-300
                  mt-6
                "
              >

                <Users size={18} />

                <span>
                  Students:{" "}
                  {branch.student_count || 0}
                </span>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-300
                  mt-4
                "
              >

                <User size={18} />

                <span>
                  Manager:{" "}
                  {branch.manager || "Not Assigned"}
                </span>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-300
                  mt-4
                "
              >

                <Phone size={18} />

                <span>
                  {branch.phone}
                </span>

              </div>

              <div className="mt-5">

                <span
                  className={`
                    inline-block
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold
                    ${
                      branch.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {branch.status}
                </span>

              </div>

              <button
                type="button"
                className="
                  mt-6
                  w-full
                  bg-[#0c4854]
                  hover:bg-[#0f5a68]
                  text-teal-300
                  py-3
                  rounded-xl
                  font-bold
                  transition
                "
              >
                Assign Branch Admin
              </button>

            </motion.div>

          ))}

        </div>

      )}

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-5
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              w-full
              max-w-2xl
              bg-[#102235]
              border
              border-teal-500/20
              rounded-3xl
              p-7
              shadow-2xl
              max-h-[90vh]
              overflow-y-auto
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
                mb-6
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {editingBranch
                    ? "Edit Branch"
                    : "Add New Branch"}
                </h2>

                <p
                  className="
                    text-slate-400
                    text-sm
                    mt-1
                  "
                >
                  {editingBranch
                    ? "Update branch information"
                    : "Enter branch details"}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="
                  p-2
                  rounded-lg
                  hover:bg-slate-700
                  text-slate-400
                "
              >
                <X size={22} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >

                <InputField
                  label="Branch Name"
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  placeholder="Pune Branch"
                  required
                  disabled={saving}
                />

                <InputField
                  label="Branch Code"
                  name="branch_code"
                  value={formData.branch_code}
                  onChange={handleChange}
                  placeholder="PUNE001"
                  required
                  disabled={saving}
                />

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >

                <InputField
                  label="Manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  placeholder="Manager name"
                  disabled={saving}
                />

                <InputField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  disabled={saving}
                />

              </div>

              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="branch@example.com"
                required
                disabled={saving}
              />

              <div>

                <label
                  className="
                    block
                    text-sm
                    text-slate-300
                    mb-2
                  "
                >
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete branch address"
                  required
                  disabled={saving}
                  rows="3"
                  className="
                    w-full
                    bg-[#07131f]
                    border
                    border-slate-700
                    rounded-xl
                    py-3
                    px-4
                    text-white
                    outline-none
                    resize-none
                    focus:border-teal-400
                    disabled:opacity-50
                  "
                />

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >

                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Pune"
                  required
                  disabled={saving}
                />

                <InputField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  required
                  disabled={saving}
                />

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >

                <InputField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="India"
                  required
                  disabled={saving}
                />

                <InputField
                  label="Working Hours"
                  name="working_hours"
                  value={formData.working_hours}
                  onChange={handleChange}
                  placeholder="9:00 AM - 6:00 PM"
                  disabled={saving}
                />

              </div>

              <InputField
                label="Google Map Link"
                name="google_map"
                value={formData.google_map}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
                disabled={saving}
              />

              <div>

                <label
                  className="
                    block
                    text-sm
                    text-slate-300
                    mb-2
                  "
                >
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={saving}
                  className="
                    w-full
                    bg-[#07131f]
                    border
                    border-slate-700
                    rounded-xl
                    py-3
                    px-4
                    text-white
                    outline-none
                    focus:border-teal-400
                  "
                >

                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="INACTIVE">
                    INACTIVE
                  </option>

                </select>

              </div>

              <div
                className="
                  flex
                  gap-3
                  pt-3
                "
              >

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    flex-1
                    border
                    border-slate-700
                    py-3
                    rounded-xl
                    font-bold
                    text-slate-300
                    hover:bg-slate-800
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    flex-1
                    bg-teal-500
                    hover:bg-teal-600
                    py-3
                    rounded-xl
                    font-bold
                    disabled:opacity-50
                  "
                >

                  {saving
                    ? "Saving..."
                    : editingBranch
                    ? "Update Branch"
                    : "Create Branch"}

                </button>

              </div>

            </form>

          </motion.div>

        </div>

      )}

    </div>
  );
}


// ================= INPUT COMPONENT =================

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}) {
  return (
    <div>

      <label
        className="
          block
          text-sm
          text-slate-300
          mb-2
        "
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="
          w-full
          bg-[#07131f]
          border
          border-slate-700
          rounded-xl
          py-3
          px-4
          text-white
          outline-none
          placeholder:text-slate-600
          focus:border-teal-400
          disabled:opacity-50
        "
      />

    </div>
  );
}