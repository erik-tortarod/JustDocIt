package com.api.api.controller;

import com.api.api.model.Repository;
import com.api.api.service.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/repositories")
public class PublicRepositoryController {

	@Autowired
	private RepositoryService repositoryService;

	@PostMapping("/{id}/visit")
	public ResponseEntity<Repository> incrementVisit(@PathVariable String id) {
		Repository repository = repositoryService.findById(id);
		if (repository == null) {
			return ResponseEntity.notFound().build();
		}
		int currentVisits = repository.getVisits();
		repository.setVisits(currentVisits + 1);
		Repository savedRepository = repositoryService.saveRepository(repository);
		return ResponseEntity.ok(savedRepository);
	}

	@GetMapping("/{id}/visits")
	public ResponseEntity<Integer> getVisits(@PathVariable String id) {
		Repository repository = repositoryService.findById(id);
		if (repository == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repository.getVisits());
	}

	@GetMapping("/user/{userId}/total-visits")
	public ResponseEntity<Integer> getUserTotalVisits(@PathVariable String userId) {
		List<Repository> userRepositories = repositoryService.findByUserId(userId);
		if (userRepositories == null || userRepositories.isEmpty()) {
			return ResponseEntity.ok(0);
		}
		int totalVisits = userRepositories.stream().mapToInt(Repository::getVisits).sum();
		return ResponseEntity.ok(totalVisits);
	}

}
