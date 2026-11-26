
package com.csit321G5.earlytrace.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.csit321G5.earlytrace.service.csv.CsvIngestionService;
import com.csit321G5.earlytrace.service.csv.CsvPlatform;

@RestController
@RequestMapping("/api/csv-ingestion")
public class CsvIngestionController {

    private final CsvIngestionService csvIngestionService;

    public CsvIngestionController(CsvIngestionService csvIngestionService) {
        this.csvIngestionService = csvIngestionService;
    }

    @PostMapping("/uploadCsv")
    public ResponseEntity<?> uploadCsv(
        @RequestParam("file") MultipartFile file,
        @RequestParam("platform") CsvPlatform platform
    ) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(
                Map.of("message", "Please upload a CSV file.")
            );
        }

        String filename = file.getOriginalFilename();

        if (filename == null || !filename.toLowerCase().endsWith(".csv")) {
            return ResponseEntity.badRequest().body(
                Map.of("message", "Invalid file type. Only CSV files allowed.")
            );
        }

        try {
            int totalRecords =
                csvIngestionService.readAndParseCsv(file, platform);

            return ResponseEntity.ok(Map.of(
                "message", "CSV file uploaded and validated successfully.",
                "filename", filename,
                "platform", platform.name(),
                "size", file.getSize(),
                "recordsFound", totalRecords
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
            );

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                Map.of("message", "An error occurred while processing the CSV file.")
            );
        }
    }
}


