package www.dream.bbs.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.dream.bbs.board.mapper.BoardMapper;
import www.dream.bbs.board.model.BoardVO;

@Service
public class BoardService {
	@Autowired
	private BoardMapper boardMapper;

	public List<BoardVO> listAll() {
		return boardMapper.listAll();
	}
	
	public BoardVO findById(String id) {
		return boardMapper.findById(id);
	}

}
