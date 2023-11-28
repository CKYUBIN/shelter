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

import www.dream.bbs.shelter.model.PlaceVO;
import www.dream.bbs.shelter.model.ShelterId;
import www.dream.bbs.shelter.model.ShelterVO;
import www.dream.bbs.shelter.service.ShelterService;

@Service
@PropertySource("classpath:application.properties")
public class WebClient4Shelter {
	// 지진-옥외
	private String seoulKey = "seoulKey";

	@Autowired
	private ShelterService shelterService;

	public void loadShelter() {
		WebClient webClient = WebClient.builder().baseUrl("http://openapi.seoul.go.kr:8088")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();

		String result = webClient.get().uri("/" + seoulKey + "/json/TlEtqkP/1/1").retrieve().bodyToMono(String.class)
				.block();

		Map<String, Object> map = this.jsonToMap(result);

		int seoulShelterTotalCount = (int) ((Map) map.get("TlEtqkP")).get("list_total_count");
		int step = 500;
		for (int i = 1; i < seoulShelterTotalCount; i += step) {
			String subUri = "/" + seoulKey + "/json/TlEtqkP/" + i + "/" + (i + step);
			result = webClient.get().uri(subUri).retrieve().bodyToMono(String.class).block();
			map = this.jsonToMap(result);

			List seoulShelters = (List) ((Map) map.get("TlEtqkP")).get("row");

			List<ShelterVO> seoulSheltersVo = new ArrayList<>();

			for (Object obj : seoulShelters) {
				Map shelter = (Map) obj;
				ShelterId id = new ShelterId(Float.parseFloat((String) shelter.get("YCORD")),
						Float.parseFloat((String) shelter.get("XCORD")));
				ShelterVO shelterVO = new ShelterVO(id, (String) shelter.get("EQUP_NM"),
						(String) shelter.get("LOC_SFPR_A"), "지진-옥외");

				seoulSheltersVo.add(shelterVO);
				// System.out.println(shelterVO);
			}
			shelterService.uploadShelter(seoulSheltersVo);
			System.out.println("성공");
		}
	}

	private Map<String, Object> jsonToMap(String json) {
		ObjectMapper objectMapper = new ObjectMapper();
		TypeReference<Map<String, Object>> typeReference = new TypeReference<Map<String, Object>>() {
		};

		try {
			return objectMapper.readValue(json, typeReference);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new HashMap<>();
	}

	// 근처 장소 찾기
	private String googleKey = "googleKey";

	public List<PlaceVO> findNearPlaces(float lat, float lng, int radius, String type) {
		// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleKey}&location=37.4854799,126.8981862&radius=1000&type=pharmacy

		// 구글api에 요청보내기
		WebClient webClient = WebClient.builder().baseUrl("https://maps.googleapis.com/maps/api/place/nearbysearch")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();
		String result = webClient.get()
				.uri("/json?key=" + googleKey + "&location=" + lat + "," + lng + "&radius=" + radius + "&type=" + type)
				.retrieve().bodyToMono(String.class).block();

		System.out.println("result ..." + result);
		
		// JSON 응답을 맵으로 변환
		Map<String, Object> places = this.jsonToMap(result);


		List nearPlaces = (List) places.get("results");

		// 장소 데이터 추출 및 매핑
		List<PlaceVO> nearPlacesVo = new ArrayList<>();

		for (Object obj : nearPlaces) {
		    Map<String, Object> placeMap = (Map<String, Object>) obj;

		    String name = (String) placeMap.get("name");
		    Map<String, Object> locationMap = (Map<String, Object>) placeMap.get("geometry");
		    double placeLat = (double) ((Map<String, Object>) locationMap.get("location")).get("lat");
            double placeLng = (double) ((Map<String, Object>) locationMap.get("location")).get("lng");

		    PlaceVO placeVO = new PlaceVO(name, placeLat, placeLng);

		    nearPlacesVo.add(placeVO);
		}
		return nearPlacesVo;

	}

}