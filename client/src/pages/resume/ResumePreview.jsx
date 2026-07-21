import { useResume } from "@/context/ResumeContext";

export default function ResumePreview() {
  const { resume } = useResume();

  const { personal } = resume;

  return (
    <div className="min-h-[900px] rounded-2xl bg-white p-10 text-black shadow-xl">
      <h1 className="text-4xl font-bold">
        {personal.fullName || "Your Name"}
      </h1>

      <p className="mt-2 text-xl text-gray-600">
        {personal.jobTitle || "Professional Title"}
      </p>

      <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-700">
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.location && <span>{personal.location}</span>}
      </div>

      <hr className="my-8" />

      <h2 className="mb-2 text-xl font-semibold">
        Professional Summary
      </h2>

      <p className="text-gray-500">
        Summary will appear here...
      </p>
    </div>
  );
}