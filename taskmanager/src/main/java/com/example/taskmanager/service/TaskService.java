package com.example.taskmanager.service;

import com.example.taskmanager.entity.*;
import com.example.taskmanager.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Task> getTasks(String username) {
        return taskRepository.findByUserId(getUser(username).getId());
    }

    public Task createTask(String username, Task task) {
        task.setUser(getUser(username));
        return taskRepository.save(task);
    }

    public Task updateTask(String username, Long id, Task updated) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getUsername().equals(username))
            throw new RuntimeException("Forbidden");
        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setCompleted(updated.isCompleted());
        return taskRepository.save(task);
    }

    public void deleteTask(String username, Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getUsername().equals(username))
            throw new RuntimeException("Forbidden");
        taskRepository.delete(task);
    }
}