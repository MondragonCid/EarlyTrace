package com.csit321G5.earlytrace.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service 
public class CsvIngestionService {
    public int readAndParseCsv(MultipartFile file) throws Exception {
        // read & parse CSV file and count records
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
            int rowCount = 0;

            for(CSVRecord record : parser) {
                rowCount++;
            }

            return rowCount;
        }
        
    }
}
