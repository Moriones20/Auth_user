package com.taskapp.taskservice.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskapp.taskservice.model.Task;
import com.taskapp.taskservice.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    HashMap<String, Object> data;

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    public ResponseEntity<Object> findTask(String id) {
        Optional<Task> task = taskRepository.findById(id);
        System.out.println(task);
        data = new HashMap<>();

        if (task.isPresent()) {
            data.put("data", task);
            data.put("message", "Task found");
            return new ResponseEntity<Object>(data, HttpStatus.OK);
        }
        data.put("error", true);
        data.put("message", "Task doesn't exist");
        return new ResponseEntity<Object>(data, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Object> createTask(Task task) {
        data = new HashMap<>();
        taskRepository.save(task);
        data.put("data", task);
        data.put("message", "Created successfully");
        return new ResponseEntity<Object>(data, HttpStatus.CREATED);
    }

    public ResponseEntity<Object> updateTask(Task task) {
        Optional<Task> resp = taskRepository.findById(task.getId());
        data = new HashMap<>();

        if (resp.isPresent()) {
            taskRepository.save(task);
            data.put("data", task);
            data.put("message", "Updated successfully");
            return new ResponseEntity<Object>(data, HttpStatus.OK);
        }
        data.put("error", true);
        data.put("message", "Task doesn't exist");
        return new ResponseEntity<Object>(data, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Object> deleteTask(String id) {
        boolean exist = this.taskRepository.existsById(id);
        data = new HashMap<>();

        if (!exist) {
            data.put("error", true);
            data.put("message", "Task doesn't exist");
            return new ResponseEntity<Object>(data, HttpStatus.NOT_FOUND);
        }
        taskRepository.deleteById(id);
        data.put("message", "Delete successfully");
        return new ResponseEntity<Object>(data, HttpStatus.OK);
    }
}
