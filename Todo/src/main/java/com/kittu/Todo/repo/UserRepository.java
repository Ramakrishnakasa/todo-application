package com.kittu.Todo.repo;

import com.kittu.Todo.model.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Credentials,Long> {
 Credentials findByUsername(String username);
}
