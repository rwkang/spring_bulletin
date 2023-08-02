package shop.onekorea.spring_bulletin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ThumbsUp")
@Table(name = "thumbs_up")
public class ThumbsUpEntity {

    @Id
    private int id;
    private int boardId;
    private String thumbsUpper;
    private String thumbsUpperProfile;
    private String thumbsUpperNickname;
    private String updated;

}
