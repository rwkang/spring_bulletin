package shop.onekorea.spring_bulletin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.onekorea.spring_bulletin.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> { // 여기서 "UserEntity"는 엔터티명.

    // => SELECT * FROM user WHERE email = :email AND password = :password;
    public boolean existsByEmailAndPassword(String email, String password); // OK

    // => SELECT * FROM user WHERE password = :password;
    public boolean existsByPassword(String password); // OK

    // => SELECT * FROM user WHERE email = :email;
    public UserEntity findByEmail(String email); // OK

}
