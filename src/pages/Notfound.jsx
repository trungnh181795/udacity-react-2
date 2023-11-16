import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ color: '#FFFFFF', mb: 2 }}>
        404 Not found
      </Typography>
      <Typography variant="h6" component="p" fontWeight={400} sx={{ color: '#FFFFFF' }}>
        Nothing here to see
      </Typography>
      <Button variant='contained' component={Link} to='/'>
        Go back
      </Button>
    </Box>
  )
}

export default Notfound