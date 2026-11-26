package com.csit321G5.earlytrace.service.csv.parser;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;

import com.csit321G5.earlytrace.dto.ImportedSubmission;

@Component 
public class TeamsCsvParser implements PlatformCsvParser{
    @Override 
    public List<ImportedSubmission> parse(CSVParser parser) {
        List<ImportedSubmission> submissions = new ArrayList<>();

        for(CSVRecord record:parser) {
            ImportedSubmission submission = new ImportedSubmission(
                CsvParserSupport.getValue(record, "Student"),
                CsvParserSupport.getValue(record, "Email"),
                CsvParserSupport.getValue(record, "Assignment"),
                CsvParserSupport.getDecimal(record, "Points Earned"),
                CsvParserSupport.getDecimal(record, "Points Possible"),
                CsvParserSupport.normalizeStatus(record, "Submission Status")
                
            );

            submissions.add(submission);
        }
        return submissions;
    }
}
