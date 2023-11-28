package www.dream.bbs.framework.exception;

import lombok.Builder;
import lombok.Getter;

public class BusinessException extends RuntimeException {
	@Getter
	private final ErrorCode errorCode;

	@Builder
	public BusinessException(String message, ErrorCode errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	@Builder
	public BusinessException(ErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public String getMessage() {
		return errorCode.getMessage();
	}
}
