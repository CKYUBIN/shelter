-- Composite Pattern에 따라 객체 관계가 만들어 질때 그 구성 관계를 고성능 관리 할수있는 체계
-- yyyy
-- yyyy0009
-- yyyy0009abcd 

--특정 테이블 레코드의 pk 값을 char(4)로 채우기 위하여 해당 시퀀스로부터 만들기
--시퀀스 정보를 가지고 있는 Sequence 테이블 만들기
CREATE TABLE t_sequence (
	NAME VARCHAR(255) PRIMARY KEY,
	NUM INT NOT NULL DEFAULT 0
);
INSERT INTO t_sequence (NAME) VALUES ('S_bulitine_board');

DELIMITER $$
CREATE OR REPLACE FUNCTION NEXT_PK(t_NAME VARCHAR(255)) RETURNS char(4)
BEGIN
	DECLARE unrecorded boolean;	--관리 되고 있는 것인가? 아니면 새로운 것인가? 
	DECLARE r_sequence char(4);

	select not exists(select num from t_sequence where NAME = t_NAME) into unrecorded;

	if (unrecorded) then
		-- 새로운 것이면 새롭게 넣자
		INSERT INTO t_sequence(NAME) VALUES (t_NAME);
 	end if;

	UPDATE t_sequence SET NUM = NUM + 1  WHERE NAME = t_NAME;

	--사전 순서의 문자열 찾기
	SELECT c.SEED INTO r_sequence
	  FROM t_sequence s, T_IDSEED c
	 WHERE s.NAME = t_NAME
	   and s.NUM = c.SEQ;
	
	RETURN r_sequence;
END;
$$
DELIMITER ;

SELECT NEXT_PK('S_post');
