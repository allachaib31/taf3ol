import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function CommonQuestions() {
    const { t, i18n} = useTranslation();
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        // Toggle the active index: if clicked again, set it to null (close it)
        if(index == activeIndex) return;

        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div data-aos="fade-up" className="px-[1rem] my-[3rem] container mx-auto">
            <div className="flex gap-[2rem] flex-col justify-center items-center">
                <h1 className="text-[30px] text-center md:text-[72px] font-bold">{t('frequently_asked_question_title')}</h1>

                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`collapse collapse-arrow border transition-all duration-300 ${
                            activeIndex === index ? "bg-white" : "bg-[#F1F1F1]"
                        }`}
                    >
                        <input
                            type="radio"
                            name="my-accordion-2"
                            checked={activeIndex === index}
                            onChange={() => handleClick(index)}
                        />
                        <div className="collapse-title font-medium">
                            Click to open this one and close others
                        </div>
                        {activeIndex === index && (
                            <div className="collapse-content">
                                <p>hello</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommonQuestions;
