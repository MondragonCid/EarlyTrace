package com.csit321G5.earlytrace.service.csv;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.csit321G5.earlytrace.dto.ImportedSubmission;
import com.csit321G5.earlytrace.service.csv.parser.CodeChumCsvParser;
import com.csit321G5.earlytrace.service.csv.parser.GoogleFormsParser;
import com.csit321G5.earlytrace.service.csv.parser.PlatformCsvParser;
import com.csit321G5.earlytrace.service.csv.parser.TeamsCsvParser;

@Service 
public class CsvIngestionService {
    private final CsvValidationService csvvalidationservice;
    private final CsvRowValidationService csvrowvalidationservice;

    private final CodeChumCsvParser codechumparser;
    private final GoogleFormsParser formsparser;
    private final TeamsCsvParser teamsparser;


    public CsvIngestionService(CsvValidationService csvvalidationservice,
        CsvRowValidationService csvrowvalidationservice, CodeChumCsvParser codechumparser,
        GoogleFormsParser formsparser, TeamsCsvParser teamsparser) {
        this.csvvalidationservice = csvvalidationservice;
        this.csvrowvalidationservice = csvrowvalidationservice;
        this.codechumparser = codechumparser;
        this.formsparser = formsparser;
        this.teamsparser = teamsparser;
    }

    // chooses parser based on uploaded platform
    private PlatformCsvParser getParser(CsvPlatform platform) {
        return switch(platform) {
            case CODECHUM -> codechumparser;
            case GOOGLE_FORMS -> formsparser;
            case MS_TEAMS -> teamsparser;
        };
    }

    // read & parse CSV file and count records
    public int readAndParseCsv(MultipartFile file, CsvPlatform platform) throws Exception {

        try(
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
            );
        

            CSVParser parser = CSVFormat.DEFAULT
                .builder()
                .setHeader()
                .setSkipHeaderRecord(true)
                .get()
                .parse(reader)
        ) {
            // validate headers
            List<String> missingHeaders = csvvalidationservice.findMissingHeaders(
                platform, parser.getHeaderMap().keySet()
            );

            if(!missingHeaders.isEmpty()) {
                throw new IllegalArgumentException(
                    "Missing required CSV headers: " + String.join(", ", missingHeaders)
                );
            }

            // parse platform-specific CSV rows into normalized records
            PlatformCsvParser platformParser = getParser(platform);
            List<ImportedSubmission> submissions = platformParser.parse(parser);

            // validate individual rows
            List<String> validationErrors = new ArrayList<>();

            int rowCount = 0;

            for(int i = 0; i < submissions.size(); i++) {             
                List<String> rowErrors = csvrowvalidationservice.validateSubmission(
                    submissions.get(i), i + 2);
                validationErrors.addAll(rowErrors);
            }

            // reject file if row contains errors
            if(!validationErrors.isEmpty()) {
                throw new IllegalArgumentException("CSV row validation failed:\n" + String.join("\n", validationErrors));
            }

            return submissions.size();
        }
        
    }
}
