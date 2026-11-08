package com.csit321G5.earlytrace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csit321G5.earlytrace.entity.Course;
import com.csit321G5.earlytrace.service.CourseService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController 
@RequestMapping(path="/api/courses")

public class CourseController {
    @Autowired 
    private CourseService cserv;

    @PostMapping("/postCourse")
    public Course postMethodName(@RequestBody Course course) {      
        return cserv.postCourse(course);
    }

    @GetMapping("/getAllCourses")
    public List<Course> getAllCourses() {
        return cserv.getAllCourses();
    }

    @GetMapping("/getCourseById")
    public Optional<Course> getCourseById(@RequestParam Long courseId) {
        return cserv.getCourseById(courseId);
    }

    @PutMapping("/putCourseDetails")
    public Course putCourseDetails(@RequestParam Long courseId,@RequestBody Course newCourse) {
        return cserv.putCourseDetails(courseId, newCourse);
    }

    @DeleteMapping("/deleteCourse/{courseId}")
    public String deleteCourse(@PathVariable Long courseId) {
        return cserv.deleteCourse(courseId);
    }
    
    
    



}
