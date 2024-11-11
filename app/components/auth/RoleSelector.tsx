interface RoleSelectorProps {
    role: "student" | "instructor";
    onRoleChange: (role: "student" | "instructor") => void;
  }
  
  export default function RoleSelector({ role, onRoleChange }: RoleSelectorProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          I am a
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onRoleChange("student")}
            className={`p-2.5 rounded-lg text-sm font-medium transition-colors
              ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
              }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => onRoleChange("instructor")}
            className={`p-2.5 rounded-lg text-sm font-medium transition-colors
              ${
                role === "instructor"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
              }`}
          >
            Instructor
          </button>
        </div>
      </div>
    );
  }