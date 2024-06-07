package com.react.roadmap.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import com.react.roadmap.data.Node;

@Controller
public class WebController implements ErrorController {

    @GetMapping({"/", "/error"})
    public String index() {
        return  "index.html";
    }
}