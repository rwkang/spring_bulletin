package shop.onekorea.spring_bulletin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shop.onekorea.spring_bulletin.entity.PopularSearchEntity;

import java.util.List;

@Repository
public interface PopularSearchRepository extends JpaRepository<PopularSearchEntity, String> {

    // => SELECT * FROM popular_search ORDER BY search_count DESC LIMIT 10;
    public List<PopularSearchEntity> findTop10ByOrderBySearchCountDesc();

}