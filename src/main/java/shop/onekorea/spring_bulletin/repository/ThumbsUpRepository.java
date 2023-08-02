package shop.onekorea.spring_bulletin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.onekorea.spring_bulletin.entity.ThumbsUpEntity;

@Repository
public interface ThumbsUpRepository extends JpaRepository<ThumbsUpEntity, Integer> {
}
