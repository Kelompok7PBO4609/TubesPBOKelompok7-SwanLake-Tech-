package com.tubes.swanlake_tech_backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewID;

    @Column(nullable = false, unique = true)
    private String productName;

    @Column(nullable = false)
    private String productType;

    @Column(nullable = false)
    private String reviewTitle;

    @Column
    private String cardDesc;

    @Column
    private String processor;

    @Column
    private String processorDesc;

    @Column
    private String ram;

    @Column
    private String ramDesc;

    @Column
    private String storage;

    @Column
    private String storageDesc;

    @Column
    private String display;

    @Column
    private String displayDesc;

    @Column
    private String battery;

    @Column
    private String batteryDesc;

    @Column
    private String camera;

    @Column
    private String cameraDesc;

    @Column
    private int price;

    @Column
    private String reviewText;

    @Column
    private String imageName;

    @Column
    private Double rating;

    @Column
    private String keyFeatures;

    @Column
    private String performance;

    @Column
    private LocalDate date;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
}