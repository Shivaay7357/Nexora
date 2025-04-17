import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  EmojiEmotions as EmojiIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  Gif as GifIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  ContentCopy as ContentCopyIcon,
  SmartToy as SmartToyIcon,
  Psychology as PsychologyIcon,
  AutoFixHigh as AutoFixHighIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// AI Response templates based on mode
const aiResponses = {
  assistant: {
    greeting: "Hello! I'm your AI coding assistant. How can I help you today?",
    coding: "Let me help you with that code. Here's what I suggest:",
    error: "I see the issue. Let's debug this together:",
    question: "That's an interesting question. Here's what you need to know:",
    default: "I understand. Let me help you with that."
  },
  mentor: {
    greeting: "Welcome to your coding mentor! I'll guide you through your learning journey.",
    coding: "Let's break this down step by step. First, we need to:",
    error: "This is a great learning opportunity. Let's analyze the problem:",
    question: "Let me explain this concept in detail:",
    default: "Let's work through this together. Here's what you should consider:"
  },
  debugger: {
    greeting: "Debug mode activated. I'll help you find and fix issues in your code.",
    coding: "Let's analyze the code for potential issues:",
    error: "I've identified the problem. Here's how to fix it:",
    question: "Let's debug this systematically:",
    default: "Let me check for potential issues in your code."
  }
};

