import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Message from "../../common/Message";

const InterceptorIF = () => {
  const {
    players,
    currentPlayer,
    messages,
    day,
    additionalSettings: {
      doubleNightCycle,
      currentCycle,
      interceptorsVisionDelay,
    },
  } = useSelector((state: RootState) => state.game.game);
  if (!players[currentPlayer]?.role?.roles?.includes("interceptor")) return;

  return (
    <>
      {messages
        ?.filter(
          (message) =>
            message.type === "clone" &&
            message.receiptDay + interceptorsVisionDelay === day &&
            (!doubleNightCycle || currentCycle !== 0)
        )
        ?.map((message, index) => (
          <Message key={index} day={message.sendDay} type={message.type}>
            {message.text}
          </Message>
        ))}
    </>
  );
};

export default InterceptorIF;
