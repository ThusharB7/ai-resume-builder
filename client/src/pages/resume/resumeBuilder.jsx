import { ResumeProvider } from "@/context/ResumeContext";
import PersonalInfoForm from "@/pages/resume/PersonalInfoForm";
import ResumePreview from "@/pages/resume/ResumePreview";

export default function ResumeBuilder() {
  return (
    <ResumeProvider>
      <div className="grid gap-6 lg:grid-cols-5">
  <div className="lg:col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
    <PersonalInfoForm />
  </div>

  <div className="lg:col-span-3">
    <ResumePreview />
  </div>
</div>
    </ResumeProvider>
  );
}