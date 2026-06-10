"use client";

import { useEffect } from "react";

export default function ContactRedirect() {
  useEffect(() => {
    window.location.replace("/about#contact");
  }, []);

  return null;
}
