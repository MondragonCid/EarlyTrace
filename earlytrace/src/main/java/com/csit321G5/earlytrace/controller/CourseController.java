package com.csit321G5.earlytrace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.csit321G5.earlytrace.entity.Course;
import com.csit321G5.earlytrace.service.CourseService;

import org.springframework.web.bind.annotation.*;




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

    @GetMapping("/getCourseById/{courseId}")
    public Optional<Course> getCourseById(@PathVariable Long courseId) {
        return cserv.getCourseById(courseId);
    }

    @PutMapping("/putCourseDetails/{courseId}")
    public Course putCourseDetails(@PathVariable Long courseId,@RequestBody Course newCourse) {
        return cserv.putCourseDetails(courseId, newCourse);
    }

    @DeleteMapping("/deleteCourse/{courseId}")
    public String deleteCourse(@PathVariable Long courseId) {
        return cserv.deleteCourse(courseId);
    }
    
    
    



}
