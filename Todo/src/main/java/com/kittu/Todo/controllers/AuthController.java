package com.kittu.Todo.controllers;

import com.kittu.Todo.model.Credentials;
import com.kittu.Todo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Credentials user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    // Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Credentials credentials) {
        // Check if username already exists
//        Credentials user = userRepository.findByUsername(username);
        System.out.println("in register controller" + credentials.getUsername()+ credentials.getPassword());
        if (userRepository.findByUsername(credentials.getUsername()) != null) {
            return ResponseEntity.status(400).body("Username already exists");
        }

        // Save new user to database
        userRepository.save(credentials);
        return ResponseEntity.ok("Registration successful!");
    }
}
