import "./styles.css";
const Blood = ({ isStarted }) => {
  if (!isStarted) return;
  return <div className="blood-mask" />;
};

export default Blood;
