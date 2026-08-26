import {
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MapPin,
  Download,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import generateReceipt from "../../utils/generateReceipt";


export default function Admissions() {

  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [branch, setBranch] = useState("All");

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);


  // =====================================================
  // FETCH ADMISSIONS
  // =====================================================

  const fetchAdmissions = async () => {

    try {

      setLoading(true);

      const response = await api.get("/admin/admissions");

      console.log(
        "ADMISSIONS RESPONSE:",
        response.data
      );

      if (response.data.success) {

        setApplications(
          response.data.data || []
        );

      } else {

        toast.error(
          response.data.message ||
          "Failed to load admissions"
        );

      }

    } catch (error) {

      console.error(
        "FETCH ADMISSIONS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load admissions"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {

    fetchAdmissions();

  }, []);


  // =====================================================
  // APPROVE ADMISSION
  // =====================================================

  const approveApplication = async (id) => {

    try {

      setActionLoading(id);

      const response = await api.put(
        `/admin/admissions/${id}/approve`
      );


      if (response.data.success) {

        toast.success(
          "Admission approved successfully"
        );

        // Reload data from MySQL
        await fetchAdmissions();

      } else {

        toast.error(
          response.data.message ||
          "Failed to approve admission"
        );

      }

    } catch (error) {

      console.error(
        "APPROVE ADMISSION ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to approve admission"
      );

    } finally {

      setActionLoading(null);

    }

  };


  // =====================================================
  // REJECT ADMISSION
  // =====================================================

  const rejectApplication = async (id) => {

    try {

      setActionLoading(id);

      const response = await api.put(
        `/admin/admissions/${id}/reject`,
        {
          remarks: "Rejected by Super Admin",
        }
      );


      if (response.data.success) {

        toast.success(
          "Admission rejected successfully"
        );

        // Reload data from MySQL
        await fetchAdmissions();

      } else {

        toast.error(
          response.data.message ||
          "Failed to reject admission"
        );

      }

    } catch (error) {

      console.error(
        "REJECT ADMISSION ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to reject admission"
      );

    } finally {

      setActionLoading(null);

    }

  };


  // =====================================================
  // STATUS STYLE
  // =====================================================

  const statusStyle = (value) => {

    if (value === "APPROVED") {

      return "bg-green-500/20 text-green-400";

    }

    if (value === "REJECTED") {

      return "bg-red-500/20 text-red-400";

    }

    return "bg-yellow-500/20 text-yellow-400";

  };


  // =====================================================
  // STATUS DISPLAY
  // =====================================================

  const displayStatus = (value) => {

    if (value === "PENDING") {

      return "Pending";

    }

    if (value === "APPROVED") {

      return "Approved";

    }

    if (value === "REJECTED") {

      return "Rejected";

    }

    return value || "Unknown";

  };


  // =====================================================
  // UNIQUE BRANCHES
  // =====================================================

  const branches = [
    ...new Set(
      applications
        .map((item) => item.branch_name)
        .filter(Boolean)
    ),
  ];


  // =====================================================
  // FILTER APPLICATIONS
  // =====================================================

  const filteredApplications =
    applications.filter((item) => {

      const searchText =
        search.toLowerCase().trim();


      const studentName =
        item.student_name
          ?.toLowerCase() || "";


      const studentEmail =
        item.email
          ?.toLowerCase() || "";


      const studentCode =
        item.student_code
          ?.toLowerCase() || "";


      const searchMatch =
        studentName.includes(searchText) ||
        studentEmail.includes(searchText) ||
        studentCode.includes(searchText);


      const statusMatch =
        status === "All" ||
        item.status === status;


      const branchMatch =
        branch === "All" ||
        item.branch_name === branch;


      return (
        searchMatch &&
        statusMatch &&
        branchMatch
      );

    });


  // =====================================================
  // STATISTICS
  // =====================================================

  const stats = [

    {
      title: "Total Applications",
      value: applications.length,
      icon: Users,
    },

    {
      title: "Pending",
      value:
        applications.filter(
          (item) =>
            item.status === "PENDING"
        ).length,
      icon: Clock,
    },

    {
      title: "Approved",
      value:
        applications.filter(
          (item) =>
            item.status === "APPROVED"
        ).length,
      icon: CheckCircle,
    },

    {
      title: "Rejected",
      value:
        applications.filter(
          (item) =>
            item.status === "REJECTED"
        ).length,
      icon: XCircle,
    },

  ];


  // =====================================================
  // VIEW DETAILS
  // =====================================================

  const viewAdmissionDetails = (item) => {

    navigate(
      "/super-admin/admission-details",
      {
        state: {
          student: item,
        },
      }
    );

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#07131f]
        text-white
        p-4
        sm:p-6
        lg:p-10
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div>

        <h1
          className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-black
          "
        >
          Admissions Management
        </h1>

        <p
          className="
            text-slate-400
            mt-2
          "
        >
          Review, approve and manage student
          admission requests.
        </p>

      </div>


      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          mt-8
        "
      >

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className="
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
                  justify-between
                  items-center
                "
              >

                <div>

                  <p
                    className="
                      text-slate-400
                      text-sm
                    "
                  >
                    {item.title}
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mt-2
                    "
                  >
                    {item.value}
                  </h2>

                </div>


                <div
                  className="
                    bg-teal-500/20
                    p-3
                    rounded-xl
                  "
                >

                  <Icon
                    size={25}
                    className="text-teal-400"
                  />

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>


      {/* =================================================
          FILTER SECTION
      ================================================= */}

      <div
        className="
          mt-8
          bg-[#102235]
          border
          border-slate-700
          rounded-3xl
          p-4
          sm:p-6
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        "
      >

        {/* SEARCH */}

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
            size={20}
            className="text-slate-400"
          />

          <input
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              bg-transparent
              outline-none
              py-3
            "
          />

        </div>


        {/* STATUS */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
            bg-[#07131f]
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            outline-none
          "
        >

          <option value="All">
            All Status
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="REJECTED">
            Rejected
          </option>

        </select>


        {/* BRANCH */}

        <select
          value={branch}
          onChange={(e) =>
            setBranch(e.target.value)
          }
          className="
            bg-[#07131f]
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            outline-none
          "
        >

          <option value="All">
            All Branches
          </option>

          {branches.map((branchName) => (

            <option
              key={branchName}
              value={branchName}
            >
              {branchName}
            </option>

          ))}

        </select>

      </div>


      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (

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

          <div
            className="
              animate-spin
              w-10
              h-10
              border-4
              border-slate-600
              border-t-teal-400
              rounded-full
              mx-auto
            "
          />

          <p
            className="
              text-slate-400
              mt-4
            "
          >
            Loading admissions...
          </p>

        </div>

      )}


      {/* =================================================
          NO APPLICATIONS
      ================================================= */}

      {!loading &&
        filteredApplications.length === 0 && (

          <div
            className="
              mt-8
              bg-[#102235]
              border
              border-slate-700
              rounded-3xl
              p-10
              text-center
              text-slate-400
            "
          >

            <FileText
              size={45}
              className="
                mx-auto
                mb-4
                text-slate-600
              "
            />

            <p className="text-lg">
              No admission applications found.
            </p>

            {applications.length === 0 && (

              <p
                className="
                  text-sm
                  mt-2
                  text-slate-500
                "
              >
                There are currently no admission
                records in the database.
              </p>

            )}

          </div>

        )}


      {/* =================================================
          APPLICATION CARDS
      ================================================= */}

      {!loading &&
        filteredApplications.length > 0 && (

          <div
            className="
              mt-8
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {filteredApplications.map((item) => (

              <motion.div
                key={item.id}
                whileHover={{
                  y: -6,
                }}
                className="
                  bg-[#102235]
                  border
                  border-slate-700
                  rounded-3xl
                  p-5
                  flex
                  flex-col
                  justify-between
                "
              >

                <div>

                  {/* TOP */}

                  <div
                    className="
                      flex
                      justify-between
                      items-start
                    "
                  >

                    <div
                      className="
                        bg-teal-500/20
                        p-4
                        rounded-2xl
                      "
                    >

                      <FileText
                        size={28}
                        className="
                          text-teal-400
                        "
                      />

                    </div>


                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        ${statusStyle(item.status)}
                      `}
                    >
                      {displayStatus(item.status)}
                    </span>

                  </div>


                  {/* STUDENT NAME */}

                  <h2
                    className="
                      text-2xl
                      font-bold
                      mt-6
                    "
                  >
                    {item.student_name ||
                      "Unknown Student"}
                  </h2>


                  {/* EMAIL */}

                  <p
                    className="
                      text-slate-400
                      break-all
                    "
                  >
                    {item.email || "N/A"}
                  </p>


                  {/* DETAILS */}

                  <div
                    className="
                      mt-6
                      space-y-4
                    "
                  >

                    {/* STUDENT CODE */}

                    <p>

                      <span
                        className="
                          text-slate-400
                        "
                      >
                        Student Code:
                      </span>

                      <span className="ml-2">
                        {item.student_code ||
                          "N/A"}
                      </span>

                    </p>


                    {/* BRANCH */}

                    <p
                      className="
                        flex
                        gap-3
                        items-center
                      "
                    >

                      <MapPin
                        size={18}
                        className="
                          text-teal-400
                        "
                      />

                      {item.branch_name ||
                        "Not Assigned"}

                    </p>


                    {/* STATUS */}

                    <p>

                      <span
                        className="
                          text-slate-400
                        "
                      >
                        Status:
                      </span>

                      <span className="ml-2">
                        {displayStatus(
                          item.status
                        )}
                      </span>

                    </p>


                    {/* APPROVED DATE */}

                    {item.approved_date && (

                      <p>

                        <span
                          className="
                            text-slate-400
                          "
                        >
                          Updated:
                        </span>

                        <span className="ml-2">

                          {new Date(
                            item.approved_date
                          ).toLocaleDateString()}

                        </span>

                      </p>

                    )}

                  </div>

                </div>


                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div
                  className="
                    mt-8
                    flex
                    gap-3
                    flex-wrap
                  "
                >

                  {/* VIEW */}

                  <button
                    onClick={() =>
                      viewAdmissionDetails(item)
                    }
                    className="
                      flex-1
                      min-w-[100px]
                      h-12
                      rounded-xl
                      border
                      border-slate-600
                      flex
                      items-center
                      justify-center
                      gap-2
                      hover:bg-slate-800
                      transition
                    "
                  >

                    <Eye size={18} />

                    View

                  </button>


                  {/* PENDING ACTIONS */}

                  {item.status === "PENDING" && (

                    <>

                      {/* APPROVE */}

                      <button
                        disabled={
                          actionLoading === item.id
                        }
                        onClick={() =>
                          approveApplication(
                            item.id
                          )
                        }
                        className="
                          flex-1
                          min-w-[100px]
                          h-12
                          rounded-xl
                          bg-green-500
                          hover:bg-green-600
                          flex
                          items-center
                          justify-center
                          gap-2
                          font-semibold
                          disabled:opacity-50
                        "
                      >

                        {actionLoading ===
                        item.id ? (

                          "Processing..."

                        ) : (

                          <>
                            <CheckCircle
                              size={18}
                            />

                            Approve
                          </>

                        )}

                      </button>


                      {/* REJECT */}

                      <button
                        disabled={
                          actionLoading === item.id
                        }
                        onClick={() =>
                          rejectApplication(
                            item.id
                          )
                        }
                        className="
                          flex-1
                          min-w-[100px]
                          h-12
                          rounded-xl
                          bg-red-500
                          hover:bg-red-600
                          flex
                          items-center
                          justify-center
                          gap-2
                          font-semibold
                          disabled:opacity-50
                        "
                      >

                        {actionLoading ===
                        item.id ? (

                          "Processing..."

                        ) : (

                          <>
                            <XCircle
                              size={18}
                            />

                            Reject
                          </>

                        )}

                      </button>

                    </>

                  )}


                  {/* APPROVED → RECEIPT */}

                  {item.status === "APPROVED" && (

                    <button
                      onClick={() =>
                        generateReceipt(item)
                      }
                      className="
                        flex-1
                        min-w-[100px]
                        h-12
                        rounded-xl
                        bg-teal-500
                        hover:bg-teal-600
                        flex
                        items-center
                        justify-center
                        gap-2
                        font-semibold
                      "
                    >

                      <Download
                        size={18}
                      />

                      Receipt

                    </button>

                  )}

                </div>

              </motion.div>

            ))}

          </div>

        )}

    </div>

  );

}