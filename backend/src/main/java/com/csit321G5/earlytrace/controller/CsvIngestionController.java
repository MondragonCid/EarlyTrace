package com.csit321G5.earlytrace.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.csit321G5.earlytrace.service.CsvIngestionService;


@RestController
@RequestMapping("/api/csv-ingestion")
public class CsvIngestionController {

    private final CsvIngestionService csvingestionservice;

    public CsvIngestionController(CsvIngestionService csvingestionservice) {
        this.csvingestionservice = csvingestionservice;
    }

    @PostMapping("/uploadCsv")

    // key value must be "file" in Postman form-data
    public ResponseEntity<?> uploadCsv(@RequestParam ("file") MultipartFile file) {
        if(file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Please upload a CSV file."));
        }

        String filename = file.getOriginalFilename();

        if(filename == null || !filename.toLowerCase().endsWith(".csv")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid file type. Only CSV files allowed."));
        }

        try {
            int totalRecords = csvingestionservice.readAndParseCsv(file);
            return ResponseEntity.ok(Map.of(
            "message", "CSV file uploaded successfully.",
            "filename", filename,
            "size", file.getSize(),
            "totalRecords", totalRecords
        ));  


        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "message", "Error processing CSV file.",
                "error", e.getMessage()
            ));
        }

        
    }
}

