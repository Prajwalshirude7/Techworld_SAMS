import {
  UserCog,
  Search,
  Plus,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  X,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BranchAdmins() {
  const API_URL = "http://localhost:5001";

  const [admins, setAdmins] = useState([]);
  const [branches, setBranches] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    branch_id: "",
  });

  // =====================================================
  // TOKEN
  // =====================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // =====================================================
  // GET BRANCH ADMINS
  // =====================================================

  const fetchAdmins = async () => {
    try {
      const token = getToken();

      if (!token) {
        toast.error("Please login as Super Admin");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/branch-admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("BRANCH ADMINS:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch branch admins"
        );
      }

      setAdmins(data.data || []);
    } catch (error) {
      console.error("FETCH ADMINS ERROR:", error);

      toast.error(
        error.message || "Unable to load branch admins"
      );
    }
  };

  // =====================================================
  // GET BRANCHES
  // =====================================================

  const fetchBranches = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/api/admin/branches`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("BRANCHES:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch branches"
        );
      }

      setBranches(data.data || []);
    } catch (error) {
      console.error("FETCH BRANCHES ERROR:", error);

      toast.error(
        error.message || "Unable to load branches"
      );
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchAdmins(),
        fetchBranches(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAdminData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setAdminData({
      name: "",
      email: "",
      phone: "",
      password: "",
      branch_id: "",
    });

    setSelectedAdmin(null);
    setEditMode(false);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setEditMode(true);

    setAdminData({
      name: admin.name || "",
      email: admin.email || "",
      phone: admin.phone || "",
      password: "",
      branch_id: admin.branch_id || "",
    });

    setShowModal(true);
  };

  // =====================================================
  // CREATE ADMIN
  // =====================================================

  const createAdmin = async () => {
    if (
      !adminData.name ||
      !adminData.email ||
      !adminData.phone ||
      !adminData.password ||
      !adminData.branch_id
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const token = getToken();

    if (!token) {
      toast.error("Please login as Super Admin");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/api/admin/branch-admins`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: adminData.name,
            email: adminData.email,
            phone: adminData.phone,
            password: adminData.password,
            branch_id: Number(adminData.branch_id),
          }),
        }
      );

      const data = await response.json();

      console.log("CREATE ADMIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create branch admin"
        );
      }

      toast.success(
        "Branch Admin created successfully"
      );

      setShowModal(false);
      resetForm();

      await fetchAdmins();
    } catch (error) {
      console.error("CREATE ADMIN ERROR:", error);

      toast.error(
        error.message || "Unable to create branch admin"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // UPDATE ADMIN
  // =====================================================

  const updateAdmin = async () => {
    if (
      !adminData.name ||
      !adminData.email ||
      !adminData.phone ||
      !adminData.branch_id
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const token = getToken();

    if (!token) {
      toast.error("Please login as Super Admin");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/api/admin/branch-admins/${selectedAdmin.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: adminData.name,
            email: adminData.email,
            phone: adminData.phone,
            branch_id: Number(adminData.branch_id),
          }),
        }
      );

      const data = await response.json();

      console.log("UPDATE ADMIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update branch admin"
        );
      }

      toast.success(
        "Branch Admin updated successfully"
      );

      setShowModal(false);
      resetForm();

      await fetchAdmins();
    } catch (error) {
      console.error("UPDATE ADMIN ERROR:", error);

      toast.error(
        error.message || "Unable to update branch admin"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE / DEACTIVATE ADMIN
  // =====================================================

  const deleteAdmin = async (admin) => {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate ${admin.name}?`
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      toast.error("Please login as Super Admin");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/admin/branch-admins/${admin.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(
        "DELETE ADMIN RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to deactivate branch admin"
        );
      }

      toast.success(
        "Branch Admin deactivated successfully"
      );

      await fetchAdmins();
    } catch (error) {
      console.error("DELETE ADMIN ERROR:", error);

      toast.error(
        error.message ||
          "Unable to deactivate branch admin"
      );
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      await updateAdmin();
    } else {
      await createAdmin();
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredAdmins = admins.filter((admin) => {
    const searchText = search.toLowerCase();

    return (
      admin.name?.toLowerCase().includes(searchText) ||
      admin.email?.toLowerCase().includes(searchText) ||
      admin.phone?.toLowerCase().includes(searchText) ||
      admin.branch_name
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // =====================================================
  // LOADING
  // =====================================================

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

          <p className="text-slate-400 mt-4">
            Loading branch admins...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#07131f]
        p-6
        lg:p-10
        text-white
      "
    >

      {/* HEADER */}

      <div
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
            Branch Admin Management
          </h1>

          <p
            className="
              text-slate-400
              mt-2
            "
          >
            Manage branch administrators and access control.
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
          "
        >

          <Plus size={20} />

          Add Admin

        </button>

      </div>

      {/* SEARCH */}

      <div
        className="
          mt-8
          bg-[#102235]
          border
          border-slate-700
          rounded-3xl
          p-5
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            bg-[#07131f]
            border
            border-slate-700
            rounded-xl
            px-4
          "
        >

          <Search
            className="text-slate-400"
          />

          <input
            placeholder="Search admin..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              bg-transparent
              outline-none
              w-full
              py-3
              text-white
            "
          />

        </div>

      </div>

      {/* ADMIN CARDS */}

      {filteredAdmins.length === 0 ? (

        <div
          className="
            mt-8
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-10
            text-center
          "
        >

          <UserCog
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
            No Branch Admins Found
          </h2>

          <p
            className="
              text-slate-400
              mt-2
            "
          >
            Click "Add Admin" to create a branch administrator.
          </p>

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-7
            mt-8
          "
        >

          {filteredAdmins.map((admin) => (

            <motion.div
              key={admin.id}
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
                "
              >

                <div
                  className="
                    bg-teal-500/20
                    p-4
                    rounded-2xl
                  "
                >

                  <UserCog
                    className="text-teal-400"
                    size={32}
                  />

                </div>

                <span
                  className={`
                    ${
                      admin.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                    px-4
                    py-2
                    rounded-full
                    h-fit
                    text-sm
                    font-semibold
                  `}
                >
                  {admin.status}
                </span>

              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mt-6
                "
              >
                {admin.name}
              </h2>

              <div
                className="
                  mt-5
                  space-y-4
                  text-slate-300
                "
              >

                <p className="flex gap-3">

                  <Mail
                    size={20}
                    className="text-teal-400"
                  />

                  {admin.email}

                </p>

                <p className="flex gap-3">

                  <Phone
                    size={20}
                    className="text-teal-400"
                  />

                  {admin.phone}

                </p>

                <p className="flex gap-3">

                  <Building2
                    size={20}
                    className="text-teal-400"
                  />

                  {admin.branch_name ||
                    "Not Assigned"}

                </p>

              </div>

              <div
                className="
                  flex
                  gap-4
                  mt-8
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    openEditModal(admin)
                  }
                  className="
                    flex-1
                    border
                    border-slate-600
                    rounded-xl
                    py-3
                    flex
                    justify-center
                    gap-2
                    hover:border-teal-400
                  "
                >

                  <Pencil size={18} />

                  Edit

                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteAdmin(admin)
                  }
                  className="
                    flex-1
                    bg-red-500/20
                    text-red-400
                    rounded-xl
                    py-3
                    flex
                    justify-center
                    gap-2
                    hover:bg-red-500/30
                  "
                >

                  <Trash2 size={18} />

                  Deactivate

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      )}

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/60
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-5
            z-50
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
              bg-[#102235]
              border
              border-slate-700
              rounded-3xl
              p-8
              w-full
              max-w-xl
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
                  {editMode
                    ? "Edit Admin"
                    : "Add Branch Admin"}
                </h2>

                <p
                  className="
                    text-slate-400
                    text-sm
                    mt-1
                  "
                >
                  {editMode
                    ? "Update branch administrator"
                    : "Create a new branch administrator"}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="
                  text-slate-400
                  hover:text-white
                "
              >
                <X size={24} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                name="name"
                value={adminData.name}
                onChange={handleChange}
                placeholder="Admin Name"
                required
                disabled={saving}
                className="
                  w-full
                  bg-[#07131f]
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-teal-400
                  disabled:opacity-50
                "
              />

              <input
                name="email"
                type="email"
                value={adminData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                disabled={saving}
                className="
                  w-full
                  bg-[#07131f]
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-teal-400
                  disabled:opacity-50
                "
              />

              <input
                name="phone"
                value={adminData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                disabled={saving}
                className="
                  w-full
                  bg-[#07131f]
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-teal-400
                  disabled:opacity-50
                "
              />

              {/* PASSWORD ONLY FOR CREATE */}

              {!editMode && (
                <input
                  name="password"
                  type="password"
                  value={adminData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  disabled={saving}
                  className="
                    w-full
                    bg-[#07131f]
                    border
                    border-slate-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-teal-400
                    disabled:opacity-50
                  "
                />
              )}

              {/* BRANCH */}

              <select
                name="branch_id"
                value={adminData.branch_id}
                onChange={handleChange}
                required
                disabled={saving}
                className="
                  w-full
                  bg-[#07131f]
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-teal-400
                "
              >

                <option value="">
                  Select Branch
                </option>

                {branches.map((branch) => (

                  <option
                    key={branch.id}
                    value={branch.id}
                  >
                    {branch.branch_name}
                  </option>

                ))}

              </select>

              <button
                type="submit"
                disabled={saving}
                className="
                  w-full
                  bg-teal-500
                  hover:bg-teal-600
                  py-3
                  rounded-xl
                  font-bold
                  mt-5
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                {saving
                  ? "Saving..."
                  : editMode
                  ? "Update Admin"
                  : "Save Admin"}

              </button>

            </form>

          </motion.div>

        </div>

      )}

    </div>
  );
}