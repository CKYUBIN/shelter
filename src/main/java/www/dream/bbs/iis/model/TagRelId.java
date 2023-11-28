package www.dream.bbs.iis.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagRelId implements Serializable {
	private String tgt_name;
	private String tgt_id;
	private String tag_id;
}
