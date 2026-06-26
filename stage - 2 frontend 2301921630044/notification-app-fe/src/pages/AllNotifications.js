// src/pages/AllNotifications.js
import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Card, CardContent, CircularProgress, 
  Alert, Select, MenuItem, FormControl, InputLabel, Pagination 
} from '@mui/material';
import { getNotifications } from '../utils/api';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // States for the query parameters requested in Stage 2
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('');
  
  // State for read notifications (persisted in local browser storage)
  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem('readNotifications');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch data whenever the page or filter changes
  useEffect(() => {
    fetchData();
  }, [page, typeFilter]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotifications(page, 10, typeFilter);
      // The API returns an array directly, or an object with a notifications array
      const notifsList = Array.isArray(data) ? data : (data.notifications || []);
      setNotifications(notifsList);
    } catch (err) {
      setError('Failed to load notifications. Did you add your Bearer token in api.js?');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setTypeFilter(event.target.value);
    setPage(1); // Reset to page 1 when changing filters
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Frontend implementation for Read/Unread state
  const handleNotificationClick = (id) => {
    if (!readIds.includes(id)) {
      const newReadIds = [...readIds, id];
      setReadIds(newReadIds);
      localStorage.setItem('readNotifications', JSON.stringify(newReadIds));
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          All Notifications
        </Typography>
        
        {/* Material UI Filter Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="type-filter-label">Filter by Type</InputLabel>
          <Select
            labelId="type-filter-label"
            value={typeFilter}
            label="Filter by Type"
            onChange={handleFilterChange}
          >
            <MenuItem value=""><em>All Types</em></MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loading and Error States */}
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Notifications List */}
      {!loading && !error && notifications.length === 0 && (
        <Typography>No notifications found.</Typography>
      )}
      
      {!loading && !error && notifications.map((notif) => {
        const isRead = readIds.includes(notif.ID);
        return (
          <Card 
            key={notif.ID} 
            onClick={() => handleNotificationClick(notif.ID)}
            sx={{ 
              mb: 2, 
              cursor: 'pointer',
              transition: '0.3s',
              // Visual distinction for read vs unread using MUI sx prop (No custom CSS!)
              bgcolor: isRead ? 'grey.100' : 'background.paper',
              borderLeft: isRead ? 'none' : '4px solid #1976d2',
              opacity: isRead ? 0.7 : 1,
              '&:hover': { boxShadow: 3 }
            }}
          >
            <CardContent>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                {notif.Type}
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontWeight: isRead ? 'normal' : 'bold' }}>
                {notif.Message}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {notif.Timestamp}
              </Typography>
            </CardContent>
          </Card>
        );
      })}

      {/* Pagination */}
      {!loading && !error && notifications.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {/* We default to 5 pages here assuming the API doesn't send total count */}
          <Pagination count={5} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </Box>
  );
}