function Chat() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [aiMode, setAiMode] = useState('assistant');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        id: 1,
        user: 'AI Assistant',
        avatar: 'AI',
        text: aiResponses[aiMode].greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
        dislikes: 0,
        reactions: [],
        type: 'system',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    // Simple keyword-based response generation
    const lowerMessage = userMessage.toLowerCase();
    let responseType = 'default';

    if (lowerMessage.includes('code') || lowerMessage.includes('program')) {
      responseType = 'coding';
    } else if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
      responseType = 'error';
    } else if (lowerMessage.includes('?') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
      responseType = 'question';
    }

    const baseResponse = aiResponses[aiMode][responseType];
    
    // Add mode-specific details
    let detailedResponse = baseResponse;
    switch (aiMode) {
      case 'mentor':
        detailedResponse += "\n\nRemember, the key to learning is practice. Try implementing this solution yourself.";
        break;
      case 'debugger':
        detailedResponse += "\n\nI've run a quick analysis and found some potential issues. Let's address them one by one.";
        break;
      default:
        detailedResponse += "\n\nWould you like me to provide more specific guidance?";
    }

    return detailedResponse;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        avatar: 'ME',
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
        dislikes: 0,
        reactions: [],
        type: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setIsTyping(false);

      // Simulate AI response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const aiResponse = generateAIResponse(newMessage.text);
          const response = {
            id: Date.now() + 1,
            user: 'AI Assistant',
            avatar: 'AI',
            text: aiResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            likes: 0,
            dislikes: 0,
            reactions: [],
            type: 'ai',
          };
          setMessages(prev => [...prev, response]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleReaction = (messageId, type) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        if (type === 'like') {
          return { ...msg, likes: msg.likes + 1 };
        } else if (type === 'dislike') {
          return { ...msg, dislikes: msg.dislikes + 1 };
        }
      }
      return msg;
    }));
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClearChat = () => {
    setMessages([{
      id: 1,
      user: 'AI Assistant',
      avatar: 'AI',
      text: aiResponses[aiMode].greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      dislikes: 0,
      reactions: [],
      type: 'system',
    }]);
    handleMenuClose();
    setSnackbar({ open: true, message: 'Chat cleared successfully', severity: 'success' });
  };

  const handleExportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.user} [${msg.timestamp}]: ${msg.text}`
    ).join('\n');
    navigator.clipboard.writeText(chatText);
    handleMenuClose();
    setSnackbar({ open: true, message: 'Chat exported to clipboard', severity: 'success' });
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: 'Message copied to clipboard', severity: 'success' });
  };

  const handleAiModeChange = (mode) => {
    setAiMode(mode);
    handleMenuClose();
    setSnackbar({ open: true, message: `AI mode changed to ${mode}`, severity: 'success' });
    
    // Update the greeting message when mode changes
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[0].type === 'system') {
        newMessages[0] = {
          ...newMessages[0],
          text: aiResponses[mode].greeting,
        };
      }
      return newMessages;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #2E2E2E 100%)',
      color: '#FFFFFF',
      py: 4,
      position: 'relative',
      overflow: 'hidden',
      marginTop: '64px',
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  background: 'linear-gradient(45deg, #00FF99, #1A8FFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: isMobile ? '2.5rem' : '3.5rem',
                  fontWeight: 800,
                }}
              >
                AI Chat
              </Typography>
              <Chip
                icon={<SmartToyIcon />}
                label={aiMode.charAt(0).toUpperCase() + aiMode.slice(1)}
                sx={{
                  background: 'linear-gradient(45deg, #9C1FFF, #1A8FFF)',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  '& .MuiChip-icon': {
                    color: '#FFFFFF',
                  },
                }}
              />
            </Box>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                color: '#00FF99',
                '&:hover': {
                  color: '#1A8FFF',
                },
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </motion.div>

        <Paper
          sx={{
            height: 'calc(100vh - 200px)',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, rgba(46, 46, 46, 0.8) 0%, rgba(18, 18, 18, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 153, 0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0, 255, 153, 0.1)',
          }}
        >
          <List
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              p: 2,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(0, 255, 153, 0.3)',
                borderRadius: '4px',
                '&:hover': {
                  background: 'rgba(0, 255, 153, 0.5)',
                },
              },
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {messages.map((msg) => (
                <motion.div key={msg.id} variants={itemVariants}>
                  <ListItem
                    sx={{
                      mb: 2,
                      background: msg.type === 'system' ? 'rgba(0, 255, 153, 0.1)' :
                              msg.type === 'ai' ? 'rgba(156, 31, 255, 0.1)' :
                              'rgba(26, 143, 255, 0.1)',
                      borderRadius: '12px',
                      border: `1px solid ${msg.type === 'system' ? 'rgba(0, 255, 153, 0.2)' :
                              msg.type === 'ai' ? 'rgba(156, 31, 255, 0.2)' :
                              'rgba(26, 143, 255, 0.2)'}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 20px ${msg.type === 'system' ? 'rgba(0, 255, 153, 0.2)' :
                                    msg.type === 'ai' ? 'rgba(156, 31, 255, 0.2)' :
                                    'rgba(26, 143, 255, 0.2)'}`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        color={msg.type === 'ai' ? 'success' : 'primary'}
                      >
                        <Avatar
                          sx={{
                            bgcolor: msg.type === 'system' ? '#00FF99' :
                                    msg.type === 'ai' ? '#9C1FFF' : '#1A8FFF',
                            fontWeight: 'bold',
                            boxShadow: `0 0 10px ${msg.type === 'system' ? 'rgba(0, 255, 153, 0.5)' :
                                        msg.type === 'ai' ? 'rgba(156, 31, 255, 0.5)' :
                                        'rgba(26, 143, 255, 0.5)'}`,
                          }}
                        >
                          {msg.avatar}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ 
                            color: '#FFFFFF', 
                            fontWeight: 'bold',
                            background: msg.type === 'system' ? 'linear-gradient(45deg, #00FF99, #1A8FFF)' :
                                    msg.type === 'ai' ? 'linear-gradient(45deg, #9C1FFF, #1A8FFF)' :
                                    'linear-gradient(45deg, #1A8FFF, #00FF99)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}>
                            {msg.user}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#C0C0C0' }}>
                            {msg.timestamp}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body1" sx={{ color: '#C0C0C0', mb: 1 }}>
                            {msg.text}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Like">
                              <IconButton 
                                size="small" 
                                sx={{ color: '#00FF99' }}
                                onClick={() => handleReaction(msg.id, 'like')}
                              >
                                <ThumbUpIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="caption" sx={{ color: '#C0C0C0' }}>
                              {msg.likes}
                            </Typography>
                            <Tooltip title="Dislike">
                              <IconButton 
                                size="small" 
                                sx={{ color: '#9C1FFF' }}
                                onClick={() => handleReaction(msg.id, 'dislike')}
                              >
                                <ThumbDownIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="caption" sx={{ color: '#C0C0C0' }}>
                              {msg.dislikes}
                            </Typography>
                            <Tooltip title="Copy Message">
                              <IconButton 
                                size="small" 
                                sx={{ color: '#1A8FFF' }}
                                onClick={() => handleCopyMessage(msg.text)}
                              >
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: '#00FF99',
                        boxShadow: '0 0 10px rgba(0, 255, 153, 0.5)',
                      }}>
                        AI
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ 
                            color: '#FFFFFF', 
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #9C1FFF, #1A8FFF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}>
                            AI Assistant
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#C0C0C0' }}>
                            typing...
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          </List>

          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              p: 2,
              borderTop: '1px solid rgba(0, 255, 153, 0.1)',
              display: 'flex',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Attach File">
                <IconButton sx={{ color: '#00FF99' }}>
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Insert Image">
                <IconButton sx={{ color: '#00FF99' }}>
                  <ImageIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Insert Code">
                <IconButton sx={{ color: '#00FF99' }}>
                  <CodeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Insert GIF">
                <IconButton sx={{ color: '#00FF99' }}>
                  <GifIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 2000);
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#FFFFFF',
                  '& fieldset': {
                    borderColor: 'rgba(0, 255, 153, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 255, 153, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00FF99',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#C0C0C0',
                },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                color: '#00FF99',
                '&:hover': {
                  color: '#1A8FFF',
                },
              }}
            >
              <SendIcon />
            </IconButton>
            <IconButton
              sx={{
                color: '#9C1FFF',
                '&:hover': {
                  color: '#1A8FFF',
                },
              }}
            >
              <EmojiIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(46, 46, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 153, 0.1)',
            color: '#FFFFFF',
          },
        }}
      >
        <MenuItem onClick={() => handleAiModeChange('assistant')}>
          <SmartToyIcon sx={{ mr: 1, color: '#00FF99' }} /> Assistant Mode
        </MenuItem>
        <MenuItem onClick={() => handleAiModeChange('mentor')}>
          <PsychologyIcon sx={{ mr: 1, color: '#1A8FFF' }} /> Mentor Mode
        </MenuItem>
        <MenuItem onClick={() => handleAiModeChange('debugger')}>
          <AutoFixHighIcon sx={{ mr: 1, color: '#9C1FFF' }} /> Debugger Mode
        </MenuItem>
        <Divider sx={{ bgcolor: 'rgba(0, 255, 153, 0.1)' }} />
        <MenuItem onClick={handleClearChat}>Clear Chat</MenuItem>
        <MenuItem onClick={handleExportChat}>Export Chat</MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            bgcolor: 'rgba(46, 46, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 153, 0.1)',
            color: '#FFFFFF',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Chat; 