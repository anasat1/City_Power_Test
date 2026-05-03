// Inline SVG icons used across the site.
// Stroke-based, 24px viewBox, currentColor.
const Icon = ({ name, size = 20, stroke = 1.6 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow":
      return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-up-right":
      return <svg {...props}><path d="M7 17L17 7M8 7h9v9"/></svg>;
    case "search":
      return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>;
    case "cart":
      return <svg {...props}><path d="M3 4h2l2.5 12h11l2-8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>;
    case "user":
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case "menu":
      return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "sun":
      return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>;
    case "moon":
      return <svg {...props}><path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/></svg>;
    case "bolt":
      return <svg {...props}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>;
    case "leaf":
      return <svg {...props}><path d="M11 20A7 7 0 0 1 4 13V4h9a7 7 0 0 1 7 7v0a7 7 0 0 1-7 7"/><path d="M4 20c4-4 8-6 12-7"/></svg>;
    case "shield":
      return <svg {...props}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/></svg>;
    case "tools":
      return <svg {...props}><path d="M14 6l4-4 3 3-4 4M14 6l-9 9v4h4l9-9M14 6l3 3"/></svg>;
    case "phone":
      return <svg {...props}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
    case "mail":
      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case "pin":
      return <svg {...props}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "check":
      return <svg {...props}><path d="M5 12l4 4 10-10"/></svg>;
    case "plus":
      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":
      return <svg {...props}><path d="M5 12h14"/></svg>;
    case "filter":
      return <svg {...props}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case "fan":
      return <svg {...props}><circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 2-7 5-7-1 3-3 5-5 7zM12 14c0 4-2 7-5 7 1-3 3-5 5-7zM10 12c-4 0-7-2-7-5 3 1 5 3 7 5zM14 12c4 0 7 2 7 5-3-1-5-3-7-5z"/></svg>;
    case "tv":
      return <svg {...props}><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
    case "fridge":
      return <svg {...props}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 10h14M8 6v2M8 13v3"/></svg>;
    case "ac":
      return <svg {...props}><rect x="3" y="5" width="18" height="8" rx="2"/><path d="M7 16l-1 3M12 16v3M17 16l1 3"/></svg>;
    case "washer":
      return <svg {...props}><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="8" cy="6" r="0.5" fill="currentColor"/><circle cx="11" cy="6" r="0.5" fill="currentColor"/></svg>;
    case "iron":
      return <svg {...props}><path d="M3 17h18l-2-6a4 4 0 0 0-4-3H9a4 4 0 0 0-4 3l-2 6z"/><path d="M3 17v2h18v-2"/></svg>;
    case "pump":
      return <svg {...props}><circle cx="12" cy="14" r="6"/><path d="M12 8V4M9 4h6M12 14l3-3"/></svg>;
    case "laptop":
      return <svg {...props}><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/></svg>;
    case "router":
      return <svg {...props}><rect x="3" y="13" width="18" height="6" rx="1.5"/><path d="M7 16h.01M11 16h.01M8 13V9M16 13l-4-7-4 7"/></svg>;
    case "bulb":
      return <svg {...props}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 0 0-4-10z"/></svg>;
    case "panel":
      return <svg {...props}><path d="M4 4h16l-2 12H6z"/><path d="M10 4v12M14 4v12M4 10h16M11 16v4M9 20h6"/></svg>;
    case "battery":
      return <svg {...props}><rect x="3" y="8" width="16" height="10" rx="2"/><path d="M19 11v4h2v-4z"/><path d="M7 13h2M11 13h2"/></svg>;
    case "inverter":
      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2"/><path d="M14 10l4 4M14 14l4-4"/></svg>;
    case "kit":
      return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2M3 12h18"/></svg>;
    case "facebook":
      return <svg {...props}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1z" fill="currentColor" stroke="none"/></svg>;
    case "whatsapp":
      return <svg {...props}><path d="M3 21l1.6-5A8 8 0 1 1 8 19l-5 2z"/><path d="M9 10c.5 2 2.5 4 4.5 4.5l1-1.5 2 1c-.5 1.5-2 2-3 2A6 6 0 0 1 7 9c0-1 .5-2.5 2-3l1 2-1 1z"/></svg>;
    case "instagram":
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>;
    case "globe":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "x":
      return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case "calc":
      return <svg {...props}><rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="6" width="8" height="3"/><circle cx="9" cy="13" r="0.5" fill="currentColor"/><circle cx="12" cy="13" r="0.5" fill="currentColor"/><circle cx="15" cy="13" r="0.5" fill="currentColor"/><circle cx="9" cy="17" r="0.5" fill="currentColor"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/><circle cx="15" cy="17" r="0.5" fill="currentColor"/></svg>;
    case "star":
      return <svg {...props}><path d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.5 9.5 9z"/></svg>;
    case "warranty":
      return <svg {...props}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "truck":
      return <svg {...props}><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>;
    default:
      return null;
  }
};

window.Icon = Icon;
