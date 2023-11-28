package www.dream.bbs.security.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//예제 13.17
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

private final JwtTokenProvider jwtTokenProvider;

public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
   this.jwtTokenProvider = jwtTokenProvider;
}

@Override
protected void doFilterInternal(HttpServletRequest servletRequest, HttpServletResponse servletResponse,
      FilterChain filterChain) throws ServletException, IOException {
   /* Header, Value log 찍기...
   Enumeration<String> headerNames =  servletRequest.getHeaderNames();
   while (headerNames.hasMoreElements()) {
      String header = headerNames.nextElement();
      String val = servletRequest.getHeader(header);
      System.out.println("header : " + header + ", val : " + val);
   }
   */
   String token = jwtTokenProvider.resolveToken(servletRequest);
   LOGGER.info("[doFilterInternal] token 값 추출 완료. token : {}", token);

   LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
   if (token != null && jwtTokenProvider.validateToken(token)) {
      Authentication authentication = jwtTokenProvider.getAuthentication(token);
      SecurityContext securityContext = SecurityContextHolder.getContext();
      securityContext.setAuthentication(authentication);
      
      Authentication savedAuthentication = SecurityContextHolder.getContext().getAuthentication();
      LOGGER.info("[doFilterInternal] token 값 유효성 체크 완료 {}", savedAuthentication);
   }

   filterChain.doFilter(servletRequest, servletResponse);
}
}
