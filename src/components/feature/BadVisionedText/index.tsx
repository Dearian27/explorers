import React from "react";

const BadVisionedText = ({ text }: { text: string }) => {
  const fadedMessagePercentage = 0.25;
  const fadedMessage = text
    .split("")
    .map((char) => (Math.random() > fadedMessagePercentage ? char : "_"))
    .join("");

  return <div>message: {fadedMessage}</div>;
};

export default BadVisionedText;
