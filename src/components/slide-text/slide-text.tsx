import "./slide-text.scss";

const SlideText = ({ style }: { style?: React.CSSProperties }) => {
 const letters = ['E', 'M', 'B', 'R', 'A', 'C', 'E', '\u00A0', 'T', 'H', 'E', '\u00A0', 'D', 'E', 'C', 'E', 'N', 'T', 'R', 'A', 'L', 'I', 'Z', 'E', 'D', '\u00A0', 'F', 'U', 'T', 'U', 'R', 'E'];
  return (
    <h3 className="desc-text loader" style={style}>
    {letters.map((word, index) => (
        <span key={index} className="m-text">{word}</span>
      ))}
    </h3>
  )
}

export default SlideText;