package com.csit321G5.earlytrace.entity;


import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    // WRITE_ONLY: the password can be sent TO the backend (register, reset),
    // but it is never included in the JSON the backend sends back.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role roleType;

    // PENDING, ACTIVE or INACTIVE. Set by UserService when the user registers.
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private AccountStatus status;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // constructor
    public User() {

    }

    public User(String email, String passwordHash, String fullName, Role roleType) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.roleType = roleType;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Role getRoleType() { return roleType; }
    public void setRoleType(Role roleType) { this.roleType = roleType; }

    public AccountStatus getStatus() { return status; }
    public void setStatus(AccountStatus status) { this.status = status; }

    public LocalDateTime getTimestamp() { return createdAt; }
    public void setTimestamp(LocalDateTime createdAt) { this.createdAt = createdAt; }
}