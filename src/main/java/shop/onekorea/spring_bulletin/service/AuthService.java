package shop.onekorea.spring_bulletin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shop.onekorea.spring_bulletin.dto.ResponseDto;
import shop.onekorea.spring_bulletin.dto.SignInRequestDto;
import shop.onekorea.spring_bulletin.dto.SignInResponseDto;
import shop.onekorea.spring_bulletin.dto.SignUpRequestDto;
import shop.onekorea.spring_bulletin.entity.UserEntity;
import shop.onekorea.spring_bulletin.repository.UserRepository;
import shop.onekorea.spring_bulletin.security.TokenProvider;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private TokenProvider tokenProvider;

    // 비밀 번호 암호화
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseDto<?> serviceSignUp(SignUpRequestDto requestDto) {
        String email = requestDto.getEmail();
        String password = requestDto.getPassword();
        String passwordConfirmation = requestDto.getPasswordConfirmation();

        // email 중복 확인
        // 단, "Repository"는 반드시 "Try ~ Catch" 구문 사용
        try {
            if (userRepository.existsById(email)) {
                return ResponseDto.setFailed("이미 가입한 email 입니다. email을 다시 확인하시오!");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed(e.getMessage());
        }

        if (!password.equals(passwordConfirmation)) {
            return ResponseDto.setFailed("비밀 번호를 다시 확인하시오!");
        }

        // 1. 먼저, Client.클라이언트에서 넘어 온 모든 정보를, [UserEntity] 생성자.Use3rEntity()를 활용해서, userEntity에 담는다
        UserEntity userEntity = new UserEntity(requestDto);

        // password 암호화
        String encodedPassword = passwordEncoder.encode(password);
        userEntity.setPassword(encodedPassword);

        // 2. 위에서 "userEntity"에 담은 것을, Repository "interface"의 각각의 메소드로 전달한다
        try {
            System.out.println("=====> /services/AuthService/serviceSignUp.userEntity: " + userEntity.toString());
            userRepository.save(userEntity);

            return ResponseDto.setSuccess("Sign Up Success!!!", userEntity);

        } catch (Exception e) {
            return ResponseDto.setFailed(e.getMessage());
        }

    }

    public ResponseDto<SignInResponseDto> serviceSignIn(SignInRequestDto requestDto) {

        System.out.println("=====> /services/AuthService/serviceSignIn.requestDto: " + requestDto.toString());

        String email = requestDto.getEmail();
        String password = requestDto.getPassword();

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return ResponseDto.setFailed("등록된 email이 없네요. email을 다시 확인하시오!");
            if (!passwordEncoder.matches(password, userEntity.getPassword()))
                return ResponseDto.setFailed("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인하시오!");
        } catch (Exception e) {
            return ResponseDto.setFailed(e.getMessage());
        }

        System.out.println("=====> /services/AuthService/serviceSignIn.userEntity: " + userEntity.toString());

        System.out.println("=====> /services/AuthService/serviceSignIn.password: " + password);

        userEntity.setPassword(""); // password는 Client클라이언트 쪽으로 넘어갈 때, 비워서 넘겨야 된다.

        String token = tokenProvider.generateToken(email);
        int expiration = 60 * 60 * 1000; // 1시간

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, expiration, userEntity);

        System.out.println("=====> /services/AuthService/serviceSignIn.signInResponseDto: " + signInResponseDto.toString());

        return ResponseDto.setSuccess("Sign In Success!!!", signInResponseDto);

    }

}
