package www.dream.bbs.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.dream.bbs.board.model.BoardVO;

@Mapper		//Container에 담기도록 지정
public interface BoardMapper {
	//LRCUD 순서로 함수들을 배치하여 빠르게 따라갈(추적성) 수 있도록 합니다. 
	public List<BoardVO> listAll();
	public BoardVO findById(String id);
}
