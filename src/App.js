import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Box,
} from "@mui/material";

import {
  GitHub,
  LinkedIn,
  Email,
  ArrowOutward as ArrowOutwardIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useInView } from "react-intersection-observer"; // Import for visibility animations
import "./App.css"; // Ensure the correct CSS file is imported

const navButtonStyle = {
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 300,
  letterSpacing: 0.5,
  marginLeft: 2,
  color: "#F2F3F5",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#007FFF",
    transition: "width 0.3s ease",
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: "#007FFF",
    transform: "translateY(-2px)",
    "&::after": {
      width: "100%",
    },
  },
};

const Navbar = () => (
  <AppBar
    position="sticky"
    elevation={0}
    sx={{
      backgroundColor: "#121212",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(2px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      },
    }}
  >
    <Toolbar>
      <Typography
        variant="h6"
        component={Link}
        smooth
        to="#home"
        sx={{
          flexGrow: 1,
          fontWeight: 300,
          letterSpacing: 1,
          fontSize: "1.2rem",
          cursor: "pointer",
          textDecoration: "none",
          color: "#F2F3F5",
          transition: "color 0.3s ease-in-out",
          "&:hover": {
            color: "#007FFF",
          },
        }}
      >
        olivia brown
      </Typography>
      <Button component={Link} smooth to="#home" sx={navButtonStyle}>
        home
      </Button>

      <Button component={Link} smooth to="#about" sx={navButtonStyle}>
        about
      </Button>

      <Button component={Link} smooth to="#experience" sx={navButtonStyle}>
        experience
      </Button>

      <Button component={Link} smooth to="#projects" sx={navButtonStyle}>
        projects
      </Button>

      <Button component={Link} smooth to="#contact" sx={navButtonStyle}>
        contact
      </Button>
    </Toolbar>
  </AppBar>
);

