package shop.onekorea.spring_bulletin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SpringBulletinApplication {

	public static void main(String[] args) {

		SpringApplication.run(SpringBulletinApplication.class, args);
		System.out.println("================================> Project Spring Bulletin Application is running by Ro Won Kang");

	}

	// @CrossOrigin(originPatterns = "http://localhost:3000")
	@Bean
	public WebMvcConfigurer webMvcConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOriginPatterns();
			}
		};
	}



}
