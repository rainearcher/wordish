package com.wordish.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
public class ValidWordCheckController extends WordFileReader{
    private final List<String> validWords = ReadWordFile();

    public ValidWordCheckController() {
        super("words.csv");
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/validateword")
    public ValidWordCheck validWordCheck(@RequestParam(value="word", defaultValue="valid") String word) {
        if (validWords.contains(word.toLowerCase())) {
            return new ValidWordCheck(true);
        }
        else {
            return new ValidWordCheck(false);
        }
    }
}
