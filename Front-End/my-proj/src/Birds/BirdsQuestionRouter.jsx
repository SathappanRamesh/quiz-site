import { useParams } from "react-router-dom";
import BirdsChoose from "./BirdsChoose";
import BirdsFillUps from "./BirdsFillUps";
import BirdsGuessByImage from "./BirdsGuessByImage";
const BirdsQuestionRouter = () => {
  const { tag } = useParams();
    
  switch (tag) {
    case "choose":
      return <BirdsChoose />;
    case "fill-ups":
      return <BirdsFillUps />;
    case "guess-by-image":      
      return <BirdsGuessByImage />;
    default:
      return <div>Invalid quiz type: {tag}</div>;
  }
};

export default BirdsQuestionRouter;
