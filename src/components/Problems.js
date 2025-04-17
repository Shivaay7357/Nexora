import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Code as CodeIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function Problems() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [problems] = useState([
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Arrays',
      timeEstimate: '15 min',
      description: 'Given an array of integers, find two numbers that add up to a specific target.',
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'Medium',
      category: 'Linked Lists',
      timeEstimate: '20 min',
      description: 'Reverse a singly linked list in place.',
    },
    {
      id: 3,
      title: 'Binary Tree Traversal',
      difficulty: 'Medium',
      category: 'Trees',
      timeEstimate: '25 min',
      description: 'Implement different traversal methods for a binary tree.',
    },
    {
      id: 4,
      title: 'Merge Sort',
      difficulty: 'Hard',
      category: 'Sorting',
      timeEstimate: '30 min',
      description: 'Implement the merge sort algorithm.',
    },
  ]);

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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#00FF99';
      case 'medium':
        return '#1A8FFF';
      case 'hard':
        return '#9C1FFF';
      default:
        return '#C0C0C0';
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #2E2E2E 100%)',
      color: '#FFFFFF',
      py: 8,
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
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 800,
            }}
          >
            Coding Problems
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#C0C0C0',
              mb: 6,
              maxWidth: '800px',
            }}
          >
            Practice your coding skills with our curated collection of problems. From easy to hard, we've got challenges for everyone.
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {problems.map((problem) => (
              <Grid item xs={12} sm={6} md={4} key={problem.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
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
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CodeIcon sx={{ color: '#00FF99', mr: 1 }} />
                        <Typography variant="h5" component="h2" sx={{ color: '#FFFFFF' }}>
                          {problem.title}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={problem.difficulty}
                          size="small"
                          sx={{
                            backgroundColor: `${getDifficultyColor(problem.difficulty)}20`,
                            color: getDifficultyColor(problem.difficulty),
                            border: `1px solid ${getDifficultyColor(problem.difficulty)}`,
                            mr: 1,
                          }}
                        />
                        <Chip
                          label={problem.category}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(156, 31, 255, 0.1)',
                            color: '#9C1FFF',
                            border: '1px solid rgba(156, 31, 255, 0.3)',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TimerIcon sx={{ color: '#1A8FFF', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body2" sx={{ color: '#C0C0C0' }}>
                          {problem.timeEstimate}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: '#C0C0C0' }}>
                        {problem.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                      <Button
                        component={RouterLink}
                        to={`/problems/${problem.id}`}
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(45deg, #00FF99 0%, #1A8FFF 100%)',
                          color: '#121212',
                          fontWeight: 600,
                          borderRadius: '12px',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #00CC7A 0%, #0066CC 100%)',
                          },
                        }}
                      >
                        Solve Problem
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Problems; 