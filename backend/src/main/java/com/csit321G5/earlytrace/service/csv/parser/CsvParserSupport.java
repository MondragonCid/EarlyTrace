package com.csit321G5.earlytrace.service.csv.parser;

import java.math.BigDecimal;
import java.util.Locale;

import org.apache.commons.csv.CSVRecord;

// basis for different platform parsers
public class CsvParserSupport {

    // trim values
    public static String getValue(CSVRecord record, String col) {
        return record.get(col).trim();
    }

    // converts scores to BigDecimal
    public static BigDecimal getDecimal(CSVRecord record, String col) {
        String value = getValue(record, col);

        try {
            return new BigDecimal(value);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(
                "Row " + (record.getRecordNumber() + 1) + ": Invalid numeric value in column '" + col + "': " + value
            );
        }
    }

    // converts status to uppercase
    public static String normalizeStatus(CSVRecord record, String col) {
        return getValue(record, col).toUpperCase(Locale.ROOT);
    }

}
