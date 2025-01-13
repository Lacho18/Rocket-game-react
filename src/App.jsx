import { useEffect, useState } from "react";
import "./styles/mainStyle.css";
import Bullet from "./components/Bullet";
import Obstacle from "./components/Obstacle";

const GAME_FIELD_WIDTH = 800;
const GAME_FIELD_HEIGHT = 500;

const HERO_WIDTH = 75;
const HERO_HEIGHT = 75;

let bulletsCounter = 0;
let obstacleCounter = 0;
let obstaclesInterval;

function App() {
  const [mousePosition, setMousePosition] = useState({
    top: GAME_FIELD_HEIGHT,
    left: GAME_FIELD_WIDTH - HERO_WIDTH,
  });
  const [bullets, setBullets] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  if (bulletsCounter > 0 && obstaclesInterval === undefined) {
    obstaclesInterval = setInterval(() => {
      setObstacles((oldObstacles) => {
        let newObstacle = ++obstacleCounter;
        oldObstacles.push(newObstacle);

        return oldObstacles;
      });
    }, Math.round(Math.random() * 100 + 2000));
  }

  function mouseMoveHandler(e) {
    setMousePosition(() => {
      let newCoordinates = {
        top: e.clientY,
        left: e.clientX,
      };
      if (e.clientX < 0) {
        newCoordinates.left = 0;
      }

      if (e.clientX > GAME_FIELD_WIDTH + HERO_WIDTH * 4) {
        newCoordinates.left = GAME_FIELD_WIDTH + HERO_WIDTH * 4;
      }

      if (e.clientY < 70) {
        newCoordinates.top = 70;
      }

      if (e.clientY > GAME_FIELD_HEIGHT + Math.round(HERO_HEIGHT / 2)) {
        newCoordinates.top = GAME_FIELD_HEIGHT + Math.round(HERO_HEIGHT / 2);
      }

      return newCoordinates;
    });
  }

  function removeBullet(id) {
    setBullets((oldValue) => {
      let newBullets = oldValue.filter((indexValue) => indexValue.id !== id);

      return newBullets;
    });
  }

  function removeObstacle(id) {
    setObstacles((oldValue) => {
      let newObstacles = oldValue.filter((indexValue) => indexValue !== id);

      return newObstacles;
    });
  }

  function createBullet() {
    let newBullet = {
      id: bulletsCounter,
      positionX: mousePosition.left,
      positionY: mousePosition.top,
    };

    bulletsCounter++;

    setBullets((oldValue) => {
      let newBullets = [...oldValue];
      newBullets.push(newBullet);

      return newBullets;
    });
  }

  return (
    <div className="main-div">
      <div
        className="game-field"
        style={{ width: GAME_FIELD_WIDTH, height: GAME_FIELD_HEIGHT }}
        onMouseMove={mouseMoveHandler}
        onClick={createBullet}
      >
        {bulletsCounter === 0 && (
          <div className="start-window">
            <p>Click to start</p>
          </div>
        )}

        {bullets.map((bullet) => (
          <Bullet
            key={bullet.id}
            topBorder={70}
            bulletObject={bullet}
            removeBullet={removeBullet}
          />
        ))}

        {obstacles.map((obstacle) => (
          <Obstacle
            key={obstacle}
            id={obstacle}
            removeObstacle={removeObstacle}
          />
        ))}

        <img
          className="hero-image"
          style={{
            position: "absolute",
            width: HERO_WIDTH,
            height: HERO_HEIGHT,
            ...mousePosition,
          }}
          src="/images/rocketImage.png"
        />
      </div>
    </div>
  );
}

export default App;
