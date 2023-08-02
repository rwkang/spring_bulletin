package shop.onekorea.spring_bulletin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequestDto {

    private String email;
    private String password;
    private String passwordConfirmation;
    private String nickname;
    private String phoneNo;
    private String address;
    private String addressDetail;

}
