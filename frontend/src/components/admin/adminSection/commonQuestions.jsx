import React from "react";

function CommonQuestions() {
    return (
        <div className="my-[3rem] container mx-auto">
            <div className="flex gap-[2rem] flex-col justify-center items-center">
                <h1 className="text-[40px] md:text-[72px] font-bold">أسئلة شائعة</h1>
                <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title  font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title  font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title  font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>{" "}
            </div>
        </div>
    );
}

export default CommonQuestions;
