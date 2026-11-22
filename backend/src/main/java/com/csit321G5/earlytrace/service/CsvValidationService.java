package com.csit321G5.earlytrace.service;

import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class CsvValidationService {
    // defines columns current sample CSV expects
    private final List<String> requiredHeaders = List.of(
        "First Name",
        "Last Name",
        "Email Address",
        "Assignment Title",
        "Points",
        "Maximum Points",
        "Submission Status",
        "Feedback"
    );

    // returns any required cols not present
    public List<String> findMissingHeaders(Set<String> uploadedHeaders) {
        // uploaded contains actual col names in file; normalized cleans formatting
        Set<String> normalizedHeaders = uploadedHeaders.stream()
        .map(header -> header.replace("\uFEFF", "").trim().toLowerCase(Locale.ROOT))
        .collect(java.util.stream.Collectors.toSet());

        return requiredHeaders.stream()
        .filter(header -> !normalizedHeaders.contains(header.toLowerCase(Locale.ROOT)))
        .toList();
    }

}
