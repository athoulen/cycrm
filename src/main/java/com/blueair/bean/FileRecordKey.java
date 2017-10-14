package com.blueair.bean;

public class FileRecordKey {
    private String impYear;

    private String impMonth;

    private String fileType;

    public String getImpYear() {
        return impYear;
    }

    public void setImpYear(String impYear) {
        this.impYear = impYear == null ? null : impYear.trim();
    }

    public String getImpMonth() {
        return impMonth;
    }

    public void setImpMonth(String impMonth) {
        this.impMonth = impMonth == null ? null : impMonth.trim();
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType == null ? null : fileType.trim();
    }
}