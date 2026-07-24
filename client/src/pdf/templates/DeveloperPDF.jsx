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
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  /* ================= SIDEBAR ================= */

  sidebar: {
    width: 180,
    backgroundColor: "#0F172A",
    padding: 24,
    color: "#FFFFFF",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 1.2,
    color: "#FFFFFF",
  },

  jobTitle: {
    marginTop: 8,
    fontSize: 10,
    color: "#22D3EE",
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  sidebarSection: {
    marginTop: 28,
  },

  sidebarHeading: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#22D3EE",
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 2,
  },

  contact: {
    fontSize: 9,
    color: "#CBD5E1",
    marginBottom: 8,
  },

  sidebarLink: {
    fontSize: 9,
    color: "#67E8F9",
    marginBottom: 8,
    textDecoration: "none",
  },

  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skill: {
    backgroundColor: "#164E63",
    color: "#67E8F9",
    fontSize: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 6,
  },

  /* ================= MAIN ================= */

  main: {
    flex: 1,
    padding: 32,
  },

  section: {
    marginBottom: 24,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },

  paragraph: {
    color: "#4B5563",
    lineHeight: 1.8,
  },

  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    padding: 14,
    marginBottom: 14,
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
    fontSize: 12,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 2,
    color: "#4B5563",
  },

  date: {
    fontSize: 9,
    color: "#6B7280",
    textAlign: "right",
  },

  bullet: {
    marginTop: 5,
    color: "#4B5563",
    lineHeight: 1.7,
  },

  projectCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#06B6D4",
    backgroundColor: "#F8FAFC",
    padding: 16,
    marginBottom: 18,
  },

  techBadge: {
    marginTop: 8,
    fontSize: 9,
    color: "#0E7490",
  },

  projectLinks: {
    flexDirection: "row",
    marginTop: 12,
  },

  projectLink: {
    fontSize: 9,
    color: "#FFFFFF",
    backgroundColor: "#0F172A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    textDecoration: "none",
  },

  liveLink: {
    fontSize: 9,
    color: "#FFFFFF",
    backgroundColor: "#0891B2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textDecoration: "none",
  },
});

export default function DeveloperPDF({ resume }) {
  const { personal, summary } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ================= SIDEBAR ================= */}

        <View style={styles.sidebar}>

          <Text style={styles.name}>
            {personal.fullName || "Your Name"}
          </Text>

          <Text style={styles.jobTitle}>
            {personal.jobTitle || "Developer"}
          </Text>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarHeading}>
              Contact
            </Text>

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
                style={styles.sidebarLink}
              >
                LinkedIn
              </Link>
            )}

            {personal.github && (
              <Link
                src={personal.github}
                style={styles.sidebarLink}
              >
                GitHub
              </Link>
            )}
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarHeading}>
              Skills
            </Text>

            <View style={styles.skillsWrap}>
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

        </View>

        {/* ================= MAIN ================= */}

        <View style={styles.main}>

          <View style={styles.section}>
            <Text style={styles.heading}>
              About Me
            </Text>

            <Text style={styles.paragraph}>
              {summary ||
                "Write a short summary highlighting your technical skills, projects, and career goals."}
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
                style={styles.card}
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
                  style={styles.card}
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
                    {/* ================= PROJECTS ================= */}

          <View style={styles.section}>
            <Text style={styles.heading}>
              Featured Projects
            </Text>

            {resume.projects.map((project, index) => (
              <View
                key={index}
                style={styles.projectCard}
              >
                <Text style={styles.title}>
                  {project.title || "Project Title"}
                </Text>

                {project.technologies && (
                  <Text style={styles.techBadge}>
                    {project.technologies}
                  </Text>
                )}

                {project.description && (
                  <Text
                    style={[
                      styles.paragraph,
                      { marginTop: 10 },
                    ]}
                  >
                    {project.description}
                  </Text>
                )}

                {(project.github ||
                  project.live) && (
                  <View
                    style={styles.projectLinks}
                  >
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
                          styles.liveLink
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