import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLevelUserRoute, updateLevelUserGroupRoute } from '../../../../utils/apiRoutes';
import { getMethode, patchMethode } from '../../../../utils/apiFetchs';
import LoadingScreen from '../../../loadingScreen';
import Loading from '../../../loading';
import Alert from '../../../alert';

function UsersLevel() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [save, setSave] = useState(false);
    const [typesServices, setTypesServices] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [results, setResults] = useState([]);
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async () => {
        setSubmit(true);
        setAlert({
            display: false,
        });
        try {
            const response = await patchMethode(updateLevelUserGroupRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setSave(false);
            getLevelUser();
        } catch (err) {
            if (err.response.status == 401 || err.response.status == 403) {
                return navigate("/admin/auth")
            }
            setAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        } finally {
            setSubmit(false);
        }
    }
    const getLevelUser = () => {
        setLoading(true);
        getMethode(getLevelUserRoute)
            .then((response) => {
                setTypesServices(response.data.typeServices || []);
                setResults(response.data.results || []);
            })
            .catch((err) => {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate('/admin/auth');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }
    useEffect(() => {
        getLevelUser();
    }, []);

    return (
        <div>
            <h1 className='text-3xl font-[900]'>المستويات</h1>
            {alert.display && <Alert msg={alert} />}
            <LoadingScreen loading={loading} component={
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className='text-[1rem]'>
                                <th></th>
                                {typesServices.map((typeService) => (
                                    <th key={typeService._id}>{typeService.nameAr}</th>
                                ))}
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className='text-[1rem]'>
                            {results.map((result) => (
                                <tr key={result.user._id}>
                                    <th>{result.user.username}</th>
                                    {result.typeServices.map((item) => (
                                        <td key={item.service._id}>
                                            {item.groupMoney.length > 0 ? (
                                                <select className="select select-bordered w-fit" onChange={(event) => {
                                                    setSave(true);
                                                    setInputs((prevInputs) => {
                                                        return [...prevInputs, {
                                                            ...item.levelUserGroup,
                                                            idNewGroup: event.target.value
                                                        }]
                                                    })
                                                }}>
                                                    {item.groupMoney.map((group) => (
                                                        <option key={group._id} value={group._id} selected={item.levelUserGroup.levelGroup._id == group._id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span>No Groups</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            } />
            {save && <button className='btn btn-primary w-full' onClick={handleSubmit} disabled={submit}>{loading ? <Loading /> : 'حفظ'}</button>}
        </div>
    );
}

export default UsersLevel;
