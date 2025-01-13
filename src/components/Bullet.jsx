import { useEffect, useRef, useState } from "react";

export default function Bullet({ topBorder, bulletObject, removeBullet }) {
  const [bulletY, setBulletY] = useState(bulletObject.positionY);
  let interval;
  let speed = useRef((Math.random() % 40) + 10);

  useEffect(() => {
    interval = setInterval(() => {
      setBulletY((oldValue) => oldValue - 1);
    }, speed.current);
  }, []);

  if (bulletY <= topBorder) {
    clearInterval(interval);
    removeBullet(bulletObject.id);
  }

  return (
    <div
      className="bullet"
      style={{ top: bulletY, left: bulletObject.positionX }}
    ></div>
  );
}
