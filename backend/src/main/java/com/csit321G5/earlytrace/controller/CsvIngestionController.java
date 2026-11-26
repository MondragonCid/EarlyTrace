
package com.csit321G5.earlytrace.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.csit321G5.earlytrace.service.csv.CsvPlatform;
import com.csit321G5.earlytrace.service.csv.parser.CsvDatabaseImportService;

@RestController
@RequestMapping("/api/csv-ingestion")
public class CsvIngestionController {

    private final CsvDatabaseImportService csvdbimportservice;

    public CsvIngestionController(CsvDatabaseImportService csvdbimportservice) {
        this.csvdbimportservice = csvdbimportservice;
    }

    @PostMapping("/uploadCsv")
    public ResponseEntity<?> uploadCsv(
        @RequestParam("file") MultipartFile file,
        @RequestParam("platform") CsvPlatform platform,
        @RequestParam("courseId") Long courseId,
        @RequestParam("instructorId") Long instructorId
    ) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(
                Map.of("message", "Please upload a CSV file."));
            }
            
            if(!file.getOriginalFilename().toLowerCase().endsWith(".csv")) {
                return ResponseEntity.badRequest().body(
                Map.of("message", "Only CSV files allowed."));
            }
            
            int recordsImported = csvdbimportservice.importCsv(file, platform, courseId, instructorId);

            return ResponseEntity.ok(Map.of(
                "message", "CSV file uploaded and validated successfully.",
                "filename", file.getOriginalFilename(),
                "platform", platform.name(),
                "courseId", courseId,
                "recordsImported", recordsImported
            ));
        } catch(IllegalArgumentException e) {
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


