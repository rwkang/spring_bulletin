package shop.onekorea.spring_bulletin.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class TokenProvider {

    // JWT token 생성 및 검증을 위한 키 변수
    private static final String TOKEN_PREFIX = "Bearer ";

    // JWT token 생성
    // 만료 날짜: 현재 일자 + 1시간
    public String generateToken(String email) {
        Date expiration = (Date) Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        System.out.println("=====> /security/TokenProvider.java/generateToken.expiration: " + expiration);

        return Jwts.builder()
                // 암호화에 사용할 알고리즘, token key
                .signWith(SignatureAlgorithm.HS512, TOKEN_PREFIX)
                // JWT 제목, 생성일
                .setSubject(email).setIssuedAt(new Date())
                // JWT 만료일
                .setExpiration(expiration)
                // JWT 생성
                .compact();
    }

    // JWT 검증 == 복호화 => 이게 나중에 저쪽, /filter/JwtAuthenticationFilter.java/doFilter()에서 사용된다.
    public String validate(String token) {
        // 파라미터로 받은 token key를 사용하여, 복호화 한다
        Claims claims = Jwts.parser().setSigningKey(TOKEN_PREFIX).parseClaimsJws(token).getBody();

        return claims.getSubject();
    }

}
