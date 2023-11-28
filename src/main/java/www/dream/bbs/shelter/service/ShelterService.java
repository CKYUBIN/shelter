package www.dream.bbs.shelter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.dream.bbs.shelter.model.ShelterVO;
import www.dream.bbs.shelter.repository.ShelterRepository;

@Service
public class ShelterService {
	@Autowired
	private ShelterRepository shelterRepository;

	// 매개변수로 대피소 정보를 담은 ShelterVO 객체들의 리스트를 받아서 처리, 데이터베이스에 저장
	public int uploadShelter(List<ShelterVO> listShelterVO) {
		// 중복 데이터
		int dupCount = 0;
		for (ShelterVO obj : listShelterVO) {
			try {
				shelterRepository.save(obj);
			} catch (Exception e) {
				dupCount++;
			}
		}
//		System.out.println("Shelter 입력 중 " + dupCount + "건의 중복 데이터 발생하여 이는 무시함");
		return 0;
	}
	
	/** 1meter 당 위도*/
	private static final float LAT_PER_METER = 0.000021f;
	/** 1meter 당 경도*/
	private static final float LNG_PER_METER = 0.0000111f;

	// 주어진 조건에 따라 대피소를 조회하는 쿼리 실행
	public List<ShelterVO> listShelter(String useType, float lat, float lng, int displayLv, int halfBoundary) {
		// 특정한 사각형 내부에 있는 대피소 목록 조회 기능
		/*
		 * select * from T_shelter 
		 * where use_type like '%지진%' 
		 * and lat < 37.487035 + 0.021 * 5 
		 * and lat > 37.487035 - 0.021 * 5 
		 * and lng > 126.850974 -0.0111 * 5 -- 서 
		 * and lng < 126.850974 + 0.0111 * 5 -- 동 
		 * and display_lv > 30
		 */
		float westBound, eastBound, northBound, southBound ;
		westBound = lng - LNG_PER_METER * halfBoundary;
		eastBound = lng + LNG_PER_METER * halfBoundary;
		northBound = lat + LAT_PER_METER * halfBoundary;
		southBound = lat - LAT_PER_METER * halfBoundary;
		useType = "%" + useType + "%";
		return shelterRepository.findShelter(useType, westBound, eastBound, northBound, southBound, displayLv);
	}
	
}

