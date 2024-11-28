package com.tubes.swanlake_tech_backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends Account{
    public Admin(String username, String password) {
        super(username, password);
    }
}
