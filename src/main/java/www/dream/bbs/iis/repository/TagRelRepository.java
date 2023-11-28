package www.dream.bbs.iis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import www.dream.bbs.iis.model.TagRelId;
import www.dream.bbs.iis.model.TagRelVO;

public interface TagRelRepository extends JpaRepository<TagRelVO, TagRelId>{
	@Query(nativeQuery = true, value = "delete from t_tgt_tag where tgt_name = 'T_reply' and tgt_id = :postId")
	void deleteAllByPostId(@Param("postId") String postId);
}
