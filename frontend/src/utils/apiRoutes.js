export const host = `http://localhost:5000/`

// admin routes
// auth
export const authAdminRoute = `${host}api/v1.0/admin/auth`;
export const isValidateTokenRoute = `${host}api/v1.0/admin/isValidateToken`;
// manage admin
export const addAdminRoute = `${host}api/v1.0/admin/addAdmin`;
export const updateAdminRoute = `${host}api/v1.0/admin/updateAdmin`;
export const updatePasswordAdminRoute = `${host}api/v1.0/admin/updatePassword`;
export const blockAdminRoute = `${host}api/v1.0/admin/blockAdmin`;
export const deleteAdminRoute = `${host}api/v1.0/admin/deleteAdmin`;
export const getAdminsRoute = `${host}api/v1.0/admin/getAdmins`;
export const searchAdminRoute = `${host}api/v1.0/admin/searchAdmin`;
// manage user
export const addUserRoute = `${host}api/v1.0/admin/addUser`;
export const blockUserRoute = `${host}api/v1.0/admin/blockUser`;
export const deleteUserRoute = `${host}api/v1.0/admin/deleteUser`;
export const getUsersRoute = `${host}api/v1.0/admin/getUsers`;
export const searchUserRoute = `${host}api/v1.0/admin/searchUser`;
// manage notification
export const getNotificationAdminRoute = `${host}api/v1.0/admin/getNotificationAdmin`;
export const getMessageRoute = `${host}api/v1.0/admin/getMessage`;