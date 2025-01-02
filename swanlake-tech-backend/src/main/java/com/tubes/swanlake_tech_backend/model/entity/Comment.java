package com.tubes.swanlake_tech_backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentID;

    @Column(nullable = false)
    private String commentText;

    @Column(nullable = false)
    private Long commentAccountID;

    @Column(nullable = false)
    private Long commentReviewID;

    @Column(nullable = false)
    private String commentUsername;
}