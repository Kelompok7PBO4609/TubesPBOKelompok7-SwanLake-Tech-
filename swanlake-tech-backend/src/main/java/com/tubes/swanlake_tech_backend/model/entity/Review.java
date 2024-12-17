package com.tubes.swanlake_tech_backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
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

    @Column(nullable = false)
    private String processor;

    @Column(nullable = false)
    private String processorDesc;

    @Column(nullable = false)
    private String RAM;

    @Column(nullable = false)
    private String RAMDesc;

    @Column(nullable = false)
    private String storage;

    @Column(nullable = false)
    private String storageDesc;

    @Column(nullable = false)
    private String display;

    @Column(nullable = false)
    private String displayDesc;

    @Column(nullable = false)
    private String battery;

    @Column(nullable = false)
    private String batteryDesc;

    @Column(nullable = false)
    private String camera;

    @Column(nullable = false)
    private String cameraDesc;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String reviewText;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
}
