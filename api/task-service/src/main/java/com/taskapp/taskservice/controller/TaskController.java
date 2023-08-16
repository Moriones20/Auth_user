package com.taskapp.taskservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskapp.taskservice.model.Task;
import com.taskapp.taskservice.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping()
    public List<Task> getAllTasks() {
        return taskService.findAllTasks();
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<Object> getTask(@PathVariable("id") String id) {
        return taskService.findTask(id);
    }

    @PostMapping()
    public ResponseEntity<Object> createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping()
    public ResponseEntity<Object> updateTask(@RequestBody Task task) {
        return taskService.updateTask(task);
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<Object> deleteTask(@PathVariable("id") String id) {
        return taskService.deleteTask(id);
    }
}
