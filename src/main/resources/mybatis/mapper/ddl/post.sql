INSERT INTO T_reply(id, h_tier, descrim, bb_id, writer_id, TITLE, content)
		VALUES ('p001', 0, 'post', '000n', '0003', 'dog', 'i like');
		
INSERT INTO T_reply(id, h_tier, descrim, writer_id, content)
	VALUES ('p001r000', 1, 'reply', '0003', 'neo');
INSERT INTO T_reply(id, h_tier, descrim, writer_id, content)
	VALUES ('p001r000rr00', 2, 'reply', '0003', 'reply of neo');
INSERT INTO T_reply(id, h_tier, descrim, writer_id, content)
	VALUES ('p001r000rr01', 2, 'reply', '0003', 'SECOND reply of neo');

INSERT INTO T_reply(id, h_tier, descrim, writer_id, content)
	VALUES ('p001r001', 1, 'reply', '0003', 'new name');

INSERT INTO T_reply(id, h_tier, descrim, bb_id, writer_id, TITLE, content)
		VALUES ('p002', 0, 'post', '000n', '0003', 'cat', 'i like');
INSERT INTO T_reply(id, h_tier, descrim, bb_id, TITLE, content)
		VALUES ('p003', 0, 'post', '000n', 'empty cat', 'bye bye');

	/** 게시판의 모든 원글 목록 조회 */
	public List<PostVO> listAllPost(String boardId);

	select p.*, w.id w_id, w.descrim w_descrim, w.name w_name, w.sex w_sex, w.reg_dt w_reg_dt, w.upt_dt w_upt_dt
	  from T_reply p LEFT OUTER JOIN T_party w
	       ON p.writer_id = w.id
	 where p.bb_id = '000n';


	/** 원글 상세. 첨부파일 목록, 댓글, 대댓 목록이 내부 변수에 채워짐 */
	public PostVO findById(String id);

	select r.*, w.*
	  from T_reply r LEFT OUTER JOIN T_party w
	       ON r.writer_id = w.id
	 where r.id like CONCAT('p001', '%');
	 
	 
	/** 게시판에 원글 달기*/
	public int createPost(PostVO post);

INSERT INTO T_reply(id, h_tier, descrim, bb_id, writer_id, TITLE, content)
		VALUES (NEXT_PK('s_reply'), 0, 'post', '000n', '0003', 'lion', 'i like');
	 
	 	/** 댓글 달기. parent의 id의 연결된 id 만들기 */
	public int createReply(@Param("parent") ReplyVO parent, @Param("reply") ReplyVO reply);

INSERT INTO T_reply(id, h_tier, descrim, writer_id, content)
	VALUES (CONCAT('p001', NEXT_PK('s_reply')), 0 + 1, 'reply', '0003', 'neo 0001');
	 
	/** id like로 지우기 */
	public int deleteReply(String id);

INSERT INTO T_reply(id, h_tier, descrim, bb_id, TITLE, content)
		VALUES ('p003', 0, 'post', '000n', 'empty cat', 'bye bye');
INSERT INTO T_reply(id, h_tier, descrim, writer_id, content)
	VALUES (CONCAT('p003', NEXT_PK('s_reply')), 0 + 1, 'reply', '0003', 'neo 00071');
INSERT INTO T_reply(id, h_tier, descrim, writer_id, content)
	VALUES (CONCAT('p0030002', NEXT_PK('s_reply')), 2, 'reply', '0003', 'nefdsggo 00071');


	delete from T_reply
	 where id like CONCAT('p003', '%');
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 