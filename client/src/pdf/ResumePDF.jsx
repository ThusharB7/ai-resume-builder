import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#111827",
    lineHeight: 1.6,
  },

  header: {
  borderBottomWidth: 2,
  borderBottomColor: "#2563eb",
  paddingBottom: 16,
  marginBottom: 24,
},

  name: {
  fontSize: 30,
  fontWeight: "bold",
  letterSpacing: 1,
  marginBottom: 8,
},

  title: {
  fontSize: 13,
  color: "#4b5563",
  marginTop: 3,
},

  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  contactItem: {
  marginRight: 18,
  marginBottom: 5,
  fontSize: 10,
  color: "#374151",
},

  section: {
  marginTop: 4,
  marginBottom: 22,
},

  heading: {
  fontSize: 15,
  fontWeight: "bold",
  color: "#111827",
  textTransform: "uppercase",
  letterSpacing: 0.8,
  borderBottomWidth: 1,
  borderBottomColor: "#d1d5db",
  paddingBottom: 6,
  marginBottom: 10,
},

  paragraph: {
  fontSize: 11,
  color: "#374151",
  lineHeight: 1.8,
  textAlign: "justify",
},

  card: {
  marginBottom: 18,
  paddingBottom: 8,
},

  cardTitle: {
  fontSize: 13,
  fontWeight: "bold",
  color: "#111827",
},

  subTitle: {
  fontSize: 11,
  color: "#2563eb",
  marginTop: 2,
},

  date: {
  fontSize: 10,
  color: "#6b7280",
  marginTop: 2,
  marginBottom: 6,
},

  skillsWrapper: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 6,
},

  skill: {
  backgroundColor: "#DBEAFE",
  color: "#1E3A8A",
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginRight: 8,
  marginBottom: 8,
  borderRadius: 20,
  fontSize: 10,
},

  tech: {
    marginTop: 4,
    fontSize: 10,
  },

  links: {
    flexDirection: "row",
    marginTop: 5,
  },

  link: {
  color: "#1D4ED8",
  fontSize: 10,
  textDecoration: "underline",
  marginRight: 20,
},
});

export default function ResumePDF({ resume }) {
  const { personal, summary } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.name}>
            {personal.fullName || "Your Name"}
          </Text>
          <View style={{ height: 8 }} />

          <Text style={styles.title}>
            {personal.jobTitle || "Professional Title"}
          </Text>

          <View style={styles.contactRow}>
            {personal.email && (
              <Text style={styles.contactItem}>
                {personal.email}
              </Text>
            )}

            {personal.phone && (
              <Text style={styles.contactItem}>
                {personal.phone}
              </Text>
            )}

            {personal.location && (
              <Text style={styles.contactItem}>
                {personal.location}
              </Text>
            )}

            {personal.linkedin && (
              <Text style={styles.contactItem}>
                {personal.linkedin}
              </Text>
            )}

            {personal.github && (
              <Text style={styles.contactItem}>
                {personal.github}
              </Text>
            )}
          </View>
        </View>

        {/* Summary */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Professional Summary
          </Text>

          <Text style={styles.paragraph}>
            {summary ||
              "Write a professional summary to introduce yourself."}
          </Text>
        </View>

        {/* Education */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Education
          </Text>

          {resume.education.map((edu, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>
                {edu.degree}
              </Text>

              <Text style={styles.subTitle}>
                {edu.institution}
              </Text>

              <Text style={styles.date}>
                {edu.startDate} - {edu.endDate}
              </Text>

              <Text>{edu.grade}</Text>
            </View>
          ))}
        </View>
                {/* Experience */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Experience
          </Text>

          {resume.experience.map((exp, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>
                {exp.position}
              </Text>

              <Text style={styles.subTitle}>
                {exp.company}
              </Text>

              <Text style={styles.date}>
                {exp.startDate} - {exp.endDate}
              </Text>

              <Text style={styles.paragraph}>
                {exp.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Skills
          </Text>

          <View style={styles.skillsWrapper}>
            {resume.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {/* Projects */}

        <View style={styles.section}>
          <Text style={styles.heading}>
            Projects
          </Text>

          {resume.projects.map((project, index) => (
            <View
              key={index}
              style={styles.card}
              wrap={false}
            >
              <Text style={styles.cardTitle}>
                {project.title || "Project Title"}
              </Text>

              <Text style={styles.paragraph}>
                {project.description}
              </Text>

              {project.technologies && (
                <Text style={styles.tech}>
                  Tech: {project.technologies}
                </Text>
              )}

              <View style={styles.links}>
                {project.github && (
                  <Link
                    src={project.github}
                    style={styles.link}
                  >
                    GitHub
                  </Link>
                )}

                {project.live && (
                  <Link
                    src={project.live}
                    style={styles.link}
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