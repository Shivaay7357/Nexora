import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import CodeEditor from './CodeEditor';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`problem-tabpanel-${index}`}
      aria-labelledby={`problem-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock problem data - in a real app, this would come from an API
  const problem = {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Problem Description */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" sx={{ mr: 2 }}>
                  {problem.title}
                </Typography>
                <Chip
                  label={problem.difficulty}
                  color={
                    problem.difficulty === 'Easy'
                      ? 'success'
                      : problem.difficulty === 'Medium'
                      ? 'warning'
                      : 'error'
                  }
                />
              </Box>
              <Chip label={problem.category} sx={{ mb: 3 }} />

              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Description" />
                <Tab label="Solution" />
                <Tab label="Discussion" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" paragraph>
                  {problem.description}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Examples:
                </Typography>
                {problem.examples.map((example, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      Example {index + 1}:
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, bgcolor: 'background.default' }}
                    >
                      <Typography variant="body2">
                        <strong>Input:</strong> {example.input}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Output:</strong> {example.output}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Explanation:</strong> {example.explanation}
                      </Typography>
                    </Paper>
                  </Box>
                ))}

                <Typography variant="h6" gutterBottom>
                  Constraints:
                </Typography>
                <ul>
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>
                      <Typography variant="body2">{constraint}</Typography>
                    </li>
                  ))}
                </ul>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography>Solution tab content</Typography>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography>Discussion tab content</Typography>
              </TabPanel>
            </Box>
          </Paper>
        </Grid>

        {/* Code Editor */}
        <Grid item xs={12} md={6}>
          <CodeEditor />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProblemDetail; 