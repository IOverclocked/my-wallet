"use client";

import { type ReactNode, useEffect } from "react";
import { css } from "styled-system/css";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const overlayStyle = css({
  position: "fixed",
  inset: 0,
  bg: "oklch(0 0 0 / 0.55)",
  zIndex: 200,
  transition: "opacity 240ms ease",
});

const sheetStyle = css({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  bg: "surface",
  borderTopLeftRadius: "2xl",
  borderTopRightRadius: "2xl",
  border: "1px solid",
  borderColor: "border",
  borderBottomWidth: 0,
  zIndex: 201,
  maxH: "90dvh",
  overflowY: "auto",
  transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
});

const gripStyle = css({
  w: "36px",
  h: "4px",
  borderRadius: "full",
  bg: "surface3",
  mx: "auto",
  mt: "3",
  mb: "2",
});

const Sheet = ({ open, onClose, children }: SheetProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className={overlayStyle} aria-hidden="true" onClick={onClose} />
      <div role="dialog" aria-modal="true" className={sheetStyle}>
        <div className={gripStyle} />
        {children}
      </div>
    </>
  );
};

export default Sheet;
