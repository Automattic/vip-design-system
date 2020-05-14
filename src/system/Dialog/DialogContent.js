/** @jsx jsx */
import { jsx } from "theme-ui";

import React, { useEffect } from "react";

import { Card } from "..";

import { motion } from "framer-motion";

const DialogContent = ({
  position = "left",
  variant = "dropdown",
  onClose,
  ...props
}) => {
  const closeDialog = (e) => {
    if (e.key === 27 || e.key == "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", closeDialog, true);

    return () => {
      document.removeEventListener("keydown", closeDialog, true);
    };
  }, []);

  return (
    <>
      {variant == "modal" && (
        <div
          onClick={onClose}
          sx={{
            position: "fixed",
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "grey.50",
            opacity: 0.7,
          }}
        />
      )}
      <motion.div
        {...props}
        initial={{
          scale: 0.9,
          x: variant == "dropdown" ? 0 : "-50%",
          opacity: 0,
        }}
        animate={{
          scale: 1,
          x: variant == "dropdown" ? 0 : "-50%",
          opacity: 1,
        }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.15 }}
        sx={{
          padding: 3,
          marginTop: 2,
          transformOrigin:
            variant == "dropdown"
              ? position == "left"
                ? "top left"
                : "top right"
              : "center",
          borderRadius: 2,
          backgroundColor: "card",
          boxShadow: "low",
          position: "absolute",
          top: "100%",
          zIndex: 100,
          left: position == "left" ? 0 : "auto",
          right: position == "left" ? "auto" : 0,
          padding: 0,
          display: "inline-block",
          variant: `dialog.${variant}`,
        }}
      />
    </>
  );
};

const MotionCard = motion.custom(Card);

export { DialogContent };
