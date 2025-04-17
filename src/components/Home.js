import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Code as CodeIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  RocketLaunch as RocketIcon,
  Lightbulb as LightbulbIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #2E2E2E 100%)',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 153, 0.1) 0%, transparent 50%)',
        animation: 'pulse 8s ease-in-out infinite',
      }
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 12, position: 'relative' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: isMobile ? '2.5rem' : '4rem',
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Code, Connect, Create
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#C0C0C0',
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Join a community of passionate coders. Solve problems, share solutions, and grow together.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/problems"
                    sx={{
                      background: 'linear-gradient(45deg, #00FF99 0%, #1A8FFF 100%)',
                      color: '#121212',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      padding: '12px 32px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0, 255, 153, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00CC7A 0%, #0066CC 100%)',
                        boxShadow: '0 6px 20px rgba(0, 255, 153, 0.5)',
                      },
                    }}
                  >
                    Start Coding
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/social"
                    sx={{
                      border: '2px solid #00FF99',
                      color: '#00FF99',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      padding: '12px 32px',
                      borderRadius: '12px',
                      background: 'transparent',
                      '&:hover': {
                        borderColor: '#9C1FFF',
                        color: '#9C1FFF',
                        background: 'rgba(156, 31, 255, 0.1)',
                        boxShadow: '0 0 20px rgba(156, 31, 255, 0.3)',
                      },
                    }}
                  >
                    Join Community
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: '400px',
                  background: 'linear-gradient(135deg, rgba(46, 46, 46, 0.8) 0%, rgba(18, 18, 18, 0.8) 100%)',
                  borderRadius: '24px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 255, 153, 0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(0, 255, 153, 0.1), transparent)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient 3s ease infinite',
                  }
                }}
              >
                {/* Logo SVG */}
                <Box
                  component="svg"
                  viewBox="0 0 512 512"
                  sx={{
                    width: '80%',
                    height: '80%',
                    maxWidth: '300px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <circle cx="128" cy="128" r="32" fill="#00FFA3">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="384" cy="128" r="32" fill="#00FFA3">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <path 
                    d="M128 192L128 384L192 384L192 256L320 384L384 384L384 192L320 192L320 320L192 192L128 192Z" 
                    fill="url(#neon-gradient)"
                  >
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
                  </path>
                  <defs>
                    <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#00FFA3' }}/>
                      <stop offset="100%" style={{ stopColor: '#00D4FF' }}/>
                    </linearGradient>
                  </defs>
                </Box>
                {/* Tagline */}
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(0, 255, 153, 0.8)',
                    textAlign: 'center',
                    mt: 2,
                    position: 'relative',
                    zIndex: 1,
                    letterSpacing: '2px',
                    fontWeight: 'light',
                  }}
                >
                  Ignite Connections
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 8,
              background: 'linear-gradient(45deg, #00FF99, #9C1FFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <CodeIcon sx={{ fontSize: 40, color: '#00FF99' }} />,
                title: 'Practice Problems',
                description: 'Access a vast collection of coding problems to sharpen your skills.'
              },
              {
                icon: <PeopleIcon sx={{ fontSize: 40, color: '#1A8FFF' }} />,
                title: 'Community Support',
                description: 'Connect with fellow coders and learn from their experiences.'
              },
              {
                icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#9C1FFF' }} />,
                title: 'Track Progress',
                description: 'Monitor your growth and achievements as you solve problems.'
              },
              {
                icon: <RocketIcon sx={{ fontSize: 40, color: '#00FF99' }} />,
                title: 'Fast Learning',
                description: 'Accelerate your learning with our structured approach.'
              },
              {
                icon: <LightbulbIcon sx={{ fontSize: 40, color: '#1A8FFF' }} />,
                title: 'Smart Solutions',
                description: 'Learn from the best solutions shared by the community.'
              },
              {
                icon: <SchoolIcon sx={{ fontSize: 40, color: '#9C1FFF' }} />,
                title: 'Continuous Growth',
                description: 'Keep improving with new challenges and learning resources.'
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(46, 46, 46, 0.8) 0%, rgba(18, 18, 18, 0.8) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 255, 153, 0.1)',
                      borderRadius: '16px',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 30px rgba(0, 255, 153, 0.2)',
                      }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" sx={{ mb: 2, color: '#FFFFFF' }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: '#C0C0C0' }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, rgba(0, 255, 153, 0.1) 0%, rgba(26, 143, 255, 0.1) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 4,
                background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ready to Start Your Journey?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                mb: 6,
                color: '#C0C0C0',
              }}
            >
              Join thousands of developers who are already improving their skills
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/problems"
                  sx={{
                    background: 'linear-gradient(45deg, #00FF99 0%, #1A8FFF 100%)',
                    color: '#121212',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    padding: '12px 32px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 255, 153, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00CC7A 0%, #0066CC 100%)',
                      boxShadow: '0 6px 20px rgba(0, 255, 153, 0.5)',
                    },
                  }}
                >
                  Get Started Now
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 