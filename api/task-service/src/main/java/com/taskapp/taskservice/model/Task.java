package com.taskapp.taskservice.model;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("tasks")
@Data
public class Task {
    @Id
    private String id;
    private String title;
    private String description;
    private boolean done;
    private String user;
    @CreatedDate
    private LocalDate createdAt;
    @LastModifiedDate
    private LocalDate updatedAt;

    // public Task() {
    // }

    // public Task(String id, String title, String description, boolean done, String
    // user, LocalDate createdAt,
    // LocalDate updatedAt) {
    // this.id = id;
    // this.title = title;
    // this.description = description;
    // this.done = done;
    // this.user = user;
    // this.createdAt = createdAt;
    // this.updatedAt = updatedAt;
    // }

    // public String getId() {
    // return id;
    // }

    // public void setId(String id) {
    // this.id = id;
    // }

    // public String getTitle() {
    // return title;
    // }

    // public void setTitle(String title) {
    // this.title = title;
    // }

    // public String getDescription() {
    // return description;
    // }

    // public void setDescription(String description) {
    // this.description = description;
    // }

    // public boolean isDone() {
    // return done;
    // }

    // public void setDone(boolean done) {
    // this.done = done;
    // }

    // public String getUser() {
    // return user;
    // }

    // public void setUser(String user) {
    // this.user = user;
    // }

    // public LocalDate getCreatedAt() {
    // return createdAt;
    // }

    // public void setCreatedAt(LocalDate createdAt) {
    // this.createdAt = createdAt;
    // }

    // public LocalDate getUpdatedAt() {
    // return updatedAt;
    // }

    // public void setUpdatedAt(LocalDate updatedAt) {
    // this.updatedAt = updatedAt;
    // }
}
