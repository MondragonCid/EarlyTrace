package com.csit321G5.earlytrace.dto;

// Body of POST /api/users/login: { "email": "...", "password": "..." }
public class LoginRequest {
    private String email;
    private String password;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
