package shop.onekorea.spring_bulletin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.onekorea.spring_bulletin.dto.PatchUserRequestDto;
import shop.onekorea.spring_bulletin.dto.PatchUserResponseDto;
import shop.onekorea.spring_bulletin.dto.ResponseDto;
import shop.onekorea.spring_bulletin.entity.UserEntity;
import shop.onekorea.spring_bulletin.repository.UserRepository;

@Service
public class UserService {

    @Autowired UserRepository userRepository;

    public ResponseDto<PatchUserResponseDto> patchUser(PatchUserRequestDto requestDto, String email) {

        UserEntity userEntity = null;
        String nickname = requestDto.getNickname();
        String profile = requestDto.getProfile();

        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return ResponseDto.setFailed("User not found");
            }

            userEntity.setNickname(nickname);
            userEntity.setProfile(profile);

            userRepository.save(userEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("Database Error: " + e.getMessage());
        }

        userEntity.setPassword("");

        PatchUserResponseDto patchUserResponseDto = new PatchUserResponseDto(userEntity);

        return ResponseDto.setSuccess("성공!!!", patchUserResponseDto);

    }

}
