import { useEffect, useRef, useState } from "react";

const MAX_OBSTACLE_WIDTH = 110;
const MAX_OBSTACLE_HEIGHT = 100;

const MIN_OBSTACLE_WIDTH = 100;
const MIN_OBSTACLE_HEIGHT = 90;

const TOP_BORDER = 70;
const BOTTOM_BORDER = 570;

let interval;

export default function Obstacle({ id, removeObstacle }) {
  const obstacleSize = useRef({
    width: Math.round(Math.random() * MAX_OBSTACLE_WIDTH + MIN_OBSTACLE_WIDTH),
    height: Math.round(
      Math.random() * MAX_OBSTACLE_HEIGHT + MIN_OBSTACLE_HEIGHT
    ),
  });
  const leftPosition = useRef(Math.round(Math.random() * 800));
  const [obstacleY, setObstacleY] = useState(TOP_BORDER);

  console.log(leftPosition.current);

  useEffect(() => {
    interval = setInterval(() => {
      setObstacleY((oldPosition) => oldPosition + 1);
    }, 40);
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
