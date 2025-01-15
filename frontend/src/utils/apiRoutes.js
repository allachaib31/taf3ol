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
export const deleteUsersRoute = `${host}api/v1.0/admin/deleteUsers`;
export const addBalanceRoute = `${host}api/v1.0/admin/addBalance`;
export const reduceBalanceRoute = `${host}api/v1.0/admin/reduceBalance`;
export const addNegativeBalanceRoute = `${host}api/v1.0/admin/addNegativeBalance`;
export const updateLevelUserGroupRoute = `${host}api/v1.0/admin/updateLevelUserGroup`;
export const addCustomPriceRoute = `${host}api/v1.0/admin/addCustomPrice`;
export const deleteCustomPriceRoute = `${host}api/v1.0/admin/deleteCustomPrice`;
export const getUsersRoute = `${host}api/v1.0/admin/getUsers`;
export const searchUserRoute = `${host}api/v1.0/admin/searchUser`;
export const getUserDataRoute = `${host}api/v1.0/admin/getUserData`;
export const getFinancialUserRoute = `${host}api/v1.0/admin/getFinancialUser`;
export const getLevelUserRoute = `${host}api/v1.0/admin/getLevelUser`;
export const getCustomPriceRoute = `${host}api/v1.0/admin/getCustomPrice`;
// manage services
export const addCategorieRoute = `${host}api/v1.0/admin/addCategorie`;
export const updateCategorieRoute = `${host}api/v1.0/admin/updateCategorie`;
export const deleteCategorieRoute = `${host}api/v1.0/admin/deleteCategorie`;
export const addServiceRoute = `${host}api/v1.0/admin/addService`;
export const addTypeServiceRoute = `${host}api/v1.0/admin/addTypeService`;
export const addProductApiRoute = `${host}api/v1.0/admin/addProductsApi`;
export const addLinkApiProductRoute = `${host}api/v1.0/admin/addLinkApiProduct`;
export const activeLinkApiProductRoute = `${host}api/v1.0/admin/activeLinkApiProduct`;
export const deleteLinkApiProductRoute = `${host}api/v1.0/admin/deleteLinkApiProduct`;
export const addProductRoute = `${host}api/v1.0/admin/addProduct`;
export const updateIdServiceProductsRoute = `${host}api/v1.0/admin/updateIdServiceProducts`;
export const updateProductGeneralRoute = `${host}api/v1.0/admin/updateProductGeneral`;
export const deleteProductsRoute = `${host}api/v1.0/admin/deleteProducts`;
export const updateProductsShowAvailableRoute = `${host}api/v1.0/admin/updateProductsShowAvailable`;
export const updateProductQuantityQualityRoute = `${host}api/v1.0/admin/updateProductQuantityQuality`;
export const updateProductRankingRoute = `${host}api/v1.0/admin/updateProductRanking`;
export const updateProductPriceRoute = `${host}api/v1.0/admin/updateProductPrice`;
export const updatePriceCategorieRoute = `${host}api/v1.0/admin/updatePriceCategorie`;
export const getProductDetailsRoute = `${host}api/v1.0/admin/getProductDetails`;
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
export const addOrderRequirementsRoute = `${host}api/v1.0/admin/addOrderRequirements`;
export const deleteOrderRequirementsRoute = `${host}api/v1.0/admin/deleteOrderRequirements/`;
export const getOrderRequirementsRoute = `${host}api/v1.0/admin/getOrderRequirements/`;
export const addGroupMoneyRoute = `${host}api/v1.0/admin/addGroupMoney`;
export const updateGroupMoneyRoute = `${host}api/v1.0/admin/updateGroupMoney`;
export const deleteGroupMoneyRoute = `${host}api/v1.0/admin/deleteGroupMoney`;
export const getGroupMoneyRoute = `${host}api/v1.0/admin/getGroupMoney`;
// manage recharge cards
export const addGroupCardsRoute = `${host}api/v1.0/admin/addGroupCards`;
export const deleteGroupCardsRoute = `${host}api/v1.0/admin/deleteGroupCards`;
export const getGroupCardsRoute = `${host}api/v1.0/admin/getGroupCards`;
export const generateRechargeCardsRoute = `${host}api/v1.0/admin/generateRechargeCards`;
export const getCardsRoute = `${host}api/v1.0/admin/getCards`;
export const deleteCardsRoute = `${host}api/v1.0/admin/deleteCards`;
// manage coins
export const addCoinsRoute = `${host}api/v1.0/admin/addCoins`;
export const updateCoinsRoute = `${host}api/v1.0/admin/updateCoins`;
export const deleteCoinsRoute = `${host}api/v1.0/admin/deleteCoins`;
export const getCoinsRoute = `${host}api/v1.0/admin/getCoins`;
// manage Stock
export const addStockRoute = `${host}api/v1.0/admin/addStock`;
export const updateStockPriceRoute = `${host}api/v1.0/admin/updateStockPrice`;
export const deleteStockRoute = `${host}api/v1.0/admin/deleteStock`;
export const getStockRoute = `${host}api/v1.0/admin/getStock`;
export const getStockInfoRoute = `${host}api/v1.0/admin/stockInfo`;
export const addItemStockRoute = `${host}api/v1.0/admin/addItemStock`;
export const deleteItemStockRoute = `${host}api/v1.0/admin/deleteItemStock`;
export const getItemStockSoldRoute = `${host}api/v1.0/admin/getItemStockSold`;
export const getItemStockAvailableRoute = `${host}api/v1.0/admin/getItemStockAvailable`;
export const getItemStockDamagedRoute = `${host}api/v1.0/admin/getItemStockDamaged`;
// manage api
export const addApiRoute = `${host}api/v1.0/admin/addApi`;
export const updateApiRoute = `${host}api/v1.0/admin/updateApi`;
export const deleteApiRoute = `${host}api/v1.0/admin/deleteApi`;
export const getApiRoute = `${host}api/v1.0/admin/getApi`;
// manage payment gateway
export const addPaymentGatewayRoute = `${host}api/v1.0/admin/addPaymentGateway`;
export const updatePaymentGatewayRoute = `${host}api/v1.0/admin/updatePaymentGateway`;
export const deletePaymentGatewayRoute = `${host}api/v1.0/admin/deletePaymentGateway`;
export const getPaymentGatewayRoute = `${host}api/v1.0/admin/getPaymentGateway`;
// manage notification
export const getNotificationAdminRoute = `${host}api/v1.0/admin/getNotificationAdmin`;
export const getMessageRoute = `${host}api/v1.0/admin/getMessage`;
// manage file
export const getFileRoute = `${host}api/v1.0/file/`