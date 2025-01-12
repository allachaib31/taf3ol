import { faCircleCheck, faCircleXmark, faDownload, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RowsPerPage from "../rowsPerPage";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../../screens/admin/homeAdmin";
import { getMethode } from "../../../../utils/apiFetchs";
import { getCardsRoute, getGroupCardsRoute } from "../../../../utils/apiRoutes";
import LoadingScreen from "../../../loadingScreen";
import { handleSelectAll, handleSelectItem } from "../../../../utils/constants";
import { DeleteCards } from "../modal";
import * as XLSX from "xlsx";

function AllRechargeCards() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [cardTitles, setCardTitles] = useState([]);
    const [cards, setCards] = useState([]);
    const [cardTitleId, setCardTitleId] = useState(false);
    const [listCardsSelected, setListCardsSelected] = useState([]);
    const [totalCards, setTotalCards] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCardTitles = async () => {
        try {
            const response = await getMethode(`${getGroupCardsRoute}?query=`);
            setCardTitles(response.data.cardGroups);
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                return navigate("/admin/auth");
            }
        }
    };

    const exportToExcel = () => {
        // Create an array of selected card codes and prices
        const selectedCards = cards.filter((card) => listCardsSelected.includes(card._id));
        const data = selectedCards.map((card) => ({
            "Card Code": card.code,
            "Price": `${card.credit}$`,
        }));

        // Create a new worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Recharge Cards");

        // Export the file
        XLSX.writeFile(wb, "RechargeCards.xlsx");
    };

    const copyToClipboard = () => {
        // Create a string of all selected card codes
        const selectedCards = cards.filter((card) => listCardsSelected.includes(card._id));
        const cardCodes = selectedCards.map((card) => card.code).join("\n");

        // Copy to clipboard
        navigator.clipboard.writeText(cardCodes).then(() => {
            alert("تم نسخ رموز البطاقة المحددة إلى الحافظة!");
        });
    };

    useEffect(() => {
        fetchCardTitles();
    }, []);

    useEffect(() => {
        if (cardTitleId) {
            setLoading(true);
            getMethode(`${getCardsRoute}?cardTitleId=${cardTitleId}&page=${page}&limit=${limit}`)
                .then((response) => {
                    const { cards, total, totalPages } = response.data;
                    setCards(cards);
                    setTotalCards(total);
                    setTotalPages(totalPages);
                })
                .catch((err) => {
                    if (err.response.status === 401 || err.response.status === 403) {
                        navigate("/admin/auth");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [cardTitleId, page, limit]);

    return (
        <div>
            <h1 className="text-3xl font-[900]">بطاقات الشحن</h1>
            <div className="mt-[1rem]">
                <select
                    className="select select-bordered w-full"
                    onChange={(event) => {
                        setCardTitleId(event.target.value);
                    }}
                >
                    <option disabled selected>
                        مجموعة البطاقات
                    </option>
                    {cardTitles &&
                        cardTitles.map((card) => {
                            return <option value={card._id}>{card.name}</option>;
                        })}
                </select>
            </div>
            <LoadingScreen
                loading={loading}
                component={
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="text-[1.1rem]">
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(event) => {
                                                    handleSelectAll(event, setListCardsSelected, cards);
                                                }}
                                            />
                                        </label>
                                    </th>
                                    <th>الرقم</th>
                                    <th>السعر</th>
                                    <th>تم الاستخدام</th>
                                </tr>
                            </thead>
                            <tbody className="text-[1.1rem]">
                                {cards &&
                                    cards.map((card) => {
                                        return (
                                            <tr>
                                                <th>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox"
                                                            checked={listCardsSelected.includes(card._id)}
                                                            onChange={() => handleSelectItem(card._id, setListCardsSelected)}
                                                        />
                                                    </label>
                                                </th>
                                                <td>{card.code}</td>
                                                <td>{card.credit}$</td>
                                                <td>
                                                    {card.isUsed ? (
                                                        <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCircleXmark} className="text-error" />
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                }
            />
            <div className="flex justify-between mt-[1rem]">
                <button
                    className="btn btn-error text-white"
                    onClick={() => {
                        if (listCardsSelected.length > 0)
                            document.getElementById("deleteCards").showModal();
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="btn btn-primary mr-2" onClick={exportToExcel}>
                    <FontAwesomeIcon icon={faDownload} />
                </button>
                <button className="btn btn-secondary mr-2" onClick={copyToClipboard}>
                    <FontAwesomeIcon icon={faCopy} />
                </button>
                <div className="w-full">
                    <RowsPerPage
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        totalPages={totalPages}
                        setTotalPages={setTotalPages}
                        totalItem={totalCards}
                    />
                </div>
            </div>
            <DeleteCards setCards={setCards} cards={cards} listCardsSelected={listCardsSelected} />
        </div>
    );
}

export default AllRechargeCards;
