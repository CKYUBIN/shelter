package www.dream.bbs.webclient;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WebClient4Party {
	public void testLogin() {
		WebClient webClient = WebClient.builder().baseUrl("http://localhost:9090")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();

		String result =  webClient.get().uri("/sign-api/hi").retrieve().bodyToMono(String.class).block();
//		System.out.println(result);
	}
}
