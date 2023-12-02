const express = require('express'); 
const router = express.Router();
const { 
    createUserCtrl, 
    loginUserCtrl, 
    getAllUserCtrl, 
    getSingleUserCtrl, 
    deleteUserCtrl, 
    updateUserCtrl 
} = require('../controller/userCtrl');
const { 
    authMiddleWare, 
    isAdminMiddleWare 
} = require('../middlewares/authMiddleware');


router.post('/register', createUserCtrl);
router.post('/login', loginUserCtrl);
router.get('/all-users', getAllUserCtrl);
router.get('/:id', authMiddleWare, isAdminMiddleWare ,getSingleUserCtrl);
router.delete('/delete/:id', deleteUserCtrl);
router.put('/update/:id', authMiddleWare, updateUserCtrl);


module.exports = router;