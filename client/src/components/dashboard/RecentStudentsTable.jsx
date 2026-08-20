export default function RecentStudentsTable() {
  const students = [
    {
      id: 1,
      name: "Aarav Sharma",
      batch: "Beginner",
      status: "Active",
    },
    {
      id: 2,
      name: "Ananya Patel",
      batch: "Intermediate",
      status: "Active",
    },
    {
      id: 3,
      name: "Vihaan Singh",
      batch: "Advanced",
      status: "Pending",
    },
    {
      id: 4,
      name: "Diya Mehta",
      batch: "Beginner",
      status: "Active",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-3">Student</th>
            <th>Batch</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-slate-800"
            >
              <td className="py-4">{student.name}</td>
              <td>{student.batch}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    student.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}