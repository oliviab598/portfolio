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
import { useInView } from "react-intersection-observer";
import "./App.css";
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

const ContactIcons = ({ handleEmailClick }) => (
  <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
    <IconButton
      href="https://github.com/oliviab598"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#ffffff" }}
    >
      <GitHub fontSize="small" />
    </IconButton>
    <IconButton
      href="https://linkedin.com/in/oliviab598"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#ffffff" }}
    >
      <LinkedIn fontSize="small" />
    </IconButton>
    <IconButton onClick={handleEmailClick} style={{ color: "#ffffff" }}>
      <Email fontSize="small" />
    </IconButton>
  </Box>
);

const ContactPageIcons = ({ handleEmailClick }) => (
  <Box sx={{ display: "flex", gap: 1 }}>
    <IconButton
      href="https://github.com/oliviab598"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#ffffff" }}
    >
      <GitHub fontSize="large" />
    </IconButton>
    <IconButton
      href="https://linkedin.com/in/oliviab598"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#ffffff" }}
    >
      <LinkedIn fontSize="large" />
    </IconButton>
    <IconButton onClick={handleEmailClick} style={{ color: "#ffffff" }}>
      <Email fontSize="large" />
    </IconButton>
  </Box>
);

const Navbar = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("olivia.b.598@gmail.com");
    setShowSnackbar(true);
  };

  return (
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
            flexGrow: 0,
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

        <ContactIcons handleEmailClick={handleEmailClick} />

        <Box sx={{ flexGrow: 1 }} />

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

        <Snackbar
          open={showSnackbar}
          autoHideDuration={2000}
          onClose={() => setShowSnackbar(false)}
          message="Email copied to clipboard!"
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#299D8F",
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

const Section = ({ children, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div
      id={id}
      ref={ref}
      className={`page-enter ${inView ? "page-enter-active" : ""}`}
      style={{
        padding: "6em 20em",
        margin: "0 auto",
        maxWidth: "1200px",
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

  const baseSpeed = 80;
  const variance = 40;
  const wordPause = 200;
  const punctuationPause = 350;

  useEffect(() => {
    let index = 0;
    const typeCharacter = () => {
      if (index < text.length) {
        const char = text[index];
        const nextChar = text[index + 1];
        setDisplayedText(text.slice(0, index + 1));
        index++;

        let delay = baseSpeed + Math.random() * variance;

        if (char === " ") {
          delay += wordPause;
        } else if ([",", ".", "!", "?", ":"].includes(char)) {
          delay += punctuationPause;
        } else if (char === "'" && nextChar === "m") {
          delay += wordPause / 2;
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

const Home = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
          a (soon to be) software engineer
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
          component="a"
          href={process.env.PUBLIC_URL + "/Olivia_Brown_Resume.pdf"}
          download="Olivia_Brown_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          download resume
        </Button>
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
        <div className="about-image">
          <img
            src={`${process.env.PUBLIC_URL}/profile.jpg`}
            alt="Olivia Brown"
            className="profile-picture"
          />
        </div>

        <div
          className={`about-content ${hovered ? "hovered" : ""}`}
          onMouseEnter={handleMouseEnter}
        >
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <div className="about-text-content">
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              I’m Olivia Brown, a (soon to be) software engineer at Bank of
              America. I love writing clean, efficient code and building tools
              that make people’s lives easier. My projects can balance
              thoughtful design and solid engineering, and I love to collaborate
              with others to bring ideas to life. Whether I’m fine-tuning UI or
              refactoring backend logic, I’m always looking for ways to make
              systems more intuitive and exciting to use.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Currently, I’m pursuing a B.S. in Computer Science at Oberlin
              College, where I’m actively involved in projects ranging from{" "}
              <a
                href="https://en.wikipedia.org/wiki/Peer-to-peer"
                className="artist-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                decentralized peer to peer networks
              </a>{" "}
              to{" "}
              <a
                href="https://en.wikipedia.org/wiki/Reinforcement_learning"
                className="artist-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                reinforcement learning
              </a>
              . My work includes using blockchain, cryptography, and advanced
              algorithms to build innovative machine learning solutions.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Beyond coding, I’m an avid musician who loves playing guitar,
              singing, songwriting, and producing music. Under the artist name{" "}
              <a
                href="https://linktr.ee/oliviab598"
                className="artist-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Olivia Brown
              </a>
              , my tracks have reached over 10,000 listeners on various
              platforms.
            </Typography>
          </div>
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
      {/* <div className="experience-row">
        <Typography variant="body2" className="experience-dates">
          July 2025 - current
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
                Software Engineer · Bank of America
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
          <Typography variant="body2" sx={{ marginTop: 1 }}></Typography>
          <div className="technologies">
            <span className="technology-tag">Python</span>
            <span className="technology-tag">Quartz</span>
            <span className="technology-tag">Sandra</span>
          </div>
        </div>
      </div> */}
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
          alignItems: "center",
          gap: 3,
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          padding: "2rem 1rem",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Let's Connect!
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          I'm always happy to chat or collaborate on something new. Feel free to
          reach out :)
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            "& .MuiIconButton-root": {
              transition: "transform 0.2s, background-color 0.2s",
              padding: "15px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              "&:hover": {
                transform: "translateY(-5px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        >
          <ContactPageIcons handleEmailClick={handleEmailClick} />
        </Box>
        {/* 
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          Click the mail icon to copy my email address.
        </Typography> */}

        <Snackbar
          open={openSnackbar}
          message="Email copied to clipboard!"
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#299D8F",
              borderRadius: "8px",
            },
          }}
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
