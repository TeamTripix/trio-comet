import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";
import './DoubleTapZoom.css'; // We'll define styles here

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const DoubleTapZoom = ({ src, alt }:any) => {
  const [scale, setScale] = React.useState(1);
  const [lastTap, setLastTap] = React.useState(0);
  const imageRef = React.useRef(null);

  const handleDoubleTap = (e:any) => {
    console.log("sjdks")
    const currentTime = new Date().getTime();
    const tapGap = currentTime - lastTap;

    if (tapGap < 100 && tapGap > 0) {
      if (scale === 1) {
        setScale(2);
      } else {
        setScale(1);
      }
    } else {
      setLastTap(currentTime);
    }
  };

  return (
    <div
      className="image-container"
      onDoubleClick={handleDoubleTap}
      style={{ transform: `scale(${scale})` }}
      ref={imageRef}
    >
      <img src={src} alt={alt} className="zoom-image" style={{ height: "100vh", width: "auto" }} />
    </div>
  );
};


export default function FullScreenDialog({ img }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <img
        onClick={handleClickOpen}
        style={{
          transition: "transform 0.3s ease",
          cursor: "pointer",
        }}
        src={img}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box>
            <IconButton
              sx={{
                position: "absolute",
                zIndex: "100",
                top: "0",
                right: "10px",
              }}
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
           <DoubleTapZoom src={img} alt="zoomed image"/>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
