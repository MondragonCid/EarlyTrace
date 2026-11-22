package com.csit321G5.earlytrace.service;

import com.csit321G5.earlytrace.entity.AccountStatus;
import com.csit321G5.earlytrace.entity.Role;
import com.csit321G5.earlytrace.entity.User;
import com.csit321G5.earlytrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // The same email cannot be registered twice
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }

        // Instructors must wait for an admin to approve them.
        // Students and admins can log in right away.
        if (user.getRoleType() == Role.INSTRUCTOR) {
            user.setStatus(AccountStatus.PENDING);
        } else {
            user.setStatus(AccountStatus.ACTIVE);
        }

        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Wrong email or password"));

        if (!user.getPasswordHash().equals(password)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong email or password");
        }

        if (user.getStatus() == AccountStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Account is waiting for admin approval");
        }
        if (user.getStatus() == AccountStatus.INACTIVE) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Account is inactive");
        }

        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found with id: " + id));

        user.setEmail(userDetails.getEmail());
        user.setPasswordHash(userDetails.getPasswordHash());
        user.setFullName(userDetails.getFullName());
        user.setRoleType(userDetails.getRoleType());

        return userRepository.save(user);
    }

    public User updateStatus(Long id, AccountStatus status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found with id: " + id));

        if (status == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "status is required");
        }

        user.setStatus(status);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
