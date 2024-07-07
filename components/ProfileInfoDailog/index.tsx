import {
  Box,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "../../icons/cancelIcon";
import { lightColor } from "@/utils/CustomTheme/color";
import EditIcon from "../../icons/editIcon";
import { useMobile } from "@/utils/responsive";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";

const Index = (props: any) => {
  const { infoType, data, setIsDataUpdate,isDataUpdate } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAPILoading, setIsAPILoading] = useState(false);
  const [info, setInfo] = useState(data);
  const isMobile = useMobile();
  const session: any = useSession();
  const handleSubmit = () => {
    setIsAPILoading(true);
    if (info) {
      axios({
        method: "POST",
        url: `/api/user-info`,
        headers: { Authorization: `Bearer ${session.data.user.token}` },
        data:
          infoType === "Email"
            ? { email: info }
            : infoType === "Name"
            ? { name: info }
            : "",
      })
        .then((res) => {
          if (res.data.success) {
            setIsAPILoading(false);
            toast.success(`Your ${infoType} updated successfully`);
            setIsDialogOpen(false);
            setIsDataUpdate(!isDataUpdate)
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("some error occured");
          setIsAPILoading(false);
        });
    } else {
      toast.error(`Please add ${infoType}`);
      setIsAPILoading(false);
    }
  };
  return (
    <>
      <ButtonBase onClick={() => setIsDialogOpen(true)}>
        <EditIcon />
      </ButtonBase>
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={isDialogOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change {infoType}
        </DialogTitle>
        <ButtonBase
          aria-label="close"
          onClick={() => setIsDialogOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CancelIcon color="#000" />
        </ButtonBase>
        <DialogContent>
          <Box
            width="50rem"
            display="flex"
            flexDirection="column"
            gap={"1.2rem"}
          >
            <TextField
              fullWidth
              label={infoType}
              size="small"
              type={infoType === "Number" ? "number" : "text"}
              onChange={(e: any) => setInfo(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogContent sx={{ justifyContent: "flex-end" }}>
          <ButtonBase
            onClick={handleSubmit}
            sx={{
              bgcolor: lightColor.text.chevron,
              padding: "1rem 2rem",
              borderRadius: "0.8rem",
              width: "15rem",
              height: "3.5rem",
            }}
          >
            <Typography
              color={"#fbfbfb"}
              textAlign="center"
              fontSize={isMobile ? "2rem" : "1.4rem"}
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
              letterSpacing="0.05rem"
            >
              {isAPILoading ? (
                <CircularProgress
                  size={15}
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                "Update"
              )}
            </Typography>
          </ButtonBase>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
