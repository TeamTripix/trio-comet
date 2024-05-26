import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";
import CancelIcon from "../../icons/cancelIcon";
import ReactPlayer from "react-player/lazy";

export default function MaxWidthDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {props.image
        .substring(props.image.lastIndexOf("/") + 1)
        .substring(
          props.image
            .substring(props.image.lastIndexOf("/") + 1)
            .lastIndexOf(".") + 1
        ) === "mp4" ? (
        <ReactPlayer url={props.image} playing={true} loop={true} />
      ) : (
        <Image
          src={props.image}
          fill
          alt="product image"
          onClick={handleClickOpen}
        />
      )}
{/* 
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <Box height="100rem">
          <Box
            height="5rem"
            width="100%"
            zIndex={9}
            position="absolute"
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <Box sx={{ cursor: "pointer" }} onClick={handleClose}>
              <CancelIcon />
            </Box>
          </Box>
          <Image src={props.image} alt="product image" fill />
        </Box>
      </Dialog> */}
    </React.Fragment>
  );
}
