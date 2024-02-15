import './JournalItem.css';

function JournalItem({ title, text, date }) {
  
  const formDate = new Intl.DateTimeFormat('ru-Ru').format(date);

  return (
    <>
        <h2 className='journal-item__header'>{title}</h2>        
        <h2 className='journal-item__body'>
            <div className='journal-item__date'>{formDate}</div>
            <div className='journal-item__text'>{text}</div>
        </h2>        
    </>
  );
}

export default JournalItem
