package com.csit321G5.earlytrace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.csit321G5.earlytrace.entity.Student;
import com.csit321G5.earlytrace.service.StudentService;




@RestController 
@RequestMapping(path="/api/students")
public class StudentController {
    @Autowired 
    private StudentService stserv;

    public StudentController(StudentService stserv) {
        this.stserv = stserv;
    }

    @PostMapping("/postStudent")
    public Student postStudent(@RequestBody Student student) {
        return stserv.postStudent(student);
    }

    @GetMapping("/getAllStudents")
    public List<Student> getAllStudents() {
        return stserv.getAllStudents();
    }

    @GetMapping("/getStudentById/{id}")
    public Optional<Student> getMethodName(@PathVariable Long id) {
        return stserv.getStudentById(id);
    }

    @PutMapping("/putStudent/{id}")
    public Student putStudent(@PathVariable Long id, @RequestBody Student newStudent) {
        return stserv.putStudent(id, newStudent);
    }

    @DeleteMapping("/deleteStudent/{id}")
    public String deleteStudent(@PathVariable Long id) {
        return stserv.deleteStudent(id);
    }
    
    
    

}
