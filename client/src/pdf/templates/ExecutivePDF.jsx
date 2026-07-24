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
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#111827",
    lineHeight: 1.7,
    backgroundColor: "#FFFFFF",
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: "#0F172A",
    paddingHorizontal: 48,
    paddingVertical: 40,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  jobTitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#CBD5E1",
  },

  contactGrid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  contact: {
    width: "50%",
    color: "#E2E8F0",
    fontSize: 10,
    marginBottom: 6,
  },

  link: {
    width: "50%",
    color: "#E2E8F0",
    fontSize: 10,
    textDecoration: "none",
    marginBottom: 6,
  },

  /* ================= CONTENT ================= */

  content: {
    paddingHorizontal: 48,
    paddingVertical: 40,
  },

  section: {
    marginBottom: 26,
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  headingBar: {
    width: 4,
    height: 20,
    backgroundColor: "#0F172A",
    marginRight: 10,
  },

  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  paragraph: {
    color: "#4B5563",
    lineHeight: 1.8,
  },

  item: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
    fontWeight: "bold",
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

  bullet: {
    marginTop: 5,
    color: "#4B5563",
    lineHeight: 1.7,
  },

  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skill: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 10,
  },

  tech: {
    marginTop: 8,
    color: "#4B5563",
    fontSize: 10,
  },

  links: {
    flexDirection: "row",
    marginTop: 10,
  },

  projectLink: {
    marginRight: 18,
    color: "#1E293B",
    fontSize: 10,
  },
});

export default function ExecutivePDF({ resume }) {
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

          <View style={styles.contactGrid}>
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

        <View style={styles.content}>

          {/* ================= SUMMARY ================= */}

          <View style={styles.section}>
            <View style={styles.headingRow}>
              <View style={styles.headingBar} />
              <Text style={styles.heading}>
                Executive Summary
              </Text>
            </View>

            <Text style={styles.paragraph}>
              {summary ||
                "Write a concise executive summary highlighting your experience, leadership, and achievements."}
            </Text>
          </View>
                    {/* ================= EDUCATION ================= */}

          <View style={styles.section}>
            <View style={styles.headingRow}>
              <View style={styles.headingBar} />
              <Text style={styles.heading}>
                Education
              </Text>
            </View>

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
            <View style={styles.headingRow}>
              <View style={styles.headingBar} />
              <Text style={styles.heading}>
                Professional Experience
              </Text>
            </View>

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
            <View style={styles.headingRow}>
              <View style={styles.headingBar} />
              <Text style={styles.heading}>
                Core Skills
              </Text>
            </View>

            <View style={styles.skills}>
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
            <View style={styles.headingRow}>
              <View style={styles.headingBar} />
              <Text style={styles.heading}>
                Key Projects
              </Text>
            </View>

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
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Technologies:
                    </Text>{" "}
                    {project.technologies}
                  </Text>
                )}

                {(project.github ||
                  project.live) && (
                  <View style={styles.links}>
                    {project.github && (
                      <Link
                        src={project.github}
                        style={
                          styles.projectLink
                        }
                      >
                        GitHub
                      </Link>
                    )}

                    {project.live && (
                      <Link
                        src={project.live}
                        style={
                          styles.projectLink
                        }
                      >
                        Live Demo
                      </Link>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>

        </View>
      </Page>
    </Document>
  );
}