import './JournalForm.css'
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({ onSubmit }) {

    const [formValidState, setFormValidState] = useState(
        {
            title: true,
            post: true,
            date: true
        }
    )

    const addJournalItem = (event) => {
        event.preventDefault();

        /* Получение значений из формы */ 
        const formDate = new FormData(event.target);
        const formProps = Object.fromEntries(formDate);
        /* Получение значений из формы */ 

        /* Проверка валидации */

        let isFormValid = true;
        
        if (!formProps.title?.trim().length) {
            setFormValidState(oldState => ({...oldState, title: false}))
            isFormValid = false
        } else {
            setFormValidState(oldState => ({...oldState, title: true}))
        }
        
        if (!formProps.post?.trim().length) {
            setFormValidState(oldState => ({...oldState, post: false}))
            isFormValid = false
        } else {
            setFormValidState(oldState => ({...oldState, post: true}))
        }
        
        if (!formProps.date) {
            setFormValidState(oldState => ({...oldState, date: false}))
            isFormValid = false
        } else {
            setFormValidState(oldState => ({...oldState, date: true}))
        }

        if (!isFormValid) {
            return;
        };

        /* Проверка валидации */


        
        onSubmit(formProps);

        
    }


    return (
        <>

            <form className="journal-form" onSubmit={addJournalItem}>
                <input type='title' name="title" style={ { border: formValidState.title ? undefined : '1px solid red' } } />
                <input type='date' name="date" style={ { border: formValidState.date ? undefined : '1px solid red' } } />
                <input type='text' name="tag" />
                <textarea name="post" id="" cols="30" rows="10" style={ { border: formValidState.post ? undefined : '1px solid red' } }></textarea>
                <Button text='Добавить' />

            </form>


        </>
    )
}

export default JournalForm;
