import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Link from "next/link";
import { useSelector } from "react-redux";

const Index = (props: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");
  const theme: any = useSelector<any>((state) => state.themeToggle);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === props.data.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? props.data.length - 1 : prevIndex - 1
    );
  };
  const handleDotClick = (index: any) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const slidersVariants = {
    hover: {
      scale: 1.2,
    },
  };
  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -2,
      scale: 1.3,
      transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div style={{ position: "relative", maxWidth: "100%", width: "100%" }}>
      {props.loading ? (
        ""
      ) : (
        <Link
          href={props.data[currentIndex].link}
          style={{ display: "flex", maxWidth: "100%", width: "100%" }}>
          <AnimatePresence>
            <motion.img
              alt="banner image"
              key={currentIndex}
              src={props.data[currentIndex].imageURL}
              style={{
                maxWidth: "100%",
                width: "100%",
              }}
              variants={slideVariants}
              initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
            />
          </AnimatePresence>
        </Link>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: "#fff",
            padding: "10px 8px 8px 13px",
            margin: "0 20px auto 10px",
            position: "absolute",
            top: "0",
            bottom: "0",
            height: "100%",
            width: "25px",
            left: "0",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <motion.div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              padding: "0.8rem",
            }}
            onClick={handlePrevious}
            variants={slidersVariants}
            whileHover="hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 96 960 960"
              width="20">
              <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
            </svg>
          </motion.div>
        </div>
        <div
          style={{
            color: "#fff",
            padding: "10px 8px 8px 13px",
            margin: "0 20px auto 10px",
            position: "absolute",
            top: "0",
            bottom: "0",
            height: "100%",
            width: "25px",
            right: "0",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          onClick={handleNext}>
          <motion.div
            variants={slidersVariants}
            whileHover="hover"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              padding: "0.8rem",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 96 960 960"
              width="20">
              <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
            </svg>
          </motion.div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}>
        {props.loading
          ? ""
          : props.data.map((_: any, index: number) => (
              <motion.div
                key={index}
                className={` ${currentIndex === index ? "" : ""}`}
                style={{
                  backgroundColor: `${
                    currentIndex === index
                      ? theme === "light"
                        ? lightColor.theme.primary
                        : darkColor.theme.primary
                      : "#333"
                  }`,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: ".5rem",
                  cursor: "pointer",
                }}
                initial="initial"
                animate={currentIndex === index ? "animate" : ""}
                whileHover="hover"
                variants={dotsVariants}
                onClick={() => handleDotClick(index)}></motion.div>
            ))}
      </div>
    </div>
  );
};

export default Index;
