package com.csit321G5.earlytrace.service.csv;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class CsvValidationService {
    // defines columns current sample CSV expects
    private final Map<CsvPlatform, List<String>> REQUIRED_HEADERS = Map.of(
        CsvPlatform.CODECHUM, List.of(
            "Student Name",
            "Student Email",
            "Problem Name",
            "Score",
            "Total Score",
            "Status"
        ),

        CsvPlatform.GOOGLE_FORMS, List.of(
            "Name",
            "Email Address",
            "Quiz Title",
            "Score",
            "Max Score",
            "Submission Status"
        ),

        CsvPlatform.MS_TEAMS, List.of(
            "Student",
            "Email",
            "Assignment",
            "Points Earned",
            "Points Possible",
            "Submission Status"
        )
    );

    // returns any required cols not present
    public List<String> findMissingHeaders(CsvPlatform platform, Set<String> uploadedHeaders) {

        List<String> requiredHeaders = REQUIRED_HEADERS.get(platform);

        if(requiredHeaders == null) {
            throw new IllegalArgumentException("Unsupported CSV platform: " + platform);
        }


        // uploaded contains actual col names in file; normalized cleans formatting
        Set<String> normalizedHeaders = uploadedHeaders.stream()
        .map(this::normalizeHeader)
        .collect(Collectors.toSet());

        return requiredHeaders.stream()
        .filter(header -> !normalizedHeaders.contains(normalizeHeader(header)))
        .toList();
    }

    private String normalizeHeader(String header) {
        return header.replace("\uFEFF", "").trim().toLowerCase();
    }

}
