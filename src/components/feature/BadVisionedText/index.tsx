import { Fragment } from "react/jsx-runtime";
import "./styles.css";

const BadVisionedText = ({ text }: { text: string }) => {
  const fadedMessagePercentage = 0.25;
  const fadedMessage = text
    .split("")
    .map((char) => (Math.random() > fadedMessagePercentage ? char : "_"))
    .join("");

  const renderTextWithHighlights = (text: string) => {
    return text
      .split("")
      .map((part, index) => (
        <Fragment key={index}>
          {part === "_" ? <span className="textSpot" /> : part}
        </Fragment>
      ));
  };
  return <>{renderTextWithHighlights(fadedMessage)}</>;
};

export default BadVisionedText;
