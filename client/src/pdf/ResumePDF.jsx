import ModernPDF from "./templates/ModernPDF";
import MinimalPDF from "./templates/MinimalPDF";
import ExecutivePDF from "./templates/ExecutivePDF";
import DeveloperPDF from "./templates/DeveloperPDF";

export default function ResumePDF({
  resume,
  template,
}) {
  switch (template) {
    case "minimal":
      return <MinimalPDF resume={resume} />;

    case "executive":
      return <ExecutivePDF resume={resume} />;

    case "developer":
      return <DeveloperPDF resume={resume} />;

    default:
      return <ModernPDF resume={resume} />;
  }
}