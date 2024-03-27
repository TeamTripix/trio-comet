import { Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const BreadCrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((item) => item);

  return (
    <div>
      <Link
        style={{
          color: "var(--light-price-text, #B4B4B9)",
          fontSize: "1.2rem",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "2.4rem",
          letterSpacing: "0.05rem",
        }}
        href="/"
      >
        Home
      </Link>
      {pathArray.map((name, index) => {
        const routeTo = `/${pathArray.slice(0, index + 1).join("/")}`;
        return (
          <Typography
            variant="caption"
            sx={{
              color: "var(--light-price-text, #B4B4B9)",
              fontSize: "1.2rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "2.4rem",
              letterSpacing: "0.05rem",
            }}
            key={routeTo}
          >
            &nbsp; / &nbsp;
            <Link
              style={{
                color: "var(--light-price-text, #B4B4B9)",
                fontSize: "1.2rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "2.4rem",
                letterSpacing: "0.05rem",
              }}
              href={routeTo}
            >
              {decodeURIComponent(name.split("_",).join(" "))}
            </Link>
          </Typography>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
