import { useParams } from "react-router-dom";
import ScienceChoose from "./ScienceChoose";
import ScienceFillUps from "./ScienceFillUps";
import ScienceGuessByImage from "./ScienceGuessByImage";

const ScienceQuestionRouter = () => {
  const { tag } = useParams();
    
  switch (tag) {
    case "choose":
      return <ScienceChoose />;
    case "fill-ups":
      return <ScienceFillUps />;
    case "guess-by-image":      
      return <ScienceGuessByImage />;
    default:
      return <div>Invalid quiz type: {tag}</div>;
  }
};

export default ScienceQuestionRouter;
