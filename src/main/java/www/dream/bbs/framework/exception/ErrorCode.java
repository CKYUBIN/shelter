package www.dream.bbs.framework.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public enum ErrorCode {

	BUSINESS_EXCEPTION_ERROR(200, "B999", "Business Exception Error"),

	/**
	 * ******************************* Custom Error CodeList
	 * ***************************************
	 */
	WRONG_PWD(200, "9999", "Wrong password Exception"),
	// Transaction Insert Error
	INSERT_ERROR(200, "9999", "Insert Transaction Error Exception"),

	// Transaction Update Error
	UPDATE_ERROR(200, "9999", "Update Transaction Error Exception"),

	// Transaction Delete Error
	DELETE_ERROR(200, "9999", "Delete Transaction Error Exception"),

	INVAID_UPDATE(200, "9998", "작성자와 수정하고자 하는 사람이 다릅니다"),

	; // End

	/**
	 * ******************************* Error Code Constructor
	 * ***************************************
	 */
	// 에러 코드의 '코드 상태'을 반환한다.
	private int status;

	// 에러 코드의 '코드간 구분 값'을 반환한다.
	private String divisionCode;

	// 에러 코드의 '코드 메시지'을 반환한다.
	private String message;

	// 생성자 구성
	ErrorCode(final int status, final String divisionCode, final String message) {
		this.status = status;
		this.divisionCode = divisionCode;
		this.message = message;
	}
}