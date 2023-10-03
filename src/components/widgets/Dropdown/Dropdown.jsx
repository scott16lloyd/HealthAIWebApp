import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function Dropdown() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buttonStyles = {
    background: '#D9D9D9',
    fontWeight: 500,
    fontSize: '18px',
    color: 'black',
    textTransform: 'none',
    borderRadius: '0.4rem',
    '&:hover': {
      background: '#b3b3b3',
    },
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={buttonStyles}
      >
        View Office Details
        <ArrowForwardIosIcon sx={{ paddingLeft: '0.3rem' }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* EDIT: Loop over array instead */}
        <DialogContent>
          <DialogActions>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </DialogActions>
          <DialogContentText id="alert-dialog-description">
            Name: Dr. John Doe Telephone
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Age: 29
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Sex: male
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            GP ID: 1G145P33
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Address: 348 Thorne St. Zion, IL 60099
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            No: +353 878562210
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dropdown;
