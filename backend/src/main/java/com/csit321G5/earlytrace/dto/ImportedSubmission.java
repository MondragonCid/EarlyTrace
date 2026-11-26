package com.csit321G5.earlytrace.dto;

import java.math.BigDecimal;

public class ImportedSubmission {
    private String studentName;
    private String studentEmail;
    private String assessmentTitle;
    private BigDecimal score;
    private BigDecimal total;
    private String submissionStatus;

    public ImportedSubmission(){}

    public ImportedSubmission(String studentName, String studentEmail, String assessmentTitle,
        BigDecimal score, BigDecimal total, String submissionStatus) {
            this.studentName = studentName;
            this.studentEmail = studentEmail;
            this.assessmentTitle = assessmentTitle;
            this.score = score;
            this.total = total;
            this.submissionStatus = submissionStatus;
     }

    public String getStudentName(){ return studentName; }
    public String getStudentEmail(){ return studentEmail; }
    public String getAssessmentTitle(){ return assessmentTitle; }
    public BigDecimal getScore(){ return score; }
    public BigDecimal getTotal(){ return total; }
    public String getSubmissionStatus(){ return submissionStatus; }

    public void setStudentName(String studentName){ this.studentName= studentName; }
    public void setStudentEmail(String studentEmail){ this.studentEmail=  studentEmail; }
    public void setAssessmentTitle(String assessmentTitle){ this.assessmentTitle=  assessmentTitle; }
    public void setScore(BigDecimal score){ this.score=  score; }
    public void setTotal(BigDecimal total){ this.total=  total; }
    public void setSubmissionStatus(String submissionStatus){ this.submissionStatus=  submissionStatus; }



    

}
