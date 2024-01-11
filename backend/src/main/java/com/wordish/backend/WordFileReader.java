package com.wordish.backend;

import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class WordFileReader {
    private final String fileName;

    public WordFileReader(String fileName) {
        this.fileName = fileName;
    }
    protected List<String> ReadWordFile() {
        List<String> answers = new ArrayList<>();
        try {
            Resource resource = new ClassPathResource(fileName);
            InputStream stream = resource.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(stream));
            String word;
            while ((word = br.readLine()) != null) {
                answers.add(word.replaceAll("\"", ""));
            }
        }
        catch (Exception e) {
            try {
                System.out.println(new ClassPathResource("").getFile().getAbsolutePath());
            } catch (Exception e2){
                System.out.println(e2.toString());
            }
            System.out.println(e.toString());
            answers.add(e.toString());
        }
        return answers;
    }
}
