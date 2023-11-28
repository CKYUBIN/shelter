package www.dream.bbs.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import www.dream.bbs.board.model.BoardVO;
import www.dream.bbs.board.service.BoardService;
import www.dream.bbs.party.model.PartyVO;
import www.dream.bbs.party.service.PartyService;

@RestController		//Container에 담기도록 지정
@RequestMapping("/bb")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@GetMapping("/anonymous/listAll")
	public ResponseEntity<List<BoardVO>> listAll() {
		System.out.println("BB//anonymous/listAll");
		List<BoardVO> list = boardService.listAll();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<BoardVO> findById(@PathVariable String id) {
		BoardVO board = boardService.findById(id);
		return ResponseEntity.ok(board);
	}
}
