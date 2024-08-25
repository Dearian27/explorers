import { RootState } from "../../../redux/store";
import Message from "../../common/Message";
import { useSelector } from "react-redux";

const PlayersMessagesIF = () => {
  const {
    players,
    currentPlayer,
    messages,
    day,
    additionalSettings: { currentCycle, doubleNightCycle },
  } = useSelector((state: RootState) => state.game.game);

  return (
    <>
      {" "}
      {messages
        ?.filter(
          (message) =>
            message.type === "clone" &&
            message.receiptDay === day &&
            message.receiversId?.includes(players[currentPlayer].id) &&
            (!doubleNightCycle || currentCycle !== 0)
        )
        ?.map((message, index) => (
          <Message
            receiver={"YOU"}
            key={index}
            day={message.sendDay}
            type={message.type}
          >
            {message.text}
          </Message>
        ))}
    </>
  );
};

export default PlayersMessagesIF;
