import { useParams } from "react-router-dom";
import GkChoose  from './GkChoose';
import GkFillUps from './GkFillUps';
import GkGuessByImage from './GkGuessByImage';
const GkQuestionRouter = () => {
  const { tag } = useParams();
    
  switch (tag) {
    case "choose":
      return <GkChoose />;
    case "fill-ups":
      return <GkFillUps />;
    case "guess-by-image":      
      return <GkGuessByImage />;
    default:
      return <div>Invalid quiz type: {tag}</div>;
  }
};

export default GkQuestionRouter;
