package www.dream.bbs.iis.model;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="t_tgt_tag")
@AllArgsConstructor
@Getter
@Setter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TagRelVO {
	@EmbeddedId
	private TagRelId id;
	private long tf;
	
	public TagRelVO() {}
}
