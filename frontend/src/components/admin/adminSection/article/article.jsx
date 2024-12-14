import React from 'react'
import ArticleForm from './articleForm'

function Article() {
    return (
        <div>
            <h1 className='text-3xl font-[900]'>مقالات</h1>
            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab flex" aria-label="سياسية الخصوصية" style={{
                    width: "150px"
                }} defaultChecked/>
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <ArticleForm />
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab w-[30rem]"
                    aria-label="سياسية الاستخدام"
                    style={{
                        width: "150px"
                    }}
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <ArticleForm />
                </div>
            </div>
        </div>
    )
}

export default Article