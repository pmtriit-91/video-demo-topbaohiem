import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

// Chặn triệt để các lỗi script từ Chrome Extensions bên ngoài (ví dụ Urban VPN) tiêm vào localhost
if (typeof window !== "undefined") {
  window.addEventListener(
    "error",
    (event) => {
      const isExtensionError =
        event.filename?.includes("chrome-extension://") ||
        event.error?.stack?.includes("chrome-extension://") ||
        event.message?.includes("M_ID");

      if (isExtensionError) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return true;
      }
    },
    true
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      const reasonStr = String(event.reason?.stack || event.reason?.message || "");
      if (reasonStr.includes("chrome-extension://") || reasonStr.includes("M_ID")) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    },
    true
  );
}

registerRoot(RemotionRoot);
