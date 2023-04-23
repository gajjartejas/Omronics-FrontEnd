import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

interface IAppAlertDialogProps {
  isVisible: boolean;
  title: string;
  body: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} children={props.children} />;
});

const AppAlertDialog = (props: IAppAlertDialogProps) => {
  //Const
  const { isVisible, title, body, cancelButtonText, confirmButtonText, onCancel, onConfirm } = props;

  //State
  const [open, setOpen] = React.useState(isVisible);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelButtonText}</Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppAlertDialog;
