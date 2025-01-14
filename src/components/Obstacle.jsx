import { useEffect, useRef, useState } from "react";

const MAX_OBSTACLE_WIDTH = 110;
const MAX_OBSTACLE_HEIGHT = 100;

const MIN_OBSTACLE_WIDTH = 50;
const MIN_OBSTACLE_HEIGHT = 50;

const TOP_BORDER = 70;
const BOTTOM_BORDER = 570;

let interval;

export default function Obstacle({ id, removeObstacle, bullets }) {
  const obstacleSize = useRef({
    width: Math.round(Math.random() * MAX_OBSTACLE_WIDTH + MIN_OBSTACLE_WIDTH),
    height: Math.round(
      Math.random() * MAX_OBSTACLE_HEIGHT + MIN_OBSTACLE_HEIGHT
    ),
  });
  const leftPosition = useRef(Math.round(Math.random() * 800));
  const [obstacleY, setObstacleY] = useState(TOP_BORDER);

  //console.log(leftPosition.current);

  useEffect(() => {
    interval = setInterval(() => {
      setObstacleY((oldPosition) => oldPosition + 1); // Move the obstacle down

      bullets.forEach((bullet) => {
        const bulletRight = bullet.positionX + 25; // Bullet's right edge
        const bulletBottom = bullet.positionY + 25; // Bullet's bottom edge

        // Calculate obstacle edges
        const obstacleLeft = leftPosition.current;
        const obstacleRight = leftPosition.current + obstacleSize.current.width;
        const obstacleTop = leftPosition.current;
        const obstacleBottom =
          leftPosition.current + obstacleSize.current.height;

        // Check collision
        const isColliding =
          bullet.positionX < obstacleRight && // Bullet's left edge < Obstacle's right edge
          bulletRight > obstacleLeft && // Bullet's right edge > Obstacle's left edge
          bullet.positionY < obstacleBottom && // Bullet's top edge < Obstacle's bottom edge
          bulletBottom > obstacleTop; // Bullet's bottom edge > Obstacle's top edge

        console.log(isColliding);

        if (isColliding) {
          console.log("HIT!", bullet);
        }
      });
    }, 70);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (BOTTOM_BORDER <= obstacleY) {
    clearInterval(interval);
    removeObstacle(id);
  }

  return (
    <div
      className="obstacle"
      style={{
        ...obstacleSize.current,
        top: obstacleY,
        left: leftPosition.current,
      }}
    ></div>
  );
}
