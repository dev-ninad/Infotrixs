import "./QuoteCard.css";


const QuoteCard = ({ quote , author }) => {
  return (
    <div className="quote-card">
       <p className="quote"><q>{quote}</q></p>
        <p className="author">-{author}</p>
    </div>
  )
}

export default QuoteCard