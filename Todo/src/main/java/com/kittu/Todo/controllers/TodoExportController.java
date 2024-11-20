package com.kittu.Todo.controllers;

import com.kittu.Todo.model.todolist;
import com.kittu.Todo.repo.todorepo;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoExportController {

    @Autowired
    private todorepo todoRepository;

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportTodosToExcel() throws Exception {
        List<todolist> todos = todoRepository.findAll();

        // Create Excel workbook and sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Todos");

        // Add header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Description");
        headerRow.createCell(2).setCellValue("Created At");

        // Populate data rows
        int rowIndex = 1;
        for (todolist todo : todos) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(todo.getId());
            row.createCell(1).setCellValue(todo.getDescription());

        }

        // Write workbook to byte array
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        // Prepare the response
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=todos.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(out.toByteArray());
    }
}
