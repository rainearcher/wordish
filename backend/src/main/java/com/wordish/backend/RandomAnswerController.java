package com.wordish.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class RandomAnswerController {
    private static final List<String> answers = InitAnswersList();
    @GetMapping("/randomanswer")
    public RandomAnswer randomAnswer() {
        return new RandomAnswer(GetRandomAnswer());
    }
    private String GetRandomAnswer() {
        int rnd = new Random().nextInt(answers.size());
        return answers.get(rnd);
    }
    private static List<String> InitAnswersList() {
        List<String> answers = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader("answers.csv"))) {
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
