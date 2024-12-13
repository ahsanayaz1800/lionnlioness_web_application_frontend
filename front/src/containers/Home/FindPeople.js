import React from 'react';
import '../../styles/findPeople.css';
import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';
import card4 from '../../assets/card4.png';
import card5 from '../../assets/card5.png';

function FindPeople() {
  return (
    <>
      <div className='findPeopleDiv'>
        <div className='textDiv'>
          <h4>Find People Matching You</h4>
          <p>And If The Right Person Was Right Here…</p>
        </div>

        <div className='cardsDiv'>
          {/* First row - two cards */}
          <div className='cardRow1'>
            <div className='card'>
              <img src={card1} alt="Card 1"  height={250}/>
              <p className='cardText'>LONG TERM RELATIONSHIP</p>
            </div>
            <div className='card'>
              <img src={card2} alt="Card 2" height={250}/>
              <p className='cardText'>SPORTS ADDICT</p>
            </div>
          </div>

          {/* Second row - three cards */}
          <div className='cardRow2'>
            <div className='card'>
              <img src={card3} alt="Card 3" />
              <p className='cardText'>FEELING LONELY, TALK ONLY</p>
            </div>
            <div className='card'>
              <img src={card4} alt="Card 4" />
              <p className='cardText'>ONE NIGHT ONLY</p>
            </div>
            <div className='card'>
              <img src={card5} alt="Card 5" />
              <p className='cardText'>PARTY GOERS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindPeople;
