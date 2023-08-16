package com.taskapp.taskservice.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.taskapp.taskservice.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
    Optional<Task> findByTitle(String title);
}
