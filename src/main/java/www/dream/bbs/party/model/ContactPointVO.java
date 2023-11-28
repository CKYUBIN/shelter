package www.dream.bbs.party.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ContactPointVO {
	private String cpType;
	private String cpVal;

	@Override
	public String toString() {
		return "[cpType=" + cpType + ", cpVal=" + cpVal + "]";
	}
}
