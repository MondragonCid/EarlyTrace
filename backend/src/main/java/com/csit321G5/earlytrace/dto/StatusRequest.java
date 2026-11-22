package com.csit321G5.earlytrace.dto;

import com.csit321G5.earlytrace.entity.AccountStatus;

// Body of PUT /api/users/updateStatus/{id}: { "status": "ACTIVE" }
public class StatusRequest {
    private AccountStatus status;

    public AccountStatus getStatus() { return status; }
    public void setStatus(AccountStatus status) { this.status = status; }
}
