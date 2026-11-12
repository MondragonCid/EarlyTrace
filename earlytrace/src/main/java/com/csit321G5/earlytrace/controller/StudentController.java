package com.csit321G5.earlytrace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csit321G5.earlytrace.entity.Student;
import com.csit321G5.earlytrace.service.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




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

    @GetMapping("path")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @GetMapping("path")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @PutMapping("path/{id}")
    public String putMethodName(@PathVariable String id, @RequestBody String entity) {
        //TODO: process PUT request
        
        return entity;
    }

    @DeleteMapping 
    
    
    

}
