package shop.onekorea.spring_bulletin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.onekorea.spring_bulletin.entity.BoardEntity;

import java.util.Date;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    // => SELECT * FROM board ORDER BY thumbs_up_count DESC;
    public List<BoardEntity> findTop3ByCreatedAfterOrderByThumbsUpCountDesc(Date boardCreated); // DESC: 역순으로 나오게

    // => SELECT * FROM board ORDER BY created DESC;
    public List<BoardEntity> findByOrderByCreatedDesc();

    // => SELECT * FROM board WHERE title LIKE '%?%';
    public List<BoardEntity> findByTitleContains(String title);
    // public List<BoardEntity> findByTitleLike(String title); // Like ???

}