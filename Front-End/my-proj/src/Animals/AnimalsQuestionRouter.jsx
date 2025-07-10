import { useParams } from "react-router-dom";
import AnimalsChoose from "./AnimalsChoose";
import AnimalsFillUps from "./AnimalsFillUps";
import AnimalsGuessByImage from "./AnimalsGuessByImage";

const AnimalsQuestionRouter  = () => {
  const { tag } = useParams();
    
  switch (tag) {
    case "choose":
      return <AnimalsChoose />;
    case "fill-ups":
      return <AnimalsFillUps />;
    case "guess-by-image":      
      return <AnimalsGuessByImage />;
    default:
      return <div>Invalid quiz type: {tag}</div>;
  }
};

export default AnimalsQuestionRouter ;
