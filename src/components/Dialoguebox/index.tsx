import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ConfirmationDialog = ({ open, onClose, options }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select an Option</DialogTitle>
      <DialogContent>
        {options.length > 0 ? (
          <ul>
            {options.map((option) => (
              <li key={option.value}>
                {option.value}. {option.label}
              </li>
            ))}
          </ul>
        ) : (
          <p>No options available</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
