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

@Service 
public class CsvIngestionService {
    private final CsvValidationService csvvalidationservice;
    private final CsvRowValidationService csvrowvalidationservice;

    public CsvIngestionService(CsvValidationService csvvalidationservice,
        CsvRowValidationService csvrowvalidationservice) {
        this.csvvalidationservice = csvvalidationservice;
        this.csvrowvalidationservice = csvrowvalidationservice;
    }

    // read & parse CSV file and count records
    public int readAndParseCsv(MultipartFile file) throws Exception {

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
                parser.getHeaderMap().keySet()
            );

            if(!missingHeaders.isEmpty()) {
                throw new IllegalArgumentException(
                    "Missing required CSV headers: " + String.join(", ", missingHeaders)
                );
            }

            // validate individual rows
            List<String> validationErrors = new ArrayList<>();

            int rowCount = 0;

            for(CSVRecord record : parser) {
                rowCount++;
                
                List<String> rowErrors = csvrowvalidationservice.validateRow(record);

                System.out.println("ROW ERRORS: "+ rowErrors);

                validationErrors.addAll(rowErrors);
            }

            // reject file if row contains errors
            if(!validationErrors.isEmpty()) {
                throw new IllegalArgumentException("CSV row validation failed:\n" + String.join("\n", validationErrors));
            }

            return rowCount;
        }
        
    }
}
