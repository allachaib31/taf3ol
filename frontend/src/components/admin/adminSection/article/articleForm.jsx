import React, { useState } from 'react'
import Editor from '../editor/editor';

function ArticleForm() {
    const [arDescription, setArDescription] = useState('');
    const [enDescription, setEnDescription] = useState('');
    return (
        <div className='flex flex-col gap-[1rem]'>
            <label className="input input-bordered flex items-center gap-2">
                الرابط
                <input type="text" className="grow" value={"/privacy"} disabled />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                العنوان AR
                <input type="text" className="grow" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                العنوان EN
                <input type="text" className="grow" />
            </label>
            <div>
                <p className='text-[1.2rem]'>المقال AR</p>
                <Editor content={arDescription} setContent={setArDescription} />
            </div>
            <div className='mt-[1rem]'>
                <p className='text-[1.2rem]'>المقال EN</p>
                <Editor content={enDescription} setContent={setEnDescription} />
            </div>
            <button className='btn btn-primary'>حفظ</button>
        </div>
    )
}

export default ArticleForm