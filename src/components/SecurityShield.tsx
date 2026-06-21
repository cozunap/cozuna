"use client";

import { useEffect } from 'react';

export default function SecurityShield() {
  useEffect(() => {
    // 1. Bloqueo de Clic Derecho
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Bloqueo de Teclado (Inspección y Código Fuente)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      // Ctrl + U / Cmd + U
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }

      // Ctrl + S / Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }

      // Ctrl + Shift + I / Cmd + Option + I
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
      }

      // Ctrl + Shift + J / Cmd + Option + J
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
      }
      
      // Ctrl + Shift + C / Cmd + Option + C (Inspector)
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
      }
    };

    // Agregar event listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    // Limpieza de event listeners
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Este componente no renderiza nada visible
}
