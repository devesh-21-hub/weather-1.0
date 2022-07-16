import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes.card1}>{props.children}</div>;
};

export default Card;
