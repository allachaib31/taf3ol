import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For handling token from URL and navigation
import axios from 'axios';
import { postMethode } from '../../utils/apiFetchs';
import Alert from '../../components/alert';
import Loading from '../../components/loading';
import { resetPasswordAdminRoute } from '../../utils/apiRoutes';

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL params
    const navigate = useNavigate(); // For redirecting after success
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState({
        display: false,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        if (password !== confirmPassword) {
            setAlert({
                display: true,
                status: false,
                text: 'Passwords do not match'
            });
            return;
        }

        try {
            const response = await postMethode(`${resetPasswordAdminRoute}${token}`, {
                password: password,
            });

            if (response.data.success) {
                setAlert({
                    display: true,
                    status: true,
                    text: 'Password updated successfully! Redirecting to login...'
                });
                setTimeout(() => navigate('/admin/auth'), 3000); // Redirect to login page after 3 seconds
            }
        } catch (error) {
            setAlert({
                display: true,
                status: false,
                text: 'Failed to reset password. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div data-theme={"myTheme"} className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                {alert.display && <Alert msg={alert} />}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full  text-black p-2 rounded mt-4 btn btn-primary "
                    >
                        {loading ? <Loading /> : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
