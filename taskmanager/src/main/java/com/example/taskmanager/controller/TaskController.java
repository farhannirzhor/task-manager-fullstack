package com.example.taskmanager.controller;

import com.example.taskmanager.entity.Task;
import com.example.taskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<Task> getTasks(@AuthenticationPrincipal UserDetails user) {
        return taskService.getTasks(user.getUsername());
    }

    @PostMapping
    public Task createTask(@AuthenticationPrincipal UserDetails user,
                           @RequestBody Task task) {
        return taskService.createTask(user.getUsername(), task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@AuthenticationPrincipal UserDetails user,
                           @PathVariable Long id,
                           @RequestBody Task task) {
        return taskService.updateTask(user.getUsername(), id, task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@AuthenticationPrincipal UserDetails user,
                                           @PathVariable Long id) {
        taskService.deleteTask(user.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}