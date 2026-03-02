import { db } from '../db/db.js';
import { students } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export class StudentController {

    // Add a new student
    static async addStudent(req, res) {
        try {
            const { name, email, age, course } = req.body;
            const newStudent = await db.insert(students).values({ name, email, age, course }).returning();
            res.status(201).json({ success: true, message: 'Student added successfully!', student: newStudent[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to add student. Email might already exist.' });
        }
    }

    // Get all students
    static async getAllStudents(req, res) {
        try {
            const allStudents = await db.select().from(students);
            res.status(200).json({ success: true, message: 'Students retrieved successfully!', data: allStudents });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to retrieve students.' });
        }
    }

    // Update a student
    static async updateStudent(req, res) {
        try {
            const { id } = req.params;
            const { name, email, age, course } = req.body;

            const updatedStudent = await db.update(students)
                .set({ name, email, age, course })
                .where(eq(students.id, parseInt(id)))
                .returning();

            if (updatedStudent.length === 0) {
                return res.status(404).json({ success: false, message: 'Student not found.' });
            }

            res.status(200).json({ success: true, message: 'Student updated successfully!', student: updatedStudent[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to update student.' });
        }
    }

    // Delete a student
    static async deleteStudent(req, res) {
        try {
            const { id } = req.params;

            const deletedStudent = await db.delete(students)
                .where(eq(students.id, parseInt(id)))
                .returning();

            if (deletedStudent.length === 0) {
                return res.status(404).json({ success: false, message: 'Student not found.' });
            }

            res.status(200).json({ success: true, message: 'Student deleted successfully!', student: deletedStudent[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to delete student.' });
        }
    }
}
