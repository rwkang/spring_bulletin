package shop.onekorea.spring_bulletin.controller;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(originPatterns = "http://localhost:3000")
// 2023.07.26 Modified. 각각의 Controller에서 처리할 것이 아니라, Project.main() 파일, SpringBootApplication에서 바로 처리한다.

@RestController
@RequestMapping("/")
public class MainController {

    @GetMapping("")
    public String index() {
        return "<h1>Main Controller!</h";
    }

}
