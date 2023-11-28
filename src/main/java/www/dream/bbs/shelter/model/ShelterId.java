package www.dream.bbs.shelter.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@Getter
public class ShelterId implements Serializable {
	private float lat; // 위도
	private float lng;

}
