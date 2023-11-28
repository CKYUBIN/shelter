package www.dream.bbs.board.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import www.dream.bbs.framework.model.MasterEntity;
import www.dream.bbs.framework.property.anno.TargetProperty;
import www.dream.bbs.party.model.PartyVO;

@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ReplyVO extends MasterEntity {
	@TargetProperty //Proxy를 통한 접근 시 null이 나오는 현상
	private PartyVO writer;	//게시물 작성자
	@TargetProperty
	private String content;	//내용
	private int hTier;
	//대댓 구조 만들기는 어떻게?
	private List<ReplyVO> listReply = new ArrayList<>();
	
	public ReplyVO(String id) {
		super.setId(id);
	}
	
	public String getParentId() {
		String myId = super.getId();
		int len = myId.length();
		return myId.substring(0, len - ID_LENGTH);
	}

	public void appendReply(ReplyVO reply) {
		listReply.add(reply);
	}
}
