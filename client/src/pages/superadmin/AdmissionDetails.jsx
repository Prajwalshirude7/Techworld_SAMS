import {
  ArrowLeft,
  User,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import api from "../../services/api";

import generateReceipt from "../../utils/generateReceipt";


export default function AdmissionDetails() {

  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);


  // =====================================================
  // GET ADMISSION ID
  // =====================================================

  const admissionId =
    location.state?.student?.id ||
    location.state?.admissionId;


  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };


  // =====================================================
  // LOAD ADMISSION DETAILS
  // =====================================================

  const fetchAdmission = async () => {

    try {

      if (!admissionId) {

        console.error(
          "Admission ID not found"
        );

        navigate(
          "/super-admin/admissions"
        );

        return;
      }


      const token = getToken();


      if (!token) {

        alert(
          "Authentication token not found. Please login again."
        );

        navigate("/login");

        return;
      }


      const response = await api.get(
        `/admin/admissions/${admissionId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      console.log(
        "ADMISSION DETAILS:",
        response.data
      );


      if (
        !response.data ||
        !response.data.success
      ) {

        throw new Error(
          response.data?.message ||
          "Failed to load admission details"
        );

      }


      const admission =
        response.data.data;


      // =================================================
      // STORE REAL DATABASE DATA
      // =================================================

      setStudent({

        ...admission,

        name:
          admission.student_name ||
          "N/A",

        email:
          admission.email ||
          "N/A",

        phone:
          admission.phone ||
          "N/A",

        dob:
          admission.dob ||
          "N/A",

        gender:
          admission.gender ||
          "N/A",

        father_name:
          admission.father_name ||
          "N/A",

        branch:
          admission.branch_name ||
          "Not Assigned",

        branch_code:
          admission.branch_code ||
          "N/A",

        document:
          admission.document ||
          "Not available",

        address:
          admission.address ||
          "Not available",

        city:
          admission.city ||
          "",

        state:
          admission.state ||
          "",

        pincode:
          admission.pincode ||
          "",

        program:
          admission.program ||
          "Not available",

        experience:
          admission.experience ||
          "Not available",

      });

    }

    catch (error) {

      console.error(
        "ADMISSION DETAILS ERROR:",
        error
      );


      if (
        error.response?.status === 401
      ) {

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

        return;
      }


      if (
        error.response?.status === 404
      ) {

        alert(
          "Admission not found."
        );

        navigate(
          "/super-admin/admissions"
        );

        return;
      }


      alert(
        error.response?.data?.message ||
        error.message ||
        "Failed to load admission details"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {

    fetchAdmission();

  }, [admissionId]);


  // =====================================================
  // APPROVE ADMISSION
  // =====================================================

  const approveAdmission = async () => {

    try {

      setActionLoading(true);


      const token = getToken();


      const response = await api.put(
        `/admin/admissions/${admissionId}/approve`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      console.log(
        "APPROVE RESPONSE:",
        response.data
      );


      if (
        !response.data?.success
      ) {

        throw new Error(
          response.data?.message ||
          "Failed to approve admission"
        );

      }


      alert(
        "Admission approved successfully"
      );


      // Reload details
      await fetchAdmission();

    }

    catch (error) {

      console.error(
        "APPROVE ERROR:",
        error
      );


      alert(
        error.response?.data?.message ||
        error.message ||
        "Failed to approve admission"
      );

    }

    finally {

      setActionLoading(false);

    }

  };


  // =====================================================
  // REJECT ADMISSION
  // =====================================================

  const rejectAdmission = async () => {

    try {

      const remarks =
        window.prompt(
          "Enter rejection remarks:",
          "Rejected by Super Admin"
        );


      if (remarks === null) {
        return;
      }


      setActionLoading(true);


      const token = getToken();


      const response = await api.put(
        `/admin/admissions/${admissionId}/reject`,
        {
          remarks:
            remarks ||
            "Rejected by Super Admin",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      console.log(
        "REJECT RESPONSE:",
        response.data
      );


      if (
        !response.data?.success
      ) {

        throw new Error(
          response.data?.message ||
          "Failed to reject admission"
        );

      }


      alert(
        "Admission rejected successfully"
      );


      // Reload details
      await fetchAdmission();

    }

    catch (error) {

      console.error(
        "REJECT ERROR:",
        error
      );


      alert(
        error.response?.data?.message ||
        error.message ||
        "Failed to reject admission"
      );

    }

    finally {

      setActionLoading(false);

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

        <div className="text-center">

          <div
            className="
              w-12
              h-12
              border-4
              border-teal-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-5
            "
          />

          <p className="text-xl">
            Loading admission details...
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // NO DATA
  // =====================================================

  if (!student) {

    return (

      <div
        className="
          min-h-screen
          bg-[#07131f]
          text-white
          flex
          items-center
          justify-center
        "
      >

        <div className="text-center">

          <p className="text-xl mb-5">
            Admission details not found.
          </p>

          <button
            onClick={() =>
              navigate(
                "/super-admin/admissions"
              )
            }
            className="
              bg-teal-500
              hover:bg-teal-600
              px-6
              py-3
              rounded-xl
              font-bold
            "
          >
            Back to Admissions
          </button>

        </div>

      </div>

    );

  }


  // =====================================================
  // STATUS
  // =====================================================

  const status =
    student.status;


  const isPending =
    status === "PENDING";


  const isApproved =
    status === "APPROVED";


  const isRejected =
    status === "REJECTED";


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    try {

      return new Date(date)
        .toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );

    }

    catch {

      return date;

    }

  };


  // =====================================================
  // UI
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

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <button
          onClick={() =>
            navigate(-1)
          }
          className="
            bg-[#102235]
            p-3
            rounded-xl
            hover:bg-slate-800
            transition
          "
        >

          <ArrowLeft
            size={22}
          />

        </button>


        <div>

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-black
            "
          >
            Admission Details
          </h1>


          <p className="text-slate-400">

            Review complete student
            application.

          </p>

        </div>

      </div>


      {/* =================================================
          PROFILE CARD
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          mt-8
          bg-[#102235]
          border
          border-slate-700
          rounded-3xl
          p-5
          sm:p-7
        "
      >

        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-between
            gap-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                bg-teal-500/20
                p-4
                rounded-2xl
              "
            >

              <User
                className="text-teal-400"
                size={28}
              />

            </div>


            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {student.name}
              </h2>


              <p
                className="
                  text-slate-400
                  break-all
                "
              >
                {student.email}
              </p>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Student Code:{" "}
                {student.student_code ||
                  "N/A"}
              </p>

            </div>

          </div>


          <span
            className={`
              px-5
              py-2
              rounded-full
              font-bold
              w-fit
              h-fit

              ${
                isApproved
                  ? "bg-green-500/20 text-green-400"
                  : isRejected
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }
            `}
          >

            {status}

          </span>

        </div>

      </motion.div>


      {/* =================================================
          DETAILS GRID
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          mt-6
        "
      >


        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-6
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-teal-400
              mb-5
            "
          >
            Personal Information
          </h2>


          <div className="space-y-4">

            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Phone
              </p>

              <p className="mt-1">
                {student.phone}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Date of Birth
              </p>

              <p className="mt-1">
                {formatDate(student.dob)}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Gender
              </p>

              <p className="mt-1">
                {student.gender}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Father's Name
              </p>

              <p className="mt-1">
                {student.father_name}
              </p>

            </div>

          </div>

        </motion.div>


        {/* =================================================
            BRANCH INFORMATION
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.05,
          }}
          className="
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-6
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-teal-400
              mb-5
            "
          >
            Branch Information
          </h2>


          <div
            className="
              flex
              gap-4
              items-start
            "
          >

            <div
              className="
                bg-teal-500/20
                p-3
                rounded-xl
              "
            >

              <MapPin
                className="text-teal-400"
              />

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Branch
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  mt-1
                "
              >
                {student.branch}
              </p>


              <p
                className="
                  text-slate-400
                  mt-1
                "
              >
                Code:{" "}
                {student.branch_code}
              </p>

            </div>

          </div>

        </motion.div>


        {/* =================================================
            ADDRESS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-6
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-teal-400
              mb-5
            "
          >
            Address
          </h2>


          <div
            className="
              flex
              gap-3
            "
          >

            <MapPin
              className="text-teal-400 shrink-0"
            />


            <div>

              <p>
                {student.address}
              </p>


              {(student.city ||
                student.state) && (

                <p className="mt-1">

                  {student.city}

                  {student.city &&
                    student.state
                    ? ", "
                    : ""}

                  {student.state}

                </p>

              )}


              {student.pincode && (

                <p className="mt-1">

                  PIN:{" "}
                  {student.pincode}

                </p>

              )}

            </div>

          </div>

        </motion.div>


        {/* =================================================
            SKATING DETAILS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-6
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-teal-400
              mb-5
            "
          >
            Skating Details
          </h2>


          <div className="space-y-4">

            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Program
              </p>

              <p className="mt-1">
                {student.program}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Experience
              </p>

              <p className="mt-1">
                {student.experience}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Branch
              </p>

              <p className="mt-1">
                {student.branch}
              </p>

            </div>

          </div>

        </motion.div>


        {/* =================================================
            DOCUMENT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-6
            lg:col-span-2
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-teal-400
              mb-5
            "
          >
            Documents
          </h2>


          <div
            className="
              bg-[#07131f]
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            "
          >

            <FileText
              className="text-teal-400"
            />


            <span>
              {student.document}
            </span>

          </div>

        </motion.div>


        {/* =================================================
            ADMISSION INFORMATION
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
          }}
          className="
            bg-[#102235]
            border
            border-slate-700
            rounded-3xl
            p-6
            lg:col-span-2
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-teal-400
              mb-5
            "
          >
            Admission Information
          </h2>


          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
            "
          >

            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Admission ID
              </p>

              <p className="mt-1 font-bold">
                #{student.id}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Student ID
              </p>

              <p className="mt-1 font-bold">
                {student.student_id}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Status
              </p>

              <p className="mt-1 font-bold">
                {student.status}
              </p>

            </div>


            <div>

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Approved Date
              </p>

              <p className="mt-1 font-bold">
                {formatDate(
                  student.approved_date
                )}
              </p>

            </div>

          </div>


          {student.approved_by_name && (

            <div className="mt-5">

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Approved By
              </p>

              <p className="mt-1 font-bold">
                {student.approved_by_name}
              </p>

            </div>

          )}


          {student.remarks && (

            <div className="mt-5">

              <p
                className="
                  text-slate-400
                  text-sm
                "
              >
                Remarks
              </p>

              <p className="mt-1">
                {student.remarks}
              </p>

            </div>

          )}

        </motion.div>

      </div>


      {/* =================================================
          ACTION BUTTONS
      ================================================= */}

      <div
        className="
          mt-8
          flex
          flex-col
          sm:flex-row
          gap-4
        "
      >

        {/* PENDING */}

        {isPending && (

          <>

            <button
              onClick={
                approveAdmission
              }
              disabled={
                actionLoading
              }
              className="
                flex-1
                bg-green-500
                hover:bg-green-600
                disabled:opacity-50
                py-4
                rounded-xl
                font-bold
                flex
                justify-center
                items-center
                gap-2
                transition
              "
            >

              <CheckCircle />

              {actionLoading
                ? "Processing..."
                : "Approve Admission"}

            </button>


            <button
              onClick={
                rejectAdmission
              }
              disabled={
                actionLoading
              }
              className="
                flex-1
                bg-red-500
                hover:bg-red-600
                disabled:opacity-50
                py-4
                rounded-xl
                font-bold
                flex
                justify-center
                items-center
                gap-2
                transition
              "
            >

              <XCircle />

              {actionLoading
                ? "Processing..."
                : "Reject Admission"}

            </button>

          </>

        )}


        {/* APPROVED */}

        {isApproved && (

          <button
            onClick={() =>
              generateReceipt(student)
            }
            className="
              w-full
              bg-teal-500
              hover:bg-teal-600
              py-4
              rounded-xl
              font-bold
              flex
              justify-center
              items-center
              gap-2
              transition
            "
          >

            <Download />

            Generate Receipt

          </button>

        )}


        {/* REJECTED */}

        {isRejected && (

          <div
            className="
              w-full
              bg-red-500/20
              border
              border-red-500/30
              text-red-400
              py-4
              rounded-xl
              text-center
              font-bold
            "
          >

            Admission Rejected

          </div>

        )}

      </div>

    </div>

  );

}