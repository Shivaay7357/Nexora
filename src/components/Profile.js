import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import {
  Code as CodeIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userStats = {
    problemsSolved: 42,
    solutionsShared: 15,
    followers: 128,
    following: 56,
  };

  const recentSolutions = [
    {
      id: 1,
      problem: 'Two Sum',
      language: 'JavaScript',
      date: '2024-03-15',
      likes: 12,
    },
    {
      id: 2,
      problem: 'Add Two Numbers',
      language: 'Python',
      date: '2024-03-14',
      likes: 8,
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #2E2E2E 100%)',
      color: '#FFFFFF',
      p: 3,
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={3}>
            {/* Profile Header */}
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3,
                background: 'linear-gradient(135deg, rgba(46, 46, 46, 0.8) 0%, rgba(18, 18, 18, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 255, 153, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 0 20px rgba(0, 255, 153, 0.1)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      mr: 3,
                      background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                      boxShadow: '0 0 20px rgba(0, 255, 153, 0.3)',
                    }}
                    alt="User Name"
                  >
                    UN
                  </Avatar>
                  <Box>
                    <Typography 
                      variant="h4" 
                      gutterBottom
                      sx={{
                        background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                      }}
                    >
                      User Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#C0C0C0' }}>
                      Software Developer | Problem Solver
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography 
                      variant="h6"
                      sx={{
                        background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                      }}
                    >
                      {userStats.problemsSolved}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#C0C0C0' }}>
                      Problems Solved
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography 
                      variant="h6"
                      sx={{
                        background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                      }}
                    >
                      {userStats.solutionsShared}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#C0C0C0' }}>
                      Solutions Shared
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography 
                      variant="h6"
                      sx={{
                        background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                      }}
                    >
                      {userStats.followers}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#C0C0C0' }}>
                      Followers
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography 
                      variant="h6"
                      sx={{
                        background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                      }}
                    >
                      {userStats.following}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#C0C0C0' }}>
                      Following
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Profile Content */}
            <Grid item xs={12}>
              <Paper sx={{
                background: 'linear-gradient(135deg, rgba(46, 46, 46, 0.8) 0%, rgba(18, 18, 18, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 255, 153, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 0 20px rgba(0, 255, 153, 0.1)',
              }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      color: '#C0C0C0',
                      '&.Mui-selected': {
                        color: '#00FF99',
                      },
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#00FF99',
                    },
                  }}
                >
                  <Tab label="Solutions" />
                  <Tab label="Activity" />
                  <Tab label="Achievements" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <List>
                    {recentSolutions.map((solution) => (
                      <ListItem 
                        key={solution.id} 
                        divider
                        sx={{
                          background: 'rgba(0, 255, 153, 0.05)',
                          borderRadius: '8px',
                          mb: 1,
                          '&:hover': {
                            background: 'rgba(0, 255, 153, 0.1)',
                            transform: 'translateX(5px)',
                            transition: 'all 0.3s ease',
                          },
                        }}
                      >
                        <ListItemIcon>
                          <CodeIcon sx={{ color: '#00FF99' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#FFFFFF' }}>
                              {solution.problem}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip
                                label={solution.language}
                                size="small"
                                sx={{
                                  background: 'linear-gradient(45deg, #9C1FFF, #1A8FFF)',
                                  color: '#FFFFFF',
                                  border: 'none',
                                }}
                              />
                              <Typography variant="body2" sx={{ color: '#C0C0C0' }}>
                                {solution.date}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#C0C0C0' }}>
                                {solution.likes} likes
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Typography sx={{ color: '#C0C0C0' }}>
                    Recent activity will be shown here
                  </Typography>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography sx={{ color: '#C0C0C0' }}>
                    Achievements will be shown here
                  </Typography>
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Profile; 