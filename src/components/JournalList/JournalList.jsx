import './JournalList.css';
import JournalItem from '../JournalItem/JournalItem'
import CardButton from '../CardButton/CardButtom';

function JournalList({ items }) {

  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  const sortFunction = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1
    }
  }


  return <>
  {items.sort(sortFunction).map(element =>
  (
    <CardButton key={element.id}>
      <JournalItem
        title={element.title}
        text={element.text}
        date={element.date} />
    </CardButton>
  ))}
  </>



}

export default JournalList;
