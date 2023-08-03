package shop.onekorea.spring_bulletin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.onekorea.spring_bulletin.dto.ResponseDto;
import shop.onekorea.spring_bulletin.dto.SignInRequestDto;
import shop.onekorea.spring_bulletin.dto.SignInResponseDto;
import shop.onekorea.spring_bulletin.dto.SignUpRequestDto;
import shop.onekorea.spring_bulletin.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService authService;

    @PostMapping("/signUp")
    public ResponseDto<?> doSignUp(@RequestBody SignUpRequestDto requestBody) {
        System.out.println("=====> /controller/AuthController.doSignUp.requestBody = " + requestBody.toString());

        ResponseDto<?> result = authService.serviceSignUp(requestBody);

        return result;

    }

    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> doSignIn(@RequestBody SignInRequestDto requestBody) {
        System.out.println("=====> /controller/AuthController.doSignIn.requestBody = " + requestBody.toString());

        ResponseDto<SignInResponseDto> result = authService.serviceSignIn(requestBody);

        return result;
    }


}
