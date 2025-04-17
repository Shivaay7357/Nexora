import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
  Chip,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  CircularProgress,
  LinearProgress,
  Tooltip,
  Badge,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  PlayArrow,
  Code,
  Description,
  Lightbulb,
  Share,
  ContentCopy,
  CheckCircle,
  Error,
  Timer,
  Speed,
  TrendingUp,
  Help,
  Keyboard,
  Settings,
  ThumbUp,
  ThumbDown,
  Comment,
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';

function ProblemSolving() {
  const [activeTab, setActiveTab] = useState(0);
  const [code, setCode] = useState('// Write your solution here\nfunction solve() {\n  // Your code goes here\n}');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [solutions, setSolutions] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "JD",
      },
      language: "JavaScript",
      code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
      likes: 24,
      dislikes: 2,
      comments: 5,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "JS",
      },
      language: "Python",
      code: "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n    return []",
      likes: 18,
      dislikes: 1,
      comments: 3,
      timestamp: "5 hours ago",
    },
  ]);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState({
    'all': [
      {
        id: 1,
        user: {
          name: "John Doe",
          avatar: "JD",
        },
        message: "Anyone stuck on the edge cases?",
        timestamp: "2 minutes ago",
      },
      {
        id: 2,
        user: {
          name: "Jane Smith",
          avatar: "JS",
        },
        message: "Try using a hash map for O(n) solution",
        timestamp: "1 minute ago",
      },
    ],
    'john-doe': [
      {
        id: 1,
        user: {
          name: "John Doe",
          avatar: "JD",
        },
        message: "Hey, need help with the problem?",
        timestamp: "5 minutes ago",
      },
    ],
  });
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const problem = {
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    hints: [
      "Try using a hash map to store the complement of each number",
      "Consider the time complexity of your solution",
      "Think about edge cases like empty arrays or no solution"
    ]
  };

  const users = [
    { id: 'all', name: "All Users", avatar: "AU", online: true },
    { id: 'john-doe', name: "John Doe", avatar: "JD", online: true },
    { id: 'jane-smith', name: "Jane Smith", avatar: "JS", online: false },
    { id: 'alex-wong', name: "Alex Wong", avatar: "AW", online: true },
  ];

  // Simulate progress tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
      setProgress(prev => Math.min(prev + 0.1, 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput("Running test cases...\nTest case 1: Passed\nTest case 2: Passed\nAll test cases passed!");
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitDialog(false);
    
    // Create new solution object
    const newSolution = {
      id: solutions.length + 1,
      user: {
        name: "Current User", // Replace with actual user name
        avatar: "CU",
      },
      language: "JavaScript", // Replace with actual language
      code: code,
      likes: 0,
      dislikes: 0,
      comments: 0,
      timestamp: "Just now",
    };

    // Add new solution to the list
    setSolutions(prevSolutions => [newSolution, ...prevSolutions]);
    
    // Show success message
    setShowSuccessSnackbar(true);
  };

  const handleLike = (solutionId) => {
    setSolutions(prevSolutions =>
      prevSolutions.map(solution =>
        solution.id === solutionId
          ? { ...solution, likes: solution.likes + 1 }
          : solution
      )
    );
  };

  const handleDislike = (solutionId) => {
    setSolutions(prevSolutions =>
      prevSolutions.map(solution =>
        solution.id === solutionId
          ? { ...solution, dislikes: solution.dislikes + 1 }
          : solution
      )
    );
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#4caf50';
      case 'medium':
        return '#ff9800';
      case 'hard':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, selectedUser]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages[selectedUser?.id || 'all'].length + 1,
        user: {
          name: "Current User",
          avatar: "CU",
        },
        message: newMessage,
        timestamp: "Just now",
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedUser?.id || 'all']: [...(prev[selectedUser?.id || 'all'] || []), message],
      }));
      setNewMessage("");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3,
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Problem Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timer fontSize="small" />
              <Typography variant="body2">
                {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </Typography>
            </Box>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'background.paper',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #2196f3, #00bcd4)',
              }
            }} 
          />
        </Paper>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {/* Problem Description Section */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {problem.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={problem.difficulty}
                      sx={{
                        bgcolor: getDifficultyColor(problem.difficulty),
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                    <Chip
                      label={problem.category}
                      sx={{ bgcolor: 'primary.light', color: 'white' }}
                    />
                  </Stack>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Tooltip title="Time Complexity">
                    <Chip
                      icon={<Speed />}
                      label="O(n)"
                      sx={{ bgcolor: 'background.paper' }}
                    />
                  </Tooltip>
                  <Tooltip title="Space Complexity">
                    <Chip
                      icon={<TrendingUp />}
                      label="O(n)"
                      sx={{ bgcolor: 'background.paper' }}
                    />
                  </Tooltip>
                </Box>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  {problem.description}
                </Typography>

                <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  sx={{ mb: 3 }}
                >
                  <Tab icon={<Description />} label="Description" />
                  <Tab icon={<Lightbulb />} label="Solution" />
                  <Tab icon={<Help />} label="Hints" />
                </Tabs>

                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Examples
                    </Typography>
                    {problem.examples.map((example, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 2,
                          mb: 2,
                          bgcolor: 'background.paper',
                          borderRadius: '12px',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        <Typography variant="subtitle2" color="text.secondary">
                          Example {index + 1}:
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Input: {example.input}
                        </Typography>
                        <Typography variant="body2">
                          Output: {example.output}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Explanation: {example.explanation}
                        </Typography>
                      </Paper>
                    ))}

                    <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>
                      Constraints
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {problem.constraints.map((constraint, index) => (
                        <Chip
                          key={index}
                          label={constraint}
                          size="small"
                          sx={{ bgcolor: 'background.paper' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box>
                    <Typography variant="body1">
                      Here's a hint to help you solve the problem:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
                      Try using a hash map to store the complement of each number as you iterate through the array.
                    </Typography>
                  </Box>
                )}

                {activeTab === 2 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Hints
                    </Typography>
                    {problem.hints.map((hint, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 2,
                          mb: 2,
                          bgcolor: 'background.paper',
                          borderRadius: '12px',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        <Typography variant="body1">
                          Hint {index + 1}: {hint}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                )}
              </Paper>
            </motion.div>
          </Grid>

          {/* Code Editor Section */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper 
                sx={{ 
                  p: 3,
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Code Editor
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Keyboard Shortcuts">
                      <IconButton size="small">
                        <Keyboard />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editor Settings">
                      <IconButton size="small">
                        <Settings />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Box sx={{ height: '400px', mb: 2 }}>
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      startIcon={isRunning ? <CircularProgress size={20} /> : <PlayArrow />}
                      onClick={handleRun}
                      disabled={isRunning}
                      sx={{
                        borderRadius: '12px',
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #2196f3, #00bcd4)',
                      }}
                    >
                      Run Code
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleSubmit}
                      sx={{
                        borderRadius: '12px',
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                      }}
                    >
                      Submit
                    </Button>
                  </motion.div>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Output
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    minHeight: '100px',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {output || 'Run your code to see the output here'}
                </Paper>
              </Paper>
            </motion.div>
          </Grid>

          {/* Solutions Section */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Paper 
                sx={{ 
                  p: 3,
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Solutions
                </Typography>
                <List>
                  {solutions.map((solution) => (
                    <motion.div
                      key={solution.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem
                        sx={{
                          mb: 2,
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: 'primary.main',
                              boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)',
                            }}
                          >
                            {solution.user.avatar}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {solution.user.name}
                              </Typography>
                              <Chip
                                label={solution.language}
                                size="small"
                                sx={{
                                  bgcolor: 'background.paper',
                                  color: 'text.primary',
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {solution.timestamp}
                              </Typography>
                              <Paper
                                sx={{
                                  p: 2,
                                  bgcolor: 'background.paper',
                                  borderRadius: '8px',
                                  mb: 1,
                                }}
                              >
                                <Editor
                                  height="200px"
                                  defaultLanguage={solution.language.toLowerCase()}
                                  value={solution.code}
                                  options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    fontSize: 14,
                                  }}
                                />
                              </Paper>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Like">
                              <IconButton
                                size="small"
                                onClick={() => handleLike(solution.id)}
                                sx={{ color: 'primary.main' }}
                              >
                                <ThumbUp fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {solution.likes}
                            </Typography>
                            <Tooltip title="Dislike">
                              <IconButton
                                size="small"
                                onClick={() => handleDislike(solution.id)}
                                sx={{ color: 'error.main' }}
                              >
                                <ThumbDown fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {solution.dislikes}
                            </Typography>
                            <Tooltip title="Comments">
                              <IconButton size="small">
                                <Comment fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {solution.comments}
                            </Typography>
                          </Stack>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      {/* Submit Dialog */}
      <Dialog
        open={showSubmitDialog}
        onClose={() => setShowSubmitDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submit Solution</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to submit your solution? This will be visible to other users.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmSubmit}
            sx={{
              borderRadius: '12px',
              px: 3,
              textTransform: 'none',
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSuccessSnackbar(false)}
      >
        <Alert
          severity="success"
          sx={{
            width: '100%',
            borderRadius: '12px',
          }}
        >
          Solution submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowErrorSnackbar(false)}
      >
        <Alert
          severity="error"
          sx={{
            width: '100%',
            borderRadius: '12px',
          }}
        >
          Error submitting solution. Please try again.
        </Alert>
      </Snackbar>

      {/* Chat Button */}
      <IconButton
        onClick={() => setShowChat(!showChat)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <Badge badgeContent={chatMessages[selectedUser?.id || 'all']?.length || 0} color="error">
          <ChatIcon />
        </Badge>
      </IconButton>

      {/* Chat Panel */}
      <motion.div
        initial={false}
        animate={{
          x: showChat ? 0 : 400,
          opacity: showChat ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          position: 'fixed',
          right: 20,
          bottom: 80,
          width: 350,
          zIndex: 1000,
        }}
      >
        <Paper
          sx={{
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedUser ? selectedUser.name : "All Users"}
              </Typography>
              {selectedUser && (
                <Chip
                  label={selectedUser.online ? "Online" : "Offline"}
                  size="small"
                  color={selectedUser.online ? "success" : "default"}
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <Box>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ color: 'text.secondary' }}
              >
                <MoreVertIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setShowChat(false)}
                sx={{ color: 'text.secondary' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* User Selection Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              },
            }}
          >
            {users.map((user) => (
              <MenuItem
                key={user.id}
                onClick={() => handleUserSelect(user)}
                sx={{
                  '&:hover': {
                    background: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)',
                    }}
                  >
                    {user.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <Chip
                      label={user.online ? "Online" : "Offline"}
                      size="small"
                      color={user.online ? "success" : "default"}
                    />
                  }
                />
              </MenuItem>
            ))}
          </Menu>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '3px',
              },
            }}
          >
            {chatMessages[selectedUser?.id || 'all']?.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem
                  sx={{
                    mb: 2,
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)',
                      }}
                    >
                      {msg.user.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {msg.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {msg.timestamp}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {msg.message}
                      </Typography>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </Box>

          {/* Chat Input */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder={`Message ${selectedUser ? selectedUser.name : "everyone"}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.1)',
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default ProblemSolving; 