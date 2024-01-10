package com.wordish.backend;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class WordFileReader {
    private final String fileName;

    public WordFileReader(String fileName) {
        this.fileName = fileName;
    }
    protected List<String> ReadWordFile() {
        List<String> answers = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String word;
            while ((word = br.readLine()) != null) {
                answers.add(word.replaceAll("\"", ""));
            }
        }
        catch (Exception e) {
            answers.add("VALID");
        }
        return answers;
    }
}
