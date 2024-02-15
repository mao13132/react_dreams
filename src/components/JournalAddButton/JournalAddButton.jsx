import CardButton from '../CardButton/CardButtom'
import './JournalAddButton.css';

function JournalAddButton() {

  return (
    <CardButton className="journal-add">
        <img className='plus' src="./plus.svg" alt="" />
        Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
