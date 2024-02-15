import cn from 'classnames';

import styles from './JournalForm.module.css'
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

            <form className={styles['journal-form']} onSubmit={addJournalItem}>
                <input type='title' name="title" className={`${styles['input']} ${formValidState.title ? '' : styles['invalid']}`} />
                <input type='date' name="date" className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`} />
                <input type='text' name="tag" />
                <textarea name="post" id="" cols="30" rows="10"  className={`${styles['input']} ${formValidState.post ? '' : styles['invalid']}`} ></textarea>
                <Button text='Добавить' />

            </form>


        </>
    )
}

export default JournalForm;
