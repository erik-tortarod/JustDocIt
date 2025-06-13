package com.api.api.controller;

import com.api.api.service.UserService;
import com.api.api.service.RepositoryService;
import com.api.api.service.CodeDocumentationService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * REST Controller for generating reports. This controller handles operations related to
 * report generation.
 */
@RestController
@RequestMapping("/api/reports")
public class ReportController {

	@Autowired
	private UserService userService;

	@Autowired
	private RepositoryService repositoryService;

	@Autowired
	private CodeDocumentationService codeDocumentationService;

	/**
	 * Generates a PDF report with user statistics.
	 * @return ResponseEntity containing the PDF report as a byte array
	 */
	@GetMapping("/users")
	public ResponseEntity<byte[]> generateUserReport() {
		try {
			// Create a new document
			Document document = new Document();
			ByteArrayOutputStream out = new ByteArrayOutputStream();

			// Create a PDF writer
			PdfWriter.getInstance(document, out);

			// Open the document
			document.open();

			// Add title
			Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLACK);
			Paragraph title = new Paragraph("User Statistics Report", titleFont);
			title.setAlignment(Element.ALIGN_CENTER);
			title.setSpacingAfter(20);
			document.add(title);

			// Add generation date
			Font dateFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
			String currentDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			Paragraph date = new Paragraph("Generated on: " + currentDate, dateFont);
			date.setAlignment(Element.ALIGN_CENTER);
			date.setSpacingAfter(20);
			document.add(date);

			// Add total users
			Font contentFont = FontFactory.getFont(FontFactory.HELVETICA, 14, BaseColor.BLACK);
			long totalUsers = userService.getTotalUsers();
			Paragraph users = new Paragraph("Total Users: " + totalUsers, contentFont);
			users.setSpacingAfter(10);
			document.add(users);

			// Add total repositories
			long totalRepositories = repositoryService.getAllRepositories().size();
			Paragraph repos = new Paragraph("Total Repositories: " + totalRepositories, contentFont);
			repos.setSpacingAfter(10);
			document.add(repos);

			// Add total documented files
			long totalDocumentedFiles = codeDocumentationService.getAllDocumentations().size();
			Paragraph docs = new Paragraph("Total Documented Files: " + totalDocumentedFiles, contentFont);
			docs.setSpacingAfter(10);
			document.add(docs);

			// Close the document
			document.close();

			// Set up the response headers
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("attachment", "user-report.pdf");

			return ResponseEntity.ok().headers(headers).body(out.toByteArray());

		}
		catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

}