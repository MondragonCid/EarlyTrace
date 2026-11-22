package com.csit321G5.earlytrace.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service 
public class CsvIngestionService {
    private final CsvValidationService csvvalidationservice;

    public CsvIngestionService(CsvValidationService csvvalidationservice) {
        this.csvvalidationservice = csvvalidationservice;
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
            List<String> missingHeaders = csvvalidationservice.findMissingHeaders(
                parser.getHeaderMap().keySet()
            );

            if(!missingHeaders.isEmpty()) {
                throw new IllegalArgumentException(
                    "Missing required CSV headers: " + String.join(", ", missingHeaders)
                );
            }

            int rowCount = 0;

            for(CSVRecord record : parser) {
                rowCount++;
            }

            return rowCount;
        }
        
    }
}
