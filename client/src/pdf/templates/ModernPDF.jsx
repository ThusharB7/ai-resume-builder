import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111827",
    lineHeight: 1.6,
  },

  /* ================= HEADER ================= */

  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 20,
    marginBottom: 25,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
  },

  jobTitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 14,
  },

  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  contact: {
    fontSize: 10,
    color: "#374151",
    marginRight: 14,
    marginBottom: 5,
  },

  link: {
    color: "#2563EB",
    textDecoration: "none",
    fontSize: 10,
    marginRight: 14,
  },

  /* ================= COMMON ================= */

  section: {
    marginBottom: 24,
  },

  heading: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 6,
    marginBottom: 12,
  },

  paragraph: {
    color: "#4B5563",
    lineHeight: 1.7,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 12,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 11,
    color: "#4B5563",
    marginTop: 2,
  },

  rightText: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "right",
  },

  itemSpacing: {
    marginBottom: 16,
  },

  bullet: {
    marginTop: 3,
    color: "#4B5563",
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skill: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 10,
    marginRight: 8,
    marginBottom: 8,
  },

  techStack: {
    marginTop: 6,
    fontSize: 10,
  },

  projectLinks: {
    flexDirection: "row",
    marginTop: 6,
  },

  projectLink: {
    color: "#2563EB",
    fontSize: 10,
    marginRight: 18,
  },
});

export default function ModernPDF({ resume }) {
  const { personal, summary } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <Text style={styles.name}>
            {personal.fullName || "Your Name"}
          </Text>

          <Text style={styles.jobTitle}>
            {personal.jobTitle || "Professional Title"}
          </Text>

          <View style={styles.contactRow}>
            {personal.email && (
              <Text style={styles.contact}>
                {personal.email}
              </Text>
            )}

            {personal.phone && (
              <Text style={styles.contact}>
                {personal.phone}
              </Text>
            )}

            {personal.location && (
              <Text style={styles.contact}>
                {personal.location}
              </Text>
            )}

            {personal.linkedin && (
              <Link
                src={personal.linkedin}
                style={styles.link}
              >
                LinkedIn
              </Link>
            )}

            {personal.github && (
              <Link
                src={personal.github}
                style={styles.link}
              >
                GitHub
              </Link>
            )}
          </View>
        </View>

        {/* ================= SUMMARY ================= */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Professional Summary
          </Text>

          <Text style={styles.paragraph}>
            {summary ||
              "Write a professional summary to introduce yourself."}
          </Text>
        </View>
                {/* ================= EDUCATION ================= */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Education
          </Text>

          {resume.education.map((edu, index) => (
            <View
              key={index}
              style={styles.itemSpacing}
            >
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.title}>
                    {edu.degree || "Degree"}
                  </Text>

                  <Text style={styles.subtitle}>
                    {edu.institution}
                  </Text>
                </View>

                <View>
                  {(edu.startDate ||
                    edu.endDate) && (
                    <Text style={styles.rightText}>
                      {edu.startDate}
                      {edu.startDate &&
                        edu.endDate &&
                        " - "}
                      {edu.endDate}
                    </Text>
                  )}

                  {edu.grade && (
                    <Text style={styles.rightText}>
                      Grade: {edu.grade}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ================= EXPERIENCE ================= */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Experience
          </Text>

          {resume.experience.map(
            (exp, index) => (
              <View
                key={index}
                style={styles.itemSpacing}
              >
                <View
                  style={styles.rowBetween}
                >
                  <View>
                    <Text
                      style={styles.title}
                    >
                      {exp.position ||
                        "Position"}
                    </Text>

                    <Text
                      style={
                        styles.subtitle
                      }
                    >
                      {exp.company}
                    </Text>
                  </View>

                  <View>
                    {(exp.startDate ||
                      exp.endDate) && (
                      <Text
                        style={
                          styles.rightText
                        }
                      >
                        {exp.startDate}
                        {exp.startDate &&
                          exp.endDate &&
                          " - "}
                        {exp.endDate}
                      </Text>
                    )}
                  </View>
                </View>

                {exp.description &&
                  exp.description
                    .split("\n")
                    .filter(
                      (line) =>
                        line.trim() !==
                        ""
                    )
                    .map((line, i) => (
                      <Text
                        key={i}
                        style={
                          styles.bullet
                        }
                      >
                        • {line}
                      </Text>
                    ))}
              </View>
            )
          )}
        </View>
                {/* ================= SKILLS ================= */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Skills
          </Text>

          <View style={styles.skillsContainer}>
            {resume.skills.map((skill, index) => (
              <Text
                key={index}
                style={styles.skill}
              >
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {/* ================= PROJECTS ================= */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Projects
          </Text>

          {resume.projects.map((project, index) => (
            <View
              key={index}
              style={styles.itemSpacing}
            >
              <Text style={styles.title}>
                {project.title || "Project Title"}
              </Text>

              {project.description && (
                <Text style={styles.paragraph}>
                  {project.description}
                </Text>
              )}

              {project.technologies && (
                <Text style={styles.techStack}>
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Tech Stack:
                  </Text>{" "}
                  {project.technologies}
                </Text>
              )}

              <View style={styles.projectLinks}>
                {project.github && (
                  <Link
                    src={project.github}
                    style={styles.projectLink}
                  >
                    GitHub
                  </Link>
                )}

                {project.live && (
                  <Link
                    src={project.live}
                    style={styles.projectLink}
                  >
                    Live Demo
                  </Link>
                )}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}