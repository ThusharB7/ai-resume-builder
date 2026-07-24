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
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 56,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#111827",
    lineHeight: 1.7,
  },

  /* ================= HEADER ================= */

  header: {
    paddingBottom: 24,
  },

  name: {
    fontSize: 34,
    fontWeight: 300,
    color: "#111827",
    letterSpacing: 1,
  },

  jobTitle: {
    marginTop: 10,
    fontSize: 11,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 3,
  },

  divider: {
    marginTop: 20,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  },

  contacts: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  contact: {
    fontSize: 10,
    color: "#6B7280",
    marginRight: 18,
    marginBottom: 6,
  },

  link: {
    fontSize: 10,
    color: "#374151",
    marginRight: 18,
    textDecoration: "none",
  },

  /* ================= COMMON ================= */

  section: {
    marginBottom: 28,
  },

  heading: {
    marginBottom: 14,
    fontSize: 10,
    fontWeight: "bold",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 3,
  },

  paragraph: {
    color: "#4B5563",
    lineHeight: 1.8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  left: {
    width: "70%",
  },

  right: {
    width: "30%",
    alignItems: "flex-end",
  },

  title: {
    fontSize: 13,
    fontWeight: "medium",
    color: "#111827",
  },

  subtitle: {
    marginTop: 3,
    color: "#4B5563",
  },

  date: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "right",
  },

  item: {
    marginBottom: 22,
  },

  bullet: {
    marginTop: 5,
    color: "#4B5563",
    lineHeight: 1.7,
  },

  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skill: {
    fontSize: 10,
    color: "#4B5563",
  },

  tech: {
    marginTop: 8,
    fontSize: 10,
    color: "#6B7280",
  },

  projectLinks: {
    flexDirection: "row",
    marginTop: 8,
  },

  projectLink: {
    marginRight: 18,
    fontSize: 10,
    color: "#374151",
  },
});

export default function MinimalPDF({ resume }) {
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

          <View style={styles.divider} />

          <View style={styles.contacts}>
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
              style={styles.item}
            >
              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.title}>
                    {edu.degree || "Degree"}
                  </Text>

                  <Text style={styles.subtitle}>
                    {edu.institution}
                  </Text>
                </View>

                <View style={styles.right}>
                  {(edu.startDate ||
                    edu.endDate) && (
                    <Text style={styles.date}>
                      {edu.startDate}
                      {edu.startDate &&
                        edu.endDate &&
                        " – "}
                      {edu.endDate}
                    </Text>
                  )}

                  {edu.grade && (
                    <Text style={styles.date}>
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
                style={styles.item}
              >
                <View
                  style={styles.row}
                >
                  <View
                    style={styles.left}
                  >
                    <Text
                      style={
                        styles.title
                      }
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

                  <View
                    style={
                      styles.right
                    }
                  >
                    {(exp.startDate ||
                      exp.endDate) && (
                      <Text
                        style={
                          styles.date
                        }
                      >
                        {exp.startDate}
                        {exp.startDate &&
                          exp.endDate &&
                          " – "}
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

          <View style={styles.skillsRow}>
            {resume.skills.map((skill, index) => (
              <Text
                key={index}
                style={styles.skill}
              >
                {skill}
                {index !== resume.skills.length - 1 &&
                  " • "}
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
              style={styles.item}
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
                <Text style={styles.tech}>
                  <Text style={{ fontWeight: "bold" }}>
                    Tech Stack:
                  </Text>{" "}
                  {project.technologies}
                </Text>
              )}

              {(project.github || project.live) && (
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
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}