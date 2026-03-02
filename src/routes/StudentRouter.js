import { Router } from 'express';
import { StudentController } from '../controllers/StudentController.js';

const router = Router();

router.post('/addstudent', StudentController.addStudent);
router.get('/students', StudentController.getAllStudents);
router.put('/update/:id', StudentController.updateStudent);
router.delete('/delete/:id', StudentController.deleteStudent);

export default router;
