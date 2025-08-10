"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-t-transparent border-gray-600 rounded-full animate-spin" />
    </div>,
    document.body
  );
};

export default Loader;
