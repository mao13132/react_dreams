import cn from 'classnames';

import styles from './JournalForm.module.css'
import Button from '../Button/Button';
import { useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE } from './JournalForm.state'
import { formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {

    /* Создаю useReduce вторая  функция обзывает функцию обработчки*/
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);


    /* Что бы триггерить только на валидацию данных то диструктуируем значения */
    const { isValid, isFormReadyToSubmit, values } = formState;

    /* Фокус на невалиде */
    const titleRef = useRef();
    const postRef = useRef();
    const dateRef = useRef();

    /* Фокусировка на не валиде */
    const focusError = (isValid) => {
        switch(true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.post:
                postRef.current.focus();
                break;
        }
    };

    /* Юз эффект для сброса эффекта невалида */
    useEffect(() => {

        let timerId;

        if (!isValid.date || !isValid.post || !isValid.title) {

            focusError(isValid);

            timerId = setTimeout(() => { dispatchForm({ type: 'RESET_VALIDITY' }); }, 1500);
        }
        /* очистка таймера */
        return () => {
            clearTimeout(timerId);
        }
    }, [isValid])

    useEffect(() => {

        if (isFormReadyToSubmit) {

            onSubmit(values);

            dispatchForm({ type: "CLEAR" });
        }

    }, [isFormReadyToSubmit, values, onSubmit]);


    const addJournalItem = (event) => {
        event.preventDefault();

        dispatchForm({ type: 'SUBMIT' });




    }

    const onChange = (event) => {

        dispatchForm({
            type: 'SET_VALUE', payload: {
                [event.target.name]: event.target.value,
            }
        });
    };


    return (
        <>

            <form className={styles['journal-form']} onSubmit={addJournalItem}>

                <div>
                    <input type='title' ref={titleRef} onChange={onChange} name="title" value={values.title} className={cn(styles['input-title'], {
                        [styles['invalid']]: !isValid.title,
                    })} />
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor="date" className={styles['from-lable']}>
                        <img src="./1.svg" className={styles['icon-one']} alt="Иконка один" />
                        <span>Дата</span>
                    </label>

                    <input id="date" ref={dateRef} onChange={onChange} value={values.date} type='date' name="date" className={`${styles['input']} ${isValid.date ? '' : styles['invalid']}`} />
                </div>

                <div className={styles['form-row']}>
                    <label htmlFor="tag" className={styles['from-lable']}>
                        <img src="./2.svg" className={styles['icon-two']} alt="Иконка два" />
                        <span>Метки</span>
                    </label>

                    <input type='text' onChange={onChange} value={values.tag} id='tag' name="tag" className={styles['input']} />
                </div>


                <textarea name="post" ref={postRef} onChange={onChange} id="" cols="30" rows="10" className={`${styles['input']} ${isValid.post ? '' : styles['invalid']}`} ></textarea>
                <Button text='Добавить' />

            </form>


        </>
    )
}

export default JournalForm;
