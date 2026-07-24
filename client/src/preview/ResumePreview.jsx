import { forwardRef } from "react";

import { useResume } from "@/context/ResumeContext";

import ModernTemplate from "@/preview/templates/ModernTemplate";
import MinimalTemplate from "@/preview/templates/MinimalTemplate";
import ExecutiveTemplate from "@/preview/templates/ExecutiveTemplate";
import DeveloperTemplate from "@/preview/templates/DeveloperTemplate";

const ResumePreview = forwardRef((props, ref) => {
  const {
    resume,
    selectedTemplate,
  } = useResume();

  switch (selectedTemplate) {
    case "minimal":
      return (
        <MinimalTemplate
          ref={ref}
          resume={resume}
        />
      );

    case "executive":
      return (
        <ExecutiveTemplate
          ref={ref}
          resume={resume}
        />
      );

    case "developer":
      return (
        <DeveloperTemplate
          ref={ref}
          resume={resume}
        />
      );

    case "modern":
    default:
      return (
        <ModernTemplate
          ref={ref}
          resume={resume}
        />
      );
  }
});
ResumePreview.displayName = "ResumePreview";

export default ResumePreview;