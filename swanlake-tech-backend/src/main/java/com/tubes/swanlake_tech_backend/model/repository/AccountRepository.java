package com.tubes.swanlake_tech_backend.model.repository;

import com.tubes.swanlake_tech_backend.model.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository <Account, Long> {

}