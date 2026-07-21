import { useResume } from "@/context/ResumeContext";

export default function PersonalInfoForm() {
  const { resume, updateSection } = useResume();

  const handleChange = (e) => {
    updateSection("personal", {
      ...resume.personal,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">
        Personal Information
      </h2>

      <input
        className={inputClass}
        placeholder="Full Name"
        name="fullName"
        value={resume.personal.fullName}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        placeholder="Professional Title"
        name="jobTitle"
        value={resume.personal.jobTitle}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        placeholder="Email"
        name="email"
        value={resume.personal.email}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        placeholder="Phone"
        name="phone"
        value={resume.personal.phone}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        placeholder="Location"
        name="location"
        value={resume.personal.location}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        placeholder="LinkedIn URL"
        name="linkedin"
        value={resume.personal.linkedin}
        onChange={handleChange}
      />

      <input
        className={inputClass}
        placeholder="GitHub URL"
        name="github"
        value={resume.personal.github}
        onChange={handleChange}
      />
    </div>
  );
}