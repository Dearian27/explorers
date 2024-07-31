import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Message from "../../common/Message";

const InterceptorIF = () => {
  const {
    players,
    currentPlayer,
    messages,
    day,
    additionalSettings: { doubleNightCycle, currentCycle },
  } = useSelector((state: RootState) => state.game.game);
  if (players[currentPlayer]?.role !== "interceptor") return;

  return (
    <>
      {messages
        ?.filter(
          (message) =>
            message.type === "clone" &&
            message.receiptDay === day &&
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
