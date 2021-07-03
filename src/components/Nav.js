import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import sharingan from "../img/sharingan.gif";
import foldedN from "../img/folded_n.jpg";
//Redux and Routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { titleAnim } from "../animations";
const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");
  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput("");
  };
  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };
  return (
    <StyledNav variants={titleAnim} initial="hidden" animate="show">
      <Logo
        variants={titleAnim}
        initial="hidden"
        animate="show"
        onClick={clearSearched}
      >
        <img src={foldedN} alt="logo" />
        <motion.h1 variants={titleAnim} initial="hidden" animate="show">
          bree
        </motion.h1>
      </Logo>
      <form className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    outline: none;
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.7rem 2rem;
    cursor: pointer;
    background: #999495;
    color: white;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  cursor: pointer;
  img {
    margin-top: -0.5rem;
    margin-right: 0.5rem;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
  }
`;

export default Nav;
