import React, {useState} from 'react'
import { graphql } from "gatsby"

const ReadMore = ({ id, text, amountOfWords = 50 }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const splittedText = text.split(' ')
  const itCanOverflow = splittedText.length > amountOfWords
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text
  const endText = splittedText.slice(amountOfWords - 1).join(' ')
  
  const handleKeyboard = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <p id={id} className="read_more_text">
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span 
            className={`${!isExpanded && 'hidden'}`} 
            aria-hidden={!isExpanded}
          >&nbsp;{endText}
          </span>
          <span
            className='button_read_more'
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Replier' : 'Lire la suite'}
          </span>
        </>
      )}
    </p>
  )
}

export default ReadMore;


export const personnageFragment = graphql`
  fragment ReadmoreTexte on DatoCmsReadmoreTexte {
        id:originalId
        nombreDeMots
        texte
    }
 `