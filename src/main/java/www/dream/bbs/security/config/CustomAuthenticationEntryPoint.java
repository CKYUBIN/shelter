package www.dream.bbs.security.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import www.dream.bbs.security.dto.EntryPointErrorResponse;

/**
 * 인증 실패시 결과를 처리해주는 로직을 가지고 있는 클래스 예제 13.21, 예제 13.32
 */
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	private final Logger LOGGER = LoggerFactory.getLogger(CustomAuthenticationEntryPoint.class);


	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException ex)
			throws IOException {
		LOGGER.info("[commence] 인증 실패로 response.sendError 발생");

		EntryPointErrorResponse entryPointErrorResponse = new EntryPointErrorResponse();
		entryPointErrorResponse.setMsg("인증이 실패하였습니다.");

		// response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		// jackson 의 JSON message 만들기
		ObjectMapper objectMapper = new ObjectMapper();
		response.getWriter().write(objectMapper.writeValueAsString(entryPointErrorResponse));
		// 예제 13.23
		// response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
	}
}