const Section = ({ children, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger each time the section comes into view
    threshold: 0.1, // Section is in view when 10% of it is visible
  });

  return (
    <div
      id={id}
      ref={ref}
      className={`page-enter ${inView ? "page-enter-active" : ""}`}
      style={{
        padding: "6em 20em", // Added more padding for bigger margins
        margin: "0 auto", // Center content
        maxWidth: "1200px", // Optional: limit the width of the content for readability
        backgroundColor: "#121212",
        color: "#ffffff",
      }}
    >
      {children}
    </div>
  );
};

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Typing speed configuration
  const baseSpeed = 80; // Base typing speed (ms)
  const variance = 40; // Random variance to add natural feel
  const wordPause = 200; // Pause after spaces
  const punctuationPause = 350; // Longer pause for punctuation

  useEffect(() => {
    let index = 0;
    const typeCharacter = () => {
      if (index < text.length) {
        const char = text[index];
        const nextChar = text[index + 1];
        setDisplayedText(text.slice(0, index + 1));
        index++;

        // Calculate delay based on character context
        let delay = baseSpeed + Math.random() * variance;

        // Add pauses for natural rhythm
        if (char === " ") {
          delay += wordPause; // Pause after words
        } else if ([",", ".", "!", "?", ":"].includes(char)) {
          delay += punctuationPause; // Longer pause for punctuation
        } else if (char === "'" && nextChar === "m") {
          delay += wordPause / 2; // Slight pause before "m" in "I'm"
        }

        setTimeout(typeCharacter, delay);
      } else {
        setIsTypingDone(true);
      }
    };

    typeCharacter();
  }, [text]);

  return (
    <span className={`typing-text ${isTypingDone ? "done" : "typing"}`}>
      {displayedText}
      <style jsx>{`
        .typing-text {
          display: inline-block;
        }

        .typing::after {
          content: "|";
          display: inline-block;
          margin-left: 2px;
          animation: blink 1.1s step-start infinite;
          opacity: 0.8;
        }

        .done::after {
          content: "";
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
};

// Contact Icons Component
const ContactIcons = ({ handleEmailClick }) => (
  <Box sx={{ display: "flex", gap: 2 }}>
    <IconButton
      href="https://github.com/oliviab598"
      target="_blank"
      style={{ color: "#ffffff" }}
    >
      <GitHub fontSize="large" />
    </IconButton>
    <IconButton
      href="https://linkedin.com/in/oliviab598"
      target="_blank"
      style={{ color: "#ffffff" }}
    >
      <LinkedIn fontSize="large" />
    </IconButton>
    <IconButton onClick={handleEmailClick} style={{ color: "#ffffff" }}>
      <Email fontSize="large" />
    </IconButton>
  </Box>
);

const Home = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard
      .writeText("olivia.b.598@gmail.com")
      .then(() => {
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error("Failed to copy email:", err);
      });
  };

  return (
    <Grid
      container
      id="home"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#121212",
        color: "#F2F3F5",
        padding: "0 3em",
      }}
    >
      <Grid item>
        <Box
          sx={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="h3" style={{ color: "#F2F3F5" }}>
            <TypingText text="hi, i'm olivia brown :)" />
          </Typography>
        </Box>
        <Typography
          variant="h5"
          style={{ color: "#A4A4A4" }}
          sx={{ marginTop: 2 }}
        >
          an aspiring software engineer
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
          component="a"
          href={process.env.PUBLIC_URL + "/Olivia_Brown_Resume.pdf"}
          download="Olivia_Brown_Resume.pdf"
        >
          download resume
        </Button>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ContactIcons handleEmailClick={handleEmailClick} />
        </Box>
      </Grid>
      <Snackbar
        open={openSnackbar}
        message="Email copied to clipboard!"
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      />
    </Grid>
  );
};

const About = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  return (
    <Section id="about">
      <div className="about-grid">
        {/* Left Column: Image or Illustration */}
        <div className="about-image">
          <img
            src={`${process.env.PUBLIC_URL}/profile.jpg`} // Replace with your profile picture
            alt="Olivia Brown"
            className="profile-picture"
          />
        </div>

        {/* Right Column: Bio */}
        <div
          className={`about-content ${hovered ? "hovered" : ""}`}
          onMouseEnter={handleMouseEnter}
        >
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Hi! I’m <span className="highlight-on-hover">Olivia Brown</span>, an
            aspiring{" "}
            <span className="highlight-on-hover">software engineer</span> with a
            passion for creating scalable, high-quality systems. I enjoy solving
            complex problems and designing solutions to meet user needs.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Currently, I’m pursuing a B.S. in Computer Science at{" "}
            <span className="highlight-on-hover">Oberlin College</span>, where
            I’m actively involved in projects ranging from{" "}
            <span className="highlight-on-hover">
              decentralized peer-to-peer networks
            </span>{" "}
            to{" "}
            <span className="highlight-on-hover">reinforcement learning</span>.
            My work includes using blockchain, cryptography, and advanced
            algorithms to build innovative machine learning solutions.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Beyond coding, I’m an avid{" "}
            <span className="highlight-on-hover">musician</span> who loves
            performing and producing music. Under the artist name "Olivia
            Brown," my tracks have reached over 3000 listeners on various
            platforms.
          </Typography>
        </div>
      </div>
    </Section>
  );
};

const Experience = () => (
  <Section id="experience">
    <Typography variant="h4" gutterBottom>
      Experience
    </Typography>
    <div className="experience-grid">
      {/* Bank of America Internship */}
      <div className="experience-row">
        <Typography variant="body2" className="experience-dates">
          June 2024 — August 2024
        </Typography>
        <div
          className="experience-content section-card"
          onClick={() =>
            window.open(
              "https://www.bankofamerica.com",
              "_blank",
              "noopener noreferrer"
            )
          }
          style={{ cursor: "pointer" }}
        >
          <div className="experience-header">
            <Typography variant="h6">
              <a
                href="https://www.bankofamerica.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                Software Engineer Intern · Bank of America
              </a>
            </Typography>
            <IconButton
              href="https://www.bankofamerica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="experience-link-icon"
            >
              <ArrowOutwardIcon fontSize="small" />
            </IconButton>
          </div>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            • Utilized Python and Quartz-based tools to expand automated job run
            functionalities for teams of 100+ employees, streamlining job
            processes across trading and risk management applications. <br />
            • Designed an API actively used by 1000+ employees to enhance Webex
            meeting recordings by leveraging Python, noisereduce, and pedalboard
            to develop customized end-to-end solutions with functionalities to
            clean audio, generate transcripts, and add closed captioning. <br />
            • Developed shell scripts for automated testing across 10 databases,
            improving reliability and efficiency for over 100 employees. <br />•
            Successfully established and maintained development stacks with
            Python for a 40-person backend team, ensuring daily checks and
            updates to optimize performance.
          </Typography>
          <div className="technologies">
            <span className="technology-tag">Python</span>
            <span className="technology-tag">Quartz</span>
            <span className="technology-tag">Sandra</span>
            <span className="technology-tag">noisereduce</span>
            <span className="technology-tag">pedalboard</span>
          </div>
        </div>
      </div>

      {/* Home Depot Internship */}
      <div className="experience-row">
        <Typography variant="body2" className="experience-dates">
          May 2023 — July 2023
        </Typography>
        <div
          className="experience-content section-card"
          onClick={() =>
            window.open(
              "https://www.homedepot.com",
              "_blank",
              "noopener noreferrer"
            )
          }
          style={{ cursor: "pointer" }}
        >
          <div className="experience-header">
            <Typography variant="h6">
              <a
                href="https://www.homedepot.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                Software Development Intern · Home Depot
              </a>
            </Typography>
            <IconButton
              href="https://www.homedepot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="experience-link-icon"
            >
              <ArrowOutwardIcon fontSize="small" />
            </IconButton>
          </div>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            • Developed an interactive dashboard for Home Depot’s Orange Method,
            facilitating efficient project management for 200+ users. <br />
            • Utilized React, Material-UI, HTML/CSS, and TypeScript to create a
            dynamic and responsive UI/UX, integrating real-time data
            synchronization for 50+ users. <br />
            • Enhanced managerial oversight by designing comprehensive data
            visualization and analytics tools within the dashboard, facilitating
            in-depth trend analysis and strategic decision-making. <br />•
            Implemented user authentication and role-based access controls
            within the dashboard, ensuring secure data handling and personalized
            user experiences while enhancing compliance with organizational data
            governance policies.
          </Typography>
          <div className="technologies">
            <span className="technology-tag">JavaScript</span>
            <span className="technology-tag">TypeScript</span>
            <span className="technology-tag">Node.js</span>
            <span className="technology-tag">React</span>
            <span className="technology-tag">HTML/CSS</span>
            <span className="technology-tag">Firebase</span>
            <span className="technology-tag">Material-UI</span>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const Projects = () => (
  <Section id="projects">
    <Typography variant="h4" gutterBottom>
      Projects
    </Typography>
    <div className="project-grid">
      {/* Project 1: Decentralized P2P Networking */}
      <div
        className="project-card"
        onClick={() =>
          window.open(
            "https://github.com/zimmermatt/ob-winterm24-p2p",
            "_blank",
            "noopener noreferrer"
          )
        }
        style={{ cursor: "pointer" }}
      >
        <div className="project-header">
          <Typography variant="h6">
            <a
              href="https://github.com/zimmermatt/ob-winterm24-p2p"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              p2p Decentralized Network
            </a>
          </Typography>
          <IconButton
            href="https://github.com/zimmermatt/ob-winterm24-p2p"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-icon"
          >
            <ArrowOutwardIcon fontSize="small" />
          </IconButton>
        </div>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          • Selected to participate in a team of four students, directed by
          industry expert Matt Zimmer (ex-Netflix Engineering Manager), to
          develop a decentralized peer-to-peer (P2P) networking system for
          artwork generation and commerce across multiple servers with working
          frontend and backend functionality. <br />
          • Utilized Python and Kademlia database to implement robust security
          measures across modules, leveraging cryptographic hashing and secure
          key management protocols to ensure data integrity, confidentiality,
          and resilience. <br />• Leveraged blockchain technology and
          decentralized storage solutions to enhance the security and
          transparency of transactions within the P2P networking system,
          ensuring trust among users and facilitating seamless artwork commerce.
        </Typography>
        <div className="technologies">
          <span className="technology-tag">Python</span>
          <span className="technology-tag">Kademlia</span>
        </div>
      </div>

      {/* Project 2: Reinforcement Learning Racetrack */}
      <div
        className="project-card"
        onClick={() =>
          window.open(
            "https://github.com/oliviab598/racetrack",
            "_blank",
            "noopener noreferrer"
          )
        }
        style={{ cursor: "pointer" }}
      >
        <div className="project-header">
          <Typography variant="h6">
            <a
              href="https://github.com/oliviab598/racetrack"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              Reinforcement Learning Racetrack
            </a>
          </Typography>
          <IconButton
            href="https://github.com/oliviab598/racetrack"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-icon"
          >
            <ArrowOutwardIcon fontSize="small" />
          </IconButton>
        </div>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          • Developed a custom OpenAI Gym environment for reinforcement
          learning, enabling an autonomous virtual car to navigate user-drawn
          racetracks using the PPO3 algorithm and a reward-based feedback
          system. <br />
          • Engineered a simulation visualization framework with real-time
          rendering of car dynamics, including position, orientation, and
          movement, achieving over 300 FPS with CUDA on an RTX 3060. <br />•
          Implemented a GUI for interactive track design and modeled car
          dynamics with position, orientation, and movement constraints.
        </Typography>
        <div className="technologies">
          <span className="technology-tag">Python</span>
          <span className="technology-tag">Tkinter</span>
          <span className="technology-tag">PPO3</span>
          <span className="technology-tag">CUDA</span>
        </div>
      </div>
    </div>
  </Section>
);

const Contact = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard
      .writeText("olivia.b.598@gmail.com")
      .then(() => {
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error("Failed to copy email:", err);
      });
  };

  return (
    <Section id="contact">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100%", // Ensure it takes full height of the section
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contact
        </Typography>
        <ContactIcons handleEmailClick={handleEmailClick} />
        <Snackbar
          open={openSnackbar}
          message="Email copied to clipboard!"
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
        />
      </Box>
    </Section>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Experience />
                <Projects />
                <Contact />
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
