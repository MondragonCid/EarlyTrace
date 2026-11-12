package com.csit321G5.earlytrace.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit321G5.earlytrace.entity.Student;
import com.csit321G5.earlytrace.repository.StudentRepository;

@Service 
public class StudentService {
    @Autowired 
    private StudentRepository strepo;

    public StudentService(StudentRepository strepo) { this.strepo = strepo; }

    public Student postStudent(Student student) {
        return strepo.save(student);
    }

    public List<Student> getAllStudents() {
        return strepo.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return strepo.findById(id);
    }

    public Student putStudent(Long id, Student newDetails) {
        Student s = strepo.findById(id).get();
        s.setEmail(newDetails.getEmail());
        s.setFullName(newDetails.getFullName());
        s.setPasswordHash(newDetails.getPasswordHash());
        s.setProgram(newDetails.getProgram());
        s.setStudentNo(newDetails.getStudentNo());
        s.setYearLevel(newDetails.getYearLevel());

        return strepo.save(s);
    }

    public String deleteStudent(Long id) {
        String msg = " ";
        if(strepo.existsById(id)) {
            strepo.deleteById(id);
            msg = "Student " + id + " successfully deleted";
        } else {
            msg = "Student " + id + " does not exist";
        }
        return msg;
    }

}
