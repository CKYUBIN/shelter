package www.dream.bbs.webclient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import www.dream.bbs.shelter.model.ShelterId;
import www.dream.bbs.shelter.model.ShelterVO;
import www.dream.bbs.shelter.service.ShelterService;

@Service
@PropertySource("classpath:application.properties")
public class WebClient4Shelter2 {
	// 지진-실내
	private String seoulKey = "seoulKey";
	
	@Autowired
	private ShelterService shelterService;
	
	public void loadShelter() {
		WebClient webClient = WebClient.builder().baseUrl("http://openapi.seoul.go.kr:8088")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();
		String result = webClient.get().uri("/" + seoulKey + "/json/TbEqkShelter/1/1").retrieve().bodyToMono(String.class).block();
		
		Map<String, Object> map = this.jsonToMap(result);
		
		int seoulShelterTotalCount = (int) ((Map)map.get("TbEqkShelter")).get("list_total_count");
		int step = 500;
		for (int i = 1; i < seoulShelterTotalCount; i += step) {
			String subUri = "/" + seoulKey + "/json/TbEqkShelter/" + i + "/" + (i + 500);
			result = webClient.get().uri(subUri).retrieve().bodyToMono(String.class).block();
			map = this.jsonToMap(result);
			
			List seoulShelters = (List) ((Map)map.get("TbEqkShelter")).get("row");
			
			List<ShelterVO> seoulShelterVos = new ArrayList<>();
			
			for (Object obj : seoulShelters) {
				Map shelter = (Map) obj;
				ShelterId id = new ShelterId(Float.parseFloat((String) shelter.get("LAT")), // 위도 
						Float.parseFloat((String) shelter.get("LON")));  // 경도
				
				ShelterVO shelterVO = new ShelterVO(id, (String) shelter.get("VT_ACMDFCLTY_NM"), (String) shelter.get("DTL_ADRES"), "지진-실내"); // VT_ACMDFCLTY_NM: 장소명, DTL_ADRES: 주소
				
				seoulShelterVos.add(shelterVO);
			}
			shelterService.uploadShelter(seoulShelterVos);
		}	
	}
	
	private Map<String, Object> jsonToMap(String json) {
		ObjectMapper objectMapper = new ObjectMapper();
		TypeReference<Map<String, Object>> typeReference = new TypeReference<Map<String, Object>>() {};
		try {
			return objectMapper.readValue(json, typeReference);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new HashMap<>();
	}
}
