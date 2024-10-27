export const host = `http://localhost:5000/`

// admin routes
// auth
export const authAdminRoute = `${host}api/v1.0/admin/auth`;
export const forgetPasswordAdminRoute = `${host}api/v1.0/admin/forgot-password`;
export const resetPasswordAdminRoute = `${host}api/v1.0/admin/reset-password/`
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
export const changeStatusUserRoute = `${host}api/v1.0/admin/changeStatus`;
export const deleteUserRoute = `${host}api/v1.0/admin/deleteUser`;
export const getUsersRoute = `${host}api/v1.0/admin/getUsers`;
export const searchUserRoute = `${host}api/v1.0/admin/searchUser`;
// manage services
export const addCategorieRoute = `${host}api/v1.0/admin/addCategorie`;
export const addServiceRoute = `${host}api/v1.0/admin/addService`;
export const addTypeCategorieRoute = `${host}api/v1.0/admin/addTypeCategorie`;
export const getCategoriesRoute = `${host}api/v1.0/admin/getCategories`;
export const getServicesRoute = `${host}api/v1.0/admin/getServices`;
export const getTypeCategoriesRoute = `${host}api/v1.0/admin/getTypeCategories`;
export const searchServiceRoute = `${host}api/v1.0/admin/searchService`;
// manage notification
export const getNotificationAdminRoute = `${host}api/v1.0/admin/getNotificationAdmin`;
export const getMessageRoute = `${host}api/v1.0/admin/getMessage`;