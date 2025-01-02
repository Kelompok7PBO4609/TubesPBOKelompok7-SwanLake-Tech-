package com.tubes.swanlake_tech_backend.controller;

import com.tubes.swanlake_tech_backend.model.entity.Comment;
import com.tubes.swanlake_tech_backend.model.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/get/comment")
    List<Comment> getAllComment() {
        return commentRepository.findAll();
    }

    @PostMapping("/post/comment")
    public ResponseEntity<?> newComment(@RequestBody Comment newComment) {
        Comment savedComment = commentRepository.save(newComment);
        return ResponseEntity.ok(savedComment);
    }
}