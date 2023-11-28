package www.dream.bbs.framework.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import www.dream.bbs.framework.model.CodeVO;
import www.dream.bbs.framework.service.CodeService;

@RestController		//Container에 담기도록 지정
@RequestMapping("/framework")
public class CodeController {
	@Autowired
	private CodeService codeService;
	
	// /framework/anonymous/listAllContactPoint
	@GetMapping("/anonymous/listAllContactPointType")
	public ResponseEntity<List<CodeVO>> listAll() {
		List<CodeVO> list = codeService.listAll();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
}
