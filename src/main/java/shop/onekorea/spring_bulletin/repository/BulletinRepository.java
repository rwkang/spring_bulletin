package shop.onekorea.spring_bulletin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.onekorea.spring_bulletin.entity.BulletinEntity;

import java.util.Date;
import java.util.List;

@Repository
public interface BulletinRepository extends JpaRepository<BulletinEntity, Integer> {

    // => SELECT * FROM board ORDER BY thumbs_up_count DESC;
    public List<BulletinEntity> findTop3ByCreatedAfterOrderByThumbsUpCountDesc(Date created); // DESC: 역순으로 나오게

    // => SELECT * FROM board ORDER BY created DESC;
    public List<BulletinEntity> findByOrderByCreatedDesc();

    // => SELECT * FROM board WHERE title LIKE '%?%';
    public List<BulletinEntity> findByTitleContains(String title);

}