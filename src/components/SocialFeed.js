import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Snackbar,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  ThumbUp,
  Comment,
  Share,
  Code,
  ThumbUpOutlined,
  Send,
  Tag,
  EmojiEmotions,
  Image,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

function SocialFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Shivaay',
      avatar: 'JD',
      content: 'Check out my solution to the Two Sum problem!',
      code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
      likes: 15,
      comments: 3,
      liked: false,
      tags: ['JavaScript', 'Algorithms', 'Arrays'],
      commentsList: [
        { id: 1, user: 'Alice', text: 'Great solution! Very efficient.' },
        { id: 2, user: 'Bob', text: 'I used a similar approach.' },
        { id: 3, user: 'Charlie', text: 'Thanks for sharing!' },
      ],
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          user: 'CurrentUser',
          avatar: 'CU',
          content: newPost,
          code: '',
          likes: 0,
          comments: 0,
          liked: false,
          tags: ['General'],
          commentsList: [],
        },
        ...posts,
      ]);
      setNewPost('');
      setSnackbar({
        open: true,
        message: 'Post shared successfully!',
        severity: 'success',
      });
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked,
        };
      }
      return post;
    }));
  };

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    setOpenCommentDialog(true);
  };

  const handleAddComment = () => {
    if (commentText.trim() && selectedPost) {
      const updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments + 1,
        commentsList: [
          ...selectedPost.commentsList,
          {
            id: selectedPost.commentsList.length + 1,
            user: 'CurrentUser',
            text: commentText,
          },
        ],
      };
      setPosts(posts.map(post => post.id === selectedPost.id ? updatedPost : post));
      setCommentText('');
      setOpenCommentDialog(false);
      setSnackbar({
        open: true,
        message: 'Comment added successfully!',
        severity: 'success',
      });
    }
  };

  const handleShare = (post) => {
    setSnackbar({
      open: true,
      message: 'Post shared to your network!',
      severity: 'info',
    });
  };

  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3,
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>CU</Avatar>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Share your code or thoughts..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: 'background.paper',
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary">
                <Code />
              </IconButton>
              <IconButton color="primary">
                <Image />
              </IconButton>
              <IconButton color="primary">
                <Tag />
              </IconButton>
              <IconButton color="primary">
                <EmojiEmotions />
              </IconButton>
            </Box>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handlePost}
                endIcon={<Send />}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Post
              </Button>
            </motion.div>
          </Box>
        </Paper>
      </motion.div>

      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            variants={postVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            exit={{ opacity: 0, y: -20 }}
          >
            <Card 
              sx={{ 
                mb: 3,
                borderRadius: '16px',
                background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {post.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {post.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Just now
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
                {post.tags && (
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {post.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.main',
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
                {post.code && (
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: 'background.paper',
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      borderRadius: '12px',
                      mb: 2,
                    }}
                  >
                    {post.code}
                  </Paper>
                )}
                <Divider sx={{ my: 2 }} />
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <IconButton onClick={() => handleLike(post.id)}>
                        {post.liked ? <ThumbUp color="primary" /> : <ThumbUpOutlined />}
                      </IconButton>
                    </motion.div>
                    <Typography>{post.likes}</Typography>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <IconButton onClick={() => handleCommentClick(post)}>
                        <Comment />
                      </IconButton>
                    </motion.div>
                    <Typography>{post.comments}</Typography>
                  </Box>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <IconButton onClick={() => handleShare(post)}>
                      <Share />
                    </IconButton>
                  </motion.div>
                </CardActions>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Dialog
        open={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <List>
            {selectedPost?.commentsList.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemAvatar>
                  <Avatar>{comment.user.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user}
                  secondary={comment.text}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCommentDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddComment}
            sx={{
              borderRadius: '20px',
              px: 3,
              textTransform: 'none',
            }}
          >
            Comment
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: '12px',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SocialFeed; 