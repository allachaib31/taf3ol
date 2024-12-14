//export const host = `http://localhost:5000/`
export const host = `/`;
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
export const updateCategorieRoute = `${host}api/v1.0/admin/updateCategorie`;
export const deleteCategorieRoute = `${host}api/v1.0/admin/deleteCategorie`;
export const addServiceRoute = `${host}api/v1.0/admin/addService`;
export const addTypeServiceRoute = `${host}api/v1.0/admin/addTypeService`;
export const addProductApiRoute = `${host}api/v1.0/admin/addProductsApi`;
export const addProductRoute = `${host}api/v1.0/admin/addProduct`;
export const getProductsRoute = `${host}api/v1.0/admin/getProducts`;
export const getProductsStockRoute = `${host}api/v1.0/admin/getProductsStock`;
export const updateTypeServiceRoute = `${host}api/v1.0/admin/updateTypeService`;
export const updateTypeServiceRankingRoute = `${host}api/v1.0/admin/updateTypeServiceRanking`;
export const deleteTypeServiceRoute = `${host}api/v1.0/admin/deleteTypeService`
export const getCategoriesRoute = `${host}api/v1.0/admin/getCategories`;
export const getCategorieServicesApiRoute = `${host}api/v1.0/admin/getCategorieServicesApiRoute`;
export const getServicesApiRoute = `${host}api/v1.0/admin/getServicesApi`;
export const getTypeServicesRoute = `${host}api/v1.0/admin/getTypeServices`;
export const searchServiceRoute = `${host}api/v1.0/admin/searchService`;
export const addGroupMoneyRoute = `${host}api/v1.0/admin/addGroupMoney`;
export const updateGroupMoneyRoute = `${host}api/v1.0/admin/updateGroupMoney`;
export const deleteGroupMoneyRoute = `${host}api/v1.0/admin/deleteGroupMoney`;
export const getGroupMoneyRoute = `${host}api/v1.0/admin/getGroupMoney`;
// manage notification
export const getNotificationAdminRoute = `${host}api/v1.0/admin/getNotificationAdmin`;
export const getMessageRoute = `${host}api/v1.0/admin/getMessage`;
// manage file
export const getFileRoute = `${host}api/v1.0/file/`