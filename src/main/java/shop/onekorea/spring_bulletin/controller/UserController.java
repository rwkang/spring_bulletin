package shop.onekorea.spring_bulletin.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.onekorea.spring_bulletin.dto.PatchUserRequestDto;
import shop.onekorea.spring_bulletin.dto.PatchUserResponseDto;
import shop.onekorea.spring_bulletin.dto.ResponseDto;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @PatchMapping("/")
    public ResponseDto<PatchUserResponseDto> patchUser(@RequestBody PatchUserRequestDto requestBody, @AuthenticationPrincipal String email) {
        return null;
    }

}
