package www.dream.bbs.board.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import www.dream.bbs.fileattachment.model.MappedTableDef;
import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;
import www.dream.bbs.framework.property.anno.TargetProperty;

@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PostVO extends ReplyVO implements MappedTableDef {
	public String getMappedTableName() {
		return "T_reply";
	}

	/* 아래 속성은 게시글 일때만 활용되는 */
	private BoardVO boardVO;
	@TargetProperty
	private String title;
	private int readCnt;
	private int	likeCnt;
	private int disCnt;

	/** DTO로 활용되는 속성 추가적 정의부분. */
	private List<String> listTag;
	
	private List<AttachFileDTO> listAttachFile;

	public void incReadCnt() {
		readCnt++;
	}
}
