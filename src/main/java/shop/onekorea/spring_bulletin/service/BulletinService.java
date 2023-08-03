package shop.onekorea.spring_bulletin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.onekorea.spring_bulletin.dto.ResponseDto;
import shop.onekorea.spring_bulletin.entity.BulletinEntity;
import shop.onekorea.spring_bulletin.entity.PopularSearchEntity;
import shop.onekorea.spring_bulletin.repository.BulletinRepository;
import shop.onekorea.spring_bulletin.repository.PopularSearchRepository;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
public class BulletinService {

    @Autowired BulletinRepository bulletinRepository;
    @Autowired PopularSearchRepository popularSearchRepository;

    public ResponseDto<List<BulletinEntity>> serviceGetTop3() {
        // public ResponseDto<List<BoardEntity>> getTop3() { // 14강

        // 2023.08.02 Conclusion. *** "List"는 Interface이기 때문에, "List()" 자체로 new 할 수 없고,
        // 반드시 "List"를 상속 받아서 "Implements.구현"한 "ArryList()"로 생성해야 한다.
        //      public interface List<E> extends Collection<E>
        //      public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable
        // =================================================================================================>
        List<BulletinEntity> boardList = new ArrayList<BulletinEntity>();

        // Date date = new Date();
        // date.setDate(date.getDate() -7); // 이것은 단종될 것이라고 하니, 아래거로 사용한다.
        Date date = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));

        List<BulletinEntity> bulletinList = null;
        try {
            bulletinList = bulletinRepository.findTop3ByCreatedAfterOrderByThumbsUpCountDesc(date); // DESC: 역순으로 나오게.
            //boardList = boardRepository.findTop3ByBoardWriteDateAfterOrderByLikesCntDesc(null); // 14강
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("Database Error");
        }
        return ResponseDto.setSuccess("성공!!!", bulletinList);

    }

    public ResponseDto<List<BulletinEntity>> serviceGetList() {
        // public ResponseDto<List<BulletinEntity>> getList() { // 14강

        List<BulletinEntity> bulletinList = new ArrayList<BulletinEntity>();
        try {
            bulletinList = bulletinRepository.findByOrderByCreatedDesc(); // DESC: 역순으로 나오게.
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("Database Error");
        }

        return ResponseDto.setSuccess("성공!!!", bulletinList);
    }

    public ResponseDto<List<PopularSearchEntity>> serviceGetPopularSearchList() {
        // public ResponseDto<List<PopularSearchRepository>> getPopularSearchList() { // 14강

        List<PopularSearchEntity> popularSearchList = new ArrayList<PopularSearchEntity>();

        try {
            popularSearchList = popularSearchRepository.findTop10ByOrderBySearchCountDesc(); // DESC: 역순으로 나오게.
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("Database Error");
        }

        return ResponseDto.setSuccess("성공!!!", popularSearchList);
    }

    public ResponseDto<List<BulletinEntity>> serviceGetSearchList(String title) {

        List<BulletinEntity> bulletinList = new ArrayList<BulletinEntity>();
        try {
            bulletinList = bulletinRepository.findByTitleContains(title);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("Database Error");
        }

        return ResponseDto.setSuccess("성공!!!", bulletinList);

    }

}
