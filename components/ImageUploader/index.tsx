"use client";
import * as React from "react";
import { useEdgeStore } from "@components/EdgeStore";
import { Box, Button } from "@mui/material";
import { darkColor, lightColor } from "@/utils/CustomTheme/color";
import { SingleImageDropzone } from "@components/ImageUploading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Index(props: any) {
  const [file, setFile] = React.useState<File>();
  const [fileUploadingLoading, setFileUploadingLoading] = React.useState(0);
  const [isLoaderVisible, setIsLoaderVisible] = React.useState(false);
  const { edgestore } = useEdgeStore();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const {
    name,
    width,
    height,
    helperText,
    getResponse,
    buttonText,
    index,
    id,
    dimension,
  } = props;

  const handleImageUpload = (file: any) => {
    const img = new Image();
    if (dimension) {
      img.onload = () => {
        if (img.width === dimension.width && img.height === dimension.height) {
          setFile(file);
        } else {
          toast.error(
            `Please upload an image with dimensions ${dimension.width}x${dimension.height}`
          );
        }
      };
    } else {
      setFile(file);
    }

    if (file) {
      img.src = URL.createObjectURL(file);
    } else {
      toast.error(`Please upload an image`);
    }
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid gray",
          borderRadius: "0.8rem",
          height,
          width,
        }}>
        <SingleImageDropzone
          width={width}
          height={height}
          value={file}
          onChange={(file) => {
            handleImageUpload(file);
          }}
        />
      </Box>
      <Box margin="2rem 0" width={width} textAlign="center">
        <Button
          onClick={async () => {
            if (file) {
              setIsLoaderVisible(true);
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress: any) => {
                  setFileUploadingLoading(progress);
                },
              });
              getResponse({ res, index, id });
            }
          }}>
          {buttonText}
        </Button>
      </Box>
      {isLoaderVisible ? (
        <Box
          width={width}
          height="0.7rem"
          border={`1px solid ${
            theme === "light"
              ? lightColor.theme.primary
              : darkColor.theme.primary
          }`}
          borderRadius="2rem"
          overflow="hidden">
          <Box
            width={`${fileUploadingLoading}%`}
            height="0.7rem"
            bgcolor={
              theme === "light"
                ? lightColor.theme.primary
                : darkColor.theme.primary
            }
            border={`1px solid ${
              theme === "light"
                ? lightColor.theme.primary
                : darkColor.theme.primary
            }`}></Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
