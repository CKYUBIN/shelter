package www.dream.bbs.security.service;

import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import www.dream.bbs.framework.CommonResponse;
import www.dream.bbs.framework.exception.BusinessException;
import www.dream.bbs.framework.exception.ErrorCode;
import www.dream.bbs.party.mapper.PartyMapper;
import www.dream.bbs.party.model.PartyVO;
import www.dream.bbs.security.config.JwtTokenProvider;
import www.dream.bbs.security.dto.SignInDTO;
import www.dream.bbs.security.dto.SignInResultDto;
import www.dream.bbs.security.dto.SignUpResultDto;

@Service
public class SignService {
	private final Logger LOGGER = LoggerFactory.getLogger(SignService.class);

	private PartyMapper partyMapper;
	public JwtTokenProvider jwtTokenProvider;
	public PasswordEncoder passwordEncoder;

	@Autowired
	public SignService(PartyMapper partyMapper, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
		this.partyMapper = partyMapper;
		this.jwtTokenProvider = jwtTokenProvider;
		this.passwordEncoder = passwordEncoder;
	}

	/** 로그인 처리 */
	public SignInResultDto signIn(SignInDTO signInDTO) {
		LOGGER.info("[getSignInResult] signDataHandler 로 회원 정보 요청");
		PartyVO user = partyMapper.findByNick(signInDTO.getId());

		LOGGER.info("[getSignInResult] 패스워드 비교 수행");
		// User없는 상황 및 암호 오류 상황을 명확히 구분하여 알려주지 않음. 보안성 강화
		if (user == null || !passwordEncoder.matches(signInDTO.getPassword(), user.getPassword())) {
			throw new BusinessException(ErrorCode.WRONG_PWD);
		}
		LOGGER.info("[getSignInResult] 패스워드 일치");

		LOGGER.info("[getSignInResult] SignInResultDto 객체 생성");
		SignInResultDto signInResultDto = SignInResultDto.builder()
				.token(jwtTokenProvider.createToken(String.valueOf(user.getNick()),
						user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList())))
				.roles(user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.userId(user.getId()).userName(user.getName()).userNick(user.getNick()).build();

		LOGGER.info("[getSignInResult] SignInResultDto 객체에 값 주입");
		setSuccessResult(signInResultDto);

		return signInResultDto;
	}

	// 결과 모델에 api 요청 성공 데이터를 세팅해주는 메소드
	private void setSuccessResult(SignUpResultDto result) {
		result.setSuccess(true);
		result.setCode(CommonResponse.SUCCESS.getCode());
		result.setMsg(CommonResponse.SUCCESS.getMsg());
	}

	// 결과 모델에 api 요청 실패 데이터를 세팅해주는 메소드
	private void setFailResult(SignUpResultDto result) {
		result.setSuccess(false);
		result.setCode(CommonResponse.FAIL.getCode());
		result.setMsg(CommonResponse.FAIL.getMsg());
	}
}