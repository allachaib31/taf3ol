import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSocket } from "../../../../screens/admin/homeAdmin";
import { postMethode } from "../../../../utils/apiFetchs";
import { addItemStockRoute } from "../../../../utils/apiRoutes";
import Alert from "../../../alert";
import Loading from "../../../loading";
import * as XLSX from "xlsx";

function AddItemToStock() {
    const navigate = useNavigate();
    const socket = useSocket();
    const {stockInfo , setStockInfo} = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        textLines: "",
        note: "",
    });
    const [alert, setAlert] = useState({
        display: false,
    });

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                // Combine rows into a single string for `textLines`
                const textLines = rows
                    .map((row) => row[0]) // Assuming data is in the first column
                    .filter((line) => line) // Remove empty lines
                    .join("\n");

                setInputs((prevInputs) => ({
                    ...prevInputs,
                    textLines,
                }));
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await postMethode(addItemStockRoute, {
                ...inputs,
                idStock: stockInfo._id,
            });
            setStockInfo(response.data.stock)
            setAlert({
                display: true,
                status: true,
                text: response.data.msg,
            });
            socket.emit("broadcast-notification", {
                msg: response.data.notificationMsg,
                name: "add Item Stock",
            });
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                return navigate("/admin/auth");
            }
            setAlert({
                display: true,
                status: false,
                text: err.response.data.msg,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-[0.5rem]">
            {alert.display && <Alert msg={alert} />}
            <label htmlFor="carts">
                * قم بترتيب البطاقات كل بطاقة ضمن سطر ولا تترك اسطر فارغة
            </label>
            <textarea
                name="carts"
                className="textarea textarea-bordered"
                value={inputs.textLines}
                onChange={(event) =>
                    setInputs((prevInputs) => ({
                        ...prevInputs,
                        textLines: event.target.value,
                    }))
                }
            ></textarea>
            <label className="input input-bordered flex items-center gap-2">
                رفع ملف Excel
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    className="grow"
                    onChange={handleFileUpload}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                ملاحظة
                <input
                    type="text"
                    className="grow"
                    onChange={(event) =>
                        setInputs((prevInputs) => ({
                            ...prevInputs,
                            note: event.target.value,
                        }))
                    }
                />
            </label>
            <button
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? <Loading /> : "ارسال"}
            </button>
        </div>
    );
}

export default AddItemToStock;
