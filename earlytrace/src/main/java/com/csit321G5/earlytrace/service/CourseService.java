package com.csit321G5.earlytrace.service;

import java.util.*;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit321G5.earlytrace.entity.Course;
import com.csit321G5.earlytrace.repository.CourseRepository;

@Service 
public class CourseService {
    @Autowired 
    private CourseRepository crepo;

    // post
    public Course postCourse(Course course) {
        return crepo.save(course);
    }

    // get
    public List<Course> getAllCourses() {
        return crepo.findAll();
    }

    public Optional<Course> getCourseById(Long courseId) {
        return crepo.findById(courseId);
    }

    // put
    public Course putCourseDetails(Long courseId, Course newCourseDetails) {
        Course course = crepo.findById(courseId).get();

        try {
            course.setCourseTitle(newCourseDetails.getCourseTitle());
            course.setCourseCode(newCourseDetails.getCourseCode());
        } catch(NoSuchElementException ex) {
            throw new NameNotFoundException("Course " + courseId + " does not exist");
        } finally {
            return crepo.save(course);
        }     
    }

    
    // delete
    public String deleteCourse(Long courseId) {
        String msg = "";

        if(crepo.existsById(courseId)) {
            crepo.deleteById(courseId);
            msg = "Course " + courseId + " successfully deleted";
        } else {
            msg = "Error: Course " + courseId + " not found";
        }

        return msg;
    }

}
