package com.csit321G5.earlytrace.service.csv;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

@Service 
public class CsvRowValidationService {

    private static final Set<String> ALLOWED_STATUSES = Set.of(
        "ON_TIME",
        "LATE",
        "MISSING"
    );

    // email formatting check 
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    public List<String> validateRow(CSVRecord record) {
        List<String> errors = new ArrayList<>();

        String firstName = record.get("First name").trim();
        String lastName = record.get("Last name").trim();
        String email = record.get("Email address").trim();
        String assignmentTitle = record.get("Assignment title").trim();
        String pointsValue = record.get("Points").trim();
        String maxPointsValue = record.get("Maximum points").trim();
        String status = record.get("Submission status").trim().toUpperCase();

        long rowNum = record.getRecordNumber() + 1;

        // validation for each attr
        if(firstName.isEmpty()) { errors.add("Row " + rowNum + ": First name required.");}
        if(lastName.isEmpty()) { errors.add("Row " + rowNum + ": Last name required.");}
        if(email.isEmpty()) { 
            errors.add("Row " + rowNum + ": Email address required.");
        } else if (!EMAIL_PATTERN.matcher(email).matches()) {
            errors.add("Row " + rowNum + ": Invalid email address.");
        }
        if(assignmentTitle.isEmpty()) { errors.add("Row " + rowNum + ": Assignment title required.");}
        if(status.isEmpty()) { 
            errors.add("Row " + rowNum + ": Submission status required.");
        } else if (!ALLOWED_STATUSES.contains(status)) {
            errors.add("Row " + rowNum + ": Invalid submission status '" + status + "'. Allowed values: ON_TIME, LATE, MISSING");
        }

        // validate pts & max pts
        BigDecimal points = null;
        BigDecimal maxPoints = null;

        try {
            if(pointsValue.isEmpty()) {
                errors.add("Row " + rowNum + ": Points required");
            } else {
                points = new BigDecimal(pointsValue);

                if(points.compareTo(BigDecimal.ZERO) < 0) {
                    errors.add("Row " + rowNum + ": Points cannot be negative");
                }
            }
        } catch (NumberFormatException e) {
            errors.add("Row " + rowNum + ": Points must be numeric");
        }

        try {
            if(maxPointsValue.isEmpty()) {
                errors.add("Row " + rowNum + ": Maximum points required");
            } else {
                maxPoints = new BigDecimal(maxPointsValue);

                if(maxPoints.compareTo(BigDecimal.ZERO) < 0) {
                    errors.add("Row " + rowNum + ": Maximum points cannot be negative");
                }
            }
        } catch (NumberFormatException e) {
            errors.add("Row " + rowNum + ": Maximum points must be numeric");
        }

        // ensures pts <= max pts
        if(points != null && maxPoints != null
            && points.compareTo(BigDecimal.ZERO) >= 0
            && maxPoints.compareTo(BigDecimal.ZERO) >= 0
            && points.compareTo(maxPoints) > 0) {
                errors.add("Row " + rowNum + ": Points cannot exceed maximum points");
        }

        return errors;
        
    }

    

}
