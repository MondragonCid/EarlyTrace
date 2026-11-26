package com.csit321G5.earlytrace.service.csv.parser;

import java.util.List;

import org.apache.commons.csv.CSVParser;

import com.csit321G5.earlytrace.dto.ImportedSubmission;

public interface PlatformCsvParser {
    List<ImportedSubmission> parse(CSVParser parser);
}
