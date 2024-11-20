package com.kittu.Todo.repo;


import com.kittu.Todo.model.todolist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface todorepo extends JpaRepository<todolist, Long> {
    List<todolist> findByDescriptionContainingIgnoreCase(String query);
}


