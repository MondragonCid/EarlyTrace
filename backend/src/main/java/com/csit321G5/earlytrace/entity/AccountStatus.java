package com.csit321G5.earlytrace.entity;

// PENDING  = instructor waiting for admin approval
// ACTIVE   = can log in
// INACTIVE = rejected or deactivated by an admin, cannot log in
public enum AccountStatus {
    PENDING,
    ACTIVE,
    INACTIVE
}
