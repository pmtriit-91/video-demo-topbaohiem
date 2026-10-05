import React, { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

const jakartaFont = loadJakarta("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
});

const spaceGroteskFont = loadSpaceGrotesk("normal", {
  weights: ["500", "700"],
  subsets: ["vietnamese", "latin"],
});

export const FontLoader: React.FC = () => {
  const [handle] = useState(() =>
    delayRender("Loading typography for TopBaoHiem Video Promo")
  );

  useEffect(() => {
    Promise.all([
      jakartaFont.waitUntilDone(),
      spaceGroteskFont.waitUntilDone(),
      document.fonts.ready,
    ])
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => {
        console.warn("Font loading note:", err);
        continueRender(handle);
      });
  }, [handle]);

  return (
    <style>
      {`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          user-select: none;
        }

        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #070b14;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
        }

        .font-mono-numbers {
          font-family: 'Space Grotesk', monospace;
          font-feature-settings: "tnum" 1;
        }
      `}
    </style>
  );
};
