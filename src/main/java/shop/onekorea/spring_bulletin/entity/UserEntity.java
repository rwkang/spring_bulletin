package shop.onekorea.spring_bulletin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import shop.onekorea.spring_bulletin.dto.SignUpRequestDto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "User") // 꼭 import javax.persistence.Entity; 이것으로 import.
@Table(name = "user") // 실제 테이블 이름.
public class UserEntity {
    @Id // 바로 아래 컬럼을 "PRIMARY KEY"로 설정.
    private String email;
    private String password;
    private String nickname;
    private String phoneNo;
    private String address;
    private String profile;

    private Date updated;
//    Date date = new Date();

    public UserEntity(SignUpRequestDto signUpRequestDto) {
        this.email = signUpRequestDto.getEmail();
        this.password = signUpRequestDto.getPassword();
        this.nickname = signUpRequestDto.getNickname();
        this.phoneNo = signUpRequestDto.getPhoneNo();
        this.address = signUpRequestDto.getAddress() + " " + signUpRequestDto.getAddressDetail();
        this.updated = new Date();
    }

}
