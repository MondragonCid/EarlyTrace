package com.csit321G5.earlytrace.service.csv;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;


import org.springframework.stereotype.Service;

import com.csit321G5.earlytrace.dto.ImportedSubmission;

@Service 
public class CsvRowValidationService {

    private static final Set<String> ALLOWED_STATUSES = 
        Set.of("ON_TIME", "LATE", "MISSING");

    // email formatting check 
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    public List<String> validateSubmission(ImportedSubmission submission, int rowNum) {
        List<String> errors = new ArrayList<>();

        if(submission.getStudentName() == null || submission.getStudentName().isBlank()) {
            errors.add("Row " + rowNum + ": Student name required");
        }


        if(submission.getStudentEmail() == null || !EMAIL_PATTERN.matcher(submission.getStudentEmail()).matches()) {
            errors.add("Row " + rowNum + ": Invalid student email");
        }

        if(submission.getAssessmentTitle() == null || submission.getAssessmentTitle().isBlank()) {
            errors.add("Row " + rowNum + ": Assessment title required");
        }

        String status = submission.getSubmissionStatus();
        if(status == null || !ALLOWED_STATUSES.contains(status)) {
            errors.add("Row " + rowNum + ": Invalid submission status: " + status);
        }

        BigDecimal score = submission.getScore();
        BigDecimal total = submission.getTotal();

        if(score == null) {
            errors.add("Row " + rowNum + ": Score required");
        } else if(total == null) {
            errors.add("Row " + rowNum + ": Maximum score required");
        } else if(score != null && total != null) {
            if(score.compareTo(BigDecimal.ZERO) < 0) {
                errors.add("Row " + rowNum + ": Score cannot be negative");
            }
            if(total.compareTo(BigDecimal.ZERO) <= 0) {
                errors.add("Row " + rowNum + ": Maximum score must be greater than zero");
            }
            if(score.compareTo(total) > 0) {
                errors.add("Row " + rowNum + ": Score cannot exceed maximum score");
            }
        }

        return errors;
    }

    

}
