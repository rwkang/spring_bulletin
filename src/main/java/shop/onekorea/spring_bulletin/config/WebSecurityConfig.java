package shop.onekorea.spring_bulletin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import shop.onekorea.spring_bulletin.filter.JwtAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // CORS 정책: Cross Origin Resource Sharing (CORS): 현재 Application에서 기본 설정 했음
                .cors().and()
                // CSRF 대책: Cross Site Request Forgery (CSRF): 여기서는 비활성화 시킨다.
                .csrf().disable()
                // Basic 인증을 사용할 것인가? (현재는 Bearer token 인증 방법을 사용하기 때문에, 비활성화 시킨다)
                .httpBasic().disable()
                // Session 기반 인증 (현재는 Session 가반 인증을 사용하지 않기 때문에 상태를 없앰)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                // "/", "/api/auth/" 요청에 대해서는 인증을 하지 않고, 모두 허용
                .authorizeRequests().antMatchers("/", "/api/auth/**").permitAll()
                // 기타 나머지 요청에 대해서는, 모든 인증된 사용자만 사용 가능하게 한다.
                .anyRequest().authenticated();
        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();

    }

}
