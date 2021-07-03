import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
//Styling and Animation
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
//Components
import Game from "../components/Game";
import GameDetails from "../components/GameDetails";
import { useLocation } from "react-router-dom";
import { fadeIn, titleAnim2 } from "../animations";
const Home = () => {
  //get current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  //FETCH GAMES
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //Get data from store
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout>
        <AnimatePresence>
          {pathId && <GameDetails pathId={pathId} />}
        </AnimatePresence>
        {searched.length ? (
          <div className="searched">
            <motion.h2 variants={titleAnim2} initial="hidden" animate="show">
              Searched Games
            </motion.h2>
            <Games>
              {searched.map((game) => (
                <Game
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
                />
              ))}
            </Games>
          </div>
        ) : (
          ""
        )}
        <motion.h2 variants={titleAnim2} initial="hidden" animate="show">
          Upcoming Games
        </motion.h2>
        <Games>
          {upcoming.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popular.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames.map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
      </AnimateSharedLayout>
    </GameList>
  );
};
const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    color: #f1f1f1;
    padding: 5rem 0rem;
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  color: #f1f1f1;
`;
export default Home;
