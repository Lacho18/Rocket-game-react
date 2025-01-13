import { useState } from "react";
import "./styles/mainStyle.css";
import Bullet from "./components/Bullet";

const GAME_FIELD_WIDTH = 800;
const GAME_FIELD_HEIGHT = 500;

const HERO_WIDTH = 75;
const HERO_HEIGHT = 75;

const bulletExample = {
  positionX: 300,
  positionY: 300,
};

function App() {
  const [mousePosition, setMousePosition] = useState({
    top: GAME_FIELD_HEIGHT,
    left: GAME_FIELD_WIDTH - HERO_WIDTH,
  });
  const [bullets, setBullets] = useState([]);

  console.log(mousePosition);

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

  function createBullet() {}

  return (
    <div className="main-div">
      <div
        className="game-field"
        style={{ width: GAME_FIELD_WIDTH, height: GAME_FIELD_HEIGHT }}
        onMouseMove={mouseMoveHandler}
      >
        <Bullet topBorder={70} bulletObject={bulletExample} />
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
