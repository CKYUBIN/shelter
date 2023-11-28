--"XCORD" 경도 lng "YCORD" 위도 lat "EQUP_NM"
  drop table T_shelter;

-- lat, lng, name, use_type, display_lv
-- open.seoul.go.kr:{lat, lng, name}= {YCORD, XCORD, EQUP_NM}
-- 경도 1도는 111km. 적도 기준. 0.0111 1km, 0.0000111 lm 
-- 위도 1도는 40000km/4/90. 0.021 1km, 0.000021 1m
	create table T_shelter (
    lat             float(10,8) comment '위도', -- open.seoul.go.kr:YCORD
    lng             float(10,7) comment '경도', -- open.seoul.go.kr:XCORD
    name            varchar(255) comment '시설명', -- open.seoul.go.kr:EQUP_NM
    address         varchar(255) comment '주소',
    use_type        varchar(1000) comment '용도', -- 지진:화재:홍수
    display_lv      int comment '100:최상단, 1:현미경',
    reg_dt          TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '등록일',
    upt_dt          TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '최종 정보 수정일',
    primary key(lat, lng)
  );

  insert into T_shelter(lat, lng, name, use_type, display_lv)
  values(37.487035, 126.850974, '경인중학교 운동장', '지진-옥외', 5);
 -- 북쪽으로 도망
  insert into T_shelter(lat, lng, name, use_type, display_lv)
  values(37.507035, 126.880974, '먼북동중학교 운동장', '지진-옥외', 40);
   -- 북쪽으로 도망
  insert into T_shelter(lat, lng, name, use_type, display_lv)
  values(37.488035, 126.853974, '가까운북동중학교 운동장', '지진-옥외', 80);

select *
  from T_shelter 
 where use_type like '%지진%'
   and lat < 37.487035 + 0.021 * 5
   and lat > 37.487035 - 0.021 * 5
   and lng > 126.850974 - 0.0111 * 5 -- 서 
   and lng < 126.850974 + 0.0111 * 5 -- 동
   and display_lv > 30
-- 5 <- 이 파라미터의 숫자가 작아지면 작아질수록 자세하게 보임
   lng, name, use_type