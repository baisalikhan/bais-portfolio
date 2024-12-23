"use client"
import { useEffect } from 'react';

const GlowEffect = ({ identifier }) => {
  useEffect(() => {
    const CONTAINER = document.querySelector(`.glow-container-${identifier}`);
    const CARD = document.querySelector(`.glow-card-${identifier}`);

    if (!CONTAINER || !CARD || typeof window === 'undefined') return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event) => {
      const CARD_BOUNDS = CARD.getBoundingClientRect();

      if (
        event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
        event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
        event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
        event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
      ) {
        CARD.style.setProperty('--active', 1);
      } else {
        CARD.style.setProperty('--active', CONFIG.opacity);
      }

      const CARD_CENTER = [
        CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
        CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
      ];

      let ANGLE =
        (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
          180) /
        Math.PI;

      ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
      CARD.style.setProperty('--start', ANGLE + 90);
    };

    const RESTYLE = () => {
      CONTAINER.style.setProperty('--gap', CONFIG.gap);
      CONTAINER.style.setProperty('--blur', CONFIG.blur);
      CONTAINER.style.setProperty('--spread', CONFIG.spread);
      CONTAINER.style.setProperty(
        '--direction',
        CONFIG.vertical ? 'column' : 'row'
      );
    };

    window.addEventListener('pointermove', UPDATE);
    RESTYLE();
    UPDATE();

    return () => {
      window.removeEventListener('pointermove', UPDATE);
    };
  }, [identifier]);

  return null;
};

export default GlowEffect;
