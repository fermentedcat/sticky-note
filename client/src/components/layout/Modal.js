import React from 'react';

import { styled } from '@mui/material/styles';
import MuiModal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #ffbfd1',
  boxShadow: 24,
  p: 0,
  outline: 'none',
  borderRadius: '3px'
};


export default function Modal (props) {
  const { open, onClose, title, descriptions, children} = props;

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          {title && (
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {title}
            </Typography>
          )}
          {descriptions && descriptions.map((desc, index) => {
            return (
              <Typography key={index} id="modal-modal-description" sx={{ mt: 2 }}>
                {desc}
              </Typography>
            )}
          )}
        </Box>
        {children}
      </Box>
    </MuiModal>
  );
};
