import { Box, Typography } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";
import { lightColor, darkColor } from "../../src/utils/CustomTheme/color";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useMobile } from "@/utils/responsive";

interface IndexProps {
  data: any;
  isHomePage?: boolean;
  indexes?: number;
  categoryArrayLength?: number;
}

const Index = (props: IndexProps) => {
  const { name, _id, image, slug } = props.data;
  const { isHomePage, categoryArrayLength, indexes } = props;
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile();
  return (
    <Link href={`/category/${slug}`}>
      <Box>
        <Box borderRadius="10rem">
          <img
            alt="category"
            src={image}
            style={{ maxHeight: "100%", maxWidth: "100%", borderRadius:"0.4rem" }}
          />
        </Box>
      </Box>
    </Link>
  );
};

export default Index;
