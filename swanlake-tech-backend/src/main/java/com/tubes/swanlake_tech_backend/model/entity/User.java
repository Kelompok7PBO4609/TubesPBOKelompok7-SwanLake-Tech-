package com.tubes.swanlake_tech_backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User extends Account{
    @Column(nullable = false, unique = true)
    private String email;

    public User(String username, String password, String email) {
        super(username, password);
        this.email = email;
        this.setRole("USER");
    }
}
