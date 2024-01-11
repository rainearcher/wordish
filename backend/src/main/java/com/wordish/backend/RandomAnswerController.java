package com.wordish.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Random;

@RestController
public class RandomAnswerController extends WordFileReader{
    private final List<String> answers = ReadWordFile();

    public RandomAnswerController() {
        super("answers.csv");
    }
    @CrossOrigin
    @GetMapping("/randomanswer")
    public RandomAnswer randomAnswer() {
        return new RandomAnswer(GetRandomAnswer());
    }
    private String GetRandomAnswer() {
        int rnd = new Random().nextInt(answers.size());
        return answers.get(rnd);
    }

}
