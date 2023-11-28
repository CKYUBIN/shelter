package www.dream.bbs.shelter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import www.dream.bbs.shelter.model.PlaceVO;
import www.dream.bbs.shelter.model.ShelterVO;
import www.dream.bbs.shelter.service.ShelterService;
import www.dream.bbs.webclient.WebClient4Shelter;

@RestController // Container에 담기도록 지정
@RequestMapping("/shelter")
public class ShelterController {
	@Autowired
	private ShelterService shelterService;
	
	@Autowired
	private WebClient4Shelter webClient4Shelter;

	// /shelter/
	// halfBoundary : meter 단위로
	@GetMapping("/{useType}/{lat}/{lng}/{displayLv}/{halfBoundary}")
	public ResponseEntity<List<ShelterVO>> get(@PathVariable String useType, @PathVariable float lat, @PathVariable float lng, @PathVariable int displayLv, @PathVariable int halfBoundary) {		
		List<ShelterVO> result = shelterService.listShelter(useType, lat, lng, displayLv, halfBoundary);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// 근처 장소 찾기 	요청이 들어오면 findNearPlaces 호출되어 작업 수행
	@GetMapping("/places/{lat}/{lng}/{radius}/{type}")
	public ResponseEntity<List<PlaceVO>> findNearPlaces(@PathVariable float lat, @PathVariable float lng, @PathVariable int radius, @PathVariable String type) {
		List<PlaceVO> nearPlaces= webClient4Shelter.findNearPlaces(lat, lng, radius, type);
		return new ResponseEntity<>(nearPlaces, HttpStatus.OK);
	}
	
}
