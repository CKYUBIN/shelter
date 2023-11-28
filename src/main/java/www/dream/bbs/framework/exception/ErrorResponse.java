package www.dream.bbs.framework.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
	private ErrorCode businessExceptionError;
	private String message;
	
	public static ErrorResponse of(ErrorCode businessExceptionError, String message) {
		return new ErrorResponse(businessExceptionError, message);
	}

}
