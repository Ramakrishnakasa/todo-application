package com.kittu.Todo.controllers;

import com.kittu.Todo.model.todolist;
import com.kittu.Todo.repo.todorepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")

public class TodoController {

    @Autowired
    private todorepo todoRepo;

    @GetMapping
    public List<todolist> getAllTodos() {
        return todoRepo.findAll();
    }

    @PostMapping
    public todolist createTodo(@RequestBody todolist todo) {
        return todoRepo.save(todo); // Saves the entity with the correct description
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepo.deleteById(id);
    }
    @PutMapping("/{id}")
    public todolist updateTodo(@PathVariable Long id, @RequestBody todolist updatedTodo) {
        if (todoRepo.existsById(id)) {
            updatedTodo.setId(id);  // Set the ID to ensure we update the correct todo
            return todoRepo.save(updatedTodo);
        } else {
            throw new RuntimeException("Todo not found");
        }
    }
}
