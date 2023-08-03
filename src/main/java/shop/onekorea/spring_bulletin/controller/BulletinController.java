package shop.onekorea.spring_bulletin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.onekorea.spring_bulletin.dto.ResponseDto;
import shop.onekorea.spring_bulletin.entity.BulletinEntity;
import shop.onekorea.spring_bulletin.entity.PopularSearchEntity;
import shop.onekorea.spring_bulletin.service.BulletinService;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BulletinController {

    @Autowired private BulletinService bulletinService;

//    @GetMapping("/")
//    public String getBoard() {
//    public String getBoard(@AuthenticationPrincipal String userEmail) {
//
//        // return "/Controller/getBoard()까징 왔네요!!!, 로그인 사용자는 " + userEmail + " 입니다.";
//        // /Controller/getBoard()까징 왔네요!!!, 로그인 사용자는 rwkang@gmail.com 입니다.
//
//    }

    // 2023.08.02 Added. 5-1 주간 Top 3 게시글: "좋아요 순" 정렬
    // Get /api/board/top3
    @GetMapping("/top3")
    public ResponseDto<List<BulletinEntity>> doGetTop3() {
        // public ResponseDto<List<BoardEntity>> getTop3() { // 14강

        return bulletinService.serviceGetTop3();
    }

    @GetMapping("/list")
    public ResponseDto<List<BulletinEntity>> doGetList() {
        // public ResponseDto<List<BoardEntity>> getList() { // 14강

        return bulletinService.serviceGetList();
    }

    @GetMapping("/popularsearchList")
    public ResponseDto<List<PopularSearchEntity>> doGetPopularsearchList() {
        // public ResponseDto<List<PopularSearchEntity>> getPopularsearchList() { // 14강

        return bulletinService.serviceGetPopularSearchList();
    }

    @GetMapping("/search/{title}")
    // @GetMapping("/search/{boardTitle}") // 15강
    public ResponseDto<List<BulletinEntity>> doGetSearchList(@PathVariable("titlle") String title) {
        //public ResponseDto<List<BoardEntity>> getSearchList(@PathVariable("boardTitlle") String boardTitle) { // 15강
        return null;
    }


}
