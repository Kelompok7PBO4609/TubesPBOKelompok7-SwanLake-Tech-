package com.tubes.swanlake_tech_backend.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Account")
public abstract class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    protected UUID accountID;
    protected String username;
    protected String password;

    public abstract void login();
}
