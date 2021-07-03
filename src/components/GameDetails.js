//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//REDUX
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
/* import { smallImage } from "../util"; */
//IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";
const GameDetail = ({ pathId }) => {
  const history = useHistory();

  //Exit Detail
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.push("/");
      console.log(element);
    }
  };

  //GET STARS
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" src={starFull}></img>);
      } else {
        stars.push(<img alt="star" src={starEmpty}></img>);
      }
    }
    return stars;
  };

  //GET PLATFORM IMAGES
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };

  //Data
  const { game, screen, isLoading } = useSelector((state) => state.detail);
  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            <PaddingAround>
              <Stats>
                <div className="rating">
                  <motion.h3 layout="position">{game.name}</motion.h3>
                  <p>Rating: {game.rating}</p>
                  {getStars()}
                </div>
                <Info>
                  <h3>Platforms</h3>
                  <Platforms>
                    {game.platforms.map((data) => (
                      <img
                        key={data.platform.id}
                        src={getPlatform(data.platform.name)}
                        alt={data.platform.name}
                      ></img>
                    ))}
                  </Platforms>
                </Info>
              </Stats>
              <Media>
                <motion.img
                  layoutId={`img ${pathId}`}
                  src={game.background_image}
                  alt={game.background_image}
                />
              </Media>
              <Description>
                <p>{game.description_raw}</p>
              </Description>
              <motion.div layout="position" className="gallery">
                {screen.results.map((screen) => (
                  <img src={screen.image} key={screen.id} alt={screen.image} />
                ))}
              </motion.div>
            </PaddingAround>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};
const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: grey;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`;
const PaddingAround = styled.div`
  padding: 2rem 10rem;
`;
const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;
const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;
const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;
export default GameDetail;
