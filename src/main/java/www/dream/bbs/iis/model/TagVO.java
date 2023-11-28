package www.dream.bbs.iis.model;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="T_TAG")
@AllArgsConstructor
@Getter
@Setter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TagVO {
	@Id
	private String id;
	private String word;
	@Column(name="description")
	private String 단어정의_설명;
	
	public TagVO() {}
	
	public TagVO(String word, String 단어정의_설명) {
		this.word = word;
		this.단어정의_설명 = 단어정의_설명;
	}

	public void setId(String id) {
		this.id = id;
	}
}
