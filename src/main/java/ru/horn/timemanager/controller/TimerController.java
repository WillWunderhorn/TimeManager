package ru.horn.timemanager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TimerController {

    @GetMapping("/")
    public String getTimeSet() {
        return "index";
    }

    @RequestMapping("/timer")
    public String loadTimerPage(
            @RequestParam(name = "workHours", defaultValue = "0") Integer workHours,
            @RequestParam(name = "workMinutes", defaultValue = "0") Integer workMinutes,

            @RequestParam(name = "restHours", defaultValue = "0") Integer restHours,
            @RequestParam(name = "restMinutes", defaultValue = "0") Integer restMinutes,

            Model model
    ) {
        model.addAttribute("workHours", workHours);
        model.addAttribute("workMinutes", workMinutes);

        model.addAttribute("restHours", restHours);
        model.addAttribute("restMinutes", restMinutes);

        return "timer";
    }
}
