import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';
function ThirdStep() {
    const { t, i18n } = useOutletContext();
    return (
        <div>
            <h1 className='text-2xl sm:text-3xl font-bold '>{t('label_1_textArea_support')}</h1>
            <textarea
                className="textarea textarea-bordered textarea-lg w-full my-[0.5rem]"></textarea>
            <div className='mt-[1.5rem]'>
                <label className="bg-transparent hover:bg-secondary text-black font-bold py-2 px-4 rounded cursor-pointer">
                    <FontAwesomeIcon icon={faPaperclip} /> {t('input_upload_support')}
                    <input type="file" className="sr-only" />
                </label>
            </div>
        </div>
    )
}

export default ThirdStep