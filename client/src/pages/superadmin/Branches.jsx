import {
    MapPin,
    Plus,
    Edit,
    Trash2,
    Users,
    X,
  } from "lucide-react";
  
  import { motion } from "framer-motion";
  
  import { useEffect, useState } from "react";
  
  import toast from "react-hot-toast";
  
  
  export default function Branches() {
  
  
    // =====================================================
    // API
    // =====================================================
  
    const API_URL = "http://localhost:5001";
  
  
    // =====================================================
    // BRANCH STATES
    // =====================================================
  
    const [branches, setBranches] = useState([]);
  
    const [loading, setLoading] = useState(true);
  
    const [saving, setSaving] = useState(false);
  
  
    // =====================================================
    // BRANCH MODAL
    // =====================================================
  
    const [showModal, setShowModal] = useState(false);
  
    const [editingBranch, setEditingBranch] = useState(null);
  
  
    // =====================================================
    // BRANCH FORM
    // =====================================================
  
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
  
  
    // =====================================================
    // BRANCH ADMIN STATES
    // =====================================================
  
    const [showAdminModal, setShowAdminModal] =
      useState(false);
  
  
    const [selectedBranch, setSelectedBranch] =
      useState(null);
  
  
    const [adminSaving, setAdminSaving] =
      useState(false);
  
  
    // =====================================================
    // BRANCH ADMIN FORM
    // =====================================================
  
    const [adminForm, setAdminForm] = useState({
  
      name: "",
  
      email: "",
  
      phone: "",
  
      password: "",
  
    });
  
  
    // =====================================================
    // GET JWT TOKEN
    // =====================================================
  
    const getToken = () => {
  
      const token =
        localStorage.getItem("token");
  
  
      console.log(
        "JWT TOKEN:",
        token
          ? "Token found"
          : "Token not found"
      );
  
  
      return token;
  
    };
  
  
    // =====================================================
    // FETCH ALL BRANCHES
    // =====================================================
  
    const fetchBranches = async () => {
  
      try {
  
        const token = getToken();
  
  
        if (!token) {
  
          toast.error(
            "Please login as Super Admin"
          );
  
          return;
  
        }
  
  
        const response = await fetch(
  
          `${API_URL}/api/admin/branches`,
  
          {
  
            method: "GET",
  
            headers: {
  
              Authorization:
                `Bearer ${token}`,
  
            },
  
          }
  
        );
  
  
        const data =
          await response.json();
  
  
        console.log(
          "GET BRANCHES:",
          data
        );
  
  
        if (!response.ok) {
  
          throw new Error(
  
            data.message ||
            "Failed to fetch branches"
  
          );
  
        }
  
  
        setBranches(
          data.data || []
        );
  
  
      } catch (error) {
  
        console.error(
          "FETCH BRANCHES ERROR:",
          error
        );
  
  
        toast.error(
  
          error.message ||
          "Unable to load branches"
  
        );
  
  
      } finally {
  
        setLoading(false);
  
      }
  
    };
  
  
    // =====================================================
    // LOAD BRANCHES WHEN PAGE OPENS
    // =====================================================
  
    useEffect(() => {
  
      fetchBranches();
  
    }, []);
  
  
    // =====================================================
    // HANDLE BRANCH INPUT
    // =====================================================
  
    const handleChange = (e) => {
  
      const {
        name,
        value,
      } = e.target;
  
  
      setFormData(
        (previous) => ({
  
          ...previous,
  
          [name]: value,
  
        })
      );
  
    };
  
  
    // =====================================================
    // RESET BRANCH FORM
    // =====================================================
  
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
  
  
    // =====================================================
    // OPEN ADD BRANCH MODAL
    // =====================================================
  
    const handleAddBranch = () => {
  
      resetForm();
  
      setShowModal(true);
  
    };
  
  
    // =====================================================
    // OPEN EDIT BRANCH MODAL
    // =====================================================
  
    const handleEditBranch = (branch) => {
  
      setEditingBranch(branch);
  
  
      setFormData({
  
        branch_name:
          branch.branch_name || "",
  
        branch_code:
          branch.branch_code || "",
  
        manager:
          branch.manager || "",
  
        phone:
          branch.phone || "",
  
        email:
          branch.email || "",
  
        address:
          branch.address || "",
  
        city:
          branch.city || "",
  
        state:
          branch.state || "",
  
        country:
          branch.country || "",
  
        google_map:
          branch.google_map || "",
  
        working_hours:
          branch.working_hours || "",
  
        status:
          branch.status || "ACTIVE",
  
      });
  
  
      setShowModal(true);
  
    };
  
  
    // =====================================================
    // CLOSE BRANCH MODAL
    // =====================================================
  
    const closeModal = () => {
  
      if (saving) {
  
        return;
  
      }
  
  
      setShowModal(false);
  
      resetForm();
  
    };
  
  
    // =====================================================
    // VALIDATE BRANCH FORM
    // =====================================================
  
    const validateBranchForm = () => {
  
      if (!formData.branch_name.trim()) {
  
        toast.error(
          "Branch name is required"
        );
  
        return false;
  
      }
  
  
      if (!formData.branch_code.trim()) {
  
        toast.error(
          "Branch code is required"
        );
  
        return false;
  
      }
  
  
      if (!formData.phone.trim()) {
  
        toast.error(
          "Phone number is required"
        );
  
        return false;
  
      }
  
  
      if (!formData.email.trim()) {
  
        toast.error(
          "Email is required"
        );
  
        return false;
  
      }
  
  
      if (!formData.address.trim()) {
  
        toast.error(
          "Address is required"
        );
  
        return false;
  
      }
  
  
      if (!formData.city.trim()) {
  
        toast.error(
          "City is required"
        );
  
        return false;
  
      }
  
  
      if (!formData.state.trim()) {
  
        toast.error(
          "State is required"
        );
  
        return false;
  
      }
  
  
      if (!formData.country.trim()) {
  
        toast.error(
          "Country is required"
        );
  
        return false;
  
      }
  
  
      return true;
  
    };
  
  
    // =====================================================
    // CREATE / UPDATE BRANCH
    // =====================================================
  
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
  
      if (!validateBranchForm()) {
  
        return;
  
      }
  
  
      const token = getToken();
  
  
      if (!token) {
  
        toast.error(
          "Please login as Super Admin"
        );
  
        return;
  
      }
  
  
      try {
  
        setSaving(true);
  
  
        let url;
  
        let method;
  
  
        // CREATE
  
        if (!editingBranch) {
  
          url =
            `${API_URL}/api/admin/branches`;
  
          method = "POST";
  
        }
  
  
        // UPDATE
  
        else {
  
          url =
            `${API_URL}/api/admin/branches/${editingBranch.id}`;
  
          method = "PUT";
  
        }
  
  
        const body = {
  
          branch_name:
            formData.branch_name.trim(),
  
          branch_code:
            formData.branch_code.trim(),
  
          manager:
            formData.manager.trim() ||
            null,
  
          phone:
            formData.phone.trim(),
  
          email:
            formData.email.trim(),
  
          address:
            formData.address.trim(),
  
          city:
            formData.city.trim(),
  
          state:
            formData.state.trim(),
  
          country:
            formData.country.trim(),
  
          google_map:
            formData.google_map.trim() ||
            null,
  
          working_hours:
            formData.working_hours.trim() ||
            null,
  
          status:
            formData.status,
  
        };
  
  
        console.log(
          "BRANCH REQUEST:",
          body
        );
  
  
        const response =
          await fetch(
  
            url,
  
            {
  
              method,
  
              headers: {
  
                "Content-Type":
                  "application/json",
  
                Authorization:
                  `Bearer ${token}`,
  
              },
  
              body:
                JSON.stringify(body),
  
            }
  
          );
  
  
        const data =
          await response.json();
  
  
        console.log(
          "BRANCH RESPONSE:",
          response.status,
          data
        );
  
  
        if (!response.ok) {
  
          throw new Error(
  
            data.message ||
            `Request failed with status ${response.status}`
  
          );
  
        }
  
  
        if (editingBranch) {
  
          toast.success(
            "Branch updated successfully"
          );
  
        } else {
  
          toast.success(
            "Branch created successfully"
          );
  
        }
  
  
        setShowModal(false);
  
        resetForm();
  
  
        // Reload database data
  
        await fetchBranches();
  
  
      } catch (error) {
  
        console.error(
          "BRANCH SAVE ERROR:",
          error
        );
  
  
        toast.error(
  
          error.message ||
          "Failed to save branch"
  
        );
  
      } finally {
  
        setSaving(false);
  
      }
  
    };
  
  
    // =====================================================
    // DELETE BRANCH
    // =====================================================
  
    const handleDelete = async (branch) => {
  
      const confirmDelete =
        window.confirm(
  
          `Are you sure you want to delete ${branch.branch_name}?`
  
        );
  
  
      if (!confirmDelete) {
  
        return;
  
      }
  
  
      const token = getToken();
  
  
      if (!token) {
  
        toast.error(
          "Please login as Super Admin"
        );
  
        return;
  
      }
  
  
      try {
  
        const response =
          await fetch(
  
            `${API_URL}/api/admin/branches/${branch.id}`,
  
            {
  
              method: "DELETE",
  
              headers: {
  
                Authorization:
                  `Bearer ${token}`,
  
              },
  
            }
  
          );
  
  
        const data =
          await response.json();
  
  
        console.log(
          "DELETE BRANCH:",
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
  
  
    // =====================================================
    // OPEN ASSIGN ADMIN MODAL
    // =====================================================
  
    const handleAssignAdmin = (branch) => {
  
      console.log(
        "SELECTED BRANCH:",
        branch
      );
  
  
      setSelectedBranch(branch);
  
  
      setAdminForm({
  
        name: "",
  
        email: "",
  
        phone: "",
  
        password: "",
  
      });
  
  
      setShowAdminModal(true);
  
    };
  
  
    // =====================================================
    // ADMIN FORM CHANGE
    // =====================================================
  
    const handleAdminChange = (e) => {
  
      const {
        name,
        value,
      } = e.target;
  
  
      setAdminForm(
        (previous) => ({
  
          ...previous,
  
          [name]: value,
  
        })
      );
  
    };
  
  
    // =====================================================
    // CLOSE ADMIN MODAL
    // =====================================================
  
    const closeAdminModal = () => {
  
      if (adminSaving) {
  
        return;
  
      }
  
  
      setShowAdminModal(false);
  
      setSelectedBranch(null);
  
  
      setAdminForm({
  
        name: "",
  
        email: "",
  
        phone: "",
  
        password: "",
  
      });
  
    };
  
  
    // =====================================================
    // VALIDATE ADMIN FORM
    // =====================================================
  
    const validateAdminForm = () => {
  
      if (!adminForm.name.trim()) {
  
        toast.error(
          "Admin name is required"
        );
  
        return false;
  
      }
  
  
      if (!adminForm.email.trim()) {
  
        toast.error(
          "Admin email is required"
        );
  
        return false;
  
      }
  
  
      if (!adminForm.phone.trim()) {
  
        toast.error(
          "Admin phone is required"
        );
  
        return false;
  
      }
  
  
      if (!adminForm.password) {
  
        toast.error(
          "Admin password is required"
        );
  
        return false;
  
      }
  
  
      return true;
  
    };
  
  
    // =====================================================
    // CREATE / ASSIGN BRANCH ADMIN
    // =====================================================
  
    const handleAdminSubmit = async (e) => {
  
      e.preventDefault();
  
  
      if (!selectedBranch) {
  
        toast.error(
          "No branch selected"
        );
  
        return;
  
      }
  
  
      if (!validateAdminForm()) {
  
        return;
  
      }
  
  
      const token = getToken();
  
  
      if (!token) {
  
        toast.error(
          "Please login as Super Admin"
        );
  
        return;
  
      }
  
  
      try {
  
        setAdminSaving(true);
  
  
        const requestBody = {
  
          name:
            adminForm.name.trim(),
  
          email:
            adminForm.email.trim(),
  
          phone:
            adminForm.phone.trim(),
  
          password:
            adminForm.password,
  
          branch_id:
            selectedBranch.id,
  
        };
  
  
        console.log(
          "CREATE BRANCH ADMIN REQUEST:",
          requestBody
        );
  
  
        const response =
          await fetch(
  
            `${API_URL}/api/admin/branch-admins`,
  
            {
  
              method: "POST",
  
              headers: {
  
                "Content-Type":
                  "application/json",
  
                Authorization:
                  `Bearer ${token}`,
  
              },
  
              body:
                JSON.stringify(
                  requestBody
                ),
  
            }
  
          );
  
  
        const data =
          await response.json();
  
  
        console.log(
          "CREATE BRANCH ADMIN RESPONSE:",
          response.status,
          data
        );
  
  
        if (!response.ok) {
  
          throw new Error(
  
            data.message ||
            `Request failed with status ${response.status}`
  
          );
  
        }
  
  
        toast.success(
          "Branch Admin assigned successfully"
        );
  
  
        closeAdminModal();
  
  
        // Reload branches
  
        await fetchBranches();
  
  
      } catch (error) {
  
        console.error(
          "ASSIGN ADMIN ERROR:",
          error
        );
  
  
        toast.error(
  
          error.message ||
          "Unable to assign Branch Admin"
  
        );
  
      } finally {
  
        setAdminSaving(false);
  
      }
  
    };
  
  
    // =====================================================
    // LOADING SCREEN
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
  
          <div
            className="
              text-center
            "
          >
  
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
  
            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Loading branches...
            </p>
  
          </div>
  
        </div>
  
      );
  
    }
  
  
    // =====================================================
    // MAIN UI
    // =====================================================
  
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
  
  
        {/* =================================================
            HEADER
        ================================================= */}
  
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
  
  
          {/* ADD BRANCH */}
  
          <button
  
            type="button"
  
            onClick={
              handleAddBranch
            }
  
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
  
            <Plus
              size={20}
            />
  
            Add Branch
  
          </button>
  
        </motion.div>
  
  
        {/* =================================================
            BRANCH CARDS
        ================================================= */}
  
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
              Click Add Branch to create your first branch.
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
  
            {branches.map(
              (branch) => (
  
                <motion.div
  
                  key={
                    branch.id
                  }
  
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
  
                  {/* TOP */}
  
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
  
                      <MapPin
                        className="
                          text-teal-400
                        "
                      />
  
                    </div>
  
  
                    <div
                      className="
                        flex
                        gap-2
                      "
                    >
  
                      {/* EDIT */}
  
                      <button
  
                        type="button"
  
                        onClick={() =>
                          handleEditBranch(
                            branch
                          )
                        }
  
                        className="
                          p-2
                          rounded-lg
                          bg-blue-500/20
                          text-blue-400
                          hover:bg-blue-500/30
                        "
                      >
  
                        <Edit
                          size={18}
                        />
  
                      </button>
  
  
                      {/* DELETE */}
  
                      <button
  
                        type="button"
  
                        onClick={() =>
                          handleDelete(
                            branch
                          )
                        }
  
                        className="
                          p-2
                          rounded-lg
                          bg-red-500/20
                          text-red-400
                          hover:bg-red-500/30
                        "
                      >
  
                        <Trash2
                          size={18}
                        />
  
                      </button>
  
                    </div>
  
                  </div>
  
  
                  {/* BRANCH NAME */}
  
                  <h2
                    className="
                      text-xl
                      font-bold
                      mt-5
                    "
                  >
  
                    {branch.branch_name}
  
                  </h2>
  
  
                  {/* LOCATION */}
  
                  <p
                    className="
                      text-slate-400
                      mt-2
                    "
                  >
  
                    {branch.city},{" "}
                    {branch.state}
  
                  </p>
  
  
                  {/* STUDENTS */}
  
                  <div
                    className="
                      mt-6
                      space-y-3
                    "
                  >
  
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        text-slate-300
                      "
                    >
  
                      <Users
                        size={18}
                      />
  
                      <span>
  
                        Students:{" "}
                        {branch.student_count ||
                          0}
  
                      </span>
  
                    </div>
  
  
                    {/* MANAGER */}
  
                    <p
                      className="
                        text-slate-400
                      "
                    >
  
                      Manager:
  
                      <span
                        className="
                          text-white
                          ml-2
                        "
                      >
  
                        {branch.manager ||
                          "Not Assigned"}
  
                      </span>
  
                    </p>
  
                  </div>
  
  
                  {/* STATUS */}
  
                  <div
                    className="
                      mt-4
                    "
                  >
  
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-bold
  
                        ${
                          branch.status ===
                          "ACTIVE"
  
                            ? "bg-green-500/20 text-green-400"
  
                            : "bg-red-500/20 text-red-400"
                        }
                      `}
                    >
  
                      {branch.status}
  
                    </span>
  
                  </div>
  
  
                  {/* ASSIGN ADMIN */}
  
                  <button
  
                    type="button"
  
                    onClick={() =>
                      handleAssignAdmin(
                        branch
                      )
                    }
  
                    className="
                      mt-6
                      w-full
                      bg-teal-500/20
                      text-teal-400
                      py-3
                      rounded-xl
                      font-bold
                      hover:bg-teal-500
                      hover:text-white
                      transition
                    "
                  >
  
                    Assign Branch Admin
  
                  </button>
  
                </motion.div>
  
              )
            )}
  
          </div>
  
        )}
  
  
        {/* =====================================================
            ADD / EDIT BRANCH MODAL
        ===================================================== */}
  
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
  
              {/* HEADER */}
  
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
                      : "Enter branch information"}
  
                  </p>
  
                </div>
  
  
                <button
  
                  type="button"
  
                  onClick={
                    closeModal
                  }
  
                  disabled={saving}
  
                  className="
                    p-2
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-700
                  "
                >
  
                  <X
                    size={22}
                  />
  
                </button>
  
              </div>
  
  
              {/* FORM */}
  
              <form
  
                onSubmit={
                  handleSubmit
                }
  
                className="
                  space-y-5
                "
              >
  
                {/* BRANCH NAME */}
  
                <FormInput
  
                  label="Branch Name"
  
                  name="branch_name"
  
                  value={
                    formData.branch_name
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="Pune Branch"
  
                  required
  
                  disabled={saving}
  
                />
  
  
                {/* BRANCH CODE */}
  
                <FormInput
  
                  label="Branch Code"
  
                  name="branch_code"
  
                  value={
                    formData.branch_code
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="PUNE001"
  
                  required
  
                  disabled={saving}
  
                />
  
  
                {/* MANAGER */}
  
                <FormInput
  
                  label="Manager"
  
                  name="manager"
  
                  value={
                    formData.manager
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="Manager name"
  
                  disabled={saving}
  
                />
  
  
                {/* PHONE */}
  
                <FormInput
  
                  label="Phone"
  
                  name="phone"
  
                  value={
                    formData.phone
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="9876543210"
  
                  required
  
                  disabled={saving}
  
                />
  
  
                {/* EMAIL */}
  
                <FormInput
  
                  label="Email"
  
                  name="email"
  
                  type="email"
  
                  value={
                    formData.email
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="branch@example.com"
  
                  required
  
                  disabled={saving}
  
                />
  
  
                {/* ADDRESS */}
  
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
  
                    value={
                      formData.address
                    }
  
                    onChange={
                      handleChange
                    }
  
                    placeholder="Complete branch address"
  
                    required
  
                    disabled={saving}
  
                    rows={3}
  
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
                    "
                  />
  
                </div>
  
  
                {/* CITY */}
  
                <FormInput
  
                  label="City"
  
                  name="city"
  
                  value={
                    formData.city
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="Pune"
  
                  required
  
                  disabled={saving}
  
                />
  
  
                {/* STATE */}
  
                <FormInput
  
                  label="State"
  
                  name="state"
  
                  value={
                    formData.state
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="Maharashtra"
  
                  required
  
                  disabled={saving}
  
                />
  
  
                {/* COUNTRY */}
  
                <FormInput
  
                  label="Country"
  
                  name="country"
  
                  value={
                    formData.country
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="India"
  
                  required
  
                  disabled={saving}
  
                />
  
  
                {/* GOOGLE MAP */}
  
                <FormInput
  
                  label="Google Map Link"
  
                  name="google_map"
  
                  value={
                    formData.google_map
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="Google Maps URL"
  
                  disabled={saving}
  
                />
  
  
                {/* WORKING HOURS */}
  
                <FormInput
  
                  label="Working Hours"
  
                  name="working_hours"
  
                  value={
                    formData.working_hours
                  }
  
                  onChange={
                    handleChange
                  }
  
                  placeholder="9 AM - 6 PM"
  
                  disabled={saving}
  
                />
  
  
                {/* STATUS */}
  
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
  
                    value={
                      formData.status
                    }
  
                    onChange={
                      handleChange
                    }
  
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
  
                    <option
                      value="ACTIVE"
                    >
                      ACTIVE
                    </option>
  
  
                    <option
                      value="INACTIVE"
                    >
                      INACTIVE
                    </option>
  
                  </select>
  
                </div>
  
  
                {/* BUTTONS */}
  
                <div
                  className="
                    flex
                    gap-3
                    pt-3
                  "
                >
  
                  <button
  
                    type="button"
  
                    onClick={
                      closeModal
                    }
  
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
  
                      : "Create Branch"
  
                    }
  
                  </button>
  
                </div>
  
              </form>
  
            </motion.div>
  
          </div>
  
        )}
  
  
        {/* =====================================================
            ASSIGN BRANCH ADMIN MODAL
        ===================================================== */}
  
        {showAdminModal && (
  
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
                max-w-lg
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
  
              {/* ADMIN MODAL HEADER */}
  
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
  
                    Assign Branch Admin
  
                  </h2>
  
  
                  <p
                    className="
                      text-slate-400
                      text-sm
                      mt-1
                    "
                  >
  
                    {selectedBranch?.branch_name}
  
                  </p>
  
                </div>
  
  
                <button
  
                  type="button"
  
                  onClick={
                    closeAdminModal
                  }
  
                  disabled={
                    adminSaving
                  }
  
                  className="
                    p-2
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-700
                  "
                >
  
                  <X
                    size={22}
                  />
  
                </button>
  
              </div>
  
  
              {/* ADMIN FORM */}
  
              <form
  
                onSubmit={
                  handleAdminSubmit
                }
  
                className="
                  space-y-5
                "
              >
  
                {/* NAME */}
  
                <FormInput
  
                  label="Admin Name"
  
                  name="name"
  
                  value={
                    adminForm.name
                  }
  
                  onChange={
                    handleAdminChange
                  }
  
                  placeholder="Enter admin name"
  
                  required
  
                  disabled={
                    adminSaving
                  }
  
                />
  
  
                {/* EMAIL */}
  
                <FormInput
  
                  label="Email"
  
                  name="email"
  
                  type="email"
  
                  value={
                    adminForm.email
                  }
  
                  onChange={
                    handleAdminChange
                  }
  
                  placeholder="admin@example.com"
  
                  required
  
                  disabled={
                    adminSaving
                  }
  
                />
  
  
                {/* PHONE */}
  
                <FormInput
  
                  label="Phone"
  
                  name="phone"
  
                  value={
                    adminForm.phone
                  }
  
                  onChange={
                    handleAdminChange
                  }
  
                  placeholder="9876543210"
  
                  required
  
                  disabled={
                    adminSaving
                  }
  
                />
  
  
                {/* PASSWORD */}
  
                <FormInput
  
                  label="Password"
  
                  name="password"
  
                  type="password"
  
                  value={
                    adminForm.password
                  }
  
                  onChange={
                    handleAdminChange
                  }
  
                  placeholder="Enter temporary password"
  
                  required
  
                  disabled={
                    adminSaving
                  }
  
                />
  
  
                {/* SELECTED BRANCH */}
  
                <div
                  className="
                    bg-teal-500/10
                    border
                    border-teal-500/20
                    rounded-xl
                    p-4
                  "
                >
  
                  <p
                    className="
                      text-sm
                      text-slate-400
                    "
                  >
  
                    Admin will be assigned to:
  
                  </p>
  
  
                  <p
                    className="
                      text-teal-400
                      font-bold
                      mt-1
                    "
                  >
  
                    {selectedBranch?.branch_name}
  
                  </p>
  
  
                  <p
                    className="
                      text-slate-500
                      text-xs
                      mt-1
                    "
                  >
  
                    Branch ID:{" "}
                    {selectedBranch?.id}
  
                  </p>
  
                </div>
  
  
                {/* BUTTONS */}
  
                <div
                  className="
                    flex
                    gap-3
                    pt-3
                  "
                >
  
                  <button
  
                    type="button"
  
                    onClick={
                      closeAdminModal
                    }
  
                    disabled={
                      adminSaving
                    }
  
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
  
                    disabled={
                      adminSaving
                    }
  
                    className="
                      flex-1
                      bg-teal-500
                      hover:bg-teal-600
                      py-3
                      rounded-xl
                      font-bold
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
  
                    {adminSaving
  
                      ? "Assigning..."
  
                      : "Assign Admin"
  
                    }
  
                  </button>
  
                </div>
  
              </form>
  
            </motion.div>
  
          </div>
  
        )}
  
      </div>
  
    );
  
  }
  
  
  // =====================================================
  // REUSABLE INPUT
  // =====================================================
  
  function FormInput({
  